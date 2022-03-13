import React from "react";
import { Button } from "antd";

const TestPage = (props) => {
  console.log("hash", props.history);

  const handlePush = () => {
    props.history.replace("/test/books#abc");
  };

  const handlePop = () => {
    props.history.replace("/test/books#123");
  };

  return (
    <div>
      <h1>Test Page</h1>
      <Button onClick={handlePush}>Books</Button>
      <Button onClick={handlePop}>back</Button>
    </div>
  );
};

export default TestPage;
