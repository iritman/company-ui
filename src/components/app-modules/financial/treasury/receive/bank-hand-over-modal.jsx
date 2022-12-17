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
  Tabs,
} from "antd";
import {
  PlusOutlined as AddIcon,
  DeleteOutlined as DeleteIcon,
  EditOutlined as EditIcon,
  QuestionCircleOutlined as QuestionIcon,
} from "@ant-design/icons";
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
import service from "../../../../../services/financial/treasury/receive/bank-hand-overs-service";
import DateItem from "../../../../form-controls/date-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import TextItem from "./../../../../form-controls/text-item";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import DetailsTable from "../../../../common/details-table";
import ChequeModal from "./bank-hand-over-cheque-modal";
import DemandModal from "./bank-hand-over-demand-modal";
import { v4 as uuid } from "uuid";
import PriceViewer from "./../../../../common/price-viewer";

const { Text } = Typography;
const { TabPane } = Tabs;

const schema = {
  HandOverID: Joi.number().required().label(Words.id),
  CompanyBankAccountID: Joi.number()
    .min(1)
    .required()
    .label(Words.bank_account),
  CurrencyID: Joi.number().min(1).required().label(Words.currency),
  ItemType: Joi.number().min(1).required().label(Words.item_type),
  HandOverDate: Joi.string().required().label(Words.hand_over_date),
  OperationID: Joi.number().label(Words.financial_operation),
  StandardDetailsID: Joi.number().label(Words.standard_description),
  StatusID: Joi.number(),
  Cheques: Joi.array(),
  Demands: Joi.array(),
};

const initRecord = {
  HandOverID: 0,
  CompanyBankAccountID: 0,
  CurrencyID: 0,
  ItemType: 0,
  HandOverDate: "",
  OperationID: 0,
  StandardDetailsID: 0,
  StatusID: 1,
  Cheques: [],
  Demands: [],
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
            record.FrontSideMemberID > 0
              ? `${record.FrontSideFirstName} ${record.FrontSideLastName}`
              : `${record.CompanyTitle}`
          )}
        </Text>
      ),
    },
    {
      title: Words.duration,
      width: 100,
      align: "center",
      dataIndex: "DurationTypeTitle",
      sorter: getSorter("DurationTypeTitle"),
      render: (DurationTypeTitle) => (
        <Text style={{ color: Colors.grey[6] }}>{DurationTypeTitle}</Text>
      ),
    },
    {
      title: Words.account_no,
      width: 100,
      align: "center",
      dataIndex: "AccountNo",
      sorter: getSorter("AccountNo"),
      render: (AccountNo) => (
        <Text style={{ color: Colors.orange[6] }}>
          {utils.farsiNum(AccountNo)}
        </Text>
      ),
    },
    {
      title: Words.bank,
      width: 100,
      align: "center",
      dataIndex: "BankTitle",
      sorter: getSorter("BankTitle"),
      render: (BankTitle) => (
        <Text style={{ color: Colors.green[6] }}>{BankTitle}</Text>
      ),
    },
    {
      title: Words.city,
      width: 120,
      align: "center",
      dataIndex: "CityTitle",
      sorter: getSorter("CityTitle"),
      render: (CityTitle) => (
        <Text style={{ color: Colors.blue[6] }}>{CityTitle}</Text>
      ),
    },
    {
      title: Words.bank_branch,
      width: 100,
      align: "center",
      dataIndex: "BranchName",
      sorter: getSorter("BranchName"),
      render: (BranchName) => (
        <Text style={{ color: Colors.grey[6] }}>
          {utils.farsiNum(BranchName)}
        </Text>
      ),
    },
    {
      title: Words.cheque_no,
      width: 150,
      align: "center",
      dataIndex: "ChequeNo",
      sorter: getSorter("ChequeNo"),
      render: (ChequeNo) => (
        <Text style={{ color: Colors.red[6] }}>{utils.farsiNum(ChequeNo)}</Text>
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
      width: 120,
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
      width: 120,
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

const getDemandColumns = (access, statusID, onEdit, onDelete) => {
  let columns = [
    {
      title: Words.id,
      width: 75,
      align: "center",
      dataIndex: "DemandID",
      sorter: getSorter("DemandID"),
      render: (DemandID) => (
        <Text>{DemandID > 0 ? utils.farsiNum(`${DemandID}`) : ""}</Text>
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
            record.FrontSideMemberID > 0
              ? `${record.FrontSideFirstName} ${record.FrontSideLastName}`
              : `${record.CompanyTitle}`
          )}
        </Text>
      ),
    },
    {
      title: Words.duration,
      width: 100,
      align: "center",
      dataIndex: "DurationTypeTitle",
      sorter: getSorter("DurationTypeTitle"),
      render: (DurationTypeTitle) => (
        <Text style={{ color: Colors.grey[6] }}>{DurationTypeTitle}</Text>
      ),
    },
    {
      title: Words.demand_no,
      width: 150,
      align: "center",
      dataIndex: "DemandNo",
      sorter: getSorter("DemandNo"),
      render: (DemandNo) => (
        <Text style={{ color: Colors.red[6] }}>{utils.farsiNum(DemandNo)}</Text>
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
      width: 120,
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

const BankHandOverModal = ({
  access,
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  onSaveBankHandOverItem,
  onDeleteBankHandOverItem,
  onReject,
  onApprove,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [companyBankAccounts, setCompanyBankAccounts] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [itemTypes] = useState([
    { ItemType: 1, Title: Words.cheque },
    { ItemType: 2, Title: Words.demand },
  ]);
  const [operations, setOperations] = useState([]);
  const [standardDetails, setStandardDetails] = useState([]);
  const [hasSaveApproveAccess, setHasSaveApproveAccess] = useState(false);
  const [hasRejectAccess, setHasRejectAccess] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showChequeModal, setShowChequeModal] = useState(false);
  const [showDemandModal, setShowDemandModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState("cheques");
  const [selectedCheque, setSelectedCheque] = useState(null);
  const [selectedDemand, setSelectedDemand] = useState(null);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.CompanyBankAccountID = 0;
    record.CurrencyID = 0;
    record.ItemType = 0;
    record.HandOverDate = "";
    record.OperationID = 0;
    record.StandardDetailsID = 0;
    record.StatusID = 1;
    record.Cheques = [];
    record.Demands = [];

    setRecord(record);
    setErrors({});
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
      //------ load receipt params

      let data = await service.getParams();

      let {
        CompanyBankAccounts,
        Currencies,
        Operations,
        StandardDetails,
        HasSaveApproveAccess,
        HasRejectAccess,
      } = data;

      setCompanyBankAccounts(CompanyBankAccounts);
      setCurrencies(Currencies);
      setOperations(Operations);
      setStandardDetails(StandardDetails);
      setHasSaveApproveAccess(HasSaveApproveAccess);
      setHasRejectAccess(HasRejectAccess);
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

  const handleSelectCheque = (cheque) => {
    if (cheque.ChequeID > 0) setSelectedCheque(cheque);
    else setSelectedCheque(null);
  };

  const handleSaveCheque = async () => {
    if (selectedObject !== null) {
      selectedCheque.HandOverID = selectedObject.HandOverID;

      const saved_cheque = await onSaveBankHandOverItem(
        "cheque",
        "ItemID",
        selectedCheque
      );

      const index = record.Cheques.findIndex(
        (item) => item.ItemID === selectedCheque.ItemID
      );

      if (index === -1) {
        record.Cheques = [...record.Cheques, saved_cheque];
      } else {
        record.Cheques[index] = saved_cheque;
      }
    } else {
      const cheque_to_save = { ...selectedCheque };

      //--- managing unique id (UID) for new items
      if (cheque_to_save.ItemID === 0 && selectedItem === null) {
        cheque_to_save.UID = uuid();
        record.Cheques = [...record.Cheques, cheque_to_save];
      } else if (cheque_to_save.ItemID === 0 && selectedItem !== null) {
        const index = record.Cheques.findIndex(
          (item) => item.UID === selectedItem.UID
        );
        record.Cheques[index] = cheque_to_save;
      }
    }

    //------

    setRecord({ ...record });
    setSelectedItem(null);
  };

  const handleDeleteCheque = async (cheque_to_delete) => {
    setProgress(true);

    try {
      if (cheque_to_delete.ItemID > 0) {
        await onDeleteBankHandOverItem(
          "cheque",
          "ItemID",
          cheque_to_delete.ItemID
        );

        record.Cheques = record.Cheques.filter(
          (i) => i.ItemID !== cheque_to_delete.ItemID
        );
      } else {
        record.Cheques = record.Cheques.filter(
          (i) => i.UID !== cheque_to_delete.UID
        );
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

  //------

  const handleSelectDemand = (cheque) => {
    if (cheque.DemandID > 0) setSelectedDemand(cheque);
    else setSelectedDemand(null);
  };

  const handleSaveDemand = async () => {
    if (selectedObject !== null) {
      selectedDemand.HandOverID = selectedObject.HandOverID;

      const saved_demand = await onSaveBankHandOverItem(
        "demand",
        "ItemID",
        selectedDemand
      );

      const index = record.Demands.findIndex(
        (item) => item.ItemID === selectedDemand.ItemID
      );

      if (index === -1) {
        record.Demands = [...record.Demands, saved_demand];
      } else {
        record.Demands[index] = saved_demand;
      }
    } else {
      const demand_to_save = { ...selectedDemand };

      //--- managing unique id (UID) for new items
      if (demand_to_save.ItemID === 0 && selectedItem === null) {
        demand_to_save.UID = uuid();
        record.Demands = [...record.Demands, demand_to_save];
      } else if (demand_to_save.ItemID === 0 && selectedItem !== null) {
        const index = record.Demands.findIndex(
          (item) => item.UID === selectedItem.UID
        );
        record.Demands[index] = demand_to_save;
      }
    }

    //------

    setRecord({ ...record });
    setSelectedItem(null);
  };

  const handleDeleteDemand = async (demand_to_delete) => {
    setProgress(true);

    try {
      if (demand_to_delete.ItemID > 0) {
        await onDeleteBankHandOverItem(
          "demand",
          "ItemID",
          demand_to_delete.ItemID
        );

        record.Demands = record.Demands.filter(
          (i) => i.ItemID !== demand_to_delete.ItemID
        );
      } else {
        record.Demands = record.Demands.filter(
          (i) => i.UID !== demand_to_delete.UID
        );
      }

      setRecord({ ...record });
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  const handleCloseDemandModal = () => {
    setSelectedItem(null);
    setShowDemandModal(false);
  };

  const handleEditDemand = (data) => {
    setSelectedItem(data);
    setShowDemandModal(true);
  };

  //------

  const handleShowNewModal = () => {
    switch (selectedTab) {
      case "cheques":
        setShowChequeModal(true);
        break;
      case "demands":
        setShowDemandModal(true);
        break;
      default:
        break;
    }
  };

  const getNewButton = () => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setSelectedItem(null);
          handleShowNewModal();
        }}
        icon={<AddIcon />}
      >
        {Words.new}
      </Button>
    );
  };

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
                title={Words.questions.sure_to_submit_approve_bank_hand_over}
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
                title={Words.questions.sure_to_submit_approve_bank_hand_over}
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

  const calculatePrice = () => {
    const price = {};
    let sum = 0;

    record.Cheques?.forEach((i) => {
      sum += i.Amount;
    });
    price.ChequesAmount = sum;
    sum = 0;

    record.Demands?.forEach((i) => {
      sum += i.Amount;
    });
    price.DemandsAmount = sum;
    sum = 0;

    for (const key in price) {
      sum += price[key];
    }
    price.Total = sum;

    return price;
  };

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  //------

  const getDisableStatus = () => {
    const is_disable =
      (record?.Cheques?.length || 0 + record?.Demands?.length || 0) === 0 ||
      (validateForm({ record, schema }) && true);

    return is_disable;
  };

  const status_id =
    selectedObject === null ? record.StatusID : selectedObject.StatusID;

  const price = calculatePrice();

  return (
    <>
      <ModalWindow
        isOpen={isOpen}
        isEdit={isEdit}
        inProgress={progress}
        disabled={getDisableStatus()}
        width={1050}
        footer={getFooterButtons(getDisableStatus())}
        onCancel={onCancel}
      >
        <Form ref={formRef} name="dataForm">
          <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.bank_account}
                dataSource={companyBankAccounts}
                keyColumn="CompanyBankAccountID"
                valueColumn="InfoTitle"
                formConfig={formConfig}
                required
                autoFocus
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.item_type}
                dataSource={itemTypes}
                keyColumn="ItemType"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.currency}
                dataSource={currencies}
                keyColumn="CurrencyID"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.financial_operation}
                dataSource={operations}
                keyColumn="OperationID"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DateItem
                horizontal
                required
                title={Words.hand_over_date}
                fieldName="HandOverDate"
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

            {price.Total > 0 && (
              <Col xs={24}>
                <TextItem
                  title={Words.price}
                  value={`${utils.farsiNum(utils.moneyNumber(price.Total))} ${
                    Words.ryal
                  }`}
                  valueColor={Colors.magenta[6]}
                />
              </Col>
            )}

            <Col xs={24}>
              <Form.Item>
                <Tabs
                  type="card"
                  defaultActiveKey="1"
                  onChange={handleTabChange}
                >
                  <TabPane tab={Words.cheque} key="cheques">
                    <Row gutter={[0, 15]}>
                      <Col xs={24}>
                        <DetailsTable
                          records={record.Cheques}
                          columns={getChequeColumns(
                            access,
                            status_id,
                            handleEditCheque,
                            handleDeleteCheque
                          )}
                        />
                      </Col>
                      <Col xs={24}>
                        <PriceViewer price={price.ChequesAmount} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab={Words.demand} key="demands">
                    <Row gutter={[0, 15]}>
                      <Col xs={24}>
                        <DetailsTable
                          records={record.Demands}
                          columns={getDemandColumns(
                            access,
                            status_id,
                            handleEditDemand,
                            handleDeleteDemand
                          )}
                        />
                      </Col>
                      <Col xs={24}>
                        <PriceViewer price={price.DemandsAmount} />
                      </Col>
                    </Row>
                  </TabPane>
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
          currentCheques={record.Cheques}
          onSelectCheque={handleSelectCheque}
          onOk={handleSaveCheque}
          onCancel={handleCloseChequeModal}
        />
      )}

      {showDemandModal && (
        <DemandModal
          isOpen={showDemandModal}
          selectedObject={selectedItem}
          currentDemands={record.Demands}
          onSelectDemand={handleSelectDemand}
          onOk={handleSaveDemand}
          onCancel={handleCloseDemandModal}
        />
      )}
    </>
  );
};

export default BankHandOverModal;
