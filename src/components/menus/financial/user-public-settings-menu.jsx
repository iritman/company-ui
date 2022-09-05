import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  FaProjectDiagram as ProjectsIcon,
  FaMoneyCheckAlt as CostCentersIcon,
} from "react-icons/fa";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import {
  SiWebmoney as CostCenterTypesIcon,
  SiConvertio as RatioIcon,
} from "react-icons/si";
import { HiOutlineCurrencyDollar as CurrenciesIcon } from "react-icons/hi";
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
    case 161:
      link = "projects";
      icon = (
        <ProjectsIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    case 162:
      link = "cost-center-types";
      icon = (
        <CostCenterTypesIcon
          style={{ color: Colors.green[6] }}
          size={iconSize}
        />
      );
      break;

    case 163:
      link = "cost-centers";
      icon = (
        <CostCentersIcon style={{ color: Colors.blue[6] }} size={iconSize} />
      );
      break;

    case 164:
      link = "currencies";
      icon = (
        <CurrenciesIcon style={{ color: Colors.cyan[6] }} size={iconSize + 4} />
      );
      break;

    case 165:
      link = "currency-ratios";
      icon = <RatioIcon style={{ color: Colors.purple[6] }} size={iconSize} />;
      break;

    // case 146:
    //   link = "user-product-categories";
    //   icon = (
    //     <CategoryIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
    //   );
    //   break;

    // case 147:
    //   link = "user-features";
    //   icon = <FeatureIcon style={{ color: Colors.lime[6] }} size={iconSize} />;
    //   break;

    // case 148:
    //   link = "user-products";
    //   icon = (
    //     <ProductIcon style={{ color: Colors.volcano[6] }} size={iconSize} />
    //   );
    //   break;

    // case 149:
    //   link = "user-inventory-control-agents";
    //   icon = (
    //     <InventoryControlAgentIcon
    //       style={{ color: Colors.red[6] }}
    //       size={iconSize}
    //     />
    //   );
    //   break;

    // case 150:
    //   link = "user-bach-patterns";
    //   icon = (
    //     <BachPatternIcon style={{ color: Colors.cyan[6] }} size={iconSize} />
    //   );
    //   break;

    // case 151:
    //   link = "user-baches";
    //   icon = <BachIcon style={{ color: Colors.geekblue[6] }} size={iconSize} />;
    //   break;

    default:
      break;
  }

  return { link, icon };
};

const UserPublicSettingsMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const public_settings_module_id = 17;
    const accessiblePages = await modulesService.accessiblePages(
      public_settings_module_id
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

  const public_settings_module_path_name = "public-settings";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${public_settings_module_path_name}`
  );
  const prePath = isEndsWithModuleName
    ? `${public_settings_module_path_name}/`
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

export default UserPublicSettingsMenu;
