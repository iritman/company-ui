import React from "react";
import { Select, Row, Col, Typography } from "antd";

const { Text } = Typography;
const options = [];

for (let i = 10; i < 36; i++) {
  const value = i;
  options.push({
    label: <Text style={{ color: "red" }}>{`Long Label: ${value}`}</Text>,
    value,
  });
}

const TestPage = (props) => {
  const [value, setValue] = React.useState([10, 12]);

  const selectProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    value,
    options,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: "Select Item...",
    // maxTagCount: "responsive",
  };

  return (
    <Row>
      <Col xs={5}>
        <Select {...selectProps} />
      </Col>
    </Row>
  );
};

export default TestPage;
