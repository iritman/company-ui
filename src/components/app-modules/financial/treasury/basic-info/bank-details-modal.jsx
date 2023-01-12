import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Descriptions,
  Alert,
  Tabs,
} from "antd";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";

const { Text } = Typography;
const valueColor = Colors.blue[7];

const BankDetailsModal = ({ selectedObject, isOpen, onOk }) => {
  const {
    BankID,
    BankTypeTitle,
    Title,
    PRTelNo,
    Website,
    SwiftCode,
    DetailsText,
    TafsilInfo,
  } = selectedObject;

  const items = [
    {
      label: Words.info,
      key: "info",
      children: (
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
            <Text style={{ color: Colors.red[6] }}>
              {utils.farsiNum(`${BankID}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.bank_type}>
            <Text style={{ color: Colors.cyan[6] }}>{BankTypeTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.pr_tel_no}>
            <Text style={{ color: valueColor }}>{PRTelNo}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.swift_code}>
            <Text style={{ color: valueColor }}>{SwiftCode}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.website} span={2}>
            <Text style={{ color: valueColor }}>{Website}</Text>
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
        </Descriptions>
      ),
    },
    {
      label: Words.tafsil_account,
      key: "tafsil-account",
      children: (
        <>
          {TafsilInfo === null ? (
            <></>
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
              <Descriptions.Item label={Words.tafsil_id}>
                <Text style={{ color: Colors.red[6] }}>
                  {utils.farsiNum(`${TafsilInfo.TafsilAccountID}`)}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.tafsil_code}>
                <Text style={{ color: Colors.cyan[6] }}>
                  {utils.farsiNum(TafsilInfo.TafsilCode)}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.tafsil_type}>
                <Text style={{ color: valueColor }}>
                  {TafsilInfo.TafsilTypeTitle}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label={Words.title}>
                <Text style={{ color: valueColor }}>
                  {utils.farsiNum(TafsilInfo.TafsilAccountTitle)}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          )}
        </>
      ),
    },
  ];

  return (
    <Modal
      open={isOpen}
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
                  <Text style={{ fontSize: 14 }}>{utils.farsiNum(Title)}</Text>
                }
                type="info"
              />
            </Col>
            <Col xs={24}>
              <Tabs defaultActiveKey="1" type="card" items={items} />
            </Col>
          </Row>
        </article>
      </section>
    </Modal>
  );
};

export default BankDetailsModal;
