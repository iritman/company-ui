import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col, Space, Typography, Avatar, Card } from "antd";
import modulesService from "./../services/app/modules-service";
import Colors from "./../resources/colors";
import { AiOutlineDatabase as OfficialIcon } from "react-icons/ai";
import { Link } from "react-router-dom";

const { Title } = Typography;

const mapper = (categoryID) => {
  let link = "";
  let icon = null;
  let backColor = Colors.blue[3];

  switch (categoryID) {
    case 1:
      link = "cat/official";
      icon = <OfficialIcon size={55} style={{ marginTop: 10 }} />;
      backColor = Colors.green[3];
      break;

    default:
      break;
  }

  return { link, icon, backColor };
};

const MainDashboard = () => {
  const [accessibleModuleCategories, setAccessibleModuleCategories] = useState(
    []
  );

  useMount(async () => {
    const accessibleModuleCategories =
      await modulesService.accessibleModuleCategories();

    setAccessibleModuleCategories(accessibleModuleCategories);
  });

  return (
    <Row gutter={[10, 16]}>
      {accessibleModuleCategories.map((category) => (
        <Col xs={24} md={8} lg={6} key={category.CategoryID}>
          <Link to={`home/${mapper(category.CategoryID).link}`}>
            <Card
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Space direction="vertical">
                <Avatar
                  size={75}
                  icon={mapper(category.CategoryID).icon}
                  style={{
                    backgroundColor: mapper(category.CategoryID).backColor,
                  }}
                />
                <Title level={5}>{category.CategoryTitle}</Title>
              </Space>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default MainDashboard;
