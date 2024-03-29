import React from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Button, Modal, Popconfirm } from "antd";
import {
  QuestionCircleOutlined as QuestionIcon,
  CheckOutlined as CheckIcon,
} from "@ant-design/icons";
import Joi from "joi-browser";
import Words from "../../../../resources/words";
import utils from "../../../../tools/utils";
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
import SwitchItem from "../../../form-controls/switch-item";

const schema = {
  IsAccepted: Joi.boolean(),
  VehicleApproved: Joi.boolean(),
  HotelingApproved: Joi.boolean(),
  DetailsText: Joi.string()
    .allow("")
    .max(512)
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
  TransmissionDetailsText: Joi.string()
    .allow("")
    .max(512)
    .regex(utils.VALID_REGEX)
    .label(Words.transmission_descriptions),
};

const initRecord = {
  IsAccepted: false,
  VehicleApproved: false,
  HotelingApproved: false,
  DetailsText: "",
  TransmissionDetailsText: "",
};

const formRef = React.createRef();

const UserMembersNewMissionsCheckOfficialResponseModal = ({
  isOpen,
  mission,
  onOk,
  onCancel,
}) => {
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
    record.IsAccepted = false;
    record.VehicleApproved = false;
    record.HotelingApproved = false;
    record.DetailsText = "";
    record.TransmissionDetailsText = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();

    setRecord(initRecord);
    initModal(formRef, initRecord, setRecord);
  });

  const handleSubmit = async (record) => {
    setProgress(true);

    try {
      record.MissionID = mission.MissionID;
      if (!record.VehicleApproved) record.TransmissionDetailsText = "";

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
      <Popconfirm
        title={Words.questions.sure_to_submit_response}
        onConfirm={async () => await handleSubmit(record)}
        okText={Words.yes}
        cancelText={Words.no}
        icon={<QuestionIcon style={{ color: "red" }} />}
        key="submit-confirm"
        disabled={disabled}
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
      </Popconfirm>,

      <Button key="clear-button" onClick={clearRecord}>
        {Words.clear}
      </Button>,

      <Button key="close-button" onClick={onOk}>
        {Words.close}
      </Button>,
    ];

    return footerButtons;
  };

  return (
    <Modal
      open={isOpen}
      maskClosable={false}
      centered={true}
      title={Words.newInfo}
      footer={getFooterButtons()}
      onCancel={onCancel}
      width={750}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={12}>
            <SwitchItem
              title={Words.your_response}
              fieldName="IsAccepted"
              initialValue={false}
              checkedTitle={Words.im_accept_request}
              unCheckedTitle={Words.im_not_accept_request}
              formConfig={formConfig}
              autoFocus
            />
          </Col>
          {record.IsAccepted && (
            <>
              {mission.NeedVehicle && (
                <Col xs={24}>
                  <SwitchItem
                    title={Words.need_vehicle}
                    fieldName="VehicleApproved"
                    initialValue={false}
                    checkedTitle={Words.approved_and_reg_vehicle_request}
                    unCheckedTitle={Words.reject_request}
                    formConfig={formConfig}
                    autoFocus
                  />
                </Col>
              )}
              {mission.NeedHoteling && (
                <Col xs={24}>
                  <SwitchItem
                    title={Words.need_hoteling}
                    fieldName="HotelingApproved"
                    initialValue={false}
                    checkedTitle={Words.accept_request}
                    unCheckedTitle={Words.reject_request}
                    formConfig={formConfig}
                    autoFocus
                  />
                </Col>
              )}
            </>
          )}
          <Col xs={24}>
            <InputItem
              horizontal
              title={Words.descriptions}
              fieldName="DetailsText"
              formConfig={formConfig}
              multiline
              rows={7}
              maxLength={512}
              showCount
            />
          </Col>
          {record.VehicleApproved && (
            <Col xs={24}>
              <InputItem
                vertical
                title={Words.transmission_descriptions}
                fieldName="TransmissionDetailsText"
                formConfig={formConfig}
                multiline
                rows={7}
                maxLength={512}
                showCount
              />
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export default UserMembersNewMissionsCheckOfficialResponseModal;
