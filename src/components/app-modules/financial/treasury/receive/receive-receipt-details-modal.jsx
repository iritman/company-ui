import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Descriptions,
  Popover,
  Tabs,
} from "antd";
import { MdInfoOutline as InfoIcon } from "react-icons/md";
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
          record.MemberID > 0
            ? `${record.FirstName} ${record.LastName}`
            : `${record.CompanyTitle}`
        )}
      </Text>
    ),
  },
  {
    title: Words.financial_operation,
    width: 150,
    align: "center",
    //   dataIndex: "Price",
    sorter: getSorter("OperationTitle"),
    render: (record) => (
      <Text style={{ color: Colors.blue[6] }}>
        {utils.farsiNum(`${record.OperationID} - ${record.OperationTitle}`)}
      </Text>
    ),
  },
  {
    title: Words.nature,
    width: 100,
    align: "center",
    dataIndex: "PaperNatureTitle",
    sorter: getSorter("PaperNatureTitle"),
    render: (PaperNatureTitle) => (
      <Text style={{ color: Colors.grey[6] }}>{PaperNatureTitle}</Text>
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
    title: Words.cash_flow,
    width: 150,
    align: "center",
    dataIndex: "CashFlowTitle",
    sorter: getSorter("CashFlowTitle"),
    render: (CashFlowTitle) => (
      <Text style={{ color: Colors.purple[6] }}>{CashFlowTitle}</Text>
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
    title: Words.branch_code,
    width: 100,
    align: "center",
    dataIndex: "BranchCode",
    sorter: getSorter("BranchCode"),
    render: (BranchCode) => (
      <Text style={{ color: Colors.grey[6] }}>
        {utils.farsiNum(BranchCode)}
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
    title: Words.cheque_series,
    width: 150,
    align: "center",
    dataIndex: "ChequeSeries",
    sorter: getSorter("ChequeSeries"),
    render: (ChequeSeries) => (
      <Text style={{ color: Colors.grey[6] }}>
        {utils.farsiNum(ChequeSeries)}
      </Text>
    ),
  },
  {
    title: Words.sheba_no,
    width: 200,
    align: "center",
    dataIndex: "ShebaID",
    sorter: getSorter("ShebaID"),
    render: (ShebaID) => (
      <Text style={{ color: Colors.grey[6] }}>{ShebaID}</Text>
    ),
  },
  {
    title: Words.sayad_no,
    width: 200,
    align: "center",
    dataIndex: "SayadNo",
    sorter: getSorter("SayadNo"),
    render: (SayadNo) => (
      <Text style={{ color: Colors.grey[6] }}>{SayadNo}</Text>
    ),
  },
  {
    title: Words.currency,
    width: 200,
    align: "center",
    dataIndex: "CurrencyTitle",
    sorter: getSorter("CurrencyTitle"),
    render: (CurrencyTitle) => (
      <Text style={{ color: Colors.grey[6] }}>{CurrencyTitle}</Text>
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
  {
    title: Words.standard_description,
    width: 150,
    align: "center",
    render: (record) => (
      <>
        {record.StandardDetailsID > 0 && (
          <Popover content={<Text>{record.DetailsText}</Text>}>
            <InfoIcon
              style={{
                color: Colors.green[6],
                fontSize: 19,
                cursor: "pointer",
              }}
            />
          </Popover>
        )}
      </>
    ),
  },
  {
    title: "",
    fixed: "right",
    align: "center",
    width: 1,
    render: () => <></>,
  },
];

const ReceiveReceiptDetailsModal = ({ selectedObject, isOpen, onOk }) => {
  const valueColor = Colors.blue[7];

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
    // Demands,
    // Cashes,
    // PaymentNotices,
    // ReturnFromOthers,
    // ReturnPayableCheques,
    // ReturnPayableDemands,
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

    selectedObject.Cashes?.forEach((i) => {
      sum += i.Amount;
    });
    price.CashesAmount = sum;
    sum = 0;

    selectedObject.PaymentNotices?.forEach((i) => {
      sum += i.Amount;
    });
    price.PaymentNoticesAmount = sum;
    sum = 0;

    selectedObject.ReturnFromOthers?.forEach((i) => {
      sum += i.Amount;
    });
    price.ReturnFromOthersAmount = sum;
    sum = 0;

    selectedObject.ReturnPayableCheques?.forEach((i) => {
      sum += i.Amount;
    });
    price.ReturnPayableChequesAmount = sum;
    sum = 0;

    selectedObject.ReturnPayableDemands?.forEach((i) => {
      sum += i.Amount;
    });
    price.ReturnPayableDemandsAmount = sum;
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
            <TabPane tab={Words.demand} key="demand"></TabPane>
            <TabPane tab={Words.cash} key="cash"></TabPane>
            <TabPane tab={Words.payment_notice} key="payment-notice"></TabPane>
            <TabPane
              tab={Words.return_from_other}
              key="return-from-other"
            ></TabPane>
            <TabPane
              tab={Words.return_payable_cheque}
              key="return-payable-cheque"
            ></TabPane>
            <TabPane
              tab={Words.return_payable_demand}
              key="return-payable-demand"
            ></TabPane>
          </Tabs>
        </Col>
      </Row>
    </Modal>
  );
};

export default ReceiveReceiptDetailsModal;
