import React, { useState } from "react";
import { Menu } from "antd";
import {
  AiOutlineDashboard as DashboardIcon,
  AiOutlineCodepen as RoleIcon,
} from "react-icons/ai";
import {
  FaMapMarkerAlt as MapIcon,
  FaUsers as MemberIcon,
  FaIdCard as EmployeeIcon,
  FaUsersCog as AgentIcon,
} from "react-icons/fa";
import { GiModernCity as CityIcon } from "react-icons/gi";
import { BiUnite as DepartmentIcon } from "react-icons/bi";
import {
  RiBuilding2Fill as CompanyIcon,
  RiOrganizationChart as OrgChartIcon,
} from "react-icons/ri";
import { VscUngroupByRefType as DutyLevelIcon } from "react-icons/vsc";
import { GoTasklist as DutyIcon } from "react-icons/go";
import { Link } from "react-router-dom";
import { useMount } from "react-use";
import modulesService from "../../services/app/modules-service";
import Colors from "./../../resources/colors";
import Words from "./../../resources/words";
import { useLocation } from "react-router-dom";

const iconSize = 20;

const mapper = (moduleID) => {
  let link = "";
  let icon = null;

  switch (moduleID) {
    case 1:
      link = "provinces";
      icon = <MapIcon style={{ color: Colors.red[6] }} size={iconSize} />;
      break;

    case 2:
      link = "cities";
      icon = <CityIcon style={{ color: Colors.cyan[7] }} size={iconSize} />;
      break;

    case 3:
      link = "departments";
      icon = (
        <DepartmentIcon style={{ color: Colors.green[6] }} size={iconSize} />
      );
      break;

    case 4:
      link = "chart";
      icon = (
        <OrgChartIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    case 5:
      link = "roles";
      icon = <RoleIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 6:
      link = "companies";
      icon = (
        <CompanyIcon style={{ color: Colors.volcano[6] }} size={iconSize} />
      );
      break;

    case 7:
      link = "members";
      icon = (
        <MemberIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
      );
      break;

    case 8:
      link = "employees";
      icon = (
        <EmployeeIcon style={{ color: Colors.geekblue[6] }} size={iconSize} />
      );
      break;

    case 9:
      link = "company-agents";
      icon = <AgentIcon style={{ color: Colors.gold[7] }} size={iconSize} />;
      break;

    case 10:
      link = "duty-levels";
      icon = (
        <DutyLevelIcon style={{ color: Colors.magenta[5] }} size={iconSize} />
      );
      break;

    case 11:
      link = "duties";
      icon = <DutyIcon style={{ color: Colors.red[5] }} size={iconSize} />;
      break;

    default:
      break;
  }

  return { link, icon };
};

const OrgMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);

  useMount(async () => {
    const accessiblePages = await modulesService.accessiblePages(1);

    setAccessiblePages(accessiblePages);
  });

  const isEndsWithOrg = useLocation().pathname.endsWith("/org");
  const prePath = isEndsWithOrg ? "org/" : "";

  return (
    <Menu mode="inline" theme="light">
      <Menu.Item
        key="official"
        icon={
          <DashboardIcon style={{ color: Colors.green[6] }} size={iconSize} />
        }
      >
        <Link to={`/home/official`}>{Words.official}</Link>
      </Menu.Item>
      <Menu.Divider />
      {accessiblePages.map((page) => (
        <Menu.Item key={page.PageID} icon={mapper(page.PageID).icon}>
          <Link to={`${prePath}${mapper(page.PageID).link}`}>
            {page.PageTitle}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default OrgMenu;
