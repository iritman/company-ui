import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
// import utils from "../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
} from "../../../../tools/form-manager";
// import InputItem from "./../../../form-controls/input-item";
import NumericInputItem from "./../../../form-controls/numeric-input-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
// import SwitchItem from "./../../../form-controls/switch-item";
import {
  useModalContext,
  useResetContext,
} from "./../../../contexts/modal-context";

const schema = {
  ConvertID: Joi.number().required(),
  ProductID: Joi.number().required(),
  FromUnitID: Joi.number().min(1).required(),
  FromUnitValue: Joi.number()
    .min(0)
    .max(999999)
    .positive()
    .allow(0)
    .precision(4)
    .label(Words.from_measure_value),
  //   FromUnitValue: Joi.string()
  //     .max(50)
  //     .required()
  //     .label(Words.from_measure_value)
  //     .regex(utils.VALID_REGEX),
  //   FromUnitIntValue: Joi.number()
  //     .integer()
  //     .min(0)
  //     .max(999999)
  //     .label(Words.from_measure_value),
  //   FromUnitDecimalValue: Joi.number()
  //     .min(0)
  //     .max(999999)
  //     .positive()
  //     .allow(0)
  //     .precision(4)
  //     .label(Words.from_measure_value),
  //   FromUnitBoolValue: Joi.boolean().label(Words.from_measure_value),
  ToUnitID: Joi.number().min(1).required(),
  ToUnitValue: Joi.number()
    .min(0)
    .max(999999)
    .positive()
    .allow(0)
    .precision(4)
    .label(Words.to_measure_value),
  //   ToUnitValue: Joi.string()
  //     .max(50)
  //     .required()
  //     .label(Words.to_measure_value)
  //     .regex(utils.VALID_REGEX),
  //   ToUnitIntValue: Joi.number()
  //     .integer()
  //     .min(0)
  //     .max(999999)
  //     .label(Words.to_measure_value),
  //   ToUnitDecimalValue: Joi.number()
  //     .min(0)
  //     .max(999999)
  //     .positive()
  //     .allow(0)
  //     .precision(4)
  //     .label(Words.to_measure_value),
  //   ToUnitBoolValue: Joi.boolean().label(Words.to_measure_value),
  TolerancePercent: Joi.number().required().label(Words.tolerance),
};

const initRecord = (productID) => {
  return {
    ConvertID: 0,
    ProductID: productID,
    FromUnitID: 0,
    FromUnitValue: "",
    FromUnitIntValue: 0,
    FromUnitDecimalValue: 0,
    FromUnitBoolValue: false,
    ToUnitID: 0,
    ToUnitValue: "",
    ToUnitIntValue: 0,
    ToUnitDecimalValue: 0,
    ToUnitBoolValue: false,
    TolerancePercent: 0,
  };
};

const formRef = React.createRef();

const UserProductMeasureUnitModal = ({
  isOpen,
  product,
  selectedMeasureConvert,
  measureUnits,
  onOk,
  onCancel,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  //   const [fromValueTypeID, setFromValueTypeID] = useState(0);
  //   const [toValueTypeID, setToValueTypeID] = useState(0);
  const [fromMeasureUnits, setFromMeasureUnits] = useState([]);
  const [toMeasureUnits, setToMeasureUnits] = useState([]);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.FromUnitID = 0;
    record.FromUnitValue = 0;
    // record.FromUnitValue = "";
    // record.FromUnitIntValue = 0;
    // record.FromUnitDecimalValue = 0;
    // record.FromUnitBoolValue = false;
    record.ToUnitID = 0;
    record.ToUnitValue = 0;
    // record.ToUnitValue = "";
    // record.ToUnitIntValue = 0;
    // record.ToUnitDecimalValue = 0;
    // record.ToUnitBoolValue = false;
    record.TolerancePercent = 0;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord(product.ProductID));

    //------

    const from_measure_units = [...measureUnits];
    from_measure_units.forEach((mu) => (mu.FromUnitID = mu.MeasureUnitID));
    setFromMeasureUnits(from_measure_units);

    const to_measure_units = [...measureUnits];
    to_measure_units.forEach((mu) => (mu.ToUnitID = mu.MeasureUnitID));
    setToMeasureUnits(to_measure_units);

    //------

    initModal(formRef, selectedMeasureConvert, setRecord);

    if (selectedMeasureConvert !== null) {
      //   setFromValueTypeID(selectedMeasureConvert.FromUnitValueTypeID);
      //   setToValueTypeID(selectedMeasureConvert.ToUnitValueTypeID);
      //   const completePropsFeature = { ...selectedMeasureConvert };
      //   completePropsFeature.ProductID = product.ProductID;
      //   completePropsFeature.FeatureIntValue =
      //     completePropsFeature.ValueTypeID === 1
      //       ? parseInt(completePropsFeature.FeatureValue)
      //       : 0;
      //   completePropsFeature.FeatureDecimalValue =
      //     completePropsFeature.ValueTypeID === 2
      //       ? parseFloat(completePropsFeature.FeatureValue)
      //       : 0;
      //   completePropsFeature.FeatureBoolValue =
      //     completePropsFeature.ValueTypeID === 4
      //       ? completePropsFeature.FeatureValue === "1"
      //       : false;
      //   initModal(formRef, completePropsFeature, setRecord);
    }
  });

  const isEdit = selectedMeasureConvert !== null;

  const handleSubmit = async () => {
    await saveModalChanges(
      formConfig,
      selectedMeasureConvert,
      setProgress,
      onOk,
      clearRecord
    );

    onCancel();
  };

  //   const handleChangeFromMeasureUnit = (value) => {
  //     let selected_ValueTypeID = 0;

  //     if (value > 0) {
  //       selected_ValueTypeID = measureUnits.find(
  //         (mu) => mu.MeasureUnitID === value
  //       ).ValueTypeID;

  //       // for text inpute we should have text value, otherwise we can allow empty string
  //       if (selected_ValueTypeID === 3)
  //         schema.FromUnitValue = Joi.string()
  //           .max(50)
  //           .required()
  //           .label(Words.from_measure_value)
  //           .regex(utils.VALID_REGEX);
  //       else
  //         schema.FromUnitValue = Joi.string()
  //           .allow("")
  //           .max(50)
  //           .required()
  //           .label(Words.from_measure_value)
  //           .regex(utils.VALID_REGEX);

  //       const rec = { ...record };
  //       rec.FromUnitID = value || 0;
  //       setRecord(rec);
  //     }

  //     setFromValueTypeID(selected_ValueTypeID);
  //   };

  //   const handleChangeToMeasureUnit = (value) => {
  //     let selected_ValueTypeID = 0;

  //     if (value > 0) {
  //       selected_ValueTypeID = measureUnits.find(
  //         (mu) => mu.MeasureUnitID === value
  //       ).ValueTypeID;

  //       // for text inpute we should have text value, otherwise we can allow empty string
  //       if (selected_ValueTypeID === 3)
  //         schema.ToUnitValue = Joi.string()
  //           .max(50)
  //           .required()
  //           .label(Words.to_measure_value)
  //           .regex(utils.VALID_REGEX);
  //       else
  //         schema.ToUnitValue = Joi.string()
  //           .allow("")
  //           .max(50)
  //           .required()
  //           .label(Words.to_measure_value)
  //           .regex(utils.VALID_REGEX);

  //       const rec = { ...record };
  //       rec.ToUnitID = value || 0;
  //       setRecord(rec);
  //     }

  //     setToValueTypeID(selected_ValueTypeID);
  //   };

  //-----------------

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      title={Words.product_feature}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      width={700}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.from_measure_unit}
              dataSource={fromMeasureUnits}
              keyColumn="FromUnitID"
              valueColumn="Title"
              formConfig={formConfig}
              //   onChange={handleChangeFromMeasureUnit}
              required
              autoFocus
            />
          </Col>

          <Col xs={24} md={12}>
            {/* {fromValueTypeID === 1 && (
              <NumericInputItem
                horizontal
                title={Words.from_measure_value}
                fieldName="FromUnitIntValue"
                min={0}
                max={999999}
                formConfig={formConfig}
                required
              />
            )} */}

            {/* {fromValueTypeID === 2 && (
                )} */}
            <NumericInputItem
              horizontal
              title={Words.from_measure_value}
              // fieldName="FromUnitDecimalValue"
              fieldName="FromUnitValue"
              min={0}
              max={999999}
              precision={4}
              maxLength={7}
              step="0.01"
              stringMode
              decimalText
              formConfig={formConfig}
              required
            />

            {/* {fromValueTypeID === 3 && (
              <InputItem
                title={Words.from_measure_value}
                fieldName="FromUnitValue"
                maxLength={50}
                formConfig={formConfig}
                required
              />
            )}

            {fromValueTypeID === 4 && (
              <SwitchItem
                title={Words.from_measure_value}
                fieldName="FromUnitBoolValue"
                initialValue={false}
                checkedTitle={Words.yes}
                unCheckedTitle={Words.no}
                formConfig={formConfig}
                required
              />
            )} */}
          </Col>

          {/* --------------------- */}

          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.to_measure_unit}
              dataSource={toMeasureUnits}
              keyColumn="ToUnitID"
              valueColumn="Title"
              formConfig={formConfig}
              //   onChange={handleChangeToMeasureUnit}
              required
              autoFocus
            />
          </Col>

          <Col xs={24} md={12}>
            {/* {toValueTypeID === 1 && (
              <NumericInputItem
                horizontal
                title={Words.to_measure_value}
                fieldName="ToUnitIntValue"
                min={0}
                max={999999}
                formConfig={formConfig}
                required
              />
            )} */}

            {/* {toValueTypeID === 2 && (
                )} */}
            <NumericInputItem
              horizontal
              title={Words.to_measure_value}
              fieldName="ToUnitValue"
              min={0}
              max={999999}
              precision={4}
              maxLength={7}
              step="0.01"
              stringMode
              decimalText
              formConfig={formConfig}
              required
            />

            {/* {toValueTypeID === 3 && (
              <InputItem
                title={Words.to_measure_value}
                fieldName="ToUnitValue"
                maxLength={50}
                formConfig={formConfig}
                required
              />
            )}

            {toValueTypeID === 4 && (
              <SwitchItem
                title={Words.to_measure_value}
                fieldName="ToUnitBoolValue"
                initialValue={false}
                checkedTitle={Words.yes}
                unCheckedTitle={Words.no}
                formConfig={formConfig}
                required
              />
            )} */}
          </Col>

          {/* --------------------- */}

          <Col xs={24} md={12}>
            <NumericInputItem
              horizontal
              title={Words.tolerance}
              fieldName="TolerancePercent"
              min={0}
              max={100}
              formConfig={formConfig}
            />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default UserProductMeasureUnitModal;
