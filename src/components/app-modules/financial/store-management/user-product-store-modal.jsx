import React from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../common/modal-window";
import Words from "../../../../resources/words";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
} from "../../../../tools/form-manager";
import DropdownItem from "./../../../form-controls/dropdown-item";
import {
  useModalContext,
  useResetContext,
} from "./../../../contexts/modal-context";

const schema = {
  PSID: Joi.number().required(),
  ProductID: Joi.number().required(),
  StoreID: Joi.number().min(1).required(),
};

const initRecord = (productID) => {
  return {
    PSID: 0,
    ProductID: productID,
    StoreID: 0,
  };
};

const formRef = React.createRef();

const UserProductStoreModal = ({
  isOpen,
  product,
  selectedStore,
  stores,
  onOk,
  onCancel,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.StoreID = 0;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord(product.ProductID));

    initModal(formRef, selectedStore, setRecord);
  });

  const isEdit = selectedStore !== null;

  const handleSubmit = async () => {
    await saveModalChanges(
      formConfig,
      selectedStore,
      setProgress,
      onOk,
      clearRecord
    );

    onCancel();
  };

  //-----------------

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      title={Words.store}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      width={600}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24}>
            <DropdownItem
              title={Words.title}
              dataSource={stores}
              keyColumn="StoreID"
              valueColumn="Title"
              formConfig={formConfig}
              required
              autoFocus
            />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default UserProductStoreModal;
