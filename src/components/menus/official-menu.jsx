import React, { useState } from "react";
import { Menu } from "antd";
import {
  AiOutlineDashboard as DashboardIcon,
  AiFillBank as OrgIcon,
  AiOutlineFieldTime as TimexIcon,
  AiOutlineDeploymentUnit as AutomationIcon,
} from "react-icons/ai";
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
      link = "org";
      icon = <OrgIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 2:
      link = "timex";
      icon = <TimexIcon style={{ color: Colors.orange[6] }} size={iconSize} />;
      break;

    case 3:
      link = "automation";
      icon = (
        <AutomationIcon style={{ color: Colors.red[6] }} size={iconSize} />
      );
      break;

    default:
      break;
  }

  return { link, icon };
};

const OfficialMenu = () => {
  const [accessibleModules, setAccessibleModules] = useState([]);

  useMount(async () => {
    const accessibleModules = await modulesService.accessibleModules(1);

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
          <Link to={`official/${mapper(module.ModuleID).link}`}>
            {module.ModuleTitle}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default OfficialMenu;
