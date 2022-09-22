import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
import utils from "../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../tools/form-manager";
import service from "../../../../services/financial/accounts/tafsil-types-service";
import InputItem from "./../../../form-controls/input-item";
import NumericInputItem from "./../../../form-controls/numeric-input-item";
import DropdownItem from "./../../../form-controls/dropdown-item";
import {
  useModalContext,
  useResetContext,
} from "./../../../contexts/modal-context";

const schema = {
  TafsilTypeID: Joi.number().required(),
  ParentTafsilTypeID: Joi.number().required(),
  BaseTableID: Joi.number().required(),
  StartCode: Joi.number().min(1).required().label(Words.start_code),
  Title: Joi.string()
    .min(2)
    .max(50)
    .required()
    .label(Words.title)
    .regex(utils.VALID_REGEX),
  DetailsText: Joi.string()
    .min(5)
    .max(512)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
};

const initRecord = {
  TafsilTypeID: 0,
  ParentTafsilTypeID: 0,
  BaseTableID: 0,
  StartCode: 1,
  Title: "",
  DetailsText: "",
};

const formRef = React.createRef();

const TafsilTypeModal = ({ isOpen, selectedObject, onOk, onCancel }) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [tafsilTypes, setTafsilTypes] = useState([]);
  const [baseTables, setBaseTables] = useState([]);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.ParentTafsilTypeID = 0;
    record.BaseTableID = 0;
    record.StartCode = 1;
    record.Title = "";
    record.DetailsText = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    loadFieldsValue(formRef, initRecord);
    initModal(formRef, selectedObject, setRecord);

    //------

    setProgress(true);

    try {
      const data = await service.getParams();

      let { TafsilTypes, BaseTables } = data;

      TafsilTypes.forEach((type) => {
        type.ParentTafsilTypeID = type.TafsilTypeID;
      });

      if (selectedObject) {
        TafsilTypes = TafsilTypes.filter(
          (tt) => tt.TafsilTypeID !== selectedObject.TafsilTypeID
        );
      }

      BaseTables.forEach((table) => {
        table.BaseTableID = table.TableID;
      });

      setTafsilTypes(TafsilTypes);
      setBaseTables(BaseTables);
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

  //------

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
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24}>
            <InputItem
              title={Words.title}
              fieldName="Title"
              required
              autoFocus
              maxLength={50}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24}>
            <NumericInputItem
              horizontal
              required
              title={Words.start_code}
              fieldName="StartCode"
              min={1}
              max={10000}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.base_module}
              dataSource={baseTables}
              keyColumn="BaseTableID"
              valueColumn="Title"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.parent_tafsil_type}
              dataSource={tafsilTypes}
              keyColumn="ParentTafsilTypeID"
              valueColumn="Title"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24}>
            <InputItem
              title={Words.descriptions}
              fieldName="DetailsText"
              multiline
              rows={7}
              showCount
              maxLength={512}
              formConfig={formConfig}
            />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default TafsilTypeModal;
