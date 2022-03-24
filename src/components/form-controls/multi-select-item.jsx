import React from "react";
import { Form, Select, Typography } from "antd";
import Words from "../../resources/words";

const { Option } = Select;
const { Text } = Typography;

const handleSelectItemsChange = (
  fieldName,
  value,
  dataSource,
  keyColumn,
  formConfig
) => {
  const { record, setRecord } = formConfig;

  const rec = { ...record };
  rec[fieldName] = dataSource.filter(
    (item) => value.filter((v) => v === item[keyColumn]).length > 0
  );

  setRecord(rec);
};

const MultiSelectItem = ({
  title,
  dataSource,
  keyColumn,
  valueColumn,
  fieldName,
  fieldIDs,
  onChange,
  onSearch,
  required,
  vertical,
  labelCol,
  formConfig,
  ...rest
}) => {
  const selectProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    allowClear: true,
    placeholder: Words.select_please,
    optionFilterProp: "children",
    onChange: (selectedValue) =>
      onChange
        ? onChange(selectedValue)
        : handleSelectItemsChange(
            fieldName,
            selectedValue,
            dataSource,
            keyColumn,
            formConfig
          ),
    filterOption: (input, option) =>
      option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  };

  return (
    <Form.Item
      wrapperCol={{
        span: vertical && vertical !== false ? 24 : 24 - labelCol,
      }}
      labelCol={{ span: vertical && vertical !== false ? 24 : labelCol }}
      label={title}
      name={fieldIDs}
      required={required}
    >
      <Select {...selectProps} {...rest}>
        {dataSource &&
          dataSource.map((item) => (
            <Option
              key={`${keyColumn}_${item[keyColumn]}`}
              value={item[keyColumn]}
            >
              <Text>{item[valueColumn]}</Text>
            </Option>
          ))}
      </Select>
    </Form.Item>
  );
};

export default MultiSelectItem;
