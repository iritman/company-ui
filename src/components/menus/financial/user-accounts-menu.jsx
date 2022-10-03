import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { FaProjectDiagram as TafsilTypesIcon } from "react-icons/fa";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import {
  MdOutlineAccountTree as TafsilAccountsIcon,
  MdOutlineConstruction as StructureIcon,
} from "react-icons/md";
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
    case 201:
      link = "account-structures";
      icon = (
        <StructureIcon style={{ color: Colors.purple[6] }} size={iconSize} />
      );
      break;

    case 202:
      link = "tafsil-types";
      icon = (
        <TafsilTypesIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    case 203:
      link = "tafsil-accounts";
      icon = (
        <TafsilAccountsIcon
          style={{ color: Colors.green[6] }}
          size={iconSize}
        />
      );
      break;

    default:
      break;
  }

  return { link, icon };
};

const UserAccountsMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const financial_accounts_module_id = 19;
    const accessiblePages = await modulesService.accessiblePages(
      financial_accounts_module_id
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

  const financial_accounts_module_path_name = "accounts";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${financial_accounts_module_path_name}`
  );
  const prePath = isEndsWithModuleName
    ? `${financial_accounts_module_path_name}/`
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

export default UserAccountsMenu;
