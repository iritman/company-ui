import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../../common/modal-window";
import Words from "../../../../../resources/words";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../../tools/form-manager";
import service from "../../../../../services/financial/treasury/receive/receive-receipts-service";
import InputItem from "./../../../../form-controls/input-item";
import NumericInputItem from "./../../../../form-controls/numeric-input-item";
import DateItem from "./../../../../form-controls/date-item";
import DropdownItem from "./../../../../form-controls/dropdown-item";

const schema = {
  ChequeID: Joi.number().required(),
  ReceiveID: Joi.number().required(),
  FrontSideAccountID: Joi.number()
    .min(1)
    .required()
    .label(Words.front_side_account),
  OperationID: Joi.number().min(1).required().label(Words.financial_operation),
  CashFlowID: Joi.number().min(1).required().label(Words.cash_flow),
  AccountNo: Joi.string().max(50).required().label(Words.account_no),
  BranchCode: Joi.string().max(50).required().label(Words.branch_code),
  BranchName: Joi.string().max(50).required().label(Words.branch_name),
  BankID: Joi.number().min(1).required().label(Words.bank),
  CityID: Joi.number().label(Words.branch_city),
  ShebaID: Joi.string().max(50).allow("").label(Words.sheba_no),
  ChequeNo: Joi.string().max(50).required().label(Words.cheque_no),
  SayadNo: Joi.string().max(50).allow("").label(Words.sayad_no),
  ChequeSeries: Joi.string().max(50).allow("").label(Words.cheque_series),
  CurrencyID: Joi.number().label(Words.currency),
  Amount: Joi.number().min(10).required().label(Words.price),
  DueDate: Joi.string().required().label(Words.due_date),
  AgreedDate: Joi.string().required().label(Words.agreed_date),
  StandardDetailsID: Joi.number(),
};

const initRecord = {
  ChequeID: 0,
  ReceiveID: 0,
  FrontSideAccountID: 0,
  OperationID: 0,
  CashFlowID: 0,
  AccountNo: "",
  BranchCode: "",
  BranchName: "",
  BankID: 0,
  CityID: 0,
  ShebaID: "",
  ChequeNo: "",
  SayadNo: "",
  ChequeSeries: "",
  CurrencyID: 0,
  Amount: 0,
  DueDate: "",
  AgreedDate: "",
  StandardDetailsID: 0,
};

// const initRecord = {
//   ChequeID: 0,
//   ReceiveID: 0,
//   FrontSideAccountID: 1,
//   OperationID: 1,
//   CashFlowID: 1,
//   AccountNo: "11112222",
//   BranchCode: "123",
//   BranchName: "میدان امام",
//   BankID: 2,
//   CityID: 387,
//   ShebaID: "",
//   ChequeNo: "102030",
//   SayadNo: "",
//   ChequeSeries: "",
//   CurrencyID: 1,
//   Amount: 257500000,
//   DueDate: "14010916",
//   AgreedDate: "14010929",
//   StandardDetailsID: 1,
// };

const formRef = React.createRef();

const ReceiveReceiptChequeModal = ({
  isOpen,
  selectedObject,
  onOk,
  onCancel,
}) => {
  const [progress, setProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [record, setRecord] = useState({});

  const [frontSideAccountSearchProgress, setFrontSideAccountSearchProgress] =
    useState(false);
  const [frontSideAccounts, setFrontSideAccounts] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [standardDetails, setStandardDetails] = useState([]);
  const [operations, setOperations] = useState([]);
  const [cashFlows, setCashFlows] = useState([]);
  const [banks, setBanks] = useState([]);
  const [cities, setCities] = useState([]);

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.FrontSideAccountID = 0;
    record.OperationID = 0;
    record.CashFlowID = 0;
    record.AccountNo = "";
    record.BranchCode = "";
    record.BranchName = "";
    record.BankID = 0;
    record.CityID = 0;
    record.ShebaID = "";
    record.ChequeNo = "";
    record.SayadNo = "";
    record.ChequeSeries = "";
    record.CurrencyID = 0;
    record.Amount = 0;
    record.DueDate = "";
    record.AgreedDate = "";
    record.StandardDetailsID = 0;

    setRecord(record);
    // setRecord(initRecord);
    setErrors({});
    loadFieldsValue(formRef, record);
    // loadFieldsValue(formRef, initRecord);
  };

  useMount(async () => {
    setRecord(initRecord);
    loadFieldsValue(formRef, initRecord);
    initModal(formRef, selectedObject, setRecord);

    //------

    setProgress(true);

    try {
      const data = await service.getItemsParams();

      let {
        Currencies,
        Operations,
        CashFlows,
        Banks,
        Cities,
        StandardDetails,
      } = data;

      setCurrencies(Currencies);
      setOperations(Operations);
      setCashFlows(CashFlows);
      setBanks(Banks);
      setCities(Cities);
      setStandardDetails(StandardDetails);

      if (selectedObject !== null) {
        const front_side_account = await service.searchFronSideAccountByID(
          selectedObject.FrontSideAccountID
        );

        const {
          AccountID,
          AccountNo,
          MemberID,
          FirstName,
          LastName,
          CompanyID,
          CompanyTitle,
        } = front_side_account;

        if (MemberID > 0) {
          setFrontSideAccounts([
            {
              FrontSideAccountID: AccountID,
              Title: `${FirstName} ${LastName} - ${AccountNo}`,
            },
          ]);
        } else if (CompanyID > 0) {
          setFrontSideAccounts([
            {
              FrontSideAccountID: AccountID,
              Title: `${CompanyTitle} - ${AccountNo}`,
            },
          ]);
        }
      }
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  });

  const isEdit = selectedObject !== null;

  const handleSubmit = async () => {
    await saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord,
      false // showMessage
    );

    onCancel();
  };

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

  //------

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      inProgress={progress}
      disabled={validateForm({ record: record, schema }) && true}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      title={Words.reg_cheque}
      width={900}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.front_side}
              dataSource={frontSideAccounts}
              keyColumn="FrontSideAccountID"
              valueColumn="Title"
              formConfig={formConfig}
              loading={frontSideAccountSearchProgress}
              onSearch={handleSearchFrontSideAccount}
              onChange={handleChangeFrontSideAccount}
              required
              autoFocus
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
            <DropdownItem
              title={Words.cash_flow}
              dataSource={cashFlows}
              keyColumn="CashFlowID"
              valueColumn="Title"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.account_no}
              fieldName="AccountNo"
              maxLength={50}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.branch_code}
              fieldName="BranchCode"
              maxLength={50}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.branch_name}
              fieldName="BranchName"
              maxLength={50}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.bank}
              dataSource={banks}
              keyColumn="BankID"
              valueColumn="Title"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.branch_city}
              dataSource={cities}
              keyColumn="CityID"
              valueColumn="Title"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.sheba_no}
              fieldName="ShebaID"
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.cheque_no}
              fieldName="ChequeNo"
              maxLength={50}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.sayad_no}
              fieldName="SayadNo"
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.cheque_series}
              fieldName="ChequeSeries"
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.currency}
              dataSource={currencies}
              keyColumn="CurrencyID"
              valueColumn="Title"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <NumericInputItem
              horizontal
              title={Words.price}
              fieldName="Amount"
              min={10}
              max={9999999999}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <DateItem
              horizontal
              required
              title={Words.due_date}
              fieldName="DueDate"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DateItem
              horizontal
              required
              title={Words.agreed_date}
              fieldName="AgreedDate"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24}>
            <DropdownItem
              title={Words.standard_description}
              dataSource={standardDetails}
              keyColumn="StandardDetailsID"
              valueColumn="DetailsText"
              formConfig={formConfig}
            />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default ReceiveReceiptChequeModal;
