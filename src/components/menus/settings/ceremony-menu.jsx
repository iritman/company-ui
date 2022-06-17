import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import { BsPersonLinesFill as ClientTypeIcon } from "react-icons/bs";
import { MdLocationOn as LocationIcon } from "react-icons/md";
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
    case 121:
      link = "client-types";
      icon = (
        <ClientTypeIcon style={{ color: Colors.green[6] }} size={iconSize} />
      );
      break;

    case 122:
      link = "session-locations";
      icon = (
        <LocationIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    default:
      break;
  }

  return { link, icon };
};

const CeremonyMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const ceremony_module_id = 11;
    const accessiblePages = await modulesService.accessiblePages(
      ceremony_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  useEffect(() => {
    const pathKeys = currentLocation.pathname.split("/");
    const _lastPathKey = pathKeys[pathKeys.length - 1]
      .replace("-", "")
      .toLocaleLowerCase();
    setLastPathKey(_lastPathKey);
  }, [currentLocation.pathname]);

  const ceremony_module_path_name = "ceremony";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${ceremony_module_path_name}`
  );
  const prePath = isEndsWithModuleName ? `${ceremony_module_path_name}/` : "";

  return (
    <Menu mode="inline" theme="light" selectedKeys={[lastPathKey]}>
      <Menu.Item
        key="settings"
        icon={
          <DashboardIcon style={{ color: Colors.green[6] }} size={iconSize} />
        }
      >
        <Link to={`/home/settings`}>{Words.admin_panel}</Link>
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

export default CeremonyMenu;
