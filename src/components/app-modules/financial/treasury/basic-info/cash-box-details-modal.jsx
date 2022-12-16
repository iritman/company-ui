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
  Space,
} from "antd";
import {
  AiFillLock as LockIcon,
  AiOutlineCheck as CheckIcon,
} from "react-icons/ai";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";

const { Text } = Typography;
const valueColor = Colors.blue[7];

const CashBoxDetailsModal = ({ selectedObject, isOpen, onOk }) => {
  const {
    CashBoxID,
    Title,
    Location,
    CashierFirstName,
    CashierLastName,
    DetailsText,
    IsActive,
    TafsilAccountTitle,
    TafsilCode,
    TafsilTypeTitle,
    ParentTafsilTypeTitle,
    // CashierMemberID,
    // TafsilAccountID,
    // TafsilTypeID,
    // ParentTafsilTypeID,
  } = selectedObject;

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
                  <Text style={{ fontSize: 14 }}>
                    {utils.farsiNum(`#${CashBoxID} - ${Title}`)}
                  </Text>
                }
                type="info"
              />
            </Col>
            <Col xs={24}>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab={Words.cash_box_info} key="cash_box_info">
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
                        {utils.farsiNum(CashBoxID)}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.location}>
                      <Text style={{ color: valueColor }}>{Location}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.cashier}>
                      <Text
                        style={{ color: Colors.cyan[6] }}
                      >{`${CashierFirstName} ${CashierLastName}`}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.status}>
                      <Space>
                        {IsActive ? (
                          <CheckIcon style={{ color: Colors.green[6] }} />
                        ) : (
                          <LockIcon style={{ color: Colors.red[6] }} />
                        )}

                        <Text style={{ color: valueColor }}>
                          {`${IsActive ? Words.active : Words.inactive} `}
                        </Text>
                      </Space>
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
                </Tabs.TabPane>
                <Tabs.TabPane tab={Words.tafsil_info} key="tafsil_info">
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
                    <Descriptions.Item label={Words.tafsil_account}>
                      <Text style={{ color: valueColor }}>
                        {TafsilAccountTitle}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.tafsil_code}>
                      <Text style={{ color: Colors.red[6] }}>
                        {utils.farsiNum(TafsilCode)}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.tafsil_type}>
                      <Text style={{ color: valueColor }}>
                        {TafsilTypeTitle}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.parent_tafsil_type}>
                      <Text style={{ color: valueColor }}>
                        {ParentTafsilTypeTitle}
                      </Text>
                    </Descriptions.Item>
                  </Descriptions>
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </article>
      </section>
    </Modal>
  );
};

export default CashBoxDetailsModal;
