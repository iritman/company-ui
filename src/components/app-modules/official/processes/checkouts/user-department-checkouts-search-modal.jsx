import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "../../../../common/modal-window";
import Words from "../../../../../resources/words";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  handleError,
} from "../../../../../tools/form-manager";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import service from "../../../../../services/official/processes/user-department-checkouts-service";
import DropdownItem from "./../../../../form-controls/dropdown-item";
import DateItem from "../../../../form-controls/date-item";

const schema = {
  CheckoutMemberID: Joi.number(),
  FinalStatusID: Joi.number(),
  FromDate: Joi.string().allow(""),
  ToDate: Joi.string().allow(""),
};

const initRecord = {
  CheckoutMemberID: 0,
  FinalStatusID: 0,
  FromDate: "",
  ToDate: "",
};

const formRef = React.createRef();

const UserDepartmentCheckoutsSearchModal = ({
  isOpen,
  filter,
  onOk,
  onCancel,
}) => {
  const [finalStatuses, setFinalStatuses] = useState([]);
  const [checkoutMembers, setCheckoutMembers] = useState([]);

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
    record.CheckoutMemberID = 0;
    record.FinalStatusID = 0;
    record.FromDate = "";
    record.ToDate = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  const setMembers = (employees, column_id, set_func) => {
    let members = [];
    employees.forEach((member) => {
      members.push({
        [column_id]: member.MemberID,
        FullName: member.FullName,
      });
    });
    set_func(members);
  };

  useMount(async () => {
    resetContext();

    setRecord(initRecord);
    initModal(formRef, filter, setRecord);

    setProgress(true);
    try {
      const data = await service.getParams();

      const { Employees } = data;

      console.log(Employees);

      setMembers(Employees, "CheckoutMemberID", setCheckoutMembers);

      setFinalStatuses([
        { FinalStatusID: 1, Title: Words.in_progress },
        { FinalStatusID: 2, Title: Words.accepted },
        { FinalStatusID: 3, Title: Words.rejected },
      ]);
    } catch (err) {
      handleError(err);
    }
    setProgress(false);
  });

  return (
    <ModalWindow
      isOpen={isOpen}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      searchModal
      onClear={clearRecord}
      onSubmit={async () => await onOk(record)}
      onCancel={onCancel}
      width={750}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[10, 5]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.employee}
              dataSource={checkoutMembers}
              keyColumn="CheckoutMemberID"
              valueColumn="FullName"
              formConfig={formConfig}
              autoFocus
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.status}
              dataSource={finalStatuses}
              keyColumn="FinalStatusID"
              valueColumn="Title"
              formConfig={formConfig}
              autoFocus
            />
          </Col>
          <Col xs={24} md={12}>
            <DateItem
              horizontal
              title={Words.from_date}
              fieldName="FromDate"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DateItem
              horizontal
              title={Words.to_date}
              fieldName="ToDate"
              formConfig={formConfig}
            />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default UserDepartmentCheckoutsSearchModal;
