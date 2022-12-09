import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col } from "antd";
import DashboardTile from "../../../../common/dashboard-tile";
import { BsFileEarmarkPersonFill as CollectorAgentIcon } from "react-icons/bs";
import Colors from "../../../../../resources/colors";
import modulesService from "../../../../../services/app/modules-service";

const iconProps = {
  size: 55,
  style: { marginTop: 10 },
};

const mapper = (pageID) => {
  let link = "";
  let icon = null;
  let backColor = Colors.blue[3];

  switch (pageID) {
    case 250:
      link = "collector-agents";
      icon = <CollectorAgentIcon {...iconProps} />;
      backColor = Colors.green[3];
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

  return { link, icon, backColor };
};

const TreasuryCollectorAgentDashboard = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);

  useMount(async () => {
    const financial_treasury_collector_agent_module_id = 28;
    const accessiblePages = await modulesService.accessiblePages(
      financial_treasury_collector_agent_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  return (
    <Row gutter={[10, 16]}>
      {accessiblePages.map((page) => (
        <Col xs={24} md={8} lg={6} key={page.PageID}>
          <DashboardTile
            to={`collector-agent/${mapper(page.PageID).link}`}
            icon={mapper(page.PageID).icon}
            backColor={mapper(page.PageID).backColor}
            title={page.PageTitle}
          />
        </Col>
      ))}
    </Row>
  );
};

export default TreasuryCollectorAgentDashboard;