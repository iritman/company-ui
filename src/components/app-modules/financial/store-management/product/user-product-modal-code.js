import React from "react";
import Joi from "joi-browser";
import { Typography, Space, Button, Popconfirm, Row, Col, Tabs } from "antd";
import {
  PlusOutlined as PlusIcon,
  EditOutlined as EditIcon,
  QuestionCircleOutlined as QuestionIcon,
  DeleteOutlined as DeleteIcon,
  CheckOutlined as CheckIcon,
} from "@ant-design/icons";
import { getSorter } from "../../../../../tools/form-manager";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import SwitchItem from "./../../../../form-controls/switch-item";
import DropdownItem from "./../../../../form-controls/dropdown-item";
import InputItem from "./../../../../form-controls/input-item";
import DetailsTable from "./../../../../common/details-table";

const { Text } = Typography;

const AddButton = ({ title, onClick }) => {
  return (
    <Button type="primary" icon={<PlusIcon />} onClick={onClick}>
      {title}
    </Button>
  );
};

export const schema = {
  ProductID: Joi.number().required(),
  CategoryID: Joi.number().min(1).required().label(Words.product_category),
  NatureID: Joi.number().min(1).required().label(Words.product_nature),
  ProductCode: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.product_code)
    .regex(utils.VALID_REGEX),
  Title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(utils.VALID_REGEX),
  BachPatternID: Joi.number().label(Words.bach_pattern),
  IsBuyable: Joi.boolean(),
  IsSalable: Joi.boolean(),
  IsBuildable: Joi.boolean(),
  IsSparePart: Joi.boolean(),
  IsFixProperty: Joi.boolean(),
  DetailsText: Joi.string()
    .allow("")
    .max(1024)
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
  Stores: Joi.array(),
  MeasureUnits: Joi.array(),
  MeasureConverts: Joi.array(),
  InventoryControlAgents: Joi.array(),
  AlternativeProducts: Joi.array(),
};

export const initRecord = {
  ProductID: 0,
  CategoryID: 0,
  NatureID: 0,
  ProductCode: "",
  Title: "",
  BachPatternID: 0,
  IsBuyable: false,
  IsSalable: false,
  IsBuildable: false,
  IsSparePart: false,
  IsFixProperty: false,
  DetailsText: "",
  Stores: [],
  MeasureUnits: [],
  MeasureConverts: [],
  InventoryControlAgents: [],
  AlternativeProducts: [],
};

const getStoresColumns = (access, onEdit, onDelete) => {
  let columns = [
    {
      title: Words.id,
      width: 75,
      align: "center",
      dataIndex: "StoreID",
      sorter: getSorter("StoreID"),
      render: (StoreID) => <Text>{utils.farsiNum(`${StoreID}`)}</Text>,
    },
    {
      title: Words.title,
      width: 120,
      align: "center",
      dataIndex: "Title",
      sorter: getSorter("Title"),
      render: (Title) => (
        <Text
          style={{
            color: Colors.cyan[7],
          }}
        >
          {Title}
        </Text>
      ),
    },
    {
      title: Words.storage_center,
      width: 120,
      align: "center",
      dataIndex: "StorageCenterTitle",
      sorter: getSorter("StorageCenterTitle"),
      render: (StorageCenterTitle) => (
        <Text
          style={{
            color: Colors.orange[7],
          }}
        >
          {StorageCenterTitle}
        </Text>
      ),
    },
    {
      title: Words.status,
      width: 120,
      align: "center",
      dataIndex: "IsActive",
      sorter: getSorter("IsActive"),
      render: (IsActive) => (
        <Text
          style={{
            color: IsActive ? Colors.green[6] : Colors.red[6],
          }}
        >
          {IsActive ? Words.active : Words.inactive}
        </Text>
      ),
    },
  ];

  if ((access.CanEdit && onEdit) || (access.CanDelete && onDelete)) {
    columns = [
      ...columns,
      {
        title: "",
        fixed: "right",
        align: "center",
        width: 75,
        render: (record) => (
          <Space>
            {access.CanEdit && onEdit && (
              <Button
                type="link"
                icon={<EditIcon />}
                onClick={() => onEdit(record)}
              />
            )}

            {access.CanDelete && onDelete && (
              <Popconfirm
                title={Words.questions.sure_to_delete_store}
                onConfirm={async () => await onDelete(record)}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
              >
                <Button type="link" icon={<DeleteIcon />} danger />
              </Popconfirm>
            )}
          </Space>
        ),
      },
    ];
  }

  return columns;
};

const getMeasureUnitsColumns = (access, onEdit, onDelete) => {
  let columns = [
    {
      title: Words.id,
      width: 75,
      align: "center",
      dataIndex: "MeasureUnitID",
      sorter: getSorter("MeasureUnitID"),
      render: (MeasureUnitID) => (
        <Text>{utils.farsiNum(`${MeasureUnitID}`)}</Text>
      ),
    },
    {
      title: Words.measure_unit,
      width: 120,
      align: "center",
      dataIndex: "MeasureUnitTitle",
      sorter: getSorter("MeasureUnitTitle"),
      render: (MeasureUnitTitle) => (
        <Text
          style={{
            color: Colors.red[7],
          }}
        >
          {MeasureUnitTitle}
        </Text>
      ),
    },
    {
      title: Words.measure_type,
      width: 150,
      align: "center",
      dataIndex: "MeasureTypeTitle",
      sorter: getSorter("MeasureTypeTitle"),
      render: (MeasureTypeTitle) => (
        <Text style={{ color: Colors.green[7] }}>{MeasureTypeTitle}</Text>
      ),
    },
    {
      title: Words.default,
      width: 75,
      align: "center",
      dataIndex: "IsDefault",
      sorter: getSorter("IsDefault"),
      render: (IsDefault) => (
        <>{IsDefault && <CheckIcon style={{ color: Colors.green[6] }} />}</>
      ),
    },
  ];

  if ((access.CanEdit && onEdit) || (access.CanDelete && onDelete)) {
    columns = [
      ...columns,
      {
        title: "",
        fixed: "right",
        align: "center",
        width: 75,
        render: (record) => (
          <Space>
            {access.CanEdit && onEdit && (
              <Button
                type="link"
                icon={<EditIcon />}
                onClick={() => onEdit(record)}
              />
            )}

            {access.CanDelete && onDelete && (
              <Popconfirm
                title={Words.questions.sure_to_delete_measure_unit}
                onConfirm={async () => await onDelete(record)}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
              >
                <Button type="link" icon={<DeleteIcon />} danger />
              </Popconfirm>
            )}
          </Space>
        ),
      },
    ];
  }

  return columns;
};

export const getTabItems = (formConfig, props, events) => {
  const { categories, natures, bachPatterns, record, access } = props;

  const {
    handleShowStoreModal,
    handleEditStore,
    handleDeleteStore,
    handleShowMeasureUnitModal,
    handleEditMeasureUnit,
    handleDeleteMeasureUnit,
  } = events;

  const infoTabItems = [
    {
      label: Words.measure_units,
      key: "measure-units",
      children: (
        <Row gutter={[2, 5]}>
          <Col xs={24}>
            <AddButton
              title={Words.new_measure_unit}
              onClick={handleShowMeasureUnitModal}
            />
          </Col>
          <Col xs={24}>
            <DetailsTable
              records={record.MeasureUnits}
              columns={getMeasureUnitsColumns(
                access,
                handleEditMeasureUnit, // handle edit measure unit
                handleDeleteMeasureUnit // handle delete measure unit
              )}
            />
          </Col>
        </Row>
      ),
    },
  ];

  return [
    {
      label: Words.main_info,
      key: "main-info",
      children: (
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.title}
              fieldName="Title"
              maxLength={50}
              formConfig={formConfig}
              required
              autoFocus
            />
          </Col>
          <Col xs={24} md={12}>
            <InputItem
              title={Words.product_code}
              fieldName="ProductCode"
              maxLength={50}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.product_category}
              dataSource={categories}
              keyColumn="CategoryID"
              valueColumn="Title"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.product_nature}
              dataSource={natures}
              keyColumn="NatureID"
              valueColumn="Title"
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={8}>
            <SwitchItem
              title={Words.is_buyable}
              fieldName="IsBuyable"
              initialValue={false}
              checkedTitle={Words.yes}
              unCheckedTitle={Words.no}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={8}>
            <SwitchItem
              title={Words.is_salable}
              fieldName="IsSalable"
              initialValue={false}
              checkedTitle={Words.yes}
              unCheckedTitle={Words.no}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={8}>
            <SwitchItem
              title={Words.is_buildable}
              fieldName="IsBuildable"
              initialValue={false}
              checkedTitle={Words.yes}
              unCheckedTitle={Words.no}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <SwitchItem
              title={Words.spare_part}
              fieldName="IsSparePart"
              initialValue={false}
              checkedTitle={Words.yes}
              unCheckedTitle={Words.no}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <SwitchItem
              title={Words.fix_property}
              fieldName="IsFixProperty"
              initialValue={false}
              checkedTitle={Words.yes}
              unCheckedTitle={Words.no}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24}>
            <Tabs
              defaultActiveKey="1"
              type="card"
              // onChange={handleTabChange}
              items={infoTabItems}
            />
          </Col>
        </Row>
      ),
    },
    {
      label: Words.descriptions,
      key: "descriptions",
      children: (
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24}>
            <InputItem
              title={Words.descriptions}
              fieldName="DetailsText"
              multiline
              rows={7}
              showCount
              maxLength={512}
              formConfig={formConfig}
              autoFocus
            />
          </Col>
        </Row>
      ),
    },
    {
      label: Words.bach_info,
      key: "bach-info",
      children: (
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24}>
            <DropdownItem
              title={Words.bach_pattern}
              dataSource={bachPatterns}
              keyColumn="BachPatternID"
              valueColumn="Title"
              formConfig={formConfig}
            />
          </Col>
        </Row>
      ),
    },
    {
      label: Words.store,
      key: "store",
      children: (
        <Row gutter={[2, 5]} style={{ marginLeft: 1 }}>
          <Col xs={24}>
            <AddButton title={Words.new_store} onClick={handleShowStoreModal} />
          </Col>
          <Col xs={24}>
            <DetailsTable
              records={record.Stores}
              columns={getStoresColumns(
                access,
                handleEditStore, // handle edit store
                handleDeleteStore // handle delete store
              )}
            />
          </Col>
        </Row>
      ),
    },
  ];
};

const codes = {
  schema,
  initRecord,
  getTabItems,
};

export default codes;
