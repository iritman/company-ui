import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Tabs, Radio } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
import utils from "../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../tools/form-manager";
import service from "../../../../services/financial/accounts/structure-moeins-service";
import InputItem from "./../../../form-controls/input-item";
import NumericInputItem from "./../../../form-controls/numeric-input-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import SwitchItem from "./../../../form-controls/switch-item";
import {
  useModalContext,
  useResetContext,
} from "./../../../contexts/modal-context";

const { TabPane } = Tabs;

const schema = {
  MoeinID: Joi.number().required(),
  TotalID: Joi.number().required(),
  MoeinCode: Joi.number().required().label(Words.start_code),
  Title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(utils.VALID_REGEX),
  AccountTypeID: Joi.number().min(1).required(),
  NatureID: Joi.number().min(1).required(),
  CurrencyID: Joi.number().required(),
  DetailsText: Joi.string()
    .min(5)
    .max(512)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
  IsActive: Joi.boolean(),
  IsConvertable: Joi.boolean(),
  ControlTypeID: Joi.number().required(),
};

const initRecord = {
  MoeinID: 0,
  //   TotalID: 0,
  MoeinCode: 0,
  Title: "",
  AccountTypeID: 0,
  NatureID: 0,
  CurrencyID: 0,
  DetailsText: "",
  IsActive: true,
  IsConvertable: false,
  ControlTypeID: 0,
};

const formRef = React.createRef();

const StructureMoeinModal = ({
  isOpen,
  total,
  selectedObject,
  onOk,
  onCancel,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [accountTypes, setAccountTypes] = useState([]);
  const [natures, setNatures] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [controlTypes, setControlTypes] = useState([]);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.MoeinCode = 0;
    record.Title = "";
    record.AccountTypeID = 0;
    record.NatureID = 0;
    record.CurrencyID = 0;
    record.DetailsText = "";
    record.IsActive = true;
    record.IsConvertable = false;
    record.ControlTypeID = 0;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    initRecord.TotalID = total.TotalID;
    setRecord(initRecord);
    loadFieldsValue(formRef, initRecord);
    initModal(formRef, selectedObject, setRecord);

    //------

    setProgress(true);

    try {
      const data = await service.getParams();

      let { AccountTypes, Natures, Currencies, ControlTypes } = data;

      setAccountTypes(AccountTypes);
      setNatures(Natures);
      setCurrencies(Currencies);
      setControlTypes(ControlTypes);

      if (!selectedObject) {
        const code = await service.getNewCode(total.TotalID);

        const rec = { ...initRecord };
        rec.MoeinCode = code.NewCode;

        setRecord(rec);
        loadFieldsValue(formRef, rec);
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
      clearRecord
    );

    onCancel();
  };

  const handleIsConvertableSwitchChange = (checked) => {
    const rec = { ...record };
    rec.IsConvertable = checked;
    rec.CurrencyID = 0;

    setRecord(rec);
    loadFieldsValue(formRef, rec);
  };

  const handleTafsilLevelChange = (e) => {
    const new_value = e.target.value;

    console.log(new_value);
  };

  //------

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      title={Words.account_moein}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      width={750}
    >
      <Form ref={formRef} name="dataForm">
        <Tabs type="card" defaultActiveKey="1">
          <TabPane tab={Words.info} key="1">
            <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
              <Col xs={24} md={12}>
                <NumericInputItem
                  horizontal
                  required
                  title={Words.moein_code}
                  fieldName="MoeinCode"
                  addonAfter={`${total.GroupCode}${total.TotalCode}`}
                  min={1}
                  max={9}
                  formConfig={formConfig}
                />
              </Col>
              <Col xs={24} md={12}>
                <InputItem
                  title={Words.title}
                  fieldName="Title"
                  maxLength={50}
                  formConfig={formConfig}
                  required
                  autoFocus
                />
              </Col>
              <Col xs={24} md={12}>
                <DropdownItem
                  title={Words.account_type}
                  dataSource={accountTypes}
                  keyColumn="AccountTypeID"
                  valueColumn="Title"
                  formConfig={formConfig}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <DropdownItem
                  title={Words.nature}
                  dataSource={natures}
                  keyColumn="NatureID"
                  valueColumn="Title"
                  formConfig={formConfig}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <DropdownItem
                  title={Words.default_currency}
                  dataSource={currencies}
                  keyColumn="CurrencyID"
                  valueColumn="Title"
                  formConfig={formConfig}
                  disabled={!record.IsConvertable}
                />
              </Col>
              <Col xs={24} md={12}>
                <DropdownItem
                  title={Words.account_control_type}
                  dataSource={controlTypes}
                  keyColumn="ControlTypeID"
                  valueColumn="Title"
                  formConfig={formConfig}
                />
              </Col>
              <Col xs={24}>
                <InputItem
                  title={Words.descriptions}
                  fieldName="DetailsText"
                  multiline
                  rows={7}
                  showCount
                  maxLength={512}
                  formConfig={formConfig}
                />
              </Col>
              <Col xs={24} md={12}>
                <SwitchItem
                  title={Words.is_convertable}
                  fieldName="IsConvertable"
                  initialValue={false}
                  checkedTitle={Words.yes}
                  unCheckedTitle={Words.no}
                  formConfig={formConfig}
                  onChange={handleIsConvertableSwitchChange}
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
            </Row>
          </TabPane>
          <TabPane tab={Words.tafsil_levels} key="2">
            <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
              <Col xs={24}>
                <Radio.Group
                  defaultValue={4}
                  buttonStyle="solid"
                  onChange={handleTafsilLevelChange}
                >
                  <Radio.Button value={4}>{Words.level_4}</Radio.Button>
                  <Radio.Button value={5}>{Words.level_5}</Radio.Button>
                  <Radio.Button value={6}>{Words.level_6}</Radio.Button>
                  <Radio.Button value={7}>{Words.level_7}</Radio.Button>
                  <Radio.Button value={8}>{Words.level_8}</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Form>
    </ModalWindow>
  );
};

export default StructureMoeinModal;
