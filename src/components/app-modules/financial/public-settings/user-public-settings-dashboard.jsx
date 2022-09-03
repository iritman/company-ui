import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col } from "antd";
import DashboardTile from "../../../common/dashboard-tile";
import { FaProjectDiagram as ProjectsIcon } from "react-icons/fa";
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
    case 161:
      link = "projects";
      icon = <ProjectsIcon {...iconProps} />;
      backColor = Colors.orange[3];
      break;

    // case 142:
    //   link = "user-product-natures";
    //   icon = <NatureIcon {...iconProps} />;
    //   backColor = Colors.green[3];
    //   break;

    // case 143:
    //   link = "user-measure-types";
    //   icon = <MeasureTypeIcon {...iconProps} />;
    //   backColor = Colors.blue[3];
    //   break;

    // case 144:
    //   link = "user-measure-units";
    //   icon = <MeasureUnitIcon {...iconProps} />;
    //   backColor = Colors.cyan[3];
    //   break;

    // case 145:
    //   link = "user-pricing-types";
    //   icon = <PricingTypeIcon {...iconProps} />;
    //   backColor = Colors.purple[3];
    //   break;

    // case 146:
    //   link = "user-product-categories";
    //   icon = <CategoryIcon {...iconProps} />;
    //   backColor = Colors.magenta[3];
    //   break;

    // case 147:
    //   link = "user-features";
    //   icon = <FeatureIcon {...iconProps} />;
    //   backColor = Colors.lime[4];
    //   break;

    // case 148:
    //   link = "user-products";
    //   icon = <ProductIcon {...iconProps} />;
    //   backColor = Colors.volcano[3];
    //   break;

    // case 149:
    //   link = "user-inventory-control-agents";
    //   icon = <InventoryControlAgentIcon {...iconProps} />;
    //   backColor = Colors.red[3];
    //   break;

    // case 150:
    //   link = "user-bach-patterns";
    //   icon = <BachPatternIcon {...iconProps} />;
    //   backColor = Colors.cyan[3];
    //   break;

    // case 151:
    //   link = "user-baches";
    //   icon = <BachIcon {...iconProps} />;
    //   backColor = Colors.geekblue[3];
    //   break;

    default:
      break;
  }

  return { link, icon, backColor };
};

const UserPublicSettingsDashboard = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);

  useMount(async () => {
    const public_settings_module_id = 17;
    const accessiblePages = await modulesService.accessiblePages(
      public_settings_module_id
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

export default UserPublicSettingsDashboard;
