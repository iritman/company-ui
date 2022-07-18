import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Tabs } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
import utils from "../../../../tools/utils";
import service from "../../../../services/financial/store-mgr/user-products-service";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
} from "../../../../tools/form-manager";
import InputItem from "./../../../form-controls/input-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import SwitchItem from "./../../../form-controls/switch-item";
import { handleError } from "./../../../../tools/form-manager";
import {
  useModalContext,
  useResetContext,
} from "./../../../contexts/modal-context";

const { TabPane } = Tabs;

const schema = {
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
  IsBuyable: Joi.boolean(),
  IsSalable: Joi.boolean(),
  IsBuildable: Joi.boolean(),
};

const initRecord = {
  ProductID: 0,
  CategoryID: 0,
  NatureID: 0,
  ProductCode: "",
  Title: "",
  IsBuyable: false,
  IsSalable: false,
  IsBuildable: false,
};

const formRef = React.createRef();

const UserProductModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [categories, setCategories] = useState([]);
  const [natures, setNatures] = useState([]);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.CategoryID = 0;
    record.NatureID = 0;
    record.ProductCode = "";
    record.Title = "";
    record.IsBuyable = false;
    record.IsSalable = false;
    record.IsBuildable = false;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);

    setProgress(true);
    try {
      const data = await service.getParams();

      const { Categories, Natures } = data;

      setCategories(Categories);
      setNatures(Natures);
    } catch (ex) {
      handleError(ex);
    }
    setProgress(false);
  });

  const isEdit = selectedObject !== null;

  const handleSubmit = async () => {
    saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  //   const handleTabChange = (key) => {
  //     console.log(key);
  //   };

  //-----------------

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      width={750}
    >
      <Tabs
        defaultActiveKey="1"
        type="card"
        //   onChange={handleTabChange}
      >
        <TabPane tab={Words.product} key="1">
          <Form ref={formRef} name="dataForm">
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
            </Row>
          </Form>
        </TabPane>
        {/* <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane> */}
      </Tabs>
    </ModalWindow>
  );
};

export default UserProductModal;
