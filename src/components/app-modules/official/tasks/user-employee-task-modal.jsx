import React from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Tag, Popover, Button } from "antd";
import {
  TagsOutlined as TagIcon,
  EyeOutlined as EyeIcon,
} from "@ant-design/icons";
import Joi from "joi-browser";
import ModalWindow from "../../../common/modal-window";
import Words from "../../../../resources/words";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
} from "../../../../tools/form-manager";
import InputItem from "./../../../form-controls/input-item";
import DateItem from "./../../../form-controls/date-item";
import TimeItem from "./../../../form-controls/time-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import {
  useModalContext,
  useResetContext,
} from "../../../contexts/modal-context";
import service from "../../../../services/official/tasks/employees-tasks-service";
import { handleError } from "./../../../../tools/form-manager";
import SupervisorsPopupContent from "./supervisors-popup-content";
import TagsPopupContent from "./tags-popup-content";
import utils from "../../../../tools/utils";

const schema = {
  TaskID: Joi.number().required(),
  Title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/),
  DetailsText: Joi.string().allow("").max(512),
  MemberID: Joi.number(),
  ReminderDate: Joi.string(),
  ReminderTime: Joi.string(),
  Tags: Joi.array(),
  Supervisors: Joi.array(),
  Files: Joi.array(),
};

const initRecord = {
  TaskID: 0,
  Title: "",
  DetailsText: "",
  MemberID: 0,
  ReminderDate: "",
  ReminderTime: "",
  Tags: [],
  Supervisors: [],
  Files: [],
};

const formRef = React.createRef();

const UserEmployeeTaskModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const {
    progress,
    setProgress,
    record,
    setRecord,
    tags,
    setTags,
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
    record.TaskID = 0;
    record.Title = "";
    record.DetailsText = "";
    record.MemberID = 0;
    record.ReminderDate = "";
    record.ReminderTime = "";
    record.Tags = [];
    record.Supervisors = [];
    record.Files = [];

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

      const { Tags, Employees } = data;

      setTags(Tags);
      setEmployees(Employees);
    } catch (ex) {
      handleError(ex);
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

  const handleSelectTag = (tag) => {
    const rec = { ...record };
    rec.Tags = [...rec.Tags, tag];

    setRecord(rec);
  };

  const handleRemoveTag = (tag) => {
    const rec = { ...record };
    rec.Tags = rec.Tags.filter((t) => t.TagID !== tag.TagID);

    setRecord(rec);
  };

  const handleSelectSupervisor = (supervisor) => {
    const rec = { ...record };
    rec.Supervisors = [...rec.Supervisors, supervisor];

    setRecord(rec);
  };

  const handleRemoveSupervisor = (supervisor) => {
    const rec = { ...record };
    rec.Supervisors = rec.Supervisors.filter(
      (s) => s.MemberID !== supervisor.MemberID
    );

    setRecord(rec);
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
          <Col xs={24} md={12}>
            <DateItem
              horizontal
              title={Words.reminder_date}
              fieldName="ReminderDate"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <TimeItem
              horizontal
              title={Words.reminder_time}
              fieldName="ReminderTime"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24}>
            <DropdownItem
              title={Words.task_responsible}
              dataSource={employees}
              keyColumn="MemberID"
              valueColumn="FullName"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={5}>
            <Form.Item>
              {record.Supervisors && (
                <Popover
                  content={
                    <SupervisorsPopupContent
                      supervisors={employees.filter(
                        (e) => e.MemberID !== record.MemberID
                      )}
                      selectedSupervisors={record.Supervisors}
                      onClick={handleSelectSupervisor}
                    />
                  }
                  title={Words.supervisors}
                  trigger="click"
                >
                  <Button
                    icon={<EyeIcon style={{ fontSize: 16 }} />}
                    type={record.Supervisors.length > 0 ? "primary" : "default"}
                  >
                    {`${Words.supervisors}${
                      record.Supervisors.length > 0
                        ? utils.farsiNum(
                            ` (${record.Supervisors.length} ${Words.person})`
                          )
                        : ""
                    }`}
                  </Button>
                </Popover>
              )}
            </Form.Item>
          </Col>
          <Col xs={24} md={19}>
            <Form.Item>
              {record.Supervisors?.map((supervisor) => (
                <Tag
                  key={supervisor.MemberID}
                  color="magenta"
                  closable
                  onClose={() => handleRemoveSupervisor(supervisor)}
                  style={{ margin: 5 }}
                >
                  {supervisor.FullName}
                </Tag>
              ))}
            </Form.Item>
          </Col>
          <Col xs={24} md={5}>
            <Form.Item>
              <Popover
                content={
                  <TagsPopupContent
                    tags={tags}
                    selectedTags={record.Tags}
                    onClick={handleSelectTag}
                  />
                }
                title={Words.tags}
                trigger="click"
              >
                <Button icon={<TagIcon style={{ fontSize: 16 }} />}>
                  {Words.tags}
                </Button>
              </Popover>
            </Form.Item>
          </Col>
          <Col xs={24} md={19}>
            <Form.Item>
              {record.Tags?.map((tag) => (
                <Tag
                  key={tag.TagID}
                  color={tag.Color}
                  closable
                  onClose={() => handleRemoveTag(tag)}
                  style={{ margin: 5 }}
                >
                  {tag.Title}
                </Tag>
              ))}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default UserEmployeeTaskModal;
