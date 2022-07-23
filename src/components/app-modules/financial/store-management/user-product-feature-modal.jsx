import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
import utils from "../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
} from "../../../../tools/form-manager";
import InputItem from "./../../../form-controls/input-item";
import NumericInputItem from "./../../../form-controls/numeric-input-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import SwitchItem from "./../../../form-controls/switch-item";
import {
  useModalContext,
  useResetContext,
} from "./../../../contexts/modal-context";

const schema = {
  PFID: Joi.number().required(),
  ProductID: Joi.number().required(),
  FeatureID: Joi.number().min(1).required(),
  FeatureValue: Joi.string()
    .max(50)
    .required()
    .label(Words.value)
    .regex(utils.VALID_REGEX),
  FeatureIntValue: Joi.number().integer().min(0).max(999999).label(Words.value),
  FeatureDecimalValue: Joi.number()
    .min(0)
    .max(999999)
    .positive()
    .allow(0)
    .precision(4)
    .label(Words.value),
  FeatureBoolValue: Joi.boolean().label(Words.value),
};

const initRecord = (productID) => {
  return {
    PFID: 0,
    ProductID: productID,
    FeatureID: 0,
    FeatureValue: "",
    FeatureIntValue: 0,
    FeatureDecimalValue: 0,
    FeatureBoolValue: false,
  };
};

const formRef = React.createRef();

const UserProductFeatureModal = ({
  isOpen,
  product,
  selectedFeature,
  features,
  onOk,
  onCancel,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [valueTypeID, setValueTypeID] = useState(0);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.FeatureID = 0;
    record.FeatureValue = "";
    record.FeatureIntValue = 0;
    record.FeatureDecimalValue = 0;
    record.FeatureBoolValue = false;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord(product.ProductID));

    initModal(formRef, selectedFeature, setRecord);

    if (selectedFeature !== null) {
      setValueTypeID(selectedFeature.ValueTypeID);

      const completePropsFeature = { ...selectedFeature };
      completePropsFeature.ProductID = product.ProductID;
      completePropsFeature.FeatureIntValue =
        completePropsFeature.ValueTypeID === 1
          ? parseInt(completePropsFeature.FeatureValue)
          : 0;
      completePropsFeature.FeatureDecimalValue =
        completePropsFeature.ValueTypeID === 2
          ? parseFloat(completePropsFeature.FeatureValue)
          : 0;
      completePropsFeature.FeatureBoolValue =
        completePropsFeature.ValueTypeID === 4
          ? completePropsFeature.FeatureValue === "1"
          : false;

      initModal(formRef, completePropsFeature, setRecord);
    }
  });

  const isEdit = selectedFeature !== null;

  const handleSubmit = async () => {
    await saveModalChanges(
      formConfig,
      selectedFeature,
      setProgress,
      onOk,
      clearRecord
    );

    onCancel();
  };

  const handleChangeFeature = (value) => {
    const selected_ValueTypeID = features.find(
      (f) => f.FeatureID === value
    ).ValueTypeID;

    setValueTypeID(selected_ValueTypeID);

    // for text inpute we should have text value, otherwise we can allow empty string
    if (selected_ValueTypeID === 3)
      schema.FeatureValue = Joi.string()
        .max(50)
        .required()
        .label(Words.value)
        .regex(utils.VALID_REGEX);
    else
      schema.FeatureValue = Joi.string()
        .allow("")
        .max(50)
        .required()
        .label(Words.value)
        .regex(utils.VALID_REGEX);

    const rec = { ...record };
    rec.FeatureID = value || 0;
    setRecord(rec);
  };

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
      width={600}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24}>
            <DropdownItem
              title={Words.feature}
              dataSource={features}
              keyColumn="FeatureID"
              valueColumn="Title"
              formConfig={formConfig}
              onChange={handleChangeFeature}
              required
              autoFocus
            />
          </Col>

          {valueTypeID === 1 && (
            <Col xs={24}>
              <NumericInputItem
                horizontal
                title={Words.value}
                fieldName="FeatureIntValue"
                min={0}
                max={999999}
                formConfig={formConfig}
                required
              />
            </Col>
          )}

          {valueTypeID === 2 && (
            <Col xs={24}>
              <NumericInputItem
                horizontal
                title={Words.value}
                fieldName="FeatureDecimalValue"
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
            </Col>
          )}

          {valueTypeID === 3 && (
            <Col xs={24}>
              <InputItem
                title={Words.value}
                fieldName="FeatureValue"
                maxLength={50}
                formConfig={formConfig}
                required
              />
            </Col>
          )}

          {valueTypeID === 4 && (
            <Col xs={24}>
              <SwitchItem
                title={Words.value}
                fieldName="FeatureBoolValue"
                initialValue={false}
                checkedTitle={Words.yes}
                unCheckedTitle={Words.no}
                formConfig={formConfig}
                required
              />
            </Col>
          )}
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default UserProductFeatureModal;
