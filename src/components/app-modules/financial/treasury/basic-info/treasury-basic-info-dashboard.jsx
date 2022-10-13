import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col } from "antd";
import DashboardTile from "../../../../common/dashboard-tile";
import { FaProjectDiagram as BankTypesIcon } from "react-icons/fa";
import { VscTypeHierarchySub as BankBranchIcon } from "react-icons/vsc";
import {
  AiFillBank as BankIcon,
  AiOutlineBranches as BankAccountTypeIcon,
} from "react-icons/ai";
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
    case 221:
      link = "bank-types";
      icon = <BankTypesIcon {...iconProps} />;
      backColor = Colors.green[3];
      break;

    case 222:
      link = "banks";
      icon = <BankIcon {...iconProps} />;
      backColor = Colors.blue[3];
      break;

    case 223:
      link = "bank-branches";
      icon = <BankBranchIcon {...iconProps} />;
      backColor = Colors.purple[3];
      break;

    case 224:
      link = "bank-account-types";
      icon = <BankAccountTypeIcon {...iconProps} />;
      backColor = Colors.orange[3];
      break;

    default:
      break;
  }

  return { link, icon, backColor };
};

const TreasuryBasicInfoDashboard = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);

  useMount(async () => {
    const financial_treasury_basic_info_module_id = 23;
    const accessiblePages = await modulesService.accessiblePages(
      financial_treasury_basic_info_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  return (
    <Row gutter={[10, 16]}>
      {accessiblePages.map((page) => (
        <Col xs={24} md={8} lg={6} key={page.PageID}>
          <DashboardTile
            to={`basic/${mapper(page.PageID).link}`}
            icon={mapper(page.PageID).icon}
            backColor={mapper(page.PageID).backColor}
            title={page.PageTitle}
          />
        </Col>
      ))}
    </Row>
  );
};

export default TreasuryBasicInfoDashboard;
