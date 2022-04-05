import React from "react";
import { Button, Tooltip } from "antd";
import { ReloadOutlined as ReloadIcon } from "@ant-design/icons";

const ReloadButton = ({ tooltip, onClick }) => {
  return (
    <Tooltip title={tooltip}>
      <Button size="small" icon={<ReloadIcon />} onClick={onClick} />
    </Tooltip>
  );
};

export default ReloadButton;
