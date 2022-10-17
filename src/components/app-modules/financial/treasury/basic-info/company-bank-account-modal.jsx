import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Tabs, Descriptions, Typography } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../../common/modal-window";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
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

const { Text } = Typography;
const valueColor = Colors.blue[7];

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
  TafsilAccountID: Joi.number().label(Words.tafsil_account),
};

const initRecord = {
  AccountID: 0,
  BankID: 0,
  BranchID: 0,
  AccountNo: "",
  Credit: 0,
  CurrencyID: 0,
  ShebaID: "",
  BankAccountTypeID: 0,
  DetailsText: "",
  TafsilAccountID: 0,
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
  const [tafsilAccounts, setTafsilAccounts] = useState([]);

  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const resetContext = useResetContext();

  const clearRecord = () => {
    record.BranchID = 0;
    record.BankID = 0;
    record.AccountNo = "";
    record.Credit = 0;
    record.CurrencyID = 0;
    record.ShebaID = "";
    record.BankAccountTypeID = 0;
    record.DetailsText = "";
    record.TafsilAccountID = 0;

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

      const { Banks, Branches, Currencies, BankAccountTypes, TafsilAccounts } =
        data;

      setBanks(Banks);
      setBranches(Branches);
      setCurrencies(Currencies);
      setBankAccountTypes(BankAccountTypes);
      setTafsilAccounts(TafsilAccounts);
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

  const handleChangeTafsilAccount = (value) => {
    record.TafsilAccountID = value;
    setRecord({ ...record });
  };

  const getTafsilAccountDescriptions = () => {
    let result = <></>;

    if (tafsilAccounts.length > 0 && record.TafsilAccountID > 0) {
      const {
        TafsilCode,
        CurrencyTitle,
        TafsilTypeTitle,
        ParentTafsilTypeTitle,
        // TafsilAccountID,
        // Title,
        // CurrencyID,
        // TafsilTypeID,
        // ParentTafsilTypeID,
      } = tafsilAccounts.find(
        (acc) => acc.TafsilAccountID === record.TafsilAccountID
      );

      result = (
        <Descriptions
          bordered
          column={{
            //   md: 2, sm: 2,
            lg: 2,
            md: 2,
            xs: 1,
          }}
          size="middle"
        >
          <Descriptions.Item label={Words.tafsil_code}>
            <Text style={{ color: Colors.red[6] }}>
              {utils.farsiNum(`${TafsilCode}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.tafsil_type}>
            <Text style={{ color: valueColor }}>{TafsilTypeTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.parent_tafsil_type}>
            <Text style={{ color: valueColor }}>{ParentTafsilTypeTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.default_currency}>
            <Text style={{ color: valueColor }}>{CurrencyTitle}</Text>
          </Descriptions.Item>
        </Descriptions>
      );
    }

    return result;
  };

  const isEdit = selectedObject !== null;

  //------

  const filtered_branches = branches.filter((b) => b.BankID === record.BankID);

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
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={Words.company_bank_account_info}
            key="general_info"
          >
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
          </Tabs.TabPane>
          <Tabs.TabPane tab={Words.tafsil_info} key="tafsil_info">
            <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
              <Col xs={24}>
                <DropdownItem
                  title={Words.tafsil_account}
                  dataSource={tafsilAccounts}
                  keyColumn="TafsilAccountID"
                  valueColumn="Title"
                  formConfig={formConfig}
                  autoFocus
                  onChange={handleChangeTafsilAccount}
                />
              </Col>
              <Col xs={24}>{getTafsilAccountDescriptions()}</Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </ModalWindow>
  );
};

export default CompanyBankAccountModal;
