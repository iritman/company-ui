import React, { useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Space,
  Alert,
  Steps,
  Descriptions,
} from "antd";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import utils from "../../../../tools/utils";
import MemberProfileImage from "../../../common/member-profile-image";

const { Text } = Typography;
const { Step } = Steps;

const UserMyVacationDetailsModal = ({ vacation, isOpen, onOk }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (current) => {
    console.log(current);
    setCurrentStep(current);
  };

  const valueColor = Colors.blue[7];

  const {
    VacationID,
    MemberID,
    FirstName,
    LastName,
    PicFileName,
    RegDate,
    RegTime,
    DetailsText,
    VacationTypeID,
    VacationTypeTitle,
    FormatID,
    StartDate,
    FinishDate,
    StartTime,
    FinishTime,
    // -----------------------
    SwapMemberID,
    SwapMemberFirstName,
    SwapMemberLastName,
    SwapIsAccepted,
    SwapResponseDate,
    SwapResponseTime,
    SwapDetailsText,
    // -----------------------
    ManagerMemberID,
    ManagerMemberFirstName,
    ManagerMemberLastName,
    ManagerSelectedSwapMemberID,
    ManagerSelectedSwapMemberSeenDate,
    ManagerSelectedSwapMemberSeenTime,
    ManagerIsAccepted,
    ManagerResponseDate,
    ManagerResponseTime,
    ManagerDetailsText,
    // -----------------------
    OfficialMemberID,
    OfficialMemberFirstName,
    OfficialMemberLastName,
    OfficialIsAccepted,
    OfficialResponseDate,
    OfficialResponseTime,
    OfficialDetailsText,
    // -----------------------
    FinalStatusID,
  } = vacation;

  const steps = [
    {
      title: Words.request_info,
      status: "finish",
    },
    {
      title: Words.swap_member_response,
      status: SwapResponseDate.length > 0 ? "finish" : "wait",
    },
    {
      title: Words.manager_response,
      status: ManagerResponseDate.length > 0 ? "finish" : "wait",
    },
    {
      title: Words.official_response,
      status: OfficialResponseDate.length > 0 ? "finish" : "wait",
    },
  ];

  return (
    <Modal
      visible={isOpen}
      maskClosable={false}
      centered={true}
      title={Words.more_details}
      footer={[
        <Button key="submit-button" type="primary" onClick={onOk}>
          {Words.confirm}
        </Button>,
      ]}
      onCancel={onOk}
      width={750}
    >
      <section>
        <article
          id="info-content"
          className="scrollbar-normal"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <Row gutter={[10, 10]}>
            <Col xs={24}>
              <Alert
                message={
                  <Space>
                    <MemberProfileImage fileName={PicFileName} />
                    <Text>{`${FirstName} ${LastName}`}</Text>
                  </Space>
                }
                type="info"
              />
            </Col>
            <Col xs={24}>
              <Steps current={currentStep} onChange={handleStepChange}>
                {steps.map((item) => (
                  <Step
                    key={item.title}
                    title={<Text style={{ fontSize: 13 }}>{item.title}</Text>}
                    status={item.status}
                    // description={item.description}
                  />
                ))}
              </Steps>
            </Col>
            <Col xs={24}>
              <Descriptions
                bordered
                column={{
                  //   md: 2, sm: 2,
                  lg: 2,
                  md: 2,
                  xs: 1,
                }}
                size="middle"
              >
                <Descriptions.Item label={Words.reg_date_time}>
                  <Text style={{ color: valueColor }}>
                    {utils.farsiNum(
                      `${utils.slashDate(RegDate)} - ${utils.colonTime(
                        RegTime
                      )}`
                    )}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label={Words.vacation_type}>
                  <Text style={{ color: Colors.green[6] }}>
                    {VacationTypeTitle}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label={Words.from_date}>
                  <Text style={{ color: valueColor }}>
                    {`${utils.weekDayNameFromText(StartDate)} ${utils.farsiNum(
                      utils.slashDate(StartDate)
                    )}`}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label={Words.to_date}>
                  <Text style={{ color: valueColor }}>
                    {`${utils.weekDayNameFromText(FinishDate)} ${utils.farsiNum(
                      utils.slashDate(FinishDate)
                    )}`}
                  </Text>
                </Descriptions.Item>
                {FormatID === 1 && (
                  <>
                    <Descriptions.Item label={Words.start_time}>
                      <Text style={{ color: valueColor }}>
                        {utils.farsiNum(utils.colonTime(StartTime))}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.finish_time}>
                      <Text style={{ color: valueColor }}>
                        {utils.farsiNum(utils.colonTime(FinishTime))}
                      </Text>
                    </Descriptions.Item>
                  </>
                )}
                {DetailsText.length > 0 && (
                  <Descriptions.Item label={Words.descriptions} span={2}>
                    <Text
                      style={{
                        color: Colors.purple[7],
                        whiteSpace: "pre-line",
                      }}
                    >
                      {utils.farsiNum(DetailsText)}
                    </Text>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Col>
          </Row>
        </article>
      </section>
    </Modal>
  );
};

export default UserMyVacationDetailsModal;
