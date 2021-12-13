import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModaleChanges,
} from "../../../../tools/form-manager";
import InputItem from "./../../../form-controls/input-item";

const schema = {
  RoleID: Joi.number().required(),
  RoleTitle: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/),
};

const initRecord = {
  RoleID: 0,
  RoleTitle: "",
};

const formRef = React.createRef();

const RoleModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const [progress, setProgress] = useState(false);
  const [record, setRecord] = useState(initRecord);
  const [errors, setErrors] = useState({});

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.RoleTitle = "";
    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(() => {
    initModal(formRef, selectedObject, setRecord);
  });

  const isEdit = selectedObject !== null;

  const handleSubmit = async () => {
    saveModaleChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={1}>
          <Col xs={24}>
            <InputItem
              title={Words.title}
              fieldName="RoleTitle"
              required
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default RoleModal;
