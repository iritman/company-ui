import React from "react";
import { Row, Col } from "antd";
import Colors from "./../resources/colors";

const LoginPage = () => {
  return (
    <Row>
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: Colors.blue[6],
        }}
      >
        A
      </Col>
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: Colors.red[6],
        }}
      >
        B
      </Col>
    </Row>
  );
};

export default LoginPage;
