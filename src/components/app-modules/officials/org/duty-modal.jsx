import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModaleChanges,
  //   handleError,
} from "../../../../tools/form-manager";
import DropdownItem from "./../../../form-controls/dropdown-item";
import TextItem from "./../../../form-controls/text-item";
import InputItem from "./../../../form-controls/input-item";
import service from "./../../../../services/official/org/duties-service";
import utils from "./../../../../tools/utils";

const schema = {
  DutyID: Joi.number().required(),
  EmployeeID: Joi.number().required().min(1),
  LevelID: Joi.number().required().min(1),
  Title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/)
    .label(Words.title),
  DetailsText: Joi.string()
    .allow("")
    .max(200)
    .regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/)
    .label(Words.descriptions),
};

const initRecord = {
  DutyID: 0,
  EmployeeID: 0,
  LevelID: 0,
  Title: "",
  DetailsText: "",
};

const formRef = React.createRef();

const DutyModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const [progress, setProgress] = useState(false);
  const [record, setRecord] = useState(initRecord);
  const [levels, setLevels] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.EmployeeID = 0;
    record.LevelID = 0;
    record.Title = "";
    record.DetailsText = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    initModal(formRef, selectedObject, setRecord);

    const data = await service.getParams();

    setLevels(data.Levels);
    setEmployees(data.Employees);
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
        <Row gutter={[5, 1]}>
          {isEdit && (
            <Col xs={24}>
              <TextItem
                title={Words.member}
                value={`${record.FirstName} ${record.LastName}`}
                valueColor={Colors.magenta[6]}
              />
            </Col>
          )}

          {!isEdit && (
            <Col xs={24}>
              <DropdownItem
                title={Words.employee}
                dataSource={employees}
                keyColumn="EmployeeID"
                valueColumn="FullName"
                formConfig={formConfig}
                required
              />
            </Col>
          )}
          <Col xs={24}>
            <DropdownItem
              title={Words.duty_level}
              dataSource={levels}
              keyColumn="LevelID"
              valueColumn="LevelTitle"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24}>
            <InputItem
              title={Words.title}
              fieldName="Title"
              required
              maxLength={100}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24}>
            <InputItem
              title={Words.descriptions}
              fieldName="DetailsText"
              multiline
              maxLength={200}
              formConfig={formConfig}
            />
          </Col>
          {isEdit && (
            <>
              <Col xs={24} ms={12}>
                <TextItem
                  title={Words.reg_member}
                  value={`${record.RegFirstName} ${record.RegLastName}`}
                  valueColor={Colors.magenta[6]}
                />
              </Col>
              <Col xs={24} md={12}>
                <TextItem
                  title={Words.reg_date_time}
                  value={utils.formattedDateTime(
                    record.RegDate,
                    record.RegTime
                  )}
                  valueColor={Colors.magenta[6]}
                />
              </Col>
            </>
          )}
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default DutyModal;
