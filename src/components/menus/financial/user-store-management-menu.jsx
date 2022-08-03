import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  AiOutlineDashboard as DashboardIcon,
  AiOutlineDeploymentUnit as NatureIcon,
  AiOutlineControl as InventoryControlAgentIcon,
} from "react-icons/ai";
import {
  TbBuildingBank as StoresIcon,
  TbBrandCodesandbox as MeasureTypeIcon,
  TbRuler2 as MeasureUnitIcon,
  TbReportMoney as PricingTypeIcon,
  TbShape2 as BachPatternIcon,
} from "react-icons/tb";
import { CgListTree as CategoryIcon } from "react-icons/cg";
import {
  MdOutlineFeaturedPlayList as FeatureIcon,
  MdDonutSmall as ProductIcon,
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
    case 141:
      link = "user-stores";
      icon = <StoresIcon style={{ color: Colors.orange[6] }} size={iconSize} />;
      break;

    case 142:
      link = "user-product-natures";
      icon = <NatureIcon style={{ color: Colors.green[6] }} size={iconSize} />;
      break;

    case 143:
      link = "user-measure-types";
      icon = (
        <MeasureTypeIcon style={{ color: Colors.blue[6] }} size={iconSize} />
      );
      break;

    case 144:
      link = "user-measure-units";
      icon = (
        <MeasureUnitIcon style={{ color: Colors.cyan[6] }} size={iconSize} />
      );
      break;

    case 145:
      link = "user-pricing-types";
      icon = (
        <PricingTypeIcon style={{ color: Colors.purple[6] }} size={iconSize} />
      );
      break;

    case 146:
      link = "user-product-categories";
      icon = (
        <CategoryIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
      );
      break;

    case 147:
      link = "user-features";
      icon = <FeatureIcon style={{ color: Colors.lime[6] }} size={iconSize} />;
      break;

    case 148:
      link = "user-products";
      icon = (
        <ProductIcon style={{ color: Colors.volcano[6] }} size={iconSize} />
      );
      break;

    case 149:
      link = "user-inventory-control-agents";
      icon = (
        <InventoryControlAgentIcon
          style={{ color: Colors.red[6] }}
          size={iconSize}
        />
      );
      break;

    case 150:
      link = "user-bach-patterns";
      icon = (
        <BachPatternIcon style={{ color: Colors.cyan[6] }} size={iconSize} />
      );
      break;

    default:
      break;
  }

  return { link, icon };
};

const UserStoreManagementMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  const currentLocation = useLocation();

  useMount(async () => {
    const store_management_module_id = 14;
    const accessiblePages = await modulesService.accessiblePages(
      store_management_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  useEffect(() => {
    const pathKeys = currentLocation.pathname.split("/");
    const _lastPathKey = pathKeys[pathKeys.length - 1]
      .replace("user-", "")
      .replace("-", "")
      .toLocaleLowerCase();
    setLastPathKey(_lastPathKey);
  }, [currentLocation.pathname]);

  const store_management_module_path_name = "store-mgr";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${store_management_module_path_name}`
  );
  const prePath = isEndsWithModuleName
    ? `${store_management_module_path_name}/`
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
            .replace("-", "")
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

export default UserStoreManagementMenu;
