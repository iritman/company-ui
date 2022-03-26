import React from "react";
import { Select, Row, Col } from "antd";

const options = [];

for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Label: ${value}`,
    value,
  });
}

const TestPage = (props) => {
  const [value, setValue] = React.useState(["a10", "c12", "h17", "j19", "k20"]);

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
    maxTagCount: "responsive",
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
