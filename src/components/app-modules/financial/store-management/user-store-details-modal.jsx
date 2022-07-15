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
import {
  AiFillLock as LockIcon,
  AiOutlineCheck as CheckIcon,
} from "react-icons/ai";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import utils from "../../../../tools/utils";

const { Text } = Typography;

const UserStoreDetailsModal = ({ store, isOpen, onOk }) => {
  const valueColor = Colors.blue[7];

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
                message={utils.farsiNum(`${store.Title}`)}
                type="info"
                showIcon
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
                {/* <Descriptions.Item label={Words.title} span={2}>
                  <Text style={{ color: valueColor }}>{store.Title}</Text>
                </Descriptions.Item> */}
                <Descriptions.Item label={Words.store_manager}>
                  <Text style={{ color: valueColor }}>
                    {`${store.ManagerFirstName} ${store.ManagerLastName}`}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label={Words.status}>
                  <Space>
                    {store.IsActive ? (
                      <CheckIcon style={{ color: Colors.green[6] }} />
                    ) : (
                      <LockIcon style={{ color: Colors.red[6] }} />
                    )}

                    <Text
                      style={{
                        color: store.IsActive ? Colors.green[7] : Colors.red[7],
                      }}
                    >
                      {`${store.IsActive ? Words.active : Words.inactive} `}
                    </Text>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label={Words.tafsil_code}>
                  <Text style={{ color: valueColor }}>{store.TafsilCode}</Text>
                </Descriptions.Item>
                <Descriptions.Item label={Words.tafsil_title}>
                  <Text style={{ color: valueColor }}>{store.TafsilTitle}</Text>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </article>
      </section>
    </Modal>
  );
};

export default UserStoreDetailsModal;
