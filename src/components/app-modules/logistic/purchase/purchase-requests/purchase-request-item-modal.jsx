import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "../../../../common/modal-window";
import Words from "../../../../../resources/words";
import utils from "../../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../../tools/form-manager";
import service from "../../../../../services/logistic/purchase/purchase-requests-service";
import InputItem from "../../../../form-controls/input-item";
import NumericInputItem from "../../../../form-controls/numeric-input-item";
import DateItem from "../../../../form-controls/date-item";
import DropdownItem from "../../../../form-controls/dropdown-item";

const schema = {
  ItemID: Joi.number().required(),
  RequestID: Joi.number().required(),
  BaseTypeID: Joi.number().min(1).required().label(Words.base_type),
  BaseID: Joi.number().required().label(Words.base),
  NeededItemID: Joi.number().min(1).required().label(Words.product),
  NeededItemMeasureUnitID: Joi.number()
    .min(1)
    .required()
    .label(Words.measure_unit),
  RequestCount: Joi.number()
    .min(0)
    .max(999999)
    .positive()
    .precision(2)
    .label(Words.request_count),
  NeedDate: Joi.string(),
  PurchaseTypeID: Joi.number().min(1).required().label(Words.purchase_type),
  InquiryDeadline: Joi.string().allow(""),
  PurchaseAgentID: Joi.number().required().label(Words.purchasing_agent),
  DetailsText: Joi.string()
    .min(5)
    .max(250)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
};

const initRecord = {
  ItemID: 0,
  RequestID: 0,
  BaseTypeID: 1,
  BaseID: 0,
  NeededItemID: 0,
  NeededItemMeasureUnitID: 0,
  RequestCount: 0,
  NeedDate: "",
  PurchaseTypeID: 0,
  InquiryDeadline: "",
  PurchaseAgentID: 0,
  DetailsText: "",
};

const formRef = React.createRef();

const PurchaseRequestItemModal = ({
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  setParams,
}) => {
  const [progress, setProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [record, setRecord] = useState({});

  const [baseTypes, setBaseTypes] = useState([]);
  const [bases, setBases] = useState([]);
  const [choices, setChoices] = useState([]);
  const [purchaseTypes, setPurchaseTypes] = useState([]);
  const [agents, setAgents] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.BaseTypeID = 1;
    record.BaseID = 0;
    record.NeededItemID = 0;
    record.NeededItemMeasureUnitID = 0;
    record.RequestCount = 0;
    record.NeedDate = currentDate;
    record.PurchaseTypeID = 0;
    record.InquiryDeadline = "";
    record.PurchaseAgentID = 0;
    record.DetailsText = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    setProgress(true);

    try {
      const data = await service.getItemParams();

      let { BaseTypes, Choices, PurchaseTypes, Agents, CurrentDate } = data;

      setParams({
        BaseTypes,
        Choices,
        PurchaseTypes,
        Agents,
        CurrentDate,
      });

      setBaseTypes(BaseTypes);
      setChoices(Choices);
      setPurchaseTypes(PurchaseTypes);
      setAgents(Agents);
      setCurrentDate(CurrentDate);

      if (!selectedObject) {
        const rec = { ...initRecord };
        rec.NeedDate = `${CurrentDate}`;

        setRecord({ ...rec });
        loadFieldsValue(formRef, { ...rec });
      } else {
        initModal(formRef, selectedObject, setRecord);
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

  const handleChangeBaseType = (value) => {
    const rec = { ...record };
    rec.BaseTypeID = value || 0;

    if (value > 1) {
      schema.BaseID = Joi.number().min(1).required().label(Words.base);
    } else {
      schema.BaseID = Joi.number().required().label(Words.base);
    }

    setBases([]);

    setRecord(rec);
  };

  const handleChangeProduct = (value) => {
    const rec = { ...record };
    rec.NeededItemID = value || 0;

    const measure_units = choices?.find(
      (choice) => choice.NeededItemID === value
    )?.MeasureUnits;

    const default_measure_unit = measure_units?.find((mu) => mu.IsDefault);

    rec.NeededItemMeasureUnitID = default_measure_unit
      ? default_measure_unit.NeededItemMeasureUnitID
      : 0;

    setRecord(rec);
    loadFieldsValue(formRef, rec);
  };

  const getMeasureUnits = () => {
    return choices?.find(
      (choice) => choice.NeededItemID === record.NeededItemID
    )?.MeasureUnits;
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
      width={750}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.base_type}
              dataSource={baseTypes}
              keyColumn="BaseTypeID"
              valueColumn="Title"
              formConfig={formConfig}
              onChange={handleChangeBaseType}
              required
              autoFocus
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.base}
              dataSource={bases}
              keyColumn="BaseID"
              valueColumn="Title"
              formConfig={formConfig}
              disabled={record?.BaseTypeID <= 1}
              required={record?.BaseTypeID > 1}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.product}
              dataSource={choices}
              keyColumn="NeededItemID"
              valueColumn="Title"
              formConfig={formConfig}
              onChange={handleChangeProduct}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.measure_unit}
              dataSource={getMeasureUnits()}
              keyColumn="NeededItemMeasureUnitID"
              valueColumn="MeasureUnitTitle"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <NumericInputItem
              horizontal
              title={Words.request_count}
              fieldName="RequestCount"
              min={0}
              max={999999}
              precision={2}
              maxLength={7}
              step="0.01"
              stringMode
              decimalText
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <DateItem
              horizontal
              title={Words.need_date}
              fieldName="NeedDate"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.purchase_type}
              dataSource={purchaseTypes}
              keyColumn="PurchaseTypeID"
              valueColumn="Title"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <DateItem
              horizontal
              title={Words.inquiry_final_deadline}
              fieldName="InquiryDeadline"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.purchasing_agent}
              dataSource={agents}
              keyColumn="PurchaseAgentID"
              valueColumn="FullName"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24}>
            <InputItem
              title={Words.standard_description}
              fieldName="DetailsText"
              multiline
              rows={4}
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

export default PurchaseRequestItemModal;
