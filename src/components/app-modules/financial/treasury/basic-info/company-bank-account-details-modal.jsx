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
    TafsilAccountTitle,
    TafsilCode,
    TafsilTypeTitle,
    ParentTafsilTypeTitle,
    DetailsText,
    // AccountID,
    // BranchID,
    // BankID,
    // CityID,
    // CurrencyID,
    // BankAccountTypeID,
    // TafsilAccountID,
    // TafsilTypeID,
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
                    {utils.farsiNum(`${Words.account_no}: ${AccountNo}`)}
                  </Text>
                }
                type="info"
              />
            </Col>
            <Col xs={24}>
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane
                  tab={Words.company_bank_account_info}
                  key="general_info"
                >
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
                      <Text style={{ color: valueColor }}>
                        {BankAccountTypeTitle}
                      </Text>
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
                      <Text style={{ color: Colors.purple[6] }}>
                        {CityTitle}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.currency_type}>
                      <Text style={{ color: valueColor }}>{CurrencyTitle}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={Words.credit}>
                      <Text style={{ color: valueColor }}>
                        {Credit > 0
                          ? utils.farsiNum(utils.moneyNumber(Credit))
                          : ""}
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

export default CompanyBankAccountDetailsModal;
