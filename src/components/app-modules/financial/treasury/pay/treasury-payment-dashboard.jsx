import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col } from "antd";
import DashboardTile from "../../../../common/dashboard-tile";
import {
  MdNorthEast as PaymentIcon,
  MdReceiptLong as ReceiptIcon,
} from "react-icons/md";
import { FaReceipt as PayReceiptIcon } from "react-icons/fa";
import Colors from "../../../../../resources/colors";
import modulesService from "../../../../../services/app/modules-service";

const iconProps = {
  size: 55,
  style: { marginTop: 10 },
};

const mapper = (pageID) => {
  let link = "";
  let icon = null;
  let backColor = Colors.blue[3];

  switch (pageID) {
    case 270:
      link = "payment-requests";
      icon = <PaymentIcon {...iconProps} />;
      backColor = Colors.orange[3];
      break;

    case 271:
      link = "payment-orders";
      icon = <ReceiptIcon {...iconProps} />;
      backColor = Colors.cyan[3];
      break;

    case 272:
      link = "payment-receipts";
      icon = <PayReceiptIcon {...iconProps} />;
      backColor = Colors.purple[3];
      break;

    // case 244:
    //   link = "collection-rejections";
    //   icon = <CollectionRejectionIcon {...iconProps} />;
    //   backColor = Colors.orange[3];
    //   break;

    default:
      break;
  }

  return { link, icon, backColor };
};

const TreasuryPaymentDashboard = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);

  useMount(async () => {
    const financial_treasury_payment_module_id = 25;
    const accessiblePages = await modulesService.accessiblePages(
      financial_treasury_payment_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  return (
    <Row gutter={[10, 16]}>
      {accessiblePages.map((page) => (
        <Col xs={24} md={8} lg={6} key={page.PageID}>
          <DashboardTile
            to={`pay/${mapper(page.PageID).link}`}
            icon={mapper(page.PageID).icon}
            backColor={mapper(page.PageID).backColor}
            title={page.PageTitle}
          />
        </Col>
      ))}
    </Row>
  );
};

export default TreasuryPaymentDashboard;
