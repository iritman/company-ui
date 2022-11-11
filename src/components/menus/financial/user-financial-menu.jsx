import React, { useState } from "react";
import { Menu } from "antd";
import {
  FaDatabase as StoreIcon,
  FaMoneyCheckAlt as TreasuryIcon,
} from "react-icons/fa";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import { TbNotebook as LedgerIcon } from "react-icons/tb";
import {
  MdSettings as SettingsIcon,
  MdAccountBalanceWallet as AccountsIcon,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useMount } from "react-use";
import modulesService from "../../../services/app/modules-service";
import Colors from "../../../resources/colors";
import Words from "../../../resources/words";

const iconSize = 20;

const mapper = (moduleID) => {
  let link = "";
  let icon = null;

  switch (moduleID) {
    case 14:
      link = "store-mgr";
      icon = <StoreIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 17:
      link = "public-settings";
      icon = <SettingsIcon style={{ color: Colors.cyan[6] }} size={iconSize} />;
      break;

    case 19:
      link = "accounts";
      icon = (
        <AccountsIcon style={{ color: Colors.volcano[6] }} size={iconSize} />
      );
      break;

    case 22:
      link = "ledger";
      icon = (
        <LedgerIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
      );
      break;

    case 23:
      link = "basic";
      icon = <TreasuryIcon style={{ color: Colors.lime[6] }} size={iconSize} />;
      break;

    case 24:
      link = "receive";
      icon = (
        <TreasuryIcon style={{ color: Colors.purple[6] }} size={iconSize} />
      );
      break;

    default:
      break;
  }

  return { link, icon };
};

const UserFinancialMenu = () => {
  const [accessibleModules, setAccessibleModules] = useState([]);

  useMount(async () => {
    const financial_category_id = 3;
    const accessibleModules = await modulesService.accessibleModules(
      financial_category_id
    );

    setAccessibleModules(accessibleModules);
  });

  return (
    <Menu mode="inline" theme="light">
      <Menu.Item
        key="home"
        icon={
          <DashboardIcon style={{ color: Colors.green[6] }} size={iconSize} />
        }
      >
        <Link to={`/home`}>{Words.dashboard}</Link>
      </Menu.Item>
      <Menu.Divider />
      {accessibleModules.map((module) => (
        <Menu.Item key={module.ModuleID} icon={mapper(module.ModuleID).icon}>
          <Link to={`financial/${mapper(module.ModuleID).link}`}>
            {module.ModuleTitle}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default UserFinancialMenu;
