import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col } from "antd";
import DashboardTile from "../../../common/dashboard-tile";
import {
  TbBuildingBank as StoresIcon,
  TbBrandCodesandbox as MeasureTypeIcon,
  TbRuler2 as MeasureUnitIcon,
  TbReportMoney as PricingTypeIcon,
} from "react-icons/tb";
import { CgListTree as CategoryIcon } from "react-icons/cg";
import { AiOutlineDeploymentUnit as NatureIcon } from "react-icons/ai";
import Colors from "../../../../resources/colors";
import modulesService from "../../../../services/app/modules-service";

const iconProps = {
  size: 55,
  style: { marginTop: 10 },
};

const mapper = (pageID) => {
  let link = "";
  let icon = null;
  let backColor = Colors.blue[3];

  switch (pageID) {
    case 141:
      link = "user-stores";
      icon = <StoresIcon {...iconProps} />;
      backColor = Colors.orange[3];
      break;

    case 142:
      link = "user-product-natures";
      icon = <NatureIcon {...iconProps} />;
      backColor = Colors.blue[3];
      break;

    case 143:
      link = "user-measure-types";
      icon = <MeasureTypeIcon {...iconProps} />;
      backColor = Colors.green[3];
      break;

    case 144:
      link = "user-measure-units";
      icon = <MeasureUnitIcon {...iconProps} />;
      backColor = Colors.purple[3];
      break;

    case 145:
      link = "user-pricing-types";
      icon = <PricingTypeIcon {...iconProps} />;
      backColor = Colors.cyan[3];
      break;

    case 146:
      link = "user-product-categories";
      icon = <CategoryIcon {...iconProps} />;
      backColor = Colors.magenta[3];
      break;

    default:
      break;
  }

  return { link, icon, backColor };
};

const UserStoreManagementDashboard = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);

  useMount(async () => {
    const store_management_module_id = 14;
    const accessiblePages = await modulesService.accessiblePages(
      store_management_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  return (
    <Row gutter={[10, 16]}>
      {accessiblePages.map((page) => (
        <Col xs={24} md={8} lg={6} key={page.PageID}>
          <DashboardTile
            to={`store-mgr/${mapper(page.PageID).link}`}
            icon={mapper(page.PageID).icon}
            backColor={mapper(page.PageID).backColor}
            title={page.PageTitle}
          />
        </Col>
      ))}
    </Row>
  );
};

export default UserStoreManagementDashboard;
