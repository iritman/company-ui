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
import SwitchItem from "./../../../form-controls/switch-item";
// import TextItem from "./../../../form-controls/text-item";
import accessesService from "./../../../../services/app/accesses-service";

const schema = {
  AgentID: Joi.number().required(),
  MemberID: Joi.number().required().min(1),
  CompanyID: Joi.number().required().min(1),
  IsActive: Joi.boolean(),
};

const initRecord = {
  AgentID: 0,
  MemberID: 0,
  CompanyID: 0,
  IsActive: true,
};

const formRef = React.createRef();

const CompanyAgentModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const [progress, setProgress] = useState(false);
  const [memberSearchProgress, setMemberSearchProgress] = useState(false);
  const [companySearchProgress, setCompanySearchProgress] = useState(false);
  const [record, setRecord] = useState(initRecord);
  const [companies, setCompanies] = useState([]);
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
    record.AgentID = 0;
    record.MemberID = 0;
    record.CompanyID = 0;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    initModal(formRef, selectedObject, setRecord);

    if (isEdit) {
      const {
        CompanyID,
        CompanyTitle,
        RegNo,
        MemberID,
        FirstName,
        LastName,
        NationalCode,
      } = selectedObject;
      setCompanies([{ CompanyID, CompanyTitle: `${CompanyTitle} (${RegNo})` }]);
      setMembers([
        {
          MemberID,
          FullName: `${FirstName} ${LastName} (${NationalCode})`,
        },
      ]);
    }
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
      const data_members = await accessesService.searchMembers(
        "CompanyAgents",
        searchValue
      );

      setMembers(data_members);
    } catch (ex) {
      handleError(ex);
    }

    setMemberSearchProgress(false);
  };

  const handleSearchCompanies = async (searchValue) => {
    setCompanySearchProgress(true);

    try {
      const data_companies = await accessesService.searchCompanies(
        "CompanyAgents",
        searchValue
      );

      setCompanies(data_companies);
    } catch (ex) {
      handleError(ex);
    }

    setCompanySearchProgress(false);
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
          {/* {isEdit && (
            <Col xs={24}>
              <TextItem
                title={Words.member}
                value={`${record.FirstName} ${record.LastName}`}
                valueColor={Colors.magenta[6]}
              />
            </Col>
          )} */}
          <Col xs={24}>
            <DropdownItem
              title={Words.company}
              dataSource={companies}
              keyColumn="CompanyID"
              valueColumn="CompanyTitle"
              formConfig={formConfig}
              required
              loading={companySearchProgress}
              onSearch={handleSearchCompanies}
            />
          </Col>
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
          <Col xs={24} md={12}>
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

export default CompanyAgentModal;
