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
} from "react-icons/fa";
import { MdApartment as DepartmentIcon } from "react-icons/md";
import { RiBuilding2Fill as CompanyIcon } from "react-icons/ri";
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
      link = "provinces";
      icon = <MapIcon style={{ color: Colors.red[6] }} size={iconSize} />;
      break;

    case 2:
      link = "departments";
      icon = (
        <DepartmentIcon style={{ color: Colors.blue[6] }} size={iconSize} />
      );
      break;

    case 3:
      link = "roles";
      icon = <RoleIcon style={{ color: Colors.green[6] }} size={iconSize} />;
      break;

    case 4:
      link = "companies";
      icon = (
        <CompanyIcon style={{ color: Colors.volcano[6] }} size={iconSize} />
      );
      break;

    case 5:
      link = "members";
      icon = (
        <MemberIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
      );
      break;

    case 6:
      link = "employees";
      icon = <EmployeeIcon style={{ color: Colors.lime[7] }} size={iconSize} />;
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
          <Link to={`${mapper(page.PageID).link}`}>{page.PageTitle}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default OrgMenu;
