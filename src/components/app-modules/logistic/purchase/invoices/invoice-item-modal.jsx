import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "../../../../common/modal-window";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../../tools/form-manager";
import service from "../../../../../services/logistic/purchase/invoices-service";
import InputItem from "../../../../form-controls/input-item";
import TextItem from "../../../../form-controls/text-item";
import NumericInputItem from "../../../../form-controls/numeric-input-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import SwitchItem from "../../../../form-controls/switch-item";

const schema = {
  ItemID: Joi.number().required(),
  InvoiceID: Joi.number().required(),
  InquiryRequestID: Joi.number().required(),
  InquiryRequestTypeID: Joi.number().required(),
  RefItemID: Joi.number().min(1).required(),
  RequestCount: Joi.number()
    .min(1)
    .max(999999)
    .positive()
    .precision(2)
    .label(Words.request_count),
  Fee: Joi.number().min(1000).label(Words.fee),
  //   Price: Joi.number().min(1000).label(Words.price),
  Returnable: Joi.boolean(),
  DeliveryDuration: Joi.number().min(0),
  DetailsText: Joi.string()
    .min(5)
    .max(250)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
  MoreInfo: Joi.object().allow(null),
};

const initRecord = {
  ItemID: 0,
  InvoiceID: 0,
  InquiryRequestID: 0,
  InquiryRequestTypeID: 0,
  RefItemID: 0,
  RequestCount: 0,
  Fee: 0,
  Price: 0,
  Returnable: true,
  DeliveryDuration: 0,
  DetailsText: "",
  MoreInfo: null,
};

const formRef = React.createRef();

const InvoiceItemModal = ({
  isOpen,
  selectedObject,
  supplierID,
  invoiceItems,
  onOk,
  onCancel,
}) => {
  const [progress, setProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [record, setRecord] = useState({});

  const [requestItems, setRequestItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.InvoiceID = 0;
    record.InquiryRequestID = 0;
    record.InquiryRequestTypeID = 0;
    record.RefItemID = 0;
    record.RequestCount = 0;
    record.Fee = 0;
    record.Price = 0;
    record.Returnable = true;
    record.DeliveryDuration = 0;
    record.DetailsText = "";
    record.MoreInfo = null;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    setRecord(initRecord);
    loadFieldsValue(formRef, initRecord);
    console.log(invoiceItems);
    try {
      let items = await service.getRegedInquiryRequestItems(supplierID);

      if (selectedObject) {
        let selected_item = items?.find(
          (i) => i.RefItemID === selectedObject.RefItemID
        );

        if (!selected_item) {
          selected_item = await service.getRegedInquiryRequestItemByID(
            selectedObject.RefItemID
          );
        }

        const {
          ItemCode,
          ItemTitle,
          AgentFirstName,
          AgentLastName,
          MeasureUnitTitle,
        } = selected_item;

        selectedObject.MoreInfo = {
          ItemCode,
          ItemTitle,
          AgentFirstName,
          AgentLastName,
          MeasureUnitTitle,
        };

        setSelectedItem(selected_item);
      } else {
        items = items.filter(
          (i) => !invoiceItems.find((ivi) => ivi.RefItemID === i.RefItemID)
        );
      }

      setRequestItems(items);
      initModal(formRef, selectedObject, setRecord);
    } catch (ex) {
      handleError(ex);
    }
  });

  const isEdit = selectedObject !== null;

  const handleSubmit = async () => {
    await saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord,
      false // showMessage
    );

    onCancel();
  };

  const handleChangeItem = (value) => {
    const rec = { ...record };
    rec.RefItemID = value;

    if (value === 0) {
      rec.RequestCount = 0;
      rec.InquiryRequestTypeID = 0;
      rec.InquiryRequestID = 0;
      rec.MoreInfo = null;
      setSelectedItem(null);
    } else {
      const selected_item = requestItems?.find((i) => i.RefItemID === value);
      setSelectedItem(selected_item);

      if (selected_item) {
        const {
          RequestCount,
          RequestID,
          RequestTypeID,
          ItemCode,
          ItemTitle,
          AgentFirstName,
          AgentLastName,
          MeasureUnitTitle,
        } = selected_item;

        rec.RequestCount = RequestCount;
        rec.InquiryRequestTypeID = RequestTypeID;
        rec.InquiryRequestID = RequestID;

        rec.MoreInfo = {
          ...rec.MoreInfo,
          ItemCode,
          ItemTitle,
          AgentFirstName,
          AgentLastName,
          MeasureUnitTitle,
        };
      }
    }

    setRecord(rec);
    loadFieldsValue(formRef, rec);
  };

  //------

  return (
    <ModalWindow
      isOpen={isOpen}
      isEdit={isEdit}
      inProgress={progress}
      disabled={validateForm({ record: record, schema }) && true}
      onClear={clearRecord}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      width={850}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.base}
              dataSource={requestItems}
              keyColumn="RefItemID"
              valueColumn={"ItemInfo"}
              formConfig={formConfig}
              onChange={handleChangeItem}
              required
              autoFocus
            />
          </Col>
          <Col xs={24} md={12}>
            <NumericInputItem
              horizontal
              title={Words.request_count}
              fieldName="RequestCount"
              min={0}
              max={999999}
              precision={2}
              maxLength={7}
              step="0.01"
              stringMode
              decimalText
              formConfig={formConfig}
              required
            />
          </Col>
          {record.RefItemID > 0 && (
            <>
              <Col xs={24} md={6}>
                <TextItem
                  title={Words.unit}
                  value={selectedItem?.MeasureUnitTitle}
                  valueColor={Colors.magenta[6]}
                />
              </Col>
              <Col xs={24} md={6}>
                <TextItem
                  title={Words.item_code}
                  value={utils.farsiNum(selectedItem?.ItemCode)}
                  valueColor={Colors.magenta[6]}
                />
              </Col>
              <Col xs={24} md={6}>
                <TextItem
                  title={Words.item_title}
                  value={utils.farsiNum(selectedItem?.ItemTitle)}
                  valueColor={Colors.magenta[6]}
                />
              </Col>
            </>
          )}
          <Col xs={24} md={12}>
            <NumericInputItem
              horizontal
              title={Words.fee}
              fieldName="Fee"
              min={0}
              max={9999999999}
              formConfig={formConfig}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <TextItem
              title={Words.price}
              value={utils.farsiNum(
                utils.moneyNumber(record.Fee * record.RequestCount)
              )}
              valueColor={Colors.magenta[6]}
            />
          </Col>
          <Col xs={24} md={12}>
            <NumericInputItem
              horizontal
              title={Words.delivery_duration}
              fieldName="DeliveryDuration"
              min={0}
              max={1000}
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <SwitchItem
              title={Words.returnable}
              fieldName="Returnable"
              initialValue={true}
              checkedTitle={Words.yes}
              unCheckedTitle={Words.no}
              formConfig={formConfig}
            />
          </Col>
          {record.RefItemID > 0 && (
            <Col xs={24}>
              <TextItem
                title={Words.purchasing_agent}
                value={`${selectedItem?.AgentFirstName} ${selectedItem?.AgentLastName}`}
                valueColor={Colors.magenta[6]}
              />
            </Col>
          )}
          {/* {record?.RefItemID > 0 && (
            <Col xs={24}>
              <Form.Item>
                {selectedBaseRequest.InquiryRequestTypeID === 1 ? (
                  <PurchaseDetails
                    request={selectedBaseRequest}
                    selectedRefItemID={record.RefItemID}
                  />
                ) : (
                  <ServiceDetails
                    request={selectedBaseRequest}
                    selectedRefItemID={record.RefItemID}
                  />
                )}
              </Form.Item>
            </Col>
          )}
           */}
          <Col xs={24}>
            <InputItem
              title={Words.standard_description}
              fieldName="DetailsText"
              multiline
              rows={3}
              showCount
              maxLength={250}
              formConfig={formConfig}
            />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default InvoiceItemModal;
