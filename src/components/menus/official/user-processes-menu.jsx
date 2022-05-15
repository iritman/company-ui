import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import { MdPersonRemoveAlt1 as RemoveUserIcon } from "react-icons/md";
import {
  RiRefund2Fill as FundIcon,
  RiArtboardFill as BoardIcon,
  RiWalkFill as CheckoutIcon,
  RiUserAddFill as AddUserIcon,
  RiExchangeFundsLine as PersonalReplacementIcon,
  RiExchangeLine as ManagerReplacementIcon,
} from "react-icons/ri";
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
    case 91:
      link = "dismissals";
      icon = (
        <RemoveUserIcon style={{ color: Colors.red[6] }} size={iconSize} />
      );
      break;

    case 92:
      link = "edu-funds";
      icon = <FundIcon style={{ color: Colors.green[6] }} size={iconSize} />;
      break;

    case 93:
      link = "learnings";
      icon = <BoardIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 94:
      link = "checkouts";
      icon = (
        <CheckoutIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    case 95:
      link = "employments";
      icon = (
        <AddUserIcon style={{ color: Colors.purple[6] }} size={iconSize} />
      );
      break;

    case 96:
      link = "personal-replacements";
      icon = (
        <PersonalReplacementIcon
          style={{ color: Colors.magenta[6] }}
          size={iconSize}
        />
      );
      break;

    case 97:
      link = "manager-replacements";
      icon = (
        <ManagerReplacementIcon
          style={{ color: Colors.cyan[6] }}
          size={iconSize}
        />
      );
      break;

    default:
      break;
  }

  return { link, icon };
};

const UserProccessesMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const processes_module_id = 10;
    const accessiblePages = await modulesService.accessiblePages(
      processes_module_id
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

  const processes_module_path_name = "processes";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${processes_module_path_name}`
  );
  const prePath = isEndsWithModuleName ? `${processes_module_path_name}/` : "";

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

export default UserProccessesMenu;
