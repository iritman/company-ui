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
import service from "../../../../../services/logistic/purchase/service-requests-service";
import InputItem from "../../../../form-controls/input-item";
import NumericInputItem from "../../../../form-controls/numeric-input-item";
import DateItem from "../../../../form-controls/date-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import TextItem from "../../../../form-controls/text-item";

const schema = {
  ItemID: Joi.number().required(),
  RequestID: Joi.number().required(),
  BaseTypeID: Joi.number().min(1).required().label(Words.base_type),
  BaseID: Joi.number().required().label(Words.base),
  ServiceID: Joi.number().min(1).required().label(Words.service),
  RequestCount: Joi.number()
    .min(0)
    .max(999999)
    .positive()
    .precision(2)
    .label(Words.request_count),
  NeedDate: Joi.string(),
  PurchaseTypeID: Joi.number().min(1).required().label(Words.purchase_type),
  InquiryDeadline: Joi.string().allow(""),
  SupplierID: Joi.number().required().label(Words.supplier),
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
  ServiceID: 0,
  RequestCount: 0,
  NeedDate: "",
  PurchaseTypeID: 0,
  InquiryDeadline: "",
  SupplierID: 0,
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
  const [services, setServices] = useState([]);
  const [purchaseTypes, setPurchaseTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [agents, setAgents] = useState([]);

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
    record.ServiceID = 0;
    record.RequestCount = 0;
    record.NeedDate = "";
    record.PurchaseTypeID = 0;
    record.InquiryDeadline = "";
    record.SupplierID = 0;
    record.PurchaseAgentID = 0;
    record.DetailsText = "";

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
      const data = await service.getItemParams();

      let { BaseTypes, Services, PurchaseTypes, Suppliers, Agents } = data;

      setParams({
        BaseTypes,
        Services,
        PurchaseTypes,
        Suppliers,
        Agents,
      });

      setBaseTypes(BaseTypes);
      setServices(Services);
      setPurchaseTypes(PurchaseTypes);
      setSuppliers(Suppliers);
      setAgents(Agents);
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
    rec.BaseTypeID = value;

    if (value > 1) {
      schema.BaseID = Joi.number().min(1).required().label(Words.base);
    } else {
      schema.BaseID = Joi.number().required().label(Words.base);
    }

    setBases([]);

    setRecord(rec);
  };

  const getServiceMeasureUnitTitle = () => {
    let result = "-";

    if (record?.ServiceID > 0) {
      const product = services.find((p) => p.ServiceID === record.ServiceID);

      if (product) {
        result =
          product.MeasureUnitTitle.length > 0 ? product.MeasureUnitTitle : "-";
      }
    }

    return result;
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
              title={Words.service}
              dataSource={services}
              keyColumn="ServiceID"
              valueColumn="ServiceTitle"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <TextItem
              title={Words.measure_unit}
              value={getServiceMeasureUnitTitle()}
              valueColor={Colors.magenta[6]}
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
              title={Words.inquiry_deadline}
              fieldName="InquiryDeadline"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.supplier}
              dataSource={suppliers}
              keyColumn="SupplierID"
              valueColumn="Title"
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
              rows={7}
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
