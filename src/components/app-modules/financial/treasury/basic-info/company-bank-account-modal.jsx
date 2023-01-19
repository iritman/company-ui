import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Tabs } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../../common/modal-window";
import Words from "../../../../../resources/words";
import utils from "../../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../../tools/form-manager";
import {
  useModalContext,
  useResetContext,
} from "./../../../../contexts/modal-context";
import service from "../../../../../services/financial/treasury/basic-info/company-bank-accounts-service";
import DropdownItem from "./../../../../form-controls/dropdown-item";
import InputItem from "../../../../form-controls/input-item";
import NumericInputItem from "../../../../form-controls/numeric-input-item";
import TafsilInfoViewer from "../../../../common/tafsil-info-viewer";

const schema = {
  AccountID: Joi.number().required(),
  BankID: Joi.number().required(),
  BranchID: Joi.number().required(),
  AccountNo: Joi.string()
    .min(2)
    .max(50)
    .required()
    .regex(utils.VALID_REGEX)
    .label(Words.account_no),
  AccountName: Joi.string()
    .allow("")
    .max(50)
    .regex(utils.VALID_REGEX)
    .label(Words.account_name),
  Credit: Joi.number().label(Words.credit),
  CurrencyID: Joi.number().min(1).required().label(Words.currency_type),
  ShebaID: Joi.string()
    .min(2)
    .max(50)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.sheba_no),
  BankAccountTypeID: Joi.number()
    .min(1)
    .required()
    .label(Words.bank_account_type),
  DetailsText: Joi.string()
    .min(10)
    .max(512)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
};

const initRecord = {
  AccountID: 0,
  BankID: 0,
  BranchID: 0,
  AccountNo: "",
  AccountName: "",
  Credit: 0,
  CurrencyID: 0,
  ShebaID: "",
  BankAccountTypeID: 0,
  DetailsText: "",
};

const formRef = React.createRef();

const CompanyBankAccountModal = ({
  isOpen,
  selectedObject,
  onOk,
  onCancel,
}) => {
  const [banks, setBanks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [bankAccountTypes, setBankAccountTypes] = useState([]);

  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const resetContext = useResetContext();

  const clearRecord = () => {
    record.BranchID = 0;
    record.BankID = 0;
    record.AccountNo = "";
    record.AccountName = "";
    record.Credit = 0;
    record.CurrencyID = 0;
    record.ShebaID = "";
    record.BankAccountTypeID = 0;
    record.DetailsText = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  useMount(async () => {
    resetContext();

    setRecord(initRecord);
    loadFieldsValue(formRef, initRecord);
    initModal(formRef, selectedObject, setRecord);

    //------

    setProgress(true);

    try {
      const data = await service.getParams();

      const { Banks, Branches, Currencies, BankAccountTypes } = data;

      setBanks(Banks);
      setBranches(Branches);
      setCurrencies(Currencies);
      setBankAccountTypes(BankAccountTypes);
    } catch (err) {
      handleError(err);
    }

    setProgress(false);
  });

  const handleSubmit = async () => {
    await saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  const isEdit = selectedObject !== null;

  //------

  const filtered_branches = branches.filter((b) => b.BankID === record.BankID);

  let items = [
    {
      label: Words.info,
      key: "info",
      children: (
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.bank}
              dataSource={banks}
              keyColumn="BankID"
              valueColumn="Title"
              formConfig={formConfig}
              required
              autoFocus
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.bank_branch}
              dataSource={filtered_branches}
              keyColumn="BranchID"
              valueColumn="Title"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.account_name}
              fieldName="AccountName"
              formConfig={formConfig}
              maxLength={50}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.account_no}
              fieldName="AccountNo"
              formConfig={formConfig}
              maxLength={50}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <NumericInputItem
              horizontal
              title={Words.credit}
              fieldName="Credit"
              min={0}
              max={999999999999}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.currency_type}
              dataSource={currencies}
              keyColumn="CurrencyID"
              valueColumn="Title"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.sheba_no}
              fieldName="ShebaID"
              formConfig={formConfig}
              maxLength={50}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.bank_account_type}
              dataSource={bankAccountTypes}
              keyColumn="BankAccountTypeID"
              valueColumn="Title"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24}>
            <InputItem
              horizontal
              title={Words.descriptions}
              fieldName="DetailsText"
              formConfig={formConfig}
              multiline
              rows={3}
              maxLength={512}
              showCount
            />
          </Col>
        </Row>
      ),
    },
  ];

  if (selectedObject !== null) {
    const { TafsilInfo } = selectedObject;

    items = [
      ...items,
      {
        label: Words.tafsil_account,
        key: "tafsil-account",
        children: <TafsilInfoViewer tafsilInfo={TafsilInfo} />,
      },
    ];
  }

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      inProgress={progress}
      disabled={
        (record.MemberID === 0 && record.CompanyID === 0) ||
        (validateForm({ record, schema }) && true)
      }
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      width={750}
    >
      <Form ref={formRef} name="dataForm">
        <Tabs defaultActiveKey="1" type="card" items={items} />
      </Form>
    </ModalWindow>
  );
};

export default CompanyBankAccountModal;
