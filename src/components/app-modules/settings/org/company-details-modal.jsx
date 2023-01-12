import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Alert,
  Descriptions,
  Tabs,
} from "antd";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import utils from "../../../../tools/utils";
import TafsilInfoViewer from "./../../../common/tafsil-info-viewer";

const { Text } = Typography;

const CompanyDetailsModal = ({ company, isOpen, onOk }) => {
  const valueColor = Colors.blue[7];

  const {
    CompanyID,
    CompanyTitle,
    // CityID,
    CityTitle,
    // ProvinceID,
    ProvinceTitle,
    OfficeTel,
    Fax,
    Address,
    PostalCode,
    NationalID,
    FinancialCode,
    RegNo,
    TafsilInfo,
  } = company;

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
          <Descriptions.Item label={Words.national_id}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${NationalID}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.financial_code}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${FinancialCode}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.reg_no}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${RegNo}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.postal_code}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${PostalCode}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.province}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${ProvinceTitle}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.city}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${CityTitle}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.address} span={2}>
            <Text style={{ color: valueColor, whiteSpace: "pre" }}>
              {utils.farsiNum(`${Address}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.office_tel}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${OfficeTel}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.fax}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${Fax}`)}
            </Text>
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
                message={utils.farsiNum(`#${CompanyID} - ${CompanyTitle}`)}
                type="info"
                showIcon
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

export default CompanyDetailsModal;
