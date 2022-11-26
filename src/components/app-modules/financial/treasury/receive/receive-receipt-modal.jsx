import React, { useState } from "react";
import { useMount } from "react-use";
import {
  Form,
  Row,
  Col,
  Typography,
  Space,
  Popconfirm,
  Button,
  Popover,
  Tabs,
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
import service from "../../../../../services/financial/treasury/receive/receive-receipts-service";
import DateItem from "../../../../form-controls/date-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import DetailsTable from "../../../../common/details-table";
import ChequeModal from "./receive-receipt-cheque-modal";
import { v4 as uuid } from "uuid";

const { Text } = Typography;
const { TabPane } = Tabs;

const schema = {
  ReceiveID: Joi.number().required().label(Words.id),
  ReceiveTypeID: Joi.number()
    .min(1)
    .required()
    .label(Words.receipt_receive_type),
  DeliveryMemberID: Joi.number().label(Words.delivery_member),
  DeliveryMember: Joi.string()
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.delivery_member),
  ReceiveDate: Joi.string().required().label(Words.receive_date),
  RegardID: Joi.number().label(Words.regards),
  CashBoxID: Joi.number().label(Words.cash_box),
  StandardDetailsID: Joi.number().label(Words.standard_description),
  StatusID: Joi.number(),
  Cheques: Joi.array(),
};

const initRecord = {
  ReceiveID: 0,
  ReceiveTypeID: 0,
  DeliveryMemberID: 0,
  DeliveryMember: "",
  ReceiveDate: "",
  RegardID: 0,
  CashBoxID: 0,
  StandardDetailsID: 0,
  StatusID: 1,
  Cheques: [],
};

const getChequeColumns = (access, statusID, onEdit, onDelete) => {
  let columns = [
    {
      title: Words.id,
      width: 75,
      align: "center",
      dataIndex: "ChequeID",
      sorter: getSorter("ChequeID"),
      render: (ChequeID) => (
        <Text>{ChequeID > 0 ? utils.farsiNum(`${ChequeID}`) : ""}</Text>
      ),
    },
    {
      title: Words.front_side,
      width: 200,
      align: "center",
      // dataIndex: "Title",
      sorter: getSorter("LastName"),
      render: (record) => (
        <Text style={{ color: Colors.cyan[6] }}>
          {utils.farsiNum(
            record.MemberID > 0
              ? `${record.FirstName} ${record.LastName} - ${record.AccountNo}`
              : `${record.CompanyTitle} - ${record.AccountNo}`
          )}
        </Text>
      ),
    },
    {
      title: Words.financial_operation,
      width: 150,
      align: "center",
      //   dataIndex: "Price",
      sorter: getSorter("OperationTitle"),
      render: (record) => (
        <Text style={{ color: Colors.blue[6] }}>
          {utils.farsiNum(`${record.OperationID} - ${record.OperationTitle}`)}
        </Text>
      ),
    },
    {
      title: Words.nature,
      width: 100,
      align: "center",
      dataIndex: "PaperNatureTitle",
      sorter: getSorter("PaperNatureTitle"),
      render: (PaperNatureTitle) => (
        <Text style={{ color: Colors.orange[6] }}>{PaperNatureTitle}</Text>
      ),
    },
    {
      title: Words.duration,
      width: 100,
      align: "center",
      dataIndex: "DurationTypeTitle",
      sorter: getSorter("DurationTypeTitle"),
      render: (DurationTypeTitle) => (
        <Text style={{ color: Colors.gold[6] }}>{DurationTypeTitle}</Text>
      ),
    },
    {
      title: Words.cash_flow,
      width: 100,
      align: "center",
      dataIndex: "CashFlowTitle",
      sorter: getSorter("CashFlowTitle"),
      render: (CashFlowTitle) => (
        <Text style={{ color: Colors.purple[6] }}>{CashFlowTitle}</Text>
      ),
    },
    {
      title: Words.account_no,
      width: 100,
      align: "center",
      dataIndex: "AccountNo",
      sorter: getSorter("AccountNo"),
      render: (AccountNo) => (
        <Text style={{ color: Colors.grey[6] }}>{AccountNo}</Text>
      ),
    },
    {
      title: Words.bank,
      width: 100,
      align: "center",
      dataIndex: "BankTitle",
      sorter: getSorter("BankTitle"),
      render: (BankTitle) => (
        <Text style={{ color: Colors.grey[6] }}>{BankTitle}</Text>
      ),
    },
    {
      title: Words.city,
      width: 100,
      align: "center",
      dataIndex: "CityTitle",
      sorter: getSorter("CityTitle"),
      render: (CityTitle) => (
        <Text style={{ color: Colors.grey[6] }}>{CityTitle}</Text>
      ),
    },
    {
      title: Words.bank_branch,
      width: 100,
      align: "center",
      dataIndex: "BranchName",
      sorter: getSorter("BranchName"),
      render: (BranchName) => (
        <Text style={{ color: Colors.grey[6] }}>{BranchName}</Text>
      ),
    },
    {
      title: Words.branch_code,
      width: 100,
      align: "center",
      dataIndex: "BranchCode",
      sorter: getSorter("BranchCode"),
      render: (BranchCode) => (
        <Text style={{ color: Colors.grey[6] }}>{BranchCode}</Text>
      ),
    },
    {
      title: Words.cheque_no,
      width: 150,
      align: "center",
      dataIndex: "ChequeNo",
      sorter: getSorter("ChequeNo"),
      render: (ChequeNo) => (
        <Text style={{ color: Colors.grey[6] }}>{ChequeNo}</Text>
      ),
    },
    {
      title: Words.cheque_series,
      width: 150,
      align: "center",
      dataIndex: "ChequeSeries",
      sorter: getSorter("ChequeSeries"),
      render: (ChequeSeries) => (
        <Text style={{ color: Colors.grey[6] }}>{ChequeSeries}</Text>
      ),
    },
    {
      title: Words.sheba_no,
      width: 200,
      align: "center",
      dataIndex: "ShebaID",
      sorter: getSorter("ShebaID"),
      render: (ShebaID) => (
        <Text style={{ color: Colors.grey[6] }}>{ShebaID}</Text>
      ),
    },
    {
      title: Words.sayad_no,
      width: 200,
      align: "center",
      dataIndex: "SayadNo",
      sorter: getSorter("SayadNo"),
      render: (SayadNo) => (
        <Text style={{ color: Colors.grey[6] }}>{SayadNo}</Text>
      ),
    },
    {
      title: Words.currency,
      width: 200,
      align: "center",
      dataIndex: "CurrencyTitle",
      sorter: getSorter("CurrencyTitle"),
      render: (CurrencyTitle) => (
        <Text style={{ color: Colors.grey[6] }}>{CurrencyTitle}</Text>
      ),
    },
    {
      title: Words.price,
      width: 200,
      align: "center",
      dataIndex: "Amount",
      sorter: getSorter("Amount"),
      render: (Amount) => (
        <Text style={{ color: Colors.green[6] }}>
          {utils.farsiNum(utils.moneyNumber(Amount))}
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
            color: Colors.geekblue[6],
          }}
        >
          {utils.farsiNum(utils.slashDate(DueDate))}
        </Text>
      ),
    },
    {
      title: Words.agreed_date,
      width: 100,
      align: "center",
      dataIndex: "AgreedDate",
      sorter: getSorter("AgreedDate"),
      render: (AgreedDate) => (
        <Text
          style={{
            color: Colors.blue[6],
          }}
        >
          {utils.farsiNum(utils.slashDate(AgreedDate))}
        </Text>
      ),
    },
    {
      title: Words.standard_description,
      width: 150,
      align: "center",
      render: (record) => (
        <>
          {record.StandardDetailsID > 0 && (
            <Popover content={<Text>{record.DetailsText}</Text>}>
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

const ReceiveReceiptModal = ({
  access,
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  onSaveReceiveRequestItem,
  onDeleteReceiveRequestItem,
  onReject,
  onApprove,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [receiveTypes, setReceiveTypes] = useState([]);
  const [deliveryMemberSearchProgress, setDeliveryMemberSearchProgress] =
    useState(false);
  const [deliveryMembers, setDeliveryMembers] = useState([]);
  const [cashBoxes, setCashBoxes] = useState([]);
  const [regards, setRegards] = useState([]);
  const [standardDetails, setStandardDetails] = useState([]);
  const [hasSaveApproveAccess, setHasSaveApproveAccess] = useState(false);
  const [hasRejectAccess, setHasRejectAccess] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showChequeModal, setShowChequeModal] = useState(false);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.ReceiveTypeID = 0;
    record.DeliveryMemberID = 0;
    record.DeliveryMember = "";
    record.ReceiveDate = "";
    record.RegardID = 0;
    record.CashBoxID = 0;
    record.StandardDetailsID = 0;
    record.StatusID = 1;
    record.Cheques = [];

    setRecord(record);
    setErrors({});
    setDeliveryMembers([]);
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
        ReceiveTypes,
        CashBoxes,
        Regards,
        StandardDetails,
        HasSaveApproveAccess,
        HasRejectAccess,
      } = data;

      setReceiveTypes(ReceiveTypes);
      setCashBoxes(CashBoxes);
      setRegards(Regards);
      setStandardDetails(StandardDetails);
      setHasSaveApproveAccess(HasSaveApproveAccess);
      setHasRejectAccess(HasRejectAccess);

      if (selectedObject && selectedObject.ChequeID) {
        const { DeliveryMemberID, FullName } = selectedObject;

        setDeliveryMembers([{ DeliveryMemberID, FullName }]);
      }
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  });

  const isEdit = selectedObject !== null;

  //   const handleChangeDeliveryMember = (value) => {
  //     const rec = { ...record };
  //     rec.DeliveryMemberID = value || 0;
  //     setRecord(rec);
  //   };

  const handleSearchDeliveryMember = async (searchText) => {
    setDeliveryMemberSearchProgress(true);

    try {
      const data = await service.searchDeliveryMembers(searchText);

      setDeliveryMembers(data);
    } catch (ex) {
      handleError(ex);
    }

    setDeliveryMemberSearchProgress(false);
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

  const handleSaveCheque = async (receive_item) => {
    if (selectedObject !== null) {
      receive_item.RequestID = selectedObject.RequestID;

      const saved_receive_request_item = await onSaveReceiveRequestItem(
        receive_item
      );

      const index = record.Items.findIndex(
        (item) => item.ItemID === receive_item.ItemID
      );

      if (index === -1) {
        record.Items = [...record.Items, saved_receive_request_item];
      } else {
        record.Items[index] = saved_receive_request_item;
      }
    } else {
      //While adding items temporarily, we have no jpin operation in database
      //So, we need to select titles manually
      receive_item.ReceiveTypeTitle = receiveTypes.find(
        (rt) => rt.ReceiveTypeID === receive_item.ReceiveTypeID
      )?.Title;
      receive_item.DetailsText = standardDetails.find(
        (si) => si.StandardDetailsID === receive_item.StandardDetailsID
      )?.DetailsText;

      //--- managing unique id (UID) for new items
      if (receive_item.ItemID === 0 && selectedItem === null) {
        receive_item.UID = uuid();
        record.Items = [...record.Items, receive_item];
      } else if (receive_item.ItemID === 0 && selectedItem !== null) {
        const index = record.Items.findIndex(
          (item) => item.UID === selectedItem.UID
        );
        record.Items[index] = receive_item;
      }
    }

    //------

    setRecord({ ...record });
    setSelectedItem(null);
  };

  const HandleDeleteCheque = async (item) => {
    setProgress(true);

    try {
      if (item.ItemID > 0) {
        await onDeleteReceiveRequestItem(item.ItemID);

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

  const handleCloseChequeModal = () => {
    setSelectedItem(null);
    setShowChequeModal(false);
  };

  const handleEditCheque = (data) => {
    setSelectedItem(data);
    setShowChequeModal(true);
  };

  const getNewButton = () => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setSelectedItem(null);
          setShowChequeModal(true);
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
                title={Words.questions.sure_to_submit_approve_receive_receipt}
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
                title={Words.questions.sure_to_submit_approve_receive_receipt}
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
                title={Words.receipt_receive_type}
                dataSource={receiveTypes}
                keyColumn="ReceiveTypeID"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DateItem
                horizontal
                required
                title={Words.receive_date}
                fieldName="ReceiveDate"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.delivery_member}
                dataSource={deliveryMembers}
                keyColumn="DeliveryMemberID"
                valueColumn="FullName"
                formConfig={formConfig}
                required
                autoFocus
                loading={deliveryMemberSearchProgress}
                onSearch={handleSearchDeliveryMember}
                // onChange={handleChangeDeliveryMember}
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.regards}
                dataSource={regards}
                keyColumn="RegardID"
                valueColumn="Title"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.cash_box}
                dataSource={cashBoxes}
                keyColumn="CashBoxID"
                valueColumn="Title"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.standard_description}
                dataSource={standardDetails}
                keyColumn="StandardDetailsID"
                valueColumn="DetailsText"
                formConfig={formConfig}
              />
            </Col>

            {/* ToDo: Implement base_doc_id field based on the selected base type */}

            <Col xs={24}>
              <Form.Item>
                <Tabs type="card" defaultActiveKey="1">
                  <TabPane tab={Words.cheque} key="cheque">
                    <DetailsTable
                      records={record.Cheques}
                      columns={getChequeColumns(
                        access,
                        status_id,
                        handleEditCheque,
                        HandleDeleteCheque
                      )}
                    />
                  </TabPane>
                  <TabPane tab={Words.demand} key="demand"></TabPane>
                  <TabPane tab={Words.cash} key="cash"></TabPane>
                  <TabPane
                    tab={Words.payment_notice}
                    key="payment-notice"
                  ></TabPane>
                  <TabPane
                    tab={Words.return_from_other}
                    key="return-from-other"
                  ></TabPane>
                  <TabPane
                    tab={Words.return_payable_cheque}
                    key="return-payable-cheque"
                  ></TabPane>
                  <TabPane
                    tab={Words.return_payable_demand}
                    key="return-payable-demand"
                  ></TabPane>
                </Tabs>
              </Form.Item>
            </Col>

            {status_id === 1 && (
              <Col xs={24}>
                <Form.Item>{getNewButton()}</Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </ModalWindow>

      {showChequeModal && (
        <ChequeModal
          isOpen={showChequeModal}
          selectedObject={selectedItem}
          onOk={handleSaveCheque}
          onCancel={handleCloseChequeModal}
        />
      )}
    </>
  );
};

export default ReceiveReceiptModal;
