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
import TafsilInfoViewer from "../../../../common/tafsil-info-viewer";

const { Text } = Typography;
const valueColor = Colors.blue[7];

const CompanyBankAccountDetailsModal = ({ selectedObject, isOpen, onOk }) => {
  const {
    BankTitle,
    AccountNo,
    BankBranchTitle,
    BranchCode,
    CityTitle,
    ShebaID,
    Credit,
    CurrencyTitle,
    BankAccountTypeTitle,
    DetailsText,
    // AccountID,
    // BranchID,
    // BankID,
    // CityID,
    // CurrencyID,
    // BankAccountTypeID,
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
          <Descriptions.Item label={Words.bank_account_type}>
            <Text style={{ color: valueColor }}>{BankAccountTypeTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.bank}>
            <Text style={{ color: Colors.cyan[6] }}>{BankTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.bank_branch}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(`${BankBranchTitle} (${BranchCode})`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.city}>
            <Text style={{ color: Colors.purple[6] }}>{CityTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.currency_type}>
            <Text style={{ color: valueColor }}>{CurrencyTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.credit}>
            <Text style={{ color: valueColor }}>
              {Credit > 0 ? utils.farsiNum(utils.moneyNumber(Credit)) : ""}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.sheba_no} span={2}>
            <Text style={{ color: Colors.volcano[6] }}>
              {ShebaID.length > 0 ? ShebaID : ""}
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
                  <Text style={{ fontSize: 14 }}>
                    {utils.farsiNum(`${Words.account_no}: ${AccountNo}`)}
                  </Text>
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

export default CompanyBankAccountDetailsModal;
