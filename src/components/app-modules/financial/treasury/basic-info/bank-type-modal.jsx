import React from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../../common/modal-window";
import Words from "../../../../../resources/words";
import utils from "../../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
} from "../../../../../tools/form-manager";
import InputItem from "./../../../../form-controls/input-item";
import {
  useModalContext,
  useResetContext,
} from "./../../../../contexts/modal-context";

const schema = {
  BankTypeID: Joi.number().required(),
  Title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(utils.VALID_REGEX),
};

const initRecord = {
  BankTypeID: 0,
  Title: "",
};

const formRef = React.createRef();

const BankTypeModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.Title = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    loadFieldsValue(formRef, initRecord);
    initModal(formRef, selectedObject, setRecord);
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
      width={650}
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
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default BankTypeModal;
