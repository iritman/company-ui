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
import service from "../../../../../services/financial/treasury/basic-info/banks-service";
import InputItem from "../../../../form-controls/input-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";

const schema = {
  BankID: Joi.number().required(),
  BankTypeID: Joi.number().required(),
  Title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(utils.VALID_REGEX),
  PRTelNo: Joi.string()
    .min(2)
    .max(50)
    .allow("")
    .label(Words.pr_tel_no)
    .regex(utils.VALID_REGEX),
  Website: Joi.string()
    .min(6)
    .max(150)
    .allow("")
    .label(Words.website)
    .regex(utils.VALID_REGEX),
  SwiftCode: Joi.string()
    .min(2)
    .max(50)
    .allow("")
    .label(Words.pr_tel_no)
    .regex(utils.VALID_REGEX),
  DetailsText: Joi.string()
    .min(5)
    .max(512)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
};

const initRecord = {
  BankID: 0,
  BankTypeID: 0,
  Title: "",
  PRTelNo: "",
  Website: "",
  SwiftCode: "",
  DetailsText: "",
};

const formRef = React.createRef();

const BankModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [bankTypes, setBankTypes] = useState([]);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.BankTypeID = 0;
    record.Title = "";
    record.PRTelNo = "";
    record.Website = "";
    record.SwiftCode = "";
    record.DetailsText = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
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

      let { BankTypes } = data;

      setBankTypes(BankTypes);
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  });

  const isEdit = selectedObject !== null;

  const handleSubmit = async () => {
    saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

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
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24}>
            <InputItem
              title={Words.title}
              fieldName="Title"
              required
              autoFocus
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.bank_type}
              dataSource={bankTypes}
              keyColumn="BankTypeID"
              valueColumn="Title"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.pr_tel_no}
              fieldName="PRTelNo"
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.website}
              fieldName="Website"
              maxLength={150}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.swift_code}
              fieldName="SwiftCode"
              maxLength={50}
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
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default BankModal;
