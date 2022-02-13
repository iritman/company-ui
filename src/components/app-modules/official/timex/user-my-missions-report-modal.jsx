import React from "react";
import { useMount } from "react-use";
import {
  Form,
  Row,
  Col,
  Button,
  Modal,
  Popconfirm,
  Collapse,
  Alert,
  Tag,
  Typography,
} from "antd";
import {
  QuestionCircleOutlined as QuestionIcon,
  CheckOutlined as CheckIcon,
  CalendarOutlined as CalendarIcon,
  ClockCircleOutlined as ClockIcon,
  CheckCircleOutlined as ApprovedIcon,
  CloseCircleOutlined as CloseIcon,
  FieldTimeOutlined as WaitingIcon,
} from "@ant-design/icons";
import Joi from "joi-browser";
import Words from "../../../../resources/words";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  handleError,
} from "../../../../tools/form-manager";
import {
  useModalContext,
  useResetContext,
} from "../../../contexts/modal-context";
import InputItem from "../../../form-controls/input-item";
import Colors from "../../../../resources/colors";
import utils from "../../../../tools/utils";

const { Panel } = Collapse;
const { Text } = Typography;

const schema = {
  DetailsText: Joi.string()
    .max(1024)
    .regex(/^[آ-یa-zA-Z0-9.\-()\s]+$/)
    .required()
    .label(Words.report_text),
};

const initRecord = {
  DetailsText: "",
};

const formRef = React.createRef();

const UserMyMissionsReportModal = ({ isOpen, mission, onOk, onCancel }) => {
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

  const clearRecord = async () => {
    record.DetailsText = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(() => {
    resetContext();

    setRecord(initRecord);
    initModal(formRef, initRecord, setRecord);
  });

  const handleSubmit = async (record) => {
    setProgress(true);

    try {
      record.MissionID = mission.MissionID;
      await onOk(record);
      onCancel();
    } catch (err) {
      handleError(err);
      setProgress(false);
    }
  };

  const disabled = validateForm({ record, schema }) && true;

  const getFooterButtons = () => {
    let footerButtons = [
      <>
        {mission.CanRegReport && (
          <Popconfirm
            title={Words.questions.sure_to_submit_report}
            onConfirm={async () => await handleSubmit(record)}
            okText={Words.yes}
            cancelText={Words.no}
            icon={<QuestionIcon style={{ color: "red" }} />}
            key="submit-confirm"
          >
            <Button
              type="primary"
              icon={<CheckIcon />}
              danger
              loading={progress}
              disabled={disabled}
            >
              {Words.submit}
            </Button>
          </Popconfirm>
        )}
      </>,

      <>
        {mission.CanRegReport && (
          <Button key="clear-button" onClick={clearRecord}>
            {Words.clear}
          </Button>
        )}
      </>,

      <Button key="close-button" onClick={onOk}>
        {Words.close}
      </Button>,
    ];

    return footerButtons;
  };

  return (
    <Modal
      visible={isOpen}
      maskClosable={false}
      centered={true}
      title={Words.mission_report}
      footer={getFooterButtons()}
      onCancel={onCancel}
      width={750}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24}>
            <Form.Item>
              {mission.ReportInfo.length > 0 ? (
                <Collapse accordion>
                  {mission.ReportInfo.map((report) => (
                    <Panel
                      header={
                        <>
                          <Tag icon={<CalendarIcon />} color="processing">
                            {`${utils.weekDayNameFromText(
                              report.RegDate
                            )} ${utils.farsiNum(
                              utils.slashDate(report.RegDate)
                            )}`}
                          </Tag>
                          <Tag icon={<ClockIcon />} color="processing">
                            {utils.farsiNum(utils.colonTime(report.RegTime))}
                          </Tag>

                          {report.IsAccepted ? (
                            <Tag icon={<ApprovedIcon />} color="success">
                              {Words.accepted}
                            </Tag>
                          ) : report.ManagerMemberID > 0 ? (
                            <Tag icon={<CloseIcon />} color="error">
                              {Words.rejected}
                            </Tag>
                          ) : (
                            <Tag icon={<WaitingIcon />} color="warning">
                              {Words.in_progress}
                            </Tag>
                          )}
                        </>
                      }
                      key="1"
                    >
                      <Text
                        style={{
                          color: Colors.purple[7],
                          whiteSpace: "pre-line",
                        }}
                      >
                        {utils.farsiNum(report.DetailsText)}
                      </Text>
                    </Panel>
                  ))}
                </Collapse>
              ) : (
                <Alert
                  message={Words.messages.no_report_submitted_yet}
                  type="warn"
                  showIcon
                />
              )}
            </Form.Item>
          </Col>

          {mission.CanRegReport && (
            <Col xs={24}>
              <InputItem
                horizontal
                title={Words.report_text}
                fieldName="DetailsText"
                formConfig={formConfig}
                multiline
                rows={10}
                maxLength={1024}
                showCount
              />
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export default UserMyMissionsReportModal;
