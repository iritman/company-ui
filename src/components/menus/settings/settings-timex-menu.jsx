import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import { GiGuards as SecurityguardIcon } from "react-icons/gi";
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
    case 12:
      link = "security-guards";
      icon = (
        <SecurityguardIcon style={{ color: Colors.green[6] }} size={iconSize} />
      );
      break;

    // case 4:
    //   link = "org-chart";
    //   icon = (
    //     <OrgChartIcon style={{ color: Colors.orange[6] }} size={iconSize} />
    //   );
    //   break;

    // case 5:
    //   link = "roles";
    //   icon = <RoleIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
    //   break;

    // case 6:
    //   link = "companies";
    //   icon = (
    //     <CompanyIcon style={{ color: Colors.volcano[6] }} size={iconSize} />
    //   );
    //   break;

    // case 7:
    //   link = "members";
    //   icon = (
    //     <MemberIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
    //   );
    //   break;

    // case 8:
    //   link = "employees";
    //   icon = (
    //     <EmployeeIcon style={{ color: Colors.geekblue[6] }} size={iconSize} />
    //   );
    //   break;

    // case 9:
    //   link = "company-agents";
    //   icon = <AgentIcon style={{ color: Colors.gold[7] }} size={iconSize} />;
    //   break;

    // case 10:
    //   link = "duty-levels";
    //   icon = (
    //     <DutyLevelIcon style={{ color: Colors.magenta[5] }} size={iconSize} />
    //   );
    //   break;

    // case 11:
    //   link = "duties";
    //   icon = <DutyIcon style={{ color: Colors.red[5] }} size={iconSize} />;
    //   break;

    default:
      break;
  }

  return { link, icon };
};

const SettingsTimexMenu = (props) => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  useMount(async () => {
    const timex_settings_module_id = 5;
    const accessiblePages = await modulesService.accessiblePages(
      timex_settings_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  useEffect(() => {
    const pathKeys = props.location.pathname.split("/");
    const _lastPathKey = pathKeys[pathKeys.length - 1]
      .replace("-", "")
      .toLocaleLowerCase();
    setLastPathKey(_lastPathKey);
  }, [props.location.pathname]);

  const timex_module_path_name = "timex";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${timex_module_path_name}`
  );
  const prePath = isEndsWithModuleName ? `${timex_module_path_name}/` : "";

  return (
    <Menu mode="inline" theme="light" selectedKeys={[lastPathKey]}>
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
        <Menu.Item
          key={page.PageName.replace("-", "").toLocaleLowerCase()}
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

export default SettingsTimexMenu;
