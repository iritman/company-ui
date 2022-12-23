import React, { useState } from "react";
import { Button, Row, Col, Typography, Descriptions, Tabs } from "antd";
import Words from "../../../../../../resources/words";
import Colors from "../../../../../../resources/colors";
import utils from "../../../../../../tools/utils";
import { getTabPanes } from "./receive-receipt-details-modal-code";
import ModalWindow from "../../../../../common/modal-window";

const { Text } = Typography;

const ReceiveReceiptDetailsModal = ({ selectedObject, isOpen, onOk }) => {
  const valueColor = Colors.blue[7];

  const [selectedTab, setSelectedTab] = useState("cheques");

  const {
    ReceiveID,
    // ReceiveTypeID,
    ReceiveTypeTitle,
    // DeliveryMemberID,
    DeliveryMemberFirstName,
    DeliveryMemberLastName,
    // DeliveryMember,
    ReceiveDate,
    // RegardID,
    RegardTitle,
    // CashBoxID,
    CashBoxTitle,
    // StandardDetailsID,
    StandardDetailsText,
    DetailsText,
    // RegMemberID,
    RegMemberFirstName,
    RegMemberLastName,
    RegDate,
    RegTime,
    StatusID,
    StatusTitle,
    Price,
    // Cheques,
    // Demands,
    // Cashes,
    // PaymentNotices,
    // ReturnFromOthers,
    // ReturnPayableCheques,
    // ReturnPayableDemands,
  } = selectedObject;

  return (
    <ModalWindow
      isOpen={isOpen}
      title={Words.more_details}
      footer={[
        <Button key="close-button" onClick={onOk}>
          {Words.close}
        </Button>,
      ]}
      showIcon={false}
      onCancel={onOk}
      width={1050}
    >
      <Row gutter={[10, 10]}>
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
                {utils.farsiNum(`${ReceiveID}`)}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.receive_type}>
              <Text style={{ color: valueColor }}>{ReceiveTypeTitle}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.receive_date}>
              <Text style={{ color: valueColor }}>
                {utils.farsiNum(utils.slashDate(ReceiveDate))}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.delivery_member}>
              <Text style={{ color: valueColor }}>
                {`${DeliveryMemberFirstName} ${DeliveryMemberLastName}`}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.regards} span={2}>
              <Text style={{ color: valueColor }}>{RegardTitle}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.cash_box}>
              <Text style={{ color: valueColor }}>{CashBoxTitle}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.status}>
              <Text
                style={{
                  color:
                    StatusID === 1
                      ? Colors.blue[6]
                      : StatusID === 2
                      ? Colors.green[6]
                      : Colors.red[6],
                }}
              >
                {StatusTitle}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.reg_member}>
              <Text
                style={{ color: valueColor }}
              >{`${RegMemberFirstName} ${RegMemberLastName}`}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.reg_date_time}>
              <Text style={{ color: valueColor }}>
                {utils.farsiNum(
                  `${utils.slashDate(RegDate)} - ${utils.colonTime(RegTime)}`
                )}
              </Text>
            </Descriptions.Item>

            {StandardDetailsText.length > 0 && (
              <Descriptions.Item label={Words.standard_details_text} span={2}>
                <Text
                  style={{
                    color: Colors.purple[7],
                    whiteSpace: "pre-line",
                  }}
                >
                  {utils.farsiNum(StandardDetailsText)}
                </Text>
              </Descriptions.Item>
            )}

            {DetailsText.length > 0 && (
              <Descriptions.Item label={Words.standard_description} span={2}>
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

            {Price > 0 && (
              <Descriptions.Item label={Words.price} span={2}>
                <Text
                  style={{
                    color: Colors.magenta[7],
                  }}
                >
                  {`${utils.farsiNum(utils.moneyNumber(Price))} ${Words.ryal}`}
                </Text>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
        <Col xs={24}>
          <Tabs
            type="card"
            defaultActiveKey="1"
            onChange={(key) => setSelectedTab(key)}
            items={getTabPanes(selectedObject, selectedTab)}
          />
        </Col>
      </Row>
    </ModalWindow>
  );
};

export default ReceiveReceiptDetailsModal;
