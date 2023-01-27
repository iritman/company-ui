import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Checkbox } from "antd";
import Joi from "joi-browser";
import ModalWindow from "../../../../../common/modal-window";
import Words from "../../../../../../resources/words";
import utils from "../../../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../../../tools/form-manager";
import service from "../../../../../../services/financial/treasury/pay/payment-orders-service";
import InputItem from "../../../../../form-controls/input-item";
import NumericInputItem from "../../../../../form-controls/numeric-input-item";
import DateItem from "../../../../../form-controls/date-item";
import DropdownItem from "../../../../../form-controls/dropdown-item";

const schema = {
  ChequeID: Joi.number().required(),
  OrderID: Joi.number().required(),
  RequestID: Joi.number().required(),
  CurrencyID: Joi.number().label(Words.currency),
  OperationID: Joi.number().min(1).required().label(Words.financial_operation),
  CashFlowID: Joi.number().min(1).required().label(Words.cash_flow),
  CompanyBankAccountID: Joi.number()
    .min(1)
    .required()
    .label(Words.bank_account),
  Amount: Joi.number().min(10).required().label(Words.price),
  DueDate: Joi.string().required().label(Words.due_date),
  AgreedDate: Joi.string().required().label(Words.agreed_date),
  StandardDetailsID: Joi.number(),
  DetailsText: Joi.string()
    .min(5)
    .max(250)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.standard_description),

  //   AccountNo: Joi.string().max(50).required().label(Words.account_no),
  //   BranchCode: Joi.string().max(50).required().label(Words.branch_code),
  //   BranchName: Joi.string().max(50).required().label(Words.branch_name),
  //   BankID: Joi.number().min(1).required().label(Words.bank),
  //   CityID: Joi.number().label(Words.branch_city),
  //   ShebaID: Joi.string().max(50).allow("").label(Words.sheba_no),
  //   ChequeNo: Joi.string().max(50).required().label(Words.cheque_no),
  //   SayadNo: Joi.string().max(50).allow("").label(Words.sayad_no),
  //   ChequeSeries: Joi.string().max(50).allow("").label(Words.cheque_series),
};

const initRecord = {
  ChequeID: 0,
  OrderID: 0,
  RequestID: 0,
  CurrencyID: 0,
  OperationID: 0,
  CashFlowID: 0,
  CompanyBankAccountID: 0,
  Amount: 0,
  DueDate: "",
  AgreedDate: "",
  StandardDetailsID: 0,
  DetailsText: "",

  //   AccountNo: "",
  //   BranchCode: "",
  //   BranchName: "",
  //   BankID: 0,
  //   CityID: 0,
  //   ShebaID: "",
  //   ChequeNo: "",
  //   SayadNo: "",
  //   ChequeSeries: "",
};

const formRef = React.createRef();

const PaymentOrderChequeModal = ({
  isOpen,
  selectedObject,
  onOk,
  onCancel,
}) => {
  const [progress, setProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [record, setRecord] = useState({});

  const [checkPaymentBase, setCheckPaymentBase] = useState(false);
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [companyBankAccounts, setCompanyBankAccounts] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [operations, setOperations] = useState([]);
  const [cashFlows, setCashFlows] = useState([]);
  const [standardDetails, setStandardDetails] = useState([]);
  //   const [banks, setBanks] = useState([]);
  //   const [cities, setCities] = useState([]);

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.OrderID = 0;
    record.RequestID = 0;
    record.CurrencyID = 0;
    record.OperationID = 0;
    record.CashFlowID = 0;
    record.CompanyBankAccountID = 0;
    record.Amount = 0;
    record.DueDate = "";
    record.AgreedDate = "";
    record.StandardDetailsID = 0;
    record.DetailsText = "";

    // record.OrderID = 0;
    // record.RequestID = 1;
    // record.CurrencyID = 6;
    // record.OperationID = 11;
    // record.CashFlowID = 5;
    // record.CompanyBankAccountID = 1;
    // record.Amount = 250000;
    // record.DueDate = "14011107";
    // record.AgreedDate = "14011108";
    // record.StandardDetailsID = 1;
    // record.DetailsText = "wwww\neeeee";

    // record.AccountNo = "";
    // record.BranchCode = "";
    // record.BranchName = "";
    // record.BankID = 0;
    // record.CityID = 0;
    // record.ShebaID = "";
    // record.ChequeNo = "";
    // record.SayadNo = "";
    // record.ChequeSeries = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
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
        CompanyBankAccounts,
        Currencies,
        Operations,
        CashFlows,
        StandardDetails,
        PaymentRequests,
        //   Banks,
        //   Cities,
      } = data;

      setCompanyBankAccounts(CompanyBankAccounts);
      setCurrencies(Currencies);
      setOperations(
        Operations.filter((o) => o.ItemTypeID === 1 && o.OperationTypeID === 2)
      );
      setCashFlows(CashFlows.filter((cf) => cf.ShowInReceiptOperation));
      setStandardDetails(StandardDetails);

      PaymentRequests.forEach(
        (rq) =>
          (rq.Title = utils.farsiNum(
            `#${rq.RequestID} - ${
              rq.FrontSideAccountTitle
            } - ${utils.moneyNumber(rq.TotalPrice)} ${Words.ryal}`
          ))
      );
      setPaymentRequests(PaymentRequests);

      //   setBanks(Banks);
      //   setCities(Cities);

      if (selectedObject) {
        if (selectedObject.RequestID > 0) {
          const selected_payment_request =
            await service.searchPaymentRequestByID(selectedObject.RequestID);

          if (selected_payment_request) {
            if (
              !paymentRequests.find(
                (rq) => rq.RequestID === selected_payment_request.RequestID
              )
            ) {
              const { RequestID, FrontSideAccountTitle, TotalPrice } =
                selected_payment_request;

              setPaymentRequests([
                ...paymentRequests,
                {
                  RequestID,
                  Title: utils.farsiNum(
                    `#${RequestID} - ${FrontSideAccountTitle} - ${utils.moneyNumber(
                      TotalPrice
                    )} ${Words.ryal}`
                  ),
                },
              ]);
            }

            setCheckPaymentBase(true);
          }
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

  const handlePaymentBaseChange = (e) => {
    const { checked } = e.target;
    setCheckPaymentBase(checked);

    if (checked) {
      schema.RequestID = Joi.number().min(1).label(Words.payment_request);
    } else {
      schema.RequestID = Joi.number().label(Words.payment_request);
      const rec = { ...record };
      rec.RequestID = 0;
      setRecord(rec);
      loadFieldsValue(formRef, rec);
    }
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
      width={1250}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={checkPaymentBase ? 8 : 24}>
            <Form.Item>
              <Checkbox
                checked={checkPaymentBase}
                onChange={handlePaymentBaseChange}
              >
                {Words.select_receive_base}
              </Checkbox>
            </Form.Item>
          </Col>
          {checkPaymentBase && (
            <Col xs={24} md={16}>
              <DropdownItem
                title={Words.payment_request}
                dataSource={paymentRequests}
                keyColumn="RequestID"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col>
          )}
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
          {/* <Col xs={24} md={12} lg={8}>
            <InputItem
              title={Words.account_no}
              fieldName="AccountNo"
              maxLength={50}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <InputItem
              title={Words.branch_code}
              fieldName="BranchCode"
              maxLength={50}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <InputItem
              title={Words.branch_name}
              fieldName="BranchName"
              maxLength={50}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <DropdownItem
              title={Words.bank}
              dataSource={banks}
              keyColumn="BankID"
              valueColumn="Title"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <DropdownItem
              title={Words.branch_city}
              dataSource={cities}
              keyColumn="CityID"
              valueColumn="Title"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <InputItem
              title={Words.sheba_no}
              fieldName="ShebaID"
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <InputItem
              title={Words.cheque_no}
              fieldName="ChequeNo"
              maxLength={50}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <InputItem
              title={Words.sayad_no}
              fieldName="SayadNo"
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <InputItem
              title={Words.cheque_series}
              fieldName="ChequeSeries"
              maxLength={50}
              formConfig={formConfig}
            />
          </Col> */}
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.bank_account}
              dataSource={companyBankAccounts}
              keyColumn="CompanyBankAccountID"
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
          <Col xs={24}>
            <DropdownItem
              title={Words.standard_details_text}
              dataSource={standardDetails}
              keyColumn="StandardDetailsID"
              valueColumn="DetailsText"
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
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default PaymentOrderChequeModal;
