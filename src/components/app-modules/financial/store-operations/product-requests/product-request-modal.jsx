import React, { useState } from "react";
import { useMount } from "react-use";
import Joi from "joi-browser";
import { Form, Row, Col, Divider, Typography } from "antd";
import ModalWindow from "../../../../common/modal-window";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import { v4 as uuid } from "uuid";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../../tools/form-manager";
import service from "../../../../../services/financial/store-operations/product-requests-service";
import InputItem from "../../../../form-controls/input-item";
import DateItem from "../../../../form-controls/date-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import TextItem from "../../../../form-controls/text-item";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import DetailsTable from "../../../../common/details-table";
import ProductRequestItemModal from "./product-request-item-modal";
import {
  schema,
  initRecord,
  getProductRequestItemsColumns,
  getNewProductRequestItemButton,
  getFooterButtons,
} from "./product-request-modal-code";

const { Text } = Typography;

const formRef = React.createRef();

const ProductRequestModal = ({
  access,
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  onSaveProductRequestItem,
  onDeleteProductRequestItem,
  onReject,
  onApprove,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [frontSideAccountSearchProgress, setFrontSideAccountSearchProgress] =
    useState(false);
  const [frontSideAccounts, setFrontSideAccounts] = useState([]);

  const [memberSearchProgress, setMemberSearchProgress] = useState(false);
  const [members, setMembers] = useState([]);

  //   const [storageCenters, setStorageCenters] = useState([]);
  const [stores, setStores] = useState([]);
  const [fromStores, setFromStores] = useState([]);
  const [toStores, setToStores] = useState([]);
  const [productRequestTypes, setProductRequestTypes] = useState([]);
  const [frontSideTypes, setFrontSideTypes] = useState([]);
  const [hasSaveApproveAccess, setHasSaveApproveAccess] = useState(false);
  const [hasRejectAccess, setHasRejectAccess] = useState(false);

  const [products, setProducts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const [selectedProductRequestItem, setSelectedProductRequestItem] =
    useState(null);
  const [showProductRequestItemModal, setShowProductRequestItemModal] =
    useState(false);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    // record.StorageCenterID = 0;
    record.FrontSideTypeID = 0;
    record.FrontSideAccountID = 0;
    record.RequestMemberID = 0;
    record.NeedDate = "";
    record.RequestTypeID = 0;
    record.RequestDate = currentDate;
    record.DetailsText = "";
    record.FromStoreID = 0;
    record.ToStoreID = 0;
    record.StatusID = 1;
    record.Items = [];

    setRecord(record);
    setErrors({});
    setFrontSideAccounts([]);
    setMembers([]);
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();

    //------

    setProgress(true);

    try {
      const data = await service.getParams();

      let {
        // StorageCenters,
        Stores,
        ProductRequestTypes,
        FrontSideTypes,
        HasSaveApproveAccess,
        HasRejectAccess,
        CurrentDate,
      } = data;

      //   setStorageCenters(StorageCenters);
      setStores(Stores);

      const from_stores = [...Stores];
      const to_stores = [...Stores];
      from_stores.forEach((store) => (store.FromStoreID = store.StoreID));
      to_stores.forEach((store) => (store.ToStoreID = store.StoreID));
      setFromStores(from_stores);
      setToStores(to_stores);

      setProductRequestTypes(ProductRequestTypes);
      setFrontSideTypes(FrontSideTypes);
      setHasSaveApproveAccess(HasSaveApproveAccess);
      setHasRejectAccess(HasRejectAccess);
      setCurrentDate(CurrentDate);

      //------

      if (!selectedObject) {
        const rec = { ...initRecord };
        rec.RequestDate = `${CurrentDate}`;

        setRecord({ ...rec });
        loadFieldsValue(formRef, { ...rec });
      } else {
        const request_member = await service.searchMemberByID(
          selectedObject.RequestMemberID
        );

        request_member.forEach((m) => {
          m.RequestMemberID = m.MemberID;
        });

        setMembers(request_member);

        //---

        const front_side_account = await service.searchFrontSideAccountByID(
          selectedObject.FrontSideAccountID
        );

        setFrontSideAccounts(front_side_account);
        initModal(formRef, selectedObject, setRecord);
      }
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  });

  const isEdit = selectedObject !== null;

  const handleSubmit = async () => {
    saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  const handleSubmitAndApprove = async () => {
    const rec = { ...record };
    rec.Items.forEach((item) => {
      if (item.StatusID === 1) {
        item.StatusID = 2;
        item.StatusTitle = Words.product_request_status_2;
      }
    });
    rec.StatusID = 2;
    setRecord(rec);

    const updated_config = { ...formConfig };
    updated_config.record = rec;

    saveModalChanges(
      updated_config,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  //------

  const handleGetItemParams = (params) => {
    const { Products, Statuses } = params;

    setProducts(Products);
    setStatuses(Statuses);
  };

  const handleSaveProductRequestItem = async (product_item) => {
    if (selectedObject !== null) {
      product_item.RequestID = selectedObject.RequestID;

      const saved_product_request_item = await onSaveProductRequestItem(
        product_item
      );

      const index = record.Items.findIndex(
        (item) => item.ItemID === product_item.ItemID
      );

      if (index === -1) {
        record.Items = [...record.Items, saved_product_request_item];
      } else {
        record.Items[index] = saved_product_request_item;
      }
    } else {
      //While adding items temporarily, we have no join operation in database
      //So, we need to select titles manually

      const product = products.find(
        (r) => r.ProductID === product_item.ProductID
      );

      if (product) {
        product_item.ProductCode = product.ProductCode;
        product_item.Title = product.Title;
        product_item.MeasureUnitTitle = product.MeasureUnits.find(
          (mu) => mu.MeasureUnitID === product_item.MeasureUnitID
        )?.MeasureUnitTitle;
      }

      product_item.StatusTitle = statuses.find(
        (sts) => sts.StatusID === product_item.StatusID
      )?.Title;

      //--- managing unique id (UID) for new items
      if (product_item.ItemID === 0 && selectedProductRequestItem === null) {
        product_item.UID = uuid();
        record.Items = [...record.Items, product_item];
      } else if (
        product_item.ItemID === 0 &&
        selectedProductRequestItem !== null
      ) {
        const index = record.Items.findIndex(
          (item) => item.UID === selectedProductRequestItem.UID
        );
        record.Items[index] = product_item;
      }

      console.log(product_item);
    }

    //------

    setRecord({ ...record });
    setSelectedProductRequestItem(null);
  };

  const handleDeleteProductRequestItem = async (item) => {
    setProgress(true);

    try {
      if (item.ItemID > 0) {
        await onDeleteProductRequestItem(item.ItemID);

        record.Items = record.Items.filter((i) => i.ItemID !== item.ItemID);
      } else {
        record.Items = record.Items.filter((i) => i.UID !== item.UID);
      }

      setRecord({ ...record });
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  const handleCloseProductRequestItemModal = () => {
    setSelectedProductRequestItem(null);
    setShowProductRequestItemModal(false);
  };

  const handleEditProductRequestItem = (data) => {
    setSelectedProductRequestItem(data);
    setShowProductRequestItemModal(true);
  };

  const handleNewItemClick = () => {
    setSelectedProductRequestItem(null);
    setShowProductRequestItemModal(true);
  };

  //------

  const handleSearchMember = async (searchText) => {
    setMemberSearchProgress(true);

    try {
      const data = await service.searchMembers(searchText);

      data.forEach((m) => {
        m.RequestMemberID = m.MemberID;
      });

      setMembers(data);
    } catch (ex) {
      handleError(ex);
    }

    setMemberSearchProgress(false);
  };

  const handleChangeFrontSideType = async (value) => {
    const rec = { ...record };
    rec.FrontSideTypeID = value || 0;
    rec.FrontSideAccountID = 0;

    setRecord(rec);

    if (value === 0) {
      setFrontSideAccounts([]);
    } else {
      const data = await handleSearchFrontSideAccount(value);
      setFrontSideAccounts(data);
    }
    loadFieldsValue(formRef, rec);
  };

  const handleSearchFrontSideAccount = async (typeID) => {
    let data = [];

    setFrontSideAccountSearchProgress(true);

    try {
      data = await service.searchFrontSideAccounts(typeID);

      setFrontSideAccounts(data);
    } catch (ex) {
      handleError(ex);
    }

    setFrontSideAccountSearchProgress(false);

    return data;
  };

  //------

  const is_disable =
    record?.Items?.length === 0 || (validateForm({ record, schema }) && true);

  const status_id =
    selectedObject === null ? record.StatusID : selectedObject.StatusID;

  const footer_config = {
    is_disable,
    progress,
    hasSaveApproveAccess,
    selectedObject,
    handleSubmit,
    handleSubmitAndApprove,
    hasRejectAccess,
    clearRecord,
    onApprove,
    onReject,
    onCancel,
  };

  //------

  const handleChangeRequestType = async (value) => {
    const rec = { ...record };
    rec.RequestTypeID = value || 0;
    rec.FromStoreID = 0;
    rec.ToStoreID = 0;

    if (value === 5) {
      schema.FromStoreID = Joi.number().min(1);
      schema.ToStoreID = Joi.number().min(1);
    } else {
      schema.FromStoreID = Joi.number();
      schema.ToStoreID = Joi.number();
    }

    setRecord(rec);
    loadFieldsValue(formRef, rec);
  };

  return (
    <>
      <ModalWindow
        isOpen={isOpen}
        isEdit={isEdit}
        inProgress={progress}
        disabled={is_disable}
        width={1250}
        footer={getFooterButtons(footer_config)}
        onCancel={onCancel}
      >
        <Form ref={formRef} name="dataForm">
          <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
            {selectedObject && (
              <Col xs={24}>
                <TextItem
                  title={Words.id}
                  value={
                    selectedObject
                      ? utils.farsiNum(selectedObject.RequestID)
                      : "-"
                  }
                  valueColor={Colors.magenta[6]}
                />
              </Col>
            )}
            {/* <Col xs={24} md={12} lg={8}>
              <DropdownItem
                title={Words.storage_center}
                dataSource={storageCenters}
                keyColumn="StorageCenterID"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col> */}
            <Col xs={24} md={12} lg={8}>
              <DropdownItem
                title={Words.request_type}
                dataSource={productRequestTypes}
                keyColumn="RequestTypeID"
                valueColumn="Title"
                formConfig={formConfig}
                onChange={handleChangeRequestType}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <DropdownItem
                title={Words.request_member}
                dataSource={members}
                keyColumn="RequestMemberID"
                valueColumn="FullName"
                formConfig={formConfig}
                loading={memberSearchProgress}
                onSearch={handleSearchMember}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <DateItem
                horizontal
                required
                title={Words.request_date}
                fieldName="RequestDate"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <DateItem
                horizontal
                required
                title={Words.need_date}
                fieldName="NeededDate"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <DropdownItem
                title={Words.front_side_type}
                dataSource={frontSideTypes}
                keyColumn="FrontSideTypeID"
                valueColumn="Title"
                formConfig={formConfig}
                onChange={handleChangeFrontSideType}
                required
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <DropdownItem
                title={Words.front_side_account}
                dataSource={frontSideAccounts}
                keyColumn="FrontSideAccountID"
                valueColumn="FrontSideAccountTitle"
                formConfig={formConfig}
                loading={frontSideAccountSearchProgress}
                onSearch={handleSearchFrontSideAccount}
                disabled={record.FrontSideTypeID === 0}
                required
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <DropdownItem
                title={Words.from_store}
                dataSource={fromStores}
                keyColumn="FromStoreID"
                valueColumn="Title"
                formConfig={formConfig}
                required={record.RequestTypeID === 5}
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <DropdownItem
                title={Words.to_store}
                dataSource={toStores}
                keyColumn="ToStoreID"
                valueColumn="Title"
                formConfig={formConfig}
                required={record.RequestTypeID === 5}
              />
            </Col>
            <Col xs={24}>
              <InputItem
                title={Words.descriptions}
                fieldName="DetailsText"
                multiline
                rows={2}
                showCount
                maxLength={512}
                formConfig={formConfig}
              />
            </Col>

            {/* ToDo: Implement base_doc_id field based on the selected base type */}
            <Col xs={24}>
              <Divider orientation="right">
                <Text style={{ fontSize: 14, color: Colors.green[6] }}>
                  {Words.product_items}
                </Text>
              </Divider>
            </Col>

            {record.Items && (
              <>
                <Col xs={24}>
                  <Form.Item>
                    <Row gutter={[0, 15]}>
                      <Col xs={24}>
                        <DetailsTable
                          records={record.Items}
                          columns={getProductRequestItemsColumns(
                            access,
                            status_id,
                            handleEditProductRequestItem,
                            handleDeleteProductRequestItem
                          )}
                          emptyDataMessage={Words.no_product_item}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </>
            )}

            {status_id === 1 && (
              <Col xs={24}>
                <Form.Item>
                  {getNewProductRequestItemButton(
                    record?.FrontSideAccountID === 0,
                    handleNewItemClick
                  )}
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </ModalWindow>

      {showProductRequestItemModal && (
        <ProductRequestItemModal
          isOpen={showProductRequestItemModal}
          selectedObject={selectedProductRequestItem}
          setParams={handleGetItemParams}
          onOk={handleSaveProductRequestItem}
          onCancel={handleCloseProductRequestItemModal}
        />
      )}
    </>
  );
};

export default ProductRequestModal;
