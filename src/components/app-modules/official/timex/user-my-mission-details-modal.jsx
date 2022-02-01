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

const UserMyMissionDetailsModal = ({ mission, isOpen, onOk }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (current) => {
    setCurrentStep(current);
  };

  const valueColor = Colors.blue[7];

  const {
    // MissionID,
    // MemberID,
    FirstName,
    LastName,
    PicFileName,
    RegDate,
    RegTime,
    DetailsText,
    // MissionTypeID,
    MissionTypeTitle,
    TargetTitle,
    Subject,
    NeedVehicle,
    NeedHoteling,
    FormatID,
    StartDate,
    FinishDate,
    StartTime,
    FinishTime,
    // -----------------------
    // SwapMemberID,
    SwapMemberFirstName,
    SwapMemberLastName,
    SwapIsAccepted,
    SwapResponseDate,
    SwapResponseTime,
    SwapDetailsText,
    // -----------------------
    // ManagerMemberID,
    ManagerMemberFirstName,
    ManagerMemberLastName,
    ManagerSelectedSwapMemberID,
    ManagerSelectedSwapMemberFirstName,
    ManagerSelectedSwapMemberLastName,
    // ManagerSelectedSwapMemberSeenDate,
    // ManagerSelectedSwapMemberSeenTime,
    ManagerIsAccepted,
    ManagerResponseDate,
    ManagerResponseTime,
    ManagerDetailsText,
    // -----------------------
    // OfficialMemberID,
    // OfficialMemberFirstName,
    // OfficialMemberLastName,
    // OfficialIsAccepted,
    // OfficialResponseDate,
    // OfficialResponseTime,
    // OfficialDetailsText,
    // -----------------------
    // FinalStatusID,
  } = mission;

  const getRequirementsTitle = () => {
    let result = "-";

    if (NeedVehicle || NeedHoteling) {
      let requirements = [];

      if (NeedVehicle) requirements = [...requirements, Words.vehicle];
      if (NeedHoteling) requirements = [...requirements, Words.hoteling];

      result = requirements.join(" - ");
    }

    return result;
  };

  const steps = [
    {
      stepID: 0,
      title: Words.request_info,
      status: "finish",
      content: (
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
          <Descriptions.Item label={Words.reg_date}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(
                `${utils.weekDayNameFromText(RegDate)} ${utils.slashDate(
                  RegDate
                )}`
              )}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.reg_time}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${utils.colonTime(RegTime)}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.swap_member}>
            <Text
              style={{ color: Colors.red[7] }}
            >{`${SwapMemberFirstName} ${SwapMemberLastName}`}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.mission_type}>
            <Text style={{ color: Colors.green[6] }}>{MissionTypeTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.mission_target}>
            <Text style={{ color: Colors.cyan[6] }}>{TargetTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.requirements}>
            <Text style={{ color: Colors.grey[6] }}>
              {getRequirementsTitle()}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.mission_subject} span={2}>
            <Text style={{ color: Colors.orange[6] }}>{Subject}</Text>
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
      ),
    },
    {
      stepID: 1,
      title: Words.swap_member_response,
      status: SwapResponseDate.length > 0 ? "finish" : "wait",
      content: (
        <>
          {ManagerSelectedSwapMemberID === 0 &&
          ManagerResponseDate.length === 0 &&
          SwapResponseDate.length === 0 ? (
            <Alert
              message={Words.messages.your_response_not_submitted}
              type="warning"
              showIcon
            />
          ) : (
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
              <Descriptions.Item label={Words.swap_member}>
                <Text style={{ color: Colors.red[7] }}>
                  {`${SwapMemberFirstName} ${SwapMemberLastName}`}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.status}>
                <Text
                  style={{
                    color: SwapIsAccepted ? Colors.green[6] : Colors.red[6],
                  }}
                >
                  {SwapIsAccepted ? Words.accepted : Words.rejected}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.reg_date}>
                <Text style={{ color: valueColor }}>
                  {`${utils.weekDayNameFromText(
                    SwapResponseDate
                  )} ${utils.farsiNum(`${utils.slashDate(SwapResponseDate)}`)}`}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.reg_time}>
                <Text style={{ color: valueColor }}>
                  {utils.farsiNum(`${utils.colonTime(SwapResponseTime)}`)}
                </Text>
              </Descriptions.Item>

              {SwapDetailsText.length > 0 && (
                <Descriptions.Item label={Words.descriptions} span={2}>
                  <Text
                    style={{
                      color: Colors.purple[7],
                      whiteSpace: "pre-line",
                    }}
                  >
                    {utils.farsiNum(SwapDetailsText)}
                  </Text>
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </>
      ),
    },
    {
      stepID: 2,
      title: Words.manager_response,
      status: ManagerResponseDate.length > 0 ? "finish" : "wait",
      content: (
        <>
          {ManagerResponseDate.length === 0 ? (
            <Alert
              message={Words.messages.manager_response_not_submitted}
              type="warning"
              showIcon
            />
          ) : (
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
              <Descriptions.Item label={Words.manager}>
                <Text
                  style={{
                    color: Colors.cyan[7],
                  }}
                >
                  {`${ManagerMemberFirstName} ${ManagerMemberLastName}`}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.reg_date_time}>
                <Text style={{ color: valueColor }}>
                  {utils.farsiNum(
                    `${utils.slashDate(
                      ManagerResponseDate
                    )} - ${utils.colonTime(ManagerResponseTime)}`
                  )}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.new_swap_member}>
                {ManagerSelectedSwapMemberID > 0 && (
                  <Text
                    style={{
                      color: Colors.red[7],
                    }}
                  >
                    {`${ManagerSelectedSwapMemberFirstName} ${ManagerSelectedSwapMemberLastName}`}
                  </Text>
                )}
              </Descriptions.Item>
              <Descriptions.Item label={Words.status}>
                <Text
                  style={{
                    color: ManagerIsAccepted ? Colors.green[6] : Colors.red[6],
                  }}
                >
                  {ManagerIsAccepted ? Words.accepted : Words.rejected}
                </Text>
              </Descriptions.Item>

              {ManagerDetailsText.length > 0 && (
                <Descriptions.Item label={Words.descriptions} span={2}>
                  <Text
                    style={{
                      color: Colors.purple[7],
                      whiteSpace: "pre-line",
                    }}
                  >
                    {utils.farsiNum(ManagerDetailsText)}
                  </Text>
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </>
      ),
    },
    // {
    //   stepID: 3,
    //   title: Words.official_response,
    //   status: OfficialResponseDate.length > 0 ? "finish" : "wait",
    //   content: (
    //     <>
    //       {OfficialResponseDate.length === 0 ? (
    //         <Alert
    //           message={Words.messages.official_response_not_submitted}
    //           type="warning"
    //           showIcon
    //         />
    //       ) : (
    //         <Descriptions
    //           bordered
    //           column={{
    //             //   md: 2, sm: 2,
    //             lg: 2,
    //             md: 2,
    //             xs: 1,
    //           }}
    //           size="middle"
    //         >
    //           <Descriptions.Item label={Words.reg_date_time}>
    //             <Text style={{ color: valueColor }}>
    //               {utils.farsiNum(
    //                 `${utils.slashDate(
    //                   OfficialResponseDate
    //                 )} - ${utils.colonTime(OfficialResponseTime)}`
    //               )}
    //             </Text>
    //           </Descriptions.Item>
    //           <Descriptions.Item label={Words.status}>
    //             <Text
    //               style={{
    //                 color: OfficialIsAccepted ? Colors.green[6] : Colors.red[6],
    //               }}
    //             >
    //               {OfficialIsAccepted ? Words.accepted : Words.rejected}
    //             </Text>
    //           </Descriptions.Item>
    //           <Descriptions.Item label={Words.official_manager} span={2}>
    //             <Text
    //               style={{
    //                 color: Colors.cyan[7],
    //               }}
    //             >
    //               {`${OfficialMemberFirstName} ${OfficialMemberLastName}`}
    //             </Text>
    //           </Descriptions.Item>
    //           {OfficialDetailsText.length > 0 && (
    //             <Descriptions.Item label={Words.descriptions} span={2}>
    //               <Text
    //                 style={{
    //                   color: Colors.purple[7],
    //                   whiteSpace: "pre-line",
    //                 }}
    //               >
    //                 {utils.farsiNum(OfficialDetailsText)}
    //               </Text>
    //             </Descriptions.Item>
    //           )}
    //         </Descriptions>
    //       )}
    //     </>
    //   ),
    // },
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
      width={800}
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
                    title={
                      <Text
                        style={{
                          fontSize: 13,
                          color:
                            item.stepID === currentStep
                              ? Colors.orange[6]
                              : Colors.grey[8],
                        }}
                      >
                        {item.title}
                      </Text>
                    }
                    status={item.status}
                  />
                ))}
              </Steps>
            </Col>
            <Col xs={24}>{steps[currentStep].content}</Col>
          </Row>
        </article>
      </section>
    </Modal>
  );
};

export default UserMyMissionDetailsModal;
