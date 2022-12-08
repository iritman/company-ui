import React from "react";
import { Button, Modal, Row, Col, Typography, Descriptions, Tabs } from "antd";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import { getSorter } from "./../../../../../tools/form-manager";
import DetailsTable from "../../../../common/details-table";
import PriceViewer from "./price-viewer";

const { Text } = Typography;
const { TabPane } = Tabs;

const cheque_columns = [
  {
    title: Words.id,
    width: 75,
    align: "center",
    dataIndex: "ChequeID",
    sorter: getSorter("ChequeID"),
    render: (ChequeID) => (
      <Text>{ChequeID > 0 ? utils.farsiNum(`${ChequeID}`) : ""}</Text>
    ),
  },
  {
    title: Words.front_side,
    width: 200,
    align: "center",
    // dataIndex: "Title",
    sorter: getSorter("LastName"),
    render: (record) => (
      <Text style={{ color: Colors.cyan[6] }}>
        {utils.farsiNum(
          record.FrontSideMemberID > 0
            ? `${record.FrontSideFirstName} ${record.FrontSideLastName}`
            : `${record.CompanyTitle}`
        )}
      </Text>
    ),
  },
  {
    title: Words.duration,
    width: 100,
    align: "center",
    dataIndex: "DurationTypeTitle",
    sorter: getSorter("DurationTypeTitle"),
    render: (DurationTypeTitle) => (
      <Text style={{ color: Colors.grey[6] }}>{DurationTypeTitle}</Text>
    ),
  },
  {
    title: Words.account_no,
    width: 100,
    align: "center",
    dataIndex: "AccountNo",
    sorter: getSorter("AccountNo"),
    render: (AccountNo) => (
      <Text style={{ color: Colors.orange[6] }}>
        {utils.farsiNum(AccountNo)}
      </Text>
    ),
  },
  {
    title: Words.bank,
    width: 100,
    align: "center",
    dataIndex: "BankTitle",
    sorter: getSorter("BankTitle"),
    render: (BankTitle) => (
      <Text style={{ color: Colors.green[6] }}>{BankTitle}</Text>
    ),
  },
  {
    title: Words.city,
    width: 120,
    align: "center",
    dataIndex: "CityTitle",
    sorter: getSorter("CityTitle"),
    render: (CityTitle) => (
      <Text style={{ color: Colors.blue[6] }}>{CityTitle}</Text>
    ),
  },
  {
    title: Words.bank_branch,
    width: 100,
    align: "center",
    dataIndex: "BranchName",
    sorter: getSorter("BranchName"),
    render: (BranchName) => (
      <Text style={{ color: Colors.grey[6] }}>
        {utils.farsiNum(BranchName)}
      </Text>
    ),
  },
  {
    title: Words.cheque_no,
    width: 150,
    align: "center",
    dataIndex: "ChequeNo",
    sorter: getSorter("ChequeNo"),
    render: (ChequeNo) => (
      <Text style={{ color: Colors.red[6] }}>{utils.farsiNum(ChequeNo)}</Text>
    ),
  },
  {
    title: Words.price,
    width: 200,
    align: "center",
    dataIndex: "Amount",
    sorter: getSorter("Amount"),
    render: (Amount) => (
      <Text style={{ color: Colors.green[6] }}>
        {utils.farsiNum(utils.moneyNumber(Amount))}
      </Text>
    ),
  },
  {
    title: Words.due_date,
    width: 120,
    align: "center",
    dataIndex: "DueDate",
    sorter: getSorter("DueDate"),
    render: (DueDate) => (
      <Text
        style={{
          color: Colors.geekblue[6],
        }}
      >
        {utils.farsiNum(utils.slashDate(DueDate))}
      </Text>
    ),
  },
  {
    title: Words.agreed_date,
    width: 120,
    align: "center",
    dataIndex: "AgreedDate",
    sorter: getSorter("AgreedDate"),
    render: (AgreedDate) => (
      <Text
        style={{
          color: Colors.blue[6],
        }}
      >
        {utils.farsiNum(utils.slashDate(AgreedDate))}
      </Text>
    ),
  },
];

const demand_columns = [
  {
    title: Words.id,
    width: 75,
    align: "center",
    dataIndex: "DemandID",
    sorter: getSorter("DemandID"),
    render: (DemandID) => (
      <Text>{DemandID > 0 ? utils.farsiNum(`${DemandID}`) : ""}</Text>
    ),
  },
  {
    title: Words.front_side,
    width: 200,
    align: "center",
    // dataIndex: "Title",
    sorter: getSorter("LastName"),
    render: (record) => (
      <Text style={{ color: Colors.cyan[6] }}>
        {utils.farsiNum(
          record.FrontSideMemberID > 0
            ? `${record.FrontSideFirstName} ${record.FrontSideLastName}`
            : `${record.CompanyTitle}`
        )}
      </Text>
    ),
  },
  {
    title: Words.duration,
    width: 100,
    align: "center",
    dataIndex: "DurationTypeTitle",
    sorter: getSorter("DurationTypeTitle"),
    render: (DurationTypeTitle) => (
      <Text style={{ color: Colors.grey[6] }}>{DurationTypeTitle}</Text>
    ),
  },
  {
    title: Words.demand_no,
    width: 150,
    align: "center",
    dataIndex: "DemandNo",
    sorter: getSorter("DemandNo"),
    render: (DemandNo) => (
      <Text style={{ color: Colors.red[6] }}>{utils.farsiNum(DemandNo)}</Text>
    ),
  },
  {
    title: Words.price,
    width: 200,
    align: "center",
    dataIndex: "Amount",
    sorter: getSorter("Amount"),
    render: (Amount) => (
      <Text style={{ color: Colors.green[6] }}>
        {utils.farsiNum(utils.moneyNumber(Amount))}
      </Text>
    ),
  },
  {
    title: Words.due_date,
    width: 120,
    align: "center",
    dataIndex: "DueDate",
    sorter: getSorter("DueDate"),
    render: (DueDate) => (
      <Text
        style={{
          color: Colors.geekblue[6],
        }}
      >
        {utils.farsiNum(utils.slashDate(DueDate))}
      </Text>
    ),
  },
];

const BankHandOverDetailsModal = ({ selectedObject, isOpen, onOk }) => {
  const valueColor = Colors.blue[7];

  const {
    HandOverID,
    AccountName,
    AccountNo,
    // BankAccountTypeTitle,
    BranchCode,
    BankTitle,
    // BankTypeTitle,
    CityTitle,
    // ProvinceTitle,
    CurrencyTitle,
    ItemType,
    HandOverDate,
    OperationTitle,
    DetailsText,
    // RegMemberID,
    RegMemberFirstName,
    RegMemberLastName,
    RegDate,
    RegTime,
    StatusID,
    StatusTitle,
    Price,
    Cheques,
    Demands,
  } = selectedObject;

  const calculatePrice = () => {
    const price = {};
    let sum = 0;

    selectedObject.Cheques?.forEach((i) => {
      sum += i.Amount;
    });
    price.ChequesAmount = sum;
    sum = 0;

    selectedObject.Demands?.forEach((i) => {
      sum += i.Amount;
    });
    price.DemandsAmount = sum;
    sum = 0;

    for (const key in price) {
      sum += price[key];
    }
    price.Total = sum;

    return price;
  };

  const price = calculatePrice();

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
      width={1050}
    >
      <Row gutter={[10, 10]}>
        <Col xs={24}>
          <Descriptions
            bordered
            column={{
              //   md: 2, sm: 2,
              lg: 3,
              md: 2,
              xs: 1,
            }}
            size="middle"
          >
            <Descriptions.Item label={Words.id}>
              <Text style={{ color: valueColor }}>
                {utils.farsiNum(`${HandOverID}`)}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.title}>
              <Text style={{ color: valueColor }}>{AccountName}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.account_no}>
              <Text style={{ color: valueColor }}>
                {utils.farsiNum(`${AccountNo}`)}
              </Text>
            </Descriptions.Item>
            {/* <Descriptions.Item label={Words.bank_type}>
              <Text style={{ color: valueColor }}>{BankTypeTitle}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.bank_account_type}>
              <Text style={{ color: valueColor }}>{BankAccountTypeTitle}</Text>
            </Descriptions.Item> */}
            <Descriptions.Item label={Words.bank}>
              <Text style={{ color: valueColor }}>{BankTitle}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.branch_code}>
              <Text style={{ color: valueColor }}>{BranchCode}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.city}>
              <Text style={{ color: valueColor }}>{CityTitle}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.currency}>
              <Text style={{ color: valueColor }}>{CurrencyTitle}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.financial_operation}>
              <Text style={{ color: valueColor }}>{OperationTitle}</Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.item_type}>
              <Text style={{ color: valueColor }}>
                {ItemType === 1 ? Words.cheque : Words.demand}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label={Words.hand_over_date}>
              <Text style={{ color: valueColor }}>
                {utils.farsiNum(utils.slashDate(HandOverDate))}
              </Text>
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
          <Tabs type="card" defaultActiveKey="1">
            <TabPane tab={Words.cheque} key="cheque">
              <Row gutter={[0, 15]}>
                <Col xs={24}>
                  <DetailsTable records={Cheques} columns={cheque_columns} />
                </Col>
                <Col xs={24}>
                  <PriceViewer price={price.ChequesAmount} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={Words.demand} key="demand">
              <Row gutter={[0, 15]}>
                <Col xs={24}>
                  <DetailsTable records={Demands} columns={demand_columns} />
                </Col>
                <Col xs={24}>
                  <PriceViewer price={price.DemandsAmount} />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Modal>
  );
};

export default BankHandOverDetailsModal;
