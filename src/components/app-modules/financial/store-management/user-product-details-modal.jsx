import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Descriptions,
  Space,
  Alert,
  Tabs,
} from "antd";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import utils from "../../../../tools/utils";

const { Text } = Typography;
const { TabPane } = Tabs;

const UserProductDetailsModal = ({ product, isOpen, onOk, onSeen }) => {
  const valueColor = Colors.blue[7];

  const {
    ProductID,
    ProductCode,
    CategoryTitle,
    NatureTitle,
    Title,
    IsBuyable,
    IsSalable,
    IsBuildable,
  } = product;

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
                  <Text style={{ fontSize: 14 }}>{utils.farsiNum(Title)}</Text>
                }
                type="info"
              />
            </Col>
            <Col xs={24}>
              <Tabs defaultActiveKey="1" type="card">
                <TabPane tab={Words.product} key="1">
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
                        {utils.farsiNum(`#${ProductID}`)}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.product_code}>
                      <Text style={{ color: Colors.red[7] }}>
                        {utils.farsiNum(`#${ProductCode}`)}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.product_category}>
                      <Text style={{ color: Colors.green[6] }}>
                        {CategoryTitle}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.product_nature}>
                      <Text style={{ color: Colors.blue[6] }}>
                        {NatureTitle}
                      </Text>
                    </Descriptions.Item>

                    <Descriptions.Item label={Words.status}>
                      <Space direction="vertical">
                        {IsBuyable && (
                          <Text style={{ color: Colors.blue[6] }}>
                            {Words.is_buyable}
                          </Text>
                        )}
                        {IsSalable && (
                          <Text style={{ color: Colors.blue[6] }}>
                            {Words.is_salable}
                          </Text>
                        )}
                        {IsBuildable && (
                          <Text style={{ color: Colors.blue[6] }}>
                            {Words.is_buildable}
                          </Text>
                        )}
                      </Space>
                    </Descriptions.Item>
                  </Descriptions>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </article>
      </section>
    </Modal>
  );
};

export default UserProductDetailsModal;
