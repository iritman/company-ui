import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col } from "antd";
import DashboardTile from "../../../common/dashboard-tile";
import { AiOutlineCodepen as RoleIcon } from "react-icons/ai";
import {
  FaMapMarkerAlt as MapIcon,
  FaUsers as MemberIcon,
  FaIdCard as EmployeeIcon,
  FaUsersCog as AgentIcon,
} from "react-icons/fa";
import { GiModernCity as CityIcon } from "react-icons/gi";
import { BiUnite as DepartmentIcon } from "react-icons/bi";
import { RiBuilding2Fill as CompanyIcon } from "react-icons/ri";
import Colors from "../../../../resources/colors";
import modulesService from "../../../../services/app/modules-service";

const iconProps = {
  size: 55,
  style: { marginTop: 10 },
};

const mapper = (moduleID) => {
  let link = "";
  let icon = null;
  let backColor = Colors.blue[3];

  switch (moduleID) {
    case 1:
      link = "provinces";
      icon = <MapIcon {...iconProps} />;
      backColor = Colors.red[3];
      break;

    case 2:
      link = "cities";
      icon = <CityIcon {...iconProps} />;
      backColor = Colors.cyan[3];
      break;

    case 3:
      link = "departments";
      icon = <DepartmentIcon {...iconProps} />;
      backColor = Colors.green[3];
      break;

    case 4:
      link = "roles";
      icon = <RoleIcon {...iconProps} />;
      backColor = Colors.blue[3];
      break;

    case 5:
      link = "companies";
      icon = <CompanyIcon {...iconProps} />;
      backColor = Colors.volcano[3];
      break;

    case 6:
      link = "members";
      icon = <MemberIcon {...iconProps} />;
      backColor = Colors.magenta[6];
      break;

    case 7:
      link = "employees";
      icon = <EmployeeIcon {...iconProps} />;
      backColor = Colors.geekblue[6];
      break;

    case 8:
      link = "company-agents";
      icon = <AgentIcon {...iconProps} />;
      backColor = Colors.gold[6];
      break;

    default:
      break;
  }

  return { link, icon, backColor };
};

const OrgDashboard = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);

  useMount(async () => {
    const accessiblePages = await modulesService.accessiblePages(1);

    setAccessiblePages(accessiblePages);
  });

  return (
    <Row gutter={[10, 16]}>
      {accessiblePages.map((page) => (
        <Col xs={24} md={8} lg={6} key={page.PageID}>
          <DashboardTile
            to={`org/${mapper(page.PageID).link}`}
            icon={mapper(page.PageID).icon}
            backColor={mapper(page.PageID).backColor}
            title={page.PageTitle}
          />
        </Col>
      ))}
    </Row>
  );
};

export default OrgDashboard;
