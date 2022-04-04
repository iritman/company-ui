import React from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../tools/form-manager";
import InputItem from "./../../../form-controls/input-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import {
  useModalContext,
  useResetContext,
} from "./../../../contexts/modal-context";
import service from "../../../../services/settings/timex/work-groups-service";

const schema = {
  GroupID: Joi.number().required(),
  Title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/),
  ShiftID: Joi.number().min(1).required(),
};

const initRecord = {
  GroupID: 0,
  Title: "",
  ShiftID: 0,
};

const formRef = React.createRef();

const WorkGroupModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const {
    progress,
    setProgress,
    record,
    setRecord,
    errors,
    setErrors,
    workShifts,
    setWorkShifts,
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
    record.ShiftID = 0;

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

      const { WorkShifts } = data;

      setWorkShifts(WorkShifts);
    } catch (err) {
      handleError(err);
    }
    setProgress(false);
  });

  const handleSubmit = async () => {
    saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  const isEdit = selectedObject !== null;

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
        <Row gutter={[10, 5]} style={{ marginLeft: 1 }}>
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
          <Col xs={24}>
            <DropdownItem
              title={Words.work_shift}
              dataSource={workShifts}
              keyColumn="ShiftID"
              valueColumn="ShiftInfo"
              formConfig={formConfig}
              required
            />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default WorkGroupModal;
