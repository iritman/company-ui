import React, { useState } from "react";
import { Menu } from "antd";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import { GoSettings as BasicSettingsIcon } from "react-icons/go";
import { Link } from "react-router-dom";
import { useMount } from "react-use";
import modulesService from "../../services/app/modules-service";
import Colors from "./../../resources/colors";
import Words from "./../../resources/words";

const iconSize = 20;

const mapper = (moduleID) => {
  let link = "";
  let icon = null;

  switch (moduleID) {
    case 1:
      link = "basic-info";
      icon = (
        <BasicSettingsIcon style={{ color: Colors.blue[6] }} size={iconSize} />
      );
      break;

    default:
      break;
  }

  return { link, icon };
};

const SettingsMenu = () => {
  const [accessibleModules, setAccessibleModules] = useState([]);

  useMount(async () => {
    const settings_category_id = 1;
    const accessibleModules = await modulesService.accessibleModules(
      settings_category_id
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
          <Link to={`settings/${mapper(module.ModuleID).link}`}>
            {module.ModuleTitle}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SettingsMenu;
