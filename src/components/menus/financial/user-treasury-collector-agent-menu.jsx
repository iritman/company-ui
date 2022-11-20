import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import { BsFileEarmarkPersonFill as CollectorAgentIcon } from "react-icons/bs";
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
    case 250:
      link = "collector-agents";
      icon = (
        <CollectorAgentIcon
          style={{ color: Colors.green[6] }}
          size={iconSize}
        />
      );
      break;

    //   Colors.blue[2];
    //   Colors.purple[3];
    //   Colors.orange[3];
    //   Colors.yellow[6];
    //   Colors.volcano[4];
    //   Colors.cyan[3];
    //   Colors.red[3];
    //   Colors.purple[2];
    //   Colors.magenta[3];
    //   Colors.blue[4];
    //   Colors.geekblue[3];

    default:
      break;
  }

  return { link, icon };
};

const UserTreasuryCollectorAgentMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const financial_treasury_collector_agent_id = 28;
    const accessiblePages = await modulesService.accessiblePages(
      financial_treasury_collector_agent_id
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

  const financial_treasury_collector_agent_path_name = "receive";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${financial_treasury_collector_agent_path_name}`
  );
  const prePath = isEndsWithModuleName
    ? `${financial_treasury_collector_agent_path_name}/`
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

export default UserTreasuryCollectorAgentMenu;
