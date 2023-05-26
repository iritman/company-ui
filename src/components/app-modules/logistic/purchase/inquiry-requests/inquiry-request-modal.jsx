import React, { useState } from "react";
import { useMount } from "react-use";
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
import service from "../../../../../services/logistic/purchase/inquiry-requests-service";
import InputItem from "../../../../form-controls/input-item";
import DateItem from "../../../../form-controls/date-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import TextItem from "../../../../form-controls/text-item";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import DetailsTable from "../../../../common/details-table";
import InquiryRequestItemModal from "./inquiry-request-item-modal";
import {
  schema,
  initRecord,
  getPurchaseRequestItemsColumns,
  getServiceRequestItemsColumns,
  getNewInquiryRequestItemButton,
  getFooterButtons,
} from "./inquiry-request-modal-code";

const { Text } = Typography;

const formRef = React.createRef();

const InquiryRequestModal = ({
  access,
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  onSaveInquiryRequestItem,
  onDeleteInquiryRequestItem,
  onReject,
  onApprove,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [requestTypeProgress, setRequestTypeProgress] = useState(false);
  const [requestTypes, setRequestTypes] = useState([]);
  const [hasSaveApproveAccess, setHasSaveApproveAccess] = useState(false);
  const [hasRejectAccess, setHasRejectAccess] = useState(false);

  const [requests, setRequests] = useState([]);

  const [selectedInquiryRequestItem, setSelectedInquiryRequestItem] =
    useState(null);
  const [showInquiryRequestItemModal, setShowInquiryRequestItemModal] =
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
    record.RequestTypeID = 0;
    record.BaseID = 0;
    record.InquiryDeadline = "";
    record.RequestDate = "";
    record.DetailsText = "";
    record.StatusID = 1;
    record.Items = [];

    setRequests([]);

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);

    //------

    setProgress(true);

    try {
      const data = await service.getParams();

      let { RequestTypes, HasSaveApproveAccess, HasRejectAccess } = data;

      setRequestTypes(RequestTypes);
      setHasSaveApproveAccess(HasSaveApproveAccess);
      setHasRejectAccess(HasRejectAccess);

      //------

      if (selectedObject) {
        const { RequestTypeID, BaseID } = selectedObject;

        const request =
          RequestTypeID === 1
            ? await service.getRegedPurchaseRequestByID(BaseID)
            : await service.getRegedServiceRequestByID(BaseID);

        selectedObject.Items.forEach((i) => {
          i.FrontSideAccountTitle = request.FrontSideAccountTitle;
          i.RequestDate = request.RequestDate;
        });

        setRequests([request]);
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
    record.StatusID = 2;
    setRecord({ ...record });

    saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  //------

  const handleSaveInquiryRequestItem = async (inquiry_item) => {
    if (selectedObject !== null) {
      inquiry_item.RequestID = selectedObject.RequestID;

      const saved_inquiry_request_item = await onSaveInquiryRequestItem(
        inquiry_item
      );

      const index = record.Items.findIndex(
        (item) => item.ItemID === inquiry_item.ItemID
      );

      if (index === -1) {
        record.Items = [...record.Items, saved_inquiry_request_item];
      } else {
        record.Items[index] = saved_inquiry_request_item;
      }
    } else {
      //While adding items temporarily, we have no jpin operation in database
      //So, we need to select titles manually
      const selectedRequest = getSelectedRequest();
      const { FrontSideAccountTitle, RequestDate } = selectedRequest;
      inquiry_item = {
        ...inquiry_item,
        FrontSideAccountTitle,
        RequestDate,
      };

      const selectedItem = getSelectedRequest()?.Items?.find(
        (i) => i.ItemID === inquiry_item.RefItemID
      );

      if (record.RequestTypeID === 1) {
        //-- [purchase]
        const {
          ProductTitle,
          ProductCode,
          MeasureUnitTitle,
          AgentFirstName,
          AgentLastName,
          NeedDate,
          InquiryDeadline,
          SupplierTitle,
        } = selectedItem;
        inquiry_item = {
          ...inquiry_item,
          ProductTitle,
          ProductCode,
          MeasureUnitTitle,
          AgentFirstName,
          AgentLastName,
          NeedDate,
          InquiryDeadline,
          SupplierTitle,
        };
      } else {
        //-- [service]
        const {
          ServiceTitle,
          MeasureUnitTitle,
          AgentFirstName,
          AgentLastName,
          NeedDate,
          InquiryDeadline,
          SupplierTitle,
        } = selectedItem;

        inquiry_item = {
          ...inquiry_item,
          ServiceTitle,
          MeasureUnitTitle,
          AgentFirstName,
          AgentLastName,
          NeedDate,
          InquiryDeadline,
          SupplierTitle,
        };
      }
      //--- managing unique id (UID) for new items
      if (inquiry_item.ItemID === 0 && selectedInquiryRequestItem === null) {
        inquiry_item.UID = uuid();
        record.Items = [...record.Items, inquiry_item];
      } else if (
        inquiry_item.ItemID === 0 &&
        selectedInquiryRequestItem !== null
      ) {
        const index = record.Items.findIndex(
          (item) => item.UID === selectedInquiryRequestItem.UID
        );
        record.Items[index] = inquiry_item;
      }
    }

    //------

    setRecord({ ...record });
    setSelectedInquiryRequestItem(null);
  };

  const handleDeleteInquiryRequestItem = async (item) => {
    setProgress(true);

    try {
      if (item.ItemID > 0) {
        await onDeleteInquiryRequestItem(item.ItemID);

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

  const handleCloseInquiryRequestItemModal = () => {
    setSelectedInquiryRequestItem(null);
    setShowInquiryRequestItemModal(false);
  };

  const handleEditInquiryRequestItem = (data) => {
    setSelectedInquiryRequestItem(data);
    setShowInquiryRequestItemModal(true);
  };

  const handleNewItemClick = () => {
    setSelectedInquiryRequestItem(null);
    setShowInquiryRequestItemModal(true);
  };

  //------

  const handleChangeRequestTypes = async (value) => {
    const rec = { ...record };
    rec.RequestTypeID = value || 0;
    rec.BaseID = 0;

    setRecord(rec);
    loadFieldsValue(formRef, rec);

    //------

    if (value > 0) {
      setRequestTypeProgress(true);

      try {
        const data =
          value === 1
            ? await service.getRegedPurchaseRequests()
            : await service.getRegedServiceRequests();

        setRequests(data);
      } catch (ex) {
        handleError(ex);
      }

      setRequestTypeProgress(false);
    } else {
      setRequests([]);
    }
  };

  const getSelectedRequest = () => {
    let request = null;

    request = requests.find((r) => r.BaseID === record.BaseID);

    if (!request) request = null;
    else {
      request.InquiryRequestTypeID = record.RequestTypeID;
    }

    return request;
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

  return (
    <>
      <ModalWindow
        isOpen={isOpen}
        isEdit={isEdit}
        inProgress={progress}
        disabled={is_disable}
        width={1050}
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
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.request_type}
                dataSource={requestTypes}
                keyColumn="RequestTypeID"
                valueColumn="Title"
                formConfig={formConfig}
                loading={requestTypeProgress}
                onChange={handleChangeRequestTypes}
                disabled={record?.Items?.length > 0}
                autoFocus
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.request}
                dataSource={requests}
                keyColumn="BaseID"
                valueColumn="RequestInfo"
                formConfig={formConfig}
                disabled={record?.Items?.length > 0}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DateItem
                horizontal
                required
                title={Words.inquiry_final_deadline}
                fieldName="InquiryDeadline"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12}>
              <DateItem
                horizontal
                required
                title={Words.inquiry_date}
                fieldName="RequestDate"
                formConfig={formConfig}
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
                  {Words.inquiry_items}
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
                          columns={
                            record.RequestTypeID === 1
                              ? getPurchaseRequestItemsColumns(
                                  access,
                                  status_id,
                                  handleEditInquiryRequestItem,
                                  handleDeleteInquiryRequestItem
                                )
                              : getServiceRequestItemsColumns(
                                  access,
                                  status_id,
                                  handleEditInquiryRequestItem,
                                  handleDeleteInquiryRequestItem
                                )
                          }
                          emptyDataMessage={Words.no_inquiry_item}
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
                  {getNewInquiryRequestItemButton(
                    record?.BaseID === 0,
                    handleNewItemClick
                  )}
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </ModalWindow>

      {showInquiryRequestItemModal && (
        <InquiryRequestItemModal
          isOpen={showInquiryRequestItemModal}
          selectedObject={selectedInquiryRequestItem}
          selectedBaseRequest={getSelectedRequest()}
          onOk={handleSaveInquiryRequestItem}
          onCancel={handleCloseInquiryRequestItemModal}
        />
      )}
    </>
  );
};

export default InquiryRequestModal;
