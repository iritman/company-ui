import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Alert,
  Descriptions,
  Space,
} from "antd";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import MemberProfileImage from "./../../../../common/member-profile-image";

const { Text } = Typography;

const getFinalStatusColor = (record) => {
  let color = Colors.grey[6];

  const { FinalStatusID } = record;

  if (FinalStatusID > 1) {
    color = FinalStatusID === 2 ? Colors.green[6] : Colors.red[6];
  }

  return color;
};

const getFinalStatusTitle = (record) => {
  let title = Words.in_progress;

  const { FinalStatusID } = record;

  if (FinalStatusID > 1) {
    title = FinalStatusID === 2 ? Words.accepted : Words.rejected;
  }

  return title;
};

const UserDismissalDetailsModal = ({ dismissal, isOpen, onOk }) => {
  const valueColor = Colors.blue[7];

  const {
    DismissalID,
    DismissalFirstName,
    DismissalLastName,
    DismissalPicFileName,
    RegFirstName,
    RegLastName,
    DetailsText,
    RegDate,
    RegTime,
  } = dismissal;

  return (
    <Modal
      visible={isOpen}
      maskClosable={false}
      centered={true}
      title={Words.more_details}
      footer={[
        <Button key="close-button" onClick={onOk}>
          {Words.close}
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
                    <MemberProfileImage
                      fileName={DismissalPicFileName}
                      size="small"
                    />

                    <Text
                      style={{ fontSize: 14 }}
                    >{`${DismissalFirstName} ${DismissalLastName}`}</Text>
                  </Space>
                }
                type="info"
              />
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
                <Descriptions.Item label={Words.id}>
                  <Text style={{ color: valueColor }}>
                    {utils.farsiNum(`#${DismissalID}`)}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label={Words.status}>
                  <Text style={{ color: getFinalStatusColor(dismissal) }}>
                    {getFinalStatusTitle(dismissal)}
                  </Text>
                </Descriptions.Item>
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
                <Descriptions.Item label={Words.reg_member}>
                  <Text style={{ color: valueColor }}>
                    {`${RegFirstName} ${RegLastName}`}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label={Words.reg_date_time}>
                  <Text style={{ color: valueColor }}>
                    {utils.farsiNum(
                      `${utils.slashDate(RegDate)} - ${utils.colonTime(
                        RegTime
                      )}`
                    )}
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </article>
      </section>
    </Modal>
  );
};

export default UserDismissalDetailsModal;
