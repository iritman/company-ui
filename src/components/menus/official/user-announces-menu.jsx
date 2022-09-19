import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  AiOutlineDashboard as DashboardIcon,
  AiOutlineMail as NewAnnouncesIcon,
} from "react-icons/ai";
import { TbMailForward as MyAnnouncesIcon } from "react-icons/tb";
import { RiMailSendLine as AnnouncesIcon } from "react-icons/ri";
import { HiOutlineMailOpen as ArchivedAnnouncesIcon } from "react-icons/hi";
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
    case 130:
      link = "new";
      icon = (
        <NewAnnouncesIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    case 131:
      link = "archive";
      icon = (
        <ArchivedAnnouncesIcon
          style={{ color: Colors.magenta[5] }}
          size={iconSize}
        />
      );
      break;

    case 132:
      link = "my-announces";
      icon = (
        <MyAnnouncesIcon style={{ color: Colors.green[6] }} size={iconSize} />
      );
      break;

    case 133:
      link = "announces";
      icon = (
        <AnnouncesIcon style={{ color: Colors.blue[6] }} size={iconSize} />
      );
      break;

    default:
      break;
  }

  return { link, icon };
};

const UserAnnouncesMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const announces_module_id = 21;
    const accessiblePages = await modulesService.accessiblePages(
      announces_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  useEffect(() => {
    const pathKeys = currentLocation.pathname.split("/");
    const _lastPathKey = pathKeys[pathKeys.length - 1]
      .replaceAll("-", "")
      .toLocaleLowerCase();
    setLastPathKey(_lastPathKey);
  }, [currentLocation.pathname]);

  const announces_module_path_name = "announces";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${announces_module_path_name}`
  );
  const prePath = isEndsWithModuleName ? `${announces_module_path_name}/` : "";

  return (
    <Menu mode="inline" theme="light" selectedKeys={[lastPathKey]}>
      <Menu.Item
        key="settings"
        icon={
          <DashboardIcon style={{ color: Colors.green[6] }} size={iconSize} />
        }
      >
        <Link to={`/home/official`}>{Words.official}</Link>
      </Menu.Item>
      <Menu.Divider />
      {accessiblePages.map((page) => (
        <Menu.Item
          key={page.PageName.replaceAll("-", "").toLocaleLowerCase()}
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

export default UserAnnouncesMenu;
