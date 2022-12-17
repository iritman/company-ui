import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import {
  MdNorthEast as PaymentIcon,
  //   MdReceiptLong as ReceiptIcon,
} from "react-icons/md";
// import { TbTransferIn as HandOverIcon } from "react-icons/tb";
// import { GiReceiveMoney as CollectionRejectionIcon } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useMount } from "react-use";
import modulesService from "../../../services/app/modules-service";
import Colors from "../../../resources/colors";
import Words from "../../../resources/words";
import { useLocation } from "react-router-dom";

const iconSize = 20;

const mapper = (pageID) => {
  let link = "";
  let icon = null;

  switch (pageID) {
    case 270:
      link = "payment-requests";
      icon = (
        <PaymentIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    // case 242:
    //   link = "payment-receipts";
    //   icon = <ReceiptIcon style={{ color: Colors.cyan[6] }} size={iconSize} />;
    //   break;

    // case 243:
    //   link = "bank-hand-overs";
    //   icon = (
    //     <HandOverIcon style={{ color: Colors.purple[6] }} size={iconSize} />
    //   );
    //   break;

    // case 244:
    //   link = "collection-rejection";
    //   icon = (
    //     <CollectionRejectionIcon
    //       style={{ color: Colors.orange[6] }}
    //       size={iconSize}
    //     />
    //   );
    //   break;

    default:
      break;
  }

  return { link, icon };
};

const UserTreasuryPaymentMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const financial_treasury_payment_id = 25;
    const accessiblePages = await modulesService.accessiblePages(
      financial_treasury_payment_id
    );

    setAccessiblePages(accessiblePages);
  });

  useEffect(() => {
    const pathKeys = currentLocation.pathname.split("/");
    const _lastPathKey = pathKeys[pathKeys.length - 1]
      .replace("user-", "")
      .replaceAll("-", "")
      .toLocaleLowerCase();
    setLastPathKey(_lastPathKey);
  }, [currentLocation.pathname]);

  const financial_treasury_payment_path_name = "pay";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${financial_treasury_payment_path_name}`
  );
  const prePath = isEndsWithModuleName
    ? `${financial_treasury_payment_path_name}/`
    : "";

  return (
    <Menu mode="inline" theme="light" selectedKeys={[lastPathKey]}>
      <Menu.Item
        key="settings"
        icon={
          <DashboardIcon style={{ color: Colors.green[6] }} size={iconSize} />
        }
      >
        <Link to={`/home/financial`}>{Words.financial}</Link>
      </Menu.Item>
      <Menu.Divider />
      {accessiblePages.map((page) => (
        <Menu.Item
          key={page.PageName.replace("user-", "")
            .replaceAll("-", "")
            .toLocaleLowerCase()}
          icon={mapper(page.PageID).icon}
        >
          <Link to={`${prePath}${mapper(page.PageID).link}`}>
            {page.PageTitle}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default UserTreasuryPaymentMenu;
