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
import TextItem from "./../../../../form-controls/text-item";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import DetailsTable from "../../../../common/details-table";
import ChequeModal from "./receive-receipt-cheque-modal";
import DemandModal from "./receive-receipt-demand-modal";
import { v4 as uuid } from "uuid";
import PriceViewer from "./price-viewer";

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
  Demands: Joi.array(),
  Cashes: Joi.array(),
  PaymentNotices: Joi.array(),
  ReturnFromOthers: Joi.array(),
  ReturnPayableCheques: Joi.array(),
  ReturnPayableDemands: Joi.array(),
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
  Demands: [],
  Cashes: [],
  PaymentNotices: [],
  ReturnFromOthers: [],
  ReturnPayableCheques: [],
  ReturnPayableDemands: [],
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
              ? `${record.FirstName} ${record.LastName}`
              : `${record.CompanyTitle}`
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
        <Text style={{ color: Colors.grey[6] }}>{PaperNatureTitle}</Text>
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
      title: Words.cash_flow,
      width: 150,
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
      title: Words.branch_code,
      width: 100,
      align: "center",
      dataIndex: "BranchCode",
      sorter: getSorter("BranchCode"),
      render: (BranchCode) => (
        <Text style={{ color: Colors.grey[6] }}>
          {utils.farsiNum(BranchCode)}
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
      title: Words.cheque_series,
      width: 150,
      align: "center",
      dataIndex: "ChequeSeries",
      sorter: getSorter("ChequeSeries"),
      render: (ChequeSeries) => (
        <Text style={{ color: Colors.grey[6] }}>
          {utils.farsiNum(ChequeSeries)}
        </Text>
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
            record.MemberID > 0
              ? `${record.FirstName} ${record.LastName}`
              : `${record.CompanyTitle}`
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
        <Text style={{ color: Colors.grey[6] }}>{PaperNatureTitle}</Text>
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
      title: Words.cash_flow,
      width: 150,
      align: "center",
      dataIndex: "CashFlowTitle",
      sorter: getSorter("CashFlowTitle"),
      render: (CashFlowTitle) => (
        <Text style={{ color: Colors.purple[6] }}>{CashFlowTitle}</Text>
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
      title: Words.demand_series,
      width: 150,
      align: "center",
      dataIndex: "DemandSeries",
      sorter: getSorter("DemandSeries"),
      render: (ChequeSeries) => (
        <Text style={{ color: Colors.grey[6] }}>
          {utils.farsiNum(ChequeSeries)}
        </Text>
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
  onSaveReceiveReceiptItem,
  onDeleteReceiveReceiptItem,
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

  const [currencies, setCurrencies] = useState([]);
  const [operations, setOperations] = useState([]);
  const [cashFlows, setCashFlows] = useState([]);
  const [banks, setBanks] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showChequeModal, setShowChequeModal] = useState(false);
  const [showDemandModal, setShowDemandModal] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);
  const [showPaymentNoticeModal, setShowPaymentNoticeModal] = useState(false);
  const [showReturnFromOtherModal, setShowReturnFromOtherModal] =
    useState(false);
  const [showReturnPayableChequeModal, setShowReturnPayableChequeModal] =
    useState(false);
  const [showReturnPayableDemandModal, setShowReturnPayableDemandModal] =
    useState(false);

  const [selectedTab, setSelectedTab] = useState("cheques");

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
      //------ load receipt params

      let data = await service.getParams();

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

      if (selectedObject) {
        const {
          DeliveryMemberID,
          DeliveryMemberFirstName,
          DeliveryMemberLastName,
        } = selectedObject;

        setDeliveryMembers([
          {
            DeliveryMemberID,
            FullName: `${DeliveryMemberFirstName} ${DeliveryMemberLastName}`,
          },
        ]);
      }

      //------ load items params

      data = await service.getItemsParams();

      let { Currencies, Operations, CashFlows, Banks, Cities } = data;

      setCurrencies(Currencies);
      setOperations(Operations);
      setCashFlows(CashFlows);
      setBanks(Banks);
      setCities(Cities);
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

  const findTitle = (data_source, id_col, title_col, search_value) => {
    const record = data_source.find((row) => row[id_col] === search_value);

    return record ? record[title_col] : "";
  };

  //------

  const handleSaveCheque = async (cheque_to_save) => {
    if (selectedObject !== null) {
      cheque_to_save.ReceiveID = selectedObject.ReceiveID;

      const saved_cheque = await onSaveReceiveReceiptItem(
        "cheque",
        "ChequeID",
        cheque_to_save
      );

      const index = record.Cheques.findIndex(
        (item) => item.ChequeID === cheque_to_save.ChequeID
      );

      if (index === -1) {
        record.Cheques = [...record.Cheques, saved_cheque];
      } else {
        record.Cheques[index] = saved_cheque;
      }
    } else {
      //While adding items temporarily, we have no join operation in database
      //So, we need to select titles manually

      const front_side_account = await service.searchFronSideAccountByID(
        cheque_to_save.FrontSideAccountID
      );

      const { MemberID, FirstName, LastName, CompanyID, CompanyTitle } =
        front_side_account;

      cheque_to_save.MemberID = MemberID;
      cheque_to_save.FirstName = FirstName;
      cheque_to_save.LastName = LastName;
      cheque_to_save.CompanyID = CompanyID;
      cheque_to_save.CompanyTitle = CompanyTitle;

      cheque_to_save.OperationTitle = findTitle(
        operations,
        "OperationID",
        "Title",
        cheque_to_save.OperationID
      );

      cheque_to_save.PaperNatureTitle = findTitle(
        operations,
        "OperationID",
        "PaperNatureTitle",
        cheque_to_save.OperationID
      );

      cheque_to_save.DurationTypeTitle = findTitle(
        operations,
        "OperationID",
        "DurationTypeTitle",
        cheque_to_save.OperationID
      );

      cheque_to_save.CashFlowTitle = findTitle(
        cashFlows,
        "CashFlowID",
        "Title",
        cheque_to_save.CashFlowID
      );

      cheque_to_save.BankTitle = findTitle(
        banks,
        "BankID",
        "Title",
        cheque_to_save.BankID
      );

      cheque_to_save.CityTitle = findTitle(
        cities,
        "CityID",
        "Title",
        cheque_to_save.CityID
      );

      cheque_to_save.CurrencyTitle = findTitle(
        currencies,
        "CurrencyID",
        "Title",
        cheque_to_save.CurrencyID
      );

      cheque_to_save.DetailsText = findTitle(
        standardDetails,
        "StandardDetailsID",
        "DetailsText",
        cheque_to_save.StandardDetailsID
      );

      //--- managing unique id (UID) for new items
      if (cheque_to_save.ChequeID === 0 && selectedItem === null) {
        cheque_to_save.UID = uuid();
        record.Cheques = [...record.Cheques, cheque_to_save];
      } else if (cheque_to_save.ChequeID === 0 && selectedItem !== null) {
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

  const HandleDeleteCheque = async (cheque_to_delete) => {
    setProgress(true);

    try {
      if (cheque_to_delete.ChequeID > 0) {
        await onDeleteReceiveReceiptItem(
          "cheque",
          "ChequeID",
          cheque_to_delete.ChequeID
        );

        record.Cheques = record.Cheques.filter(
          (i) => i.ChequeID !== cheque_to_delete.ChequeID
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

  const handleSaveDemand = async (demand_to_save) => {
    if (selectedObject !== null) {
      demand_to_save.ReceiveID = selectedObject.ReceiveID;

      const saved_demand = await onSaveReceiveReceiptItem(
        "demand",
        "DemandID",
        demand_to_save
      );

      const index = record.Demands.findIndex(
        (item) => item.DemandID === demand_to_save.DemandID
      );

      if (index === -1) {
        record.Demands = [...record.Demands, saved_demand];
      } else {
        record.Demands[index] = saved_demand;
      }
    } else {
      //While adding items temporarily, we have no join operation in database
      //So, we need to select titles manually

      const front_side_account = await service.searchFronSideAccountByID(
        demand_to_save.FrontSideAccountID
      );

      const { MemberID, FirstName, LastName, CompanyID, CompanyTitle } =
        front_side_account;

      demand_to_save.MemberID = MemberID;
      demand_to_save.FirstName = FirstName;
      demand_to_save.LastName = LastName;
      demand_to_save.CompanyID = CompanyID;
      demand_to_save.CompanyTitle = CompanyTitle;

      demand_to_save.OperationTitle = findTitle(
        operations,
        "OperationID",
        "Title",
        demand_to_save.OperationID
      );

      demand_to_save.PaperNatureTitle = findTitle(
        operations,
        "OperationID",
        "PaperNatureTitle",
        demand_to_save.OperationID
      );

      demand_to_save.DurationTypeTitle = findTitle(
        operations,
        "OperationID",
        "DurationTypeTitle",
        demand_to_save.OperationID
      );

      demand_to_save.CashFlowTitle = findTitle(
        cashFlows,
        "CashFlowID",
        "Title",
        demand_to_save.CashFlowID
      );

      demand_to_save.CurrencyTitle = findTitle(
        currencies,
        "CurrencyID",
        "Title",
        demand_to_save.CurrencyID
      );

      demand_to_save.DetailsText = findTitle(
        standardDetails,
        "StandardDetailsID",
        "DetailsText",
        demand_to_save.StandardDetailsID
      );

      //--- managing unique id (UID) for new items
      if (demand_to_save.DemandID === 0 && selectedItem === null) {
        demand_to_save.UID = uuid();
        record.Demands = [...record.Demands, demand_to_save];
      } else if (demand_to_save.DemandID === 0 && selectedItem !== null) {
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

  const HandleDeleteDemand = async (demand_to_delete) => {
    setProgress(true);

    try {
      if (demand_to_delete.DemandID > 0) {
        await onDeleteReceiveReceiptItem(
          "demand",
          "DemandID",
          demand_to_delete.DemandID
        );

        record.Demands = record.Demands.filter(
          (i) => i.DemandID !== demand_to_delete.DemandID
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
      case "cashes":
        setShowCashModal(true);
        break;
      case "payment-notices":
        setShowPaymentNoticeModal(true);
        break;
      case "return-from-others":
        setShowReturnFromOtherModal(true);
        break;
      case "return-payable-cheques":
        setShowReturnPayableChequeModal(true);
        break;
      case "return-payable-demands":
        setShowReturnPayableDemandModal(true);
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

    record.Cashes?.forEach((i) => {
      sum += i.Amount;
    });
    price.CashesAmount = sum;
    sum = 0;

    record.PaymentNotices?.forEach((i) => {
      sum += i.Amount;
    });
    price.PaymentNoticesAmount = sum;
    sum = 0;

    record.ReturnFromOthers?.forEach((i) => {
      sum += i.Amount;
    });
    price.ReturnFromOthersAmount = sum;
    sum = 0;

    record.ReturnPayableCheques?.forEach((i) => {
      sum += i.Amount;
    });
    price.ReturnPayableChequesAmount = sum;
    sum = 0;

    record.ReturnPayableDemands?.forEach((i) => {
      sum += i.Amount;
    });
    price.ReturnPayableDemandsAmount = sum;
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
      (record?.Cheques?.length ||
        0 + record?.Demands?.length ||
        0 + record?.Cashes?.length ||
        0 + record?.PaymentNotices?.length ||
        0 + record?.RetrunFromOthers?.length ||
        0 + record?.RetrunPayableCheques?.length ||
        0 + record?.RetrunPayableDemands?.length ||
        0) === 0 ||
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

            {/* ToDo: Implement base_doc_id field based on the selected base type */}

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
                            HandleDeleteCheque
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
                            HandleDeleteDemand
                          )}
                        />
                      </Col>
                      <Col xs={24}>
                        <PriceViewer price={price.DemandsAmount} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab={Words.cash} key="cashes"></TabPane>
                  <TabPane
                    tab={Words.payment_notice}
                    key="payment-notices"
                  ></TabPane>
                  <TabPane
                    tab={Words.return_from_other}
                    key="return-from-others"
                  ></TabPane>
                  <TabPane
                    tab={Words.return_payable_cheque}
                    key="return-payable-cheques"
                  ></TabPane>
                  <TabPane
                    tab={Words.return_payable_demand}
                    key="return-payable-demands"
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

      {showDemandModal && (
        <DemandModal
          isOpen={showDemandModal}
          selectedObject={selectedItem}
          onOk={handleSaveDemand}
          onCancel={handleCloseDemandModal}
        />
      )}

      {showCashModal && <></>}
      {showPaymentNoticeModal && <></>}
      {showReturnFromOtherModal && <></>}
      {showReturnPayableChequeModal && <></>}
      {showReturnPayableDemandModal && <></>}
    </>
  );
};

export default ReceiveReceiptModal;
