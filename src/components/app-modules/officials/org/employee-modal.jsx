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
  handleError,
} from "../../../../tools/form-manager";
import DropdownItem from "./../../../form-controls/dropdown-item";
import TextItem from "./../../../form-controls/text-item";
import SwitchItem from "./../../../form-controls/switch-item";
import employeesService from "./../../../../services/org/employees-service";
import accessesService from "./../../../../services/app/accesses-service";

const schema = {
  EmployeeID: Joi.number().required(),
  MemberID: Joi.number().required().min(1),
  DepartmentID: Joi.number().required().min(1),
  RoleID: Joi.number().required().min(1),
  IsDepartmentManager: Joi.boolean(),
};

const initRecord = {
  EmployeeID: 0,
  MemberID: 0,
  DepartmentID: 0,
  RoleID: 0,
  IsDepartmentManager: false,
};

const formRef = React.createRef();

const EmployeeModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const [progress, setProgress] = useState(false);
  const [memberSearchProgress, setMemberSearchProgress] = useState(false);
  const [record, setRecord] = useState(initRecord);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [members, setMembers] = useState([]);
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
    record.MemberID = 0;
    record.DepartmentID = 0;
    record.RoleID = 0;
    record.IsDepartmentManager = false;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    initModal(formRef, selectedObject, setRecord);

    const data = await employeesService.getParams();

    setDepartments(data.Departments);
    setRoles(data.Roles);
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

  const handleSearchMembers = async (searchValue) => {
    setMemberSearchProgress(true);

    try {
      const data = await accessesService.searchMembers(
        "Employees",
        searchValue
      );

      setMembers(data);
    } catch (ex) {
      handleError(ex);
    }

    setMemberSearchProgress(false);
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
                title={Words.member}
                dataSource={members}
                keyColumn="MemberID"
                valueColumn="FullName"
                formConfig={formConfig}
                required
                loading={memberSearchProgress}
                onSearch={handleSearchMembers}
              />
            </Col>
          )}
          <Col xs={24}>
            <DropdownItem
              title={Words.department}
              dataSource={departments}
              keyColumn="DepartmentID"
              valueColumn="DepartmentTitle"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24}>
            <DropdownItem
              title={Words.role}
              dataSource={roles}
              keyColumn="RoleID"
              valueColumn="RoleTitle"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <SwitchItem
              title={Words.department_manager}
              fieldName="IsDepartmentManager"
              initialValue={false}
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

export default EmployeeModal;
