import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import { Row, Col, Typography, Popover } from "antd";
import DetailsTable from "../../../../common/details-table";
import PriceViewer from "./price-viewer";
import { getSorter } from "./../../../../../tools/form-manager";
import { MdInfoOutline as InfoIcon } from "react-icons/md";

const { Text } = Typography;

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
    title: Words.demand_series,
    width: 150,
    align: "center",
    dataIndex: "DemandSeries",
    sorter: getSorter("DemandSeries"),
    render: (ChequeSeries) => (
      <Text style={{ color: Colors.grey[6] }}>
        {utils.farsiNum(ChequeSeries)}
      </Text>
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

const calculatePrice = (receive_receipt) => {
  const price = {};
  let sum = 0;

  receive_receipt.Cheques?.forEach((i) => {
    sum += i.Amount;
  });
  price.ChequesAmount = sum;
  sum = 0;

  receive_receipt.Demands?.forEach((i) => {
    sum += i.Amount;
  });
  price.DemandsAmount = sum;
  sum = 0;

  receive_receipt.Cashes?.forEach((i) => {
    sum += i.Amount;
  });
  price.CashesAmount = sum;
  sum = 0;

  receive_receipt.PaymentNotices?.forEach((i) => {
    sum += i.Amount;
  });
  price.PaymentNoticesAmount = sum;
  sum = 0;

  receive_receipt.ReturnFromOthers?.forEach((i) => {
    sum += i.Amount;
  });
  price.ReturnFromOthersAmount = sum;
  sum = 0;

  receive_receipt.ReturnPayableCheques?.forEach((i) => {
    sum += i.Amount;
  });
  price.ReturnPayableChequesAmount = sum;
  sum = 0;

  receive_receipt.ReturnPayableDemands?.forEach((i) => {
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

export const getTabPanes = (receive_receipt) => {
  const price = calculatePrice(receive_receipt);

  const { Cheques, Demands } = receive_receipt;

  const tabPanes = [
    {
      label: Words.cheque,
      key: "cheques",
      children: (
        <Row gutter={[0, 15]}>
          <Col xs={24}>
            <DetailsTable records={Cheques} columns={cheque_columns} />
          </Col>
          <Col xs={24}>
            <PriceViewer price={price.ChequesAmount} />
          </Col>
        </Row>
      ),
    },
    {
      label: Words.demand,
      key: "demands",
      children: (
        <Row gutter={[0, 15]}>
          <Col xs={24}>
            <DetailsTable records={Demands} columns={demand_columns} />
          </Col>
          <Col xs={24}>
            <PriceViewer price={price.DemandsAmount} />
          </Col>
        </Row>
      ),
    },
    { label: Words.cash, key: "cashes" },
    { label: Words.payment_notice, key: "payment-notices" },
    {
      label: Words.return_from_other,
      key: "return-from-others",
    },
    {
      label: Words.return_payable_cheque,
      key: "return-payable-cheques",
    },
    {
      label: Words.return_payable_demand,
      key: "return-payable-demands",
    },
  ];

  return tabPanes;
};

const codes = {
  getTabPanes,
};

export default codes;