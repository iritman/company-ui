import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import { VscGroupByRefType as FolderGroupIcon } from "react-icons/vsc";
import { FaFolderOpen as FolderIcon } from "react-icons/fa";
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
    case 135:
      link = "user-folder-groups";
      icon = (
        <FolderGroupIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    case 136:
      link = "user-folders";
      icon = (
        <FolderIcon style={{ color: Colors.magenta[5] }} size={iconSize} />
      );
      break;

    // case 32:
    //   link = "members-duties";
    //   icon = (
    //     <MembersDutiesIcon style={{ color: Colors.green[6] }} size={iconSize} />
    //   );
    //   break;

    default:
      break;
  }

  return { link, icon };
};

const UserEDocsMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const edocs_module_id = 15;
    const accessiblePages = await modulesService.accessiblePages(
      edocs_module_id
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

  const edocs_module_path_name = "edocs";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${edocs_module_path_name}`
  );
  const prePath = isEndsWithModuleName ? `${edocs_module_path_name}/` : "";

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

export default UserEDocsMenu;
