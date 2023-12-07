import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "../../../../common/modal-window";
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
import service from "../../../../../services/financial/store-operations/product-requests-service";
import InputItem from "../../../../form-controls/input-item";
import NumericInputItem from "../../../../form-controls/numeric-input-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import TextItem from "../../../../form-controls/text-item";

const schema = {
  ItemID: Joi.number().required(),
  RequestID: Joi.number().required(),
  ProductID: Joi.number().required().min(1),
  MeasureUnitID: Joi.number().min(1).required().label(Words.measure_unit),
  RequestCount: Joi.number()
    .min(0)
    .max(999999)
    .positive()
    .precision(2)
    .label(Words.request_count),
  DetailsText: Joi.string()
    .min(5)
    .max(250)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
  StatusID: Joi.number().min(1),
};

const initRecord = {
  ItemID: 0,
  RequestID: 0,
  ProductID: 0,
  MeasureUnitID: 0,
  RequestCount: 0,
  DetailsText: "",
  StatusID: 1,
};

const formRef = React.createRef();

const ProductRequestItemModal = ({
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  setParams,
}) => {
  const [progress, setProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [record, setRecord] = useState({});

  const [products, setProducts] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.ProductID = 0;
    record.MeasureUnitID = 0;
    record.RequestCount = 0;
    record.DetailsText = "";
    record.StatusID = 1;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    setProgress(true);

    try {
      const data = await service.getItemParams();

      let { Products, Statuses } = data;

      setParams({
        Products,
        Statuses,
      });

      setProducts(Products);
      setStatuses(Statuses);

      if (!selectedObject) {
        const rec = { ...initRecord };

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

  const handleChangeProduct = (value) => {
    const rec = { ...record };
    rec.ProductID = value || 0;

    const measure_units = products?.find(
      (product) => product.ProductID === value
    )?.MeasureUnits;

    const default_measure_unit = measure_units?.find((mu) => mu.IsDefault);

    rec.MeasureUnitID = default_measure_unit
      ? default_measure_unit.MeasureUnitID
      : 0;

    setRecord(rec);
    loadFieldsValue(formRef, rec);
  };

  const getMeasureUnits = () => {
    return products?.find((product) => product.ProductID === record.ProductID)
      ?.MeasureUnits;
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
      width={950}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.product}
              dataSource={products}
              keyColumn="ProductID"
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
              keyColumn="MeasureUnitID"
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
            {selectedObject && selectedObject.ItemID > 0 ? (
              <DropdownItem
                title={Words.status}
                dataSource={statuses}
                keyColumn="StatusID"
                valueColumn="Title"
                formConfig={formConfig}
              />
            ) : (
              <TextItem
                title={Words.status}
                value={Words.product_request_status_1}
                valueColor={Colors.magenta[6]}
              />
            )}
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

export default ProductRequestItemModal;
