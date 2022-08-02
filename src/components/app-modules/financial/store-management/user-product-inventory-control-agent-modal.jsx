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
import SwitchItem from "./../../../form-controls/switch-item";
import {
  useModalContext,
  useResetContext,
} from "./../../../contexts/modal-context";

const schema = {
  PAID: Joi.number().required(),
  ProductID: Joi.number().required(),
  AgentID: Joi.number().min(1).required(),
  EffectiveInPricing: Joi.boolean().label(Words.effective_in_pricing),
  EffectiveInWarehousing: Joi.boolean().label(Words.effective_in_warehousing),
};

const initRecord = (productID) => {
  return {
    PAID: 0,
    ProductID: productID,
    AgentID: 0,
    EffectiveInPricing: false,
    EffectiveInWarehousing: false,
  };
};

const formRef = React.createRef();

const UserProductInventoryControlAgentModal = ({
  isOpen,
  product,
  selectedInventoryControlAgent,
  inventoryControlAgents,
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
    record.AgentID = 0;
    record.EffectiveInPricing = false;
    record.EffectiveInPricing = false;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord(product.ProductID));

    initModal(formRef, selectedInventoryControlAgent, setRecord);

    // if (selectedInventoryControlAgent !== null) {
    //   setValueTypeID(selectedInventoryControlAgent.ValueTypeID);

    //   const completePropsFeature = { ...selectedInventoryControlAgent };
    //   completePropsFeature.ProductID = product.ProductID;
    //   completePropsFeature.FeatureIntValue =
    //     completePropsFeature.ValueTypeID === 1
    //       ? parseInt(completePropsFeature.FeatureValue)
    //       : 0;
    //   completePropsFeature.FeatureDecimalValue =
    //     completePropsFeature.ValueTypeID === 2
    //       ? parseFloat(completePropsFeature.FeatureValue)
    //       : 0;
    //   completePropsFeature.EffectiveInPricing =
    //     completePropsFeature.EffectiveInPricing =
    //       completePropsFeature.ValueTypeID === 4
    //         ? completePropsFeature.FeatureValue === "1"
    //         : false;

    //   initModal(formRef, completePropsFeature, setRecord);
    // }
  });

  const isEdit = selectedInventoryControlAgent !== null;

  const handleSubmit = async () => {
    await saveModalChanges(
      formConfig,
      selectedInventoryControlAgent,
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
      title={Words.inventory_control_agents}
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
              title={Words.inventory_control_agent}
              dataSource={inventoryControlAgents}
              keyColumn="AgentID"
              valueColumn="Title"
              formConfig={formConfig}
              required
              autoFocus
            />
          </Col>

          <Col xs={24}>
            <SwitchItem
              title={Words.effective_in_pricing}
              fieldName="EffectiveInPricing"
              initialValue={false}
              checkedTitle={Words.yes}
              unCheckedTitle={Words.no}
              formConfig={formConfig}
            />
          </Col>

          <Col xs={24}>
            <SwitchItem
              title={Words.effective_in_warehousing}
              fieldName="EffectiveInWarehousing"
              initialValue={false}
              checkedTitle={Words.yes}
              unCheckedTitle={Words.no}
              formConfig={formConfig}
            />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default UserProductInventoryControlAgentModal;
