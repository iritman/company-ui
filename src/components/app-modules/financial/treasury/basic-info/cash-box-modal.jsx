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
import service from "../../../../../services/financial/treasury/basic-info/cash-boxes-service";
import DropdownItem from "./../../../../form-controls/dropdown-item";
import InputItem from "../../../../form-controls/input-item";
import SwitchItem from "./../../../../form-controls/switch-item";

const { Text } = Typography;
const valueColor = Colors.blue[7];

const schema = {
  CashBoxID: Joi.number().required(),
  Title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .regex(utils.VALID_REGEX)
    .label(Words.title),
  Location: Joi.string()
    .min(2)
    .max(50)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.location),
  CashierMemberID: Joi.number().min(1).required().label(Words.cashier),
  DetailsText: Joi.string()
    .min(10)
    .max(512)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
  IsActive: Joi.boolean(),
  TafsilAccountID: Joi.number().label(Words.tafsil_account),
};

const initRecord = {
  CashBoxID: 0,
  Title: "",
  Location: "",
  CashierMemberID: 0,
  DetailsText: "",
  IsActive: true,
  TafsilAccountID: 0,
};

const formRef = React.createRef();

const CashBoxModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const [employees, setEmployees] = useState([]);
  const [tafsilAccounts, setTafsilAccounts] = useState([]);

  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const resetContext = useResetContext();

  const clearRecord = () => {
    record.Title = "";
    record.Location = "";
    record.CashierMemberID = 0;
    record.DetailsText = "";
    record.IsActive = true;
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

      const { Employees, TafsilAccounts } = data;

      setEmployees(Employees);
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

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      width={750}
    >
      <Form ref={formRef} name="dataForm">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab={Words.cash_box_info} key="cash_box_info">
            <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
              <Col xs={24} md={12}>
                <InputItem
                  title={Words.title}
                  fieldName="Title"
                  formConfig={formConfig}
                  maxLength={50}
                  required
                  autoFocus
                />
              </Col>
              <Col xs={24} md={12}>
                <InputItem
                  title={Words.location}
                  fieldName="Location"
                  formConfig={formConfig}
                  maxLength={50}
                />
              </Col>
              <Col xs={24} md={12}>
                <DropdownItem
                  title={Words.cashier}
                  dataSource={employees}
                  keyColumn="CashierMemberID"
                  valueColumn="FullName"
                  formConfig={formConfig}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <SwitchItem
                  title={Words.status}
                  fieldName="IsActive"
                  initialValue={true}
                  checkedTitle={Words.active}
                  unCheckedTitle={Words.inactive}
                  formConfig={formConfig}
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

export default CashBoxModal;
