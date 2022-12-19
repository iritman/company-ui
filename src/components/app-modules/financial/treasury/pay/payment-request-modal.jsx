import React, { useState } from "react";
import { useMount } from "react-use";
import {
  Form,
  Row,
  Col,
  Divider,
  Typography,
  Space,
  Popconfirm,
  Button,
  Popover,
} from "antd";
import {
  PlusOutlined as AddIcon,
  DeleteOutlined as DeleteIcon,
  EditOutlined as EditIcon,
  QuestionCircleOutlined as QuestionIcon,
} from "@ant-design/icons";
import { MdInfoOutline as InfoIcon } from "react-icons/md";
import Joi from "joi-browser";
import ModalWindow from "../../../../common/modal-window";
import Words from "../../../../../resources/words";
import Colors from "./../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
  getSorter,
} from "../../../../../tools/form-manager";
import service from "../../../../../services/financial/treasury/pay/payment-requests-service";
import InputItem from "../../../../form-controls/input-item";
import DateItem from "../../../../form-controls/date-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import DetailsTable from "../../../../common/details-table";
import PriceViewer from "../../../../common/price-viewer";
import PaymentRequestItemModal from "./payment-request-item-modal";
import { v4 as uuid } from "uuid";

const { Text } = Typography;

const schema = {
  RequestID: Joi.number().required().label(Words.id),
  CostCenterID: Joi.number().min(1).required().label(Words.cost_center),
  CurrencyID: Joi.number().min(1).required().label(Words.currency),
  PayTypeID: Joi.number().min(1).required().label(Words.pay_type),
  FrontSideAccountID: Joi.number()
    .min(1)
    .required()
    .label(Words.front_side_account),
  RequestDate: Joi.string().required().label(Words.request_date),
  StandardDetailsID: Joi.number().label(Words.standard_description),
  DetailsText: Joi.string()
    .min(5)
    .max(250)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.standard_description),
  StatusID: Joi.number(),
  Items: Joi.array(),
};

const initRecord = {
  RequestID: 0,
  CostCenterID: 0,
  CurrencyID: 0,
  PayTypeID: 0,
  FrontSideAccountID: 0,
  RequestDate: "",
  StandardDetailsID: 0,
  DetailsText: "",
  StatusID: 1,
  Items: [],
};

const getPaymentRequestItemsColumns = (access, statusID, onEdit, onDelete) => {
  let columns = [
    {
      title: Words.id,
      width: 75,
      align: "center",
      dataIndex: "ItemID",
      sorter: getSorter("ItemID"),
      render: (ItemID) => (
        <Text>{ItemID > 0 ? utils.farsiNum(`${ItemID}`) : ""}</Text>
      ),
    },
    {
      title: Words.receive_type,
      width: 120,
      align: "center",
      dataIndex: "ItemTypeTitle",
      sorter: getSorter("ItemTypeTitle"),
      render: (ItemTypeTitle) => (
        <Text style={{ color: Colors.magenta[6] }}> {ItemTypeTitle}</Text>
      ),
    },
    {
      title: Words.price,
      width: 150,
      align: "center",
      dataIndex: "Price",
      sorter: getSorter("Price"),
      render: (Price) => (
        <Text style={{ color: Colors.cyan[6] }}>
          {utils.farsiNum(utils.moneyNumber(Price))}
        </Text>
      ),
    },
    {
      title: Words.payment_date,
      width: 100,
      align: "center",
      dataIndex: "PaymentDate",
      sorter: getSorter("PaymentDate"),
      render: (PaymentDate) => (
        <Text
          style={{
            color: Colors.orange[6],
          }}
        >
          {utils.farsiNum(utils.slashDate(PaymentDate))}
        </Text>
      ),
    },
    {
      title: Words.due_date,
      width: 100,
      align: "center",
      dataIndex: "DueDate",
      sorter: getSorter("DueDate"),
      render: (DueDate) => (
        <Text
          style={{
            color: Colors.orange[6],
          }}
        >
          {utils.farsiNum(utils.slashDate(DueDate))}
        </Text>
      ),
    },
    {
      title: Words.standard_description,
      width: 100,
      align: "center",
      render: (record) => (
        <>
          {record.StandardDetailsID > 0 && (
            <Popover
              content={
                <Text>{`${record.StandardDetailsText}${
                  record.DetailsText.length > 0 ? `\r\n` : ""
                }${record.DetailsText}`}</Text>
              }
            >
              <InfoIcon
                style={{
                  color: Colors.green[6],
                  fontSize: 19,
                  cursor: "pointer",
                }}
              />
            </Popover>
          )}
        </>
      ),
    },
  ];

  // StatusID : 1 => Not Approve, Not Reject! Just Save...
  if (
    statusID === 1 &&
    ((access.CanDelete && onDelete) || (access.CanEdit && onEdit))
  ) {
    columns = [
      ...columns,
      {
        title: "",
        fixed: "right",
        align: "center",
        width: 75,
        render: (record) => (
          <Space>
            {access.CanDelete && onDelete && (
              <Popconfirm
                title={Words.questions.sure_to_delete_selected_item}
                onConfirm={async () => await onDelete(record)}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
              >
                <Button type="link" icon={<DeleteIcon />} danger />
              </Popconfirm>
            )}

            {access.CanEdit && onEdit && (
              <Button
                type="link"
                icon={<EditIcon />}
                onClick={() => onEdit(record)}
              />
            )}
          </Space>
        ),
      },
    ];
  }

  return columns;
};

const formRef = React.createRef();

const PaymentRequestModal = ({
  access,
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  onSavePaymentRequestItem,
  onDeletePaymentRequestItem,
  onReject,
  onApprove,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [frontSideAccountSearchProgress, setFrontSideAccountSearchProgress] =
    useState(false);
  const [frontSideAccounts, setFrontSideAccounts] = useState([]);
  const [costCenters, setCostCenters] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [standardDetails, setStandardDetails] = useState([]);
  const [payTypes, setPayTypes] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [hasSaveApproveAccess, setHasSaveApproveAccess] = useState(false);
  const [hasRejectAccess, setHasRejectAccess] = useState(false);

  const [selectedPaymentRequestItem, setSelectedPaymentRequestItem] =
    useState(null);
  const [showPaymentRequestItemModal, setShowPaymentRequestItemModal] =
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
    record.CostCenterID = 0;
    record.CurrencyID = 0;
    record.PayTypeID = 0;
    record.FrontSideAccountID = 0;
    record.RequestDate = "";
    record.StandardDetailsID = 0;
    record.DetailsText = "";
    record.StatusID = 1;
    record.Items = [];

    setRecord(record);
    setErrors({});
    setFrontSideAccounts([]);
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord({ ...initRecord });
    loadFieldsValue(formRef, { ...initRecord });
    initModal(formRef, selectedObject, setRecord);

    //------

    setProgress(true);

    try {
      const data = await service.getParams();

      let {
        CostCenters,
        Currencies,
        PayTypes,
        StandardDetails,
        ItemTypes,
        HasSaveApproveAccess,
        HasRejectAccess,
      } = data;

      setCostCenters(CostCenters);
      setCurrencies(Currencies);
      setPayTypes(PayTypes);
      setStandardDetails(StandardDetails);
      setItemTypes(ItemTypes);
      setHasSaveApproveAccess(HasSaveApproveAccess);
      setHasRejectAccess(HasRejectAccess);

      if (selectedObject) {
        const {
          FrontSideAccountID,
          AccountNo,
          MemberID,
          FirstName,
          LastName,
          CompanyTitle,
        } = selectedObject;

        let account_title = `${
          MemberID > 0 ? `${FirstName} ${LastName}` : CompanyTitle
        }  - ${AccountNo}`;

        setFrontSideAccounts([{ FrontSideAccountID, Title: account_title }]);
      }
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  });

  const isEdit = selectedObject !== null;

  const handleChangeFrontSideAccount = (value) => {
    const rec = { ...record };
    rec.FrontSideAccountID = value || 0;
    setRecord(rec);
  };

  const handleSearchFrontSideAccount = async (searchText) => {
    setFrontSideAccountSearchProgress(true);

    try {
      const data = await service.searchFronSideAccounts(searchText);

      setFrontSideAccounts(data);
    } catch (ex) {
      handleError(ex);
    }

    setFrontSideAccountSearchProgress(false);
  };

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

  const handleSavePaymentRequestItem = async (payment_item) => {
    if (selectedObject !== null) {
      payment_item.RequestID = selectedObject.RequestID;

      const saved_payment_request_item = await onSavePaymentRequestItem(
        payment_item
      );

      const index = record.Items.findIndex(
        (item) => item.ItemID === payment_item.ItemID
      );

      if (index === -1) {
        record.Items = [...record.Items, saved_payment_request_item];
      } else {
        record.Items[index] = saved_payment_request_item;
      }
    } else {
      //While adding items temporarily, we have no jpin operation in database
      //So, we need to select titles manually
      payment_item.ItemTypeTitle = itemTypes.find(
        (it) => it.ItemTypeID === payment_item.ItemTypeID
      )?.Title;
      payment_item.StandardDetailsText = standardDetails.find(
        (si) => si.StandardDetailsID === payment_item.StandardDetailsID
      )?.StandardDetailsText;

      //--- managing unique id (UID) for new items
      if (payment_item.ItemID === 0 && selectedPaymentRequestItem === null) {
        payment_item.UID = uuid();
        record.Items = [...record.Items, payment_item];
      } else if (
        payment_item.ItemID === 0 &&
        selectedPaymentRequestItem !== null
      ) {
        const index = record.Items.findIndex(
          (item) => item.UID === selectedPaymentRequestItem.UID
        );
        record.Items[index] = payment_item;
      }
    }

    //------

    setRecord({ ...record });
    setSelectedPaymentRequestItem(null);
  };

  const handleDeletePaymentRequestItem = async (item) => {
    setProgress(true);

    try {
      if (item.ItemID > 0) {
        await onDeletePaymentRequestItem(item.ItemID);

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

  const handleClosePaymentRequestItemModal = () => {
    setSelectedPaymentRequestItem(null);
    setShowPaymentRequestItemModal(false);
  };

  const handleEditPaymentRequestItem = (data) => {
    setSelectedPaymentRequestItem(data);
    setShowPaymentRequestItemModal(true);
  };

  const getNewPaymentRequestItemButton = () => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setSelectedPaymentRequestItem(null);
          setShowPaymentRequestItemModal(true);
        }}
        icon={<AddIcon />}
      >
        {Words.new}
      </Button>
    );
  };

  //------

  const getFooterButtons = (is_disable) => {
    return (
      <Space>
        {selectedObject === null && (
          <>
            <Button
              key="submit-button"
              type="primary"
              onClick={handleSubmit}
              loading={progress}
              disabled={is_disable}
            >
              {Words.submit}
            </Button>

            {hasSaveApproveAccess && (
              <Popconfirm
                title={Words.questions.sure_to_submit_approve_request}
                onConfirm={handleSubmitAndApprove}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
                key="submit-approve-button"
                disabled={is_disable || progress}
              >
                <Button
                  key="submit-approve-button"
                  type="primary"
                  disabled={is_disable || progress}
                >
                  {Words.submit_and_approve}
                </Button>
              </Popconfirm>
            )}

            <Button key="clear-button" onClick={clearRecord}>
              {Words.clear}
            </Button>
          </>
        )}

        {selectedObject !== null && selectedObject.StatusID === 1 && (
          <>
            {hasSaveApproveAccess && (
              <Popconfirm
                title={Words.questions.sure_to_submit_approve_request}
                onConfirm={onApprove}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
                key="submit-approve-button"
                disabled={is_disable || progress}
              >
                <Button
                  key="submit-approve-button"
                  type="primary"
                  disabled={is_disable || progress}
                >
                  {Words.submit_and_approve}
                </Button>
              </Popconfirm>
            )}

            {hasRejectAccess && (
              <Popconfirm
                title={Words.questions.sure_to_reject_request}
                onConfirm={onReject}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
                key="reject-confirm"
                disabled={progress}
              >
                <Button key="reject-button" type="primary" danger>
                  {Words.reject_request}
                </Button>
              </Popconfirm>
            )}
          </>
        )}

        <Button key="close-button" onClick={onCancel}>
          {Words.close}
        </Button>
      </Space>
    );
  };

  const calculateTotalPrice = () => {
    let sum = 0;

    record?.Items?.forEach((item) => {
      sum += item.Price;
    });

    return sum;
  };

  //------

  const is_disable =
    record?.Items?.length === 0 || (validateForm({ record, schema }) && true);

  const status_id =
    selectedObject === null ? record.StatusID : selectedObject.StatusID;

  return (
    <>
      <ModalWindow
        isOpen={isOpen}
        isEdit={isEdit}
        inProgress={progress}
        disabled={is_disable}
        width={1050}
        footer={getFooterButtons(is_disable)}
        onCancel={onCancel}
      >
        <Form ref={formRef} name="dataForm">
          <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.cost_center}
                dataSource={costCenters}
                keyColumn="CostCenterID"
                valueColumn="Title"
                formConfig={formConfig}
                required
                autoFocus
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.currencies}
                dataSource={currencies}
                keyColumn="CurrencyID"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.pay_type}
                dataSource={payTypes}
                keyColumn="PayTypeID"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.front_side_account}
                dataSource={frontSideAccounts}
                keyColumn="FrontSideAccountID"
                valueColumn="Title"
                formConfig={formConfig}
                required
                loading={frontSideAccountSearchProgress}
                onSearch={handleSearchFrontSideAccount}
                onChange={handleChangeFrontSideAccount}
              />
            </Col>
            <Col xs={24} md={12}>
              <DateItem
                horizontal
                required
                title={Words.request_date}
                fieldName="RequestDate"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.standard_details_text}
                dataSource={standardDetails}
                keyColumn="StandardDetailsID"
                valueColumn="StandardDetailsText"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24}>
              <InputItem
                title={Words.standard_description}
                fieldName="DetailsText"
                multiline
                rows={2}
                showCount
                maxLength={250}
                formConfig={formConfig}
              />
            </Col>
            {/* <Col xs={24}>
              <Divider orientation="right">
                <Text style={{ fontSize: 14, color: Colors.green[6] }}>
                  {Words.base_specifications}
                </Text>
              </Divider>
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.receive_base}
                dataSource={baseTypes}
                keyColumn="BaseTypeID"
                valueColumn="Title"
                formConfig={formConfig}
              />
            </Col> */}

            {/* ToDo: Implement base_doc_id field based on the selected base type */}
            <Col xs={24}>
              <Divider orientation="right">
                <Text style={{ fontSize: 14, color: Colors.green[6] }}>
                  {Words.payment_items}
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
                          columns={getPaymentRequestItemsColumns(
                            access,
                            status_id,
                            handleEditPaymentRequestItem,
                            handleDeletePaymentRequestItem
                          )}
                          emptyDataMessage={Words.no_payment_item}
                        />
                      </Col>
                      <Col xs={24}>
                        <PriceViewer price={calculateTotalPrice()} />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </>
            )}

            {status_id === 1 && (
              <Col xs={24}>
                <Form.Item>{getNewPaymentRequestItemButton()}</Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </ModalWindow>

      {showPaymentRequestItemModal && (
        <PaymentRequestItemModal
          isOpen={showPaymentRequestItemModal}
          selectedObject={selectedPaymentRequestItem}
          onOk={handleSavePaymentRequestItem}
          onCancel={handleClosePaymentRequestItemModal}
        />
      )}
    </>
  );
};

export default PaymentRequestModal;
