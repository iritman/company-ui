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
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import utils from "../../../../tools/utils";
import TafsilInfoViewer from "../../../common/tafsil-info-viewer";

const { Text } = Typography;
const valueColor = Colors.blue[7];

const CostCenterDetailsModal = ({ selectedObject, isOpen, onOk }) => {
  const {
    CostCenterID,
    // CostCenterTypeID,
    CostCenterTypeTitle,
    Title,
    IsActive,
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
              {utils.farsiNum(`${CostCenterID}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.status}>
            <Text style={{ color: IsActive ? Colors.green[6] : Colors.red[6] }}>
              {IsActive ? Words.active : Words.inactive}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.cost_center_type}>
            <Text style={{ color: Colors.cyan[6] }}>{CostCenterTypeTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.title}>
            <Text style={{ color: valueColor }}>{Title}</Text>
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      label: Words.tafsil_account,
      key: "tafsil-account",
      children: <TafsilInfoViewer tafsilInfo={TafsilInfo} />,
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

export default CostCenterDetailsModal;
