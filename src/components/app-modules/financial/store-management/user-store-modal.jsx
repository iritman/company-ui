import React from "react";
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
import SwitchItem from "./../../../form-controls/switch-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import { handleError } from "./../../../../tools/form-manager";
import {
  useModalContext,
  useResetContext,
} from "./../../../contexts/modal-context";
import service from "../../../../services/financial/store-mgr/user-stores-service";

const schema = {
  StoreID: Joi.number().required(),
  Title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(utils.VALID_REGEX),
  ManagerMemberID: Joi.number().min(1).required().label(Words.store_manager),
  TafsilID: Joi.number(),
  IsActive: Joi.boolean(),
};

const initRecord = {
  StoreID: 0,
  Title: "",
  ManagerMemberID: 0,
  TafsilID: 0,
  IsActive: true,
};

const formRef = React.createRef();

const UserStoreModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const {
    progress,
    setProgress,
    record,
    setRecord,
    employees,
    setEmployees,
    errors,
    setErrors,
  } = useModalContext();

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
    record.ManagerMemberID = 0;
    record.TafsilID = 0;
    record.IsActive = true;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);

    setProgress(true);

    try {
      const data = await service.getParams();

      const { Employees } = data;

      setEmployees(Employees);
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

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      width={700}
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
          <Col xs={24} md={18}>
            <DropdownItem
              title={Words.store_manager}
              dataSource={employees}
              keyColumn="ManagerMemberID"
              valueColumn="FullName"
              formConfig={formConfig}
              autoFocus
            />
          </Col>
          <Col xs={12} md={6}>
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
      </Form>
    </ModalWindow>
  );
};

export default UserStoreModal;
