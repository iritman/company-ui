import React, { useState } from "react";
import { Menu } from "antd";
import { FaDatabase as StoreIcon } from "react-icons/fa";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
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
