export const getFormItemLayout = (labelCol) => {
  return {
    labelCol: {
      xs: { span: 24 },
      sm: { span: labelCol },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 - labelCol },
    },
  };
};

export const centerTextCol = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
