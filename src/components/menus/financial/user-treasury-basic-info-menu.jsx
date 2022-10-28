import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  AiOutlineDashboard as DashboardIcon,
  AiFillBank as BankIcon,
  AiOutlineBranches as BankAccountTypeIcon,
  AiFillCreditCard as CompanyBankAccountIcon,
} from "react-icons/ai";
import { VscTypeHierarchySub as BankBranchIcon } from "react-icons/vsc";
import { HiCreditCard as BankAccountIcon } from "react-icons/hi";
import {
  FaProjectDiagram as BankTypesIcon,
  FaWpforms as RegardIcon,
  FaCashRegister as CashBoxIcon,
} from "react-icons/fa";
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
    case 221:
      link = "bank-types";
      icon = (
        <BankTypesIcon style={{ color: Colors.green[6] }} size={iconSize} />
      );
      break;

    case 222:
      link = "banks";
      icon = <BankIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 223:
      link = "bank-branches";
      icon = (
        <BankBranchIcon style={{ color: Colors.purple[6] }} size={iconSize} />
      );
      break;

    case 224:
      link = "bank-account-types";
      icon = (
        <BankAccountTypeIcon
          style={{ color: Colors.orange[6] }}
          size={iconSize}
        />
      );
      break;

    case 225:
      link = "company-bank-accounts";
      icon = (
        <CompanyBankAccountIcon
          style={{ color: Colors.yellow[8] }}
          size={iconSize}
        />
      );
      break;

    case 227:
      link = "cash-boxes";
      icon = <CashBoxIcon style={{ color: Colors.cyan[6] }} size={iconSize} />;
      break;

    case 228:
      link = "person-company-bank-accounts";
      icon = (
        <BankAccountIcon style={{ color: Colors.red[6] }} size={iconSize} />
      );
      break;

    case 231:
      link = "regards";
      icon = (
        <RegardIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
      );
      break;

    default:
      break;
  }

  return { link, icon };
};

const UserTreasuryBasicInfoMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const financial_treasury_basic_info_id = 23;
    const accessiblePages = await modulesService.accessiblePages(
      financial_treasury_basic_info_id
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

  const financial_treasury_basic_info_path_name = "basic";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${financial_treasury_basic_info_path_name}`
  );
  const prePath = isEndsWithModuleName
    ? `${financial_treasury_basic_info_path_name}/`
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

export default UserTreasuryBasicInfoMenu;
