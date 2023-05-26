import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Typography, Descriptions } from "antd";
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
} from "../../../../../tools/form-manager";
import InputItem from "../../../../form-controls/input-item";
import NumericInputItem from "../../../../form-controls/numeric-input-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import SwitchItem from "../../../../form-controls/switch-item";

const { Text } = Typography;
const valueColor = Colors.blue[7];

const PurchaseDetails = ({ request, selectedRefItemID }) => {
  const item = request.Items.find((i) => i.ItemID === selectedRefItemID);

  const {
    ItemID,
    PurchaseTypeTitle,
    ProductCode,
    ProductTitle,
    NeedDate,
    InquiryDeadline,
    RequestCount,
    MeasureUnitTitle,
    AgentFirstName,
    AgentLastName,
    SupplierTitle,
    DetailsText,
  } = item;

  return (
    <Descriptions
      bordered
      column={{
        //   md: 2, sm: 2,
        lg: 2,
        md: 2,
        xs: 1,
      }}
      size="middle"
    >
      <Descriptions.Item label={Words.id}>
        <Text style={{ color: valueColor }}>{utils.farsiNum(`${ItemID}`)}</Text>
      </Descriptions.Item>

      <Descriptions.Item label={Words.purchase_type}>
        <Text style={{ color: Colors.red[6] }}>{PurchaseTypeTitle}</Text>
      </Descriptions.Item>

      <Descriptions.Item label={Words.product_code}>
        <Text style={{ color: valueColor }}>{utils.farsiNum(ProductCode)}</Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.product}>
        <Text style={{ color: valueColor }}>{ProductTitle}</Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.request_count}>
        <Text style={{ color: valueColor }}>
          {utils.farsiNum(RequestCount)}
        </Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.unit}>
        <Text style={{ color: valueColor }}>{MeasureUnitTitle}</Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.need_date}>
        <Text style={{ color: valueColor }}>
          {utils.farsiNum(utils.slashDate(NeedDate))}
        </Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.inquiry_deadline}>
        <Text style={{ color: valueColor }}>
          {utils.farsiNum(utils.slashDate(InquiryDeadline))}
        </Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.purchasing_agent}>
        <Text style={{ color: valueColor }}>
          {`${AgentFirstName} ${AgentLastName}`}
        </Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.supplier}>
        <Text style={{ color: valueColor }}>{SupplierTitle}</Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.front_side} span={2}>
        <Text style={{ color: valueColor }}>
          {utils.farsiNum(request.FrontSideAccountTitle)}
        </Text>
      </Descriptions.Item>

      {DetailsText.length > 0 && (
        <Descriptions.Item label={Words.descriptions} span={2}>
          <Text
            style={{
              color: Colors.purple[7],
              whiteSpace: "pre-line",
            }}
          >
            {utils.farsiNum(DetailsText)}
          </Text>
        </Descriptions.Item>
      )}
      {/* <Descriptions.Item label={Words.status} span={2}>
                      <Space>
                        {IsActive ? (
                          <CheckIcon style={{ color: Colors.green[6] }} />
                        ) : (
                          <LockIcon style={{ color: Colors.red[6] }} />
                        )}

                        <Text style={{ color: valueColor }}>
                          {`${IsActive ? Words.active : Words.inactive} `}
                        </Text>
                      </Space>
                    </Descriptions.Item> */}
    </Descriptions>
  );
};

const ServiceDetails = ({ request, selectedRefItemID }) => {
  const item = request.Items.find((i) => i.ItemID === selectedRefItemID);

  const {
    ItemID,
    PurchaseTypeTitle,
    ServiceID,
    ServiceTitle,
    NeedDate,
    InquiryDeadline,
    RequestCount,
    MeasureUnitTitle,
    AgentFirstName,
    AgentLastName,
    SupplierTitle,
    DetailsText,
  } = item;

  return (
    <Descriptions
      bordered
      column={{
        //   md: 2, sm: 2,
        lg: 2,
        md: 2,
        xs: 1,
      }}
      size="middle"
    >
      <Descriptions.Item label={Words.id}>
        <Text style={{ color: valueColor }}>{utils.farsiNum(`${ItemID}`)}</Text>
      </Descriptions.Item>

      <Descriptions.Item label={Words.purchase_type}>
        <Text style={{ color: Colors.red[6] }}>{PurchaseTypeTitle}</Text>
      </Descriptions.Item>

      <Descriptions.Item label={Words.item_code}>
        <Text style={{ color: valueColor }}>{utils.farsiNum(ServiceID)}</Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.service}>
        <Text style={{ color: valueColor }}>{ServiceTitle}</Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.need_date}>
        <Text style={{ color: valueColor }}>
          {utils.farsiNum(utils.slashDate(NeedDate))}
        </Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.inquiry_deadline}>
        <Text style={{ color: valueColor }}>
          {utils.farsiNum(utils.slashDate(InquiryDeadline))}
        </Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.request_count}>
        <Text style={{ color: valueColor }}>
          {utils.farsiNum(RequestCount)}
        </Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.unit}>
        <Text style={{ color: valueColor }}>{MeasureUnitTitle}</Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.purchasing_agent}>
        <Text style={{ color: valueColor }}>
          {`${AgentFirstName} ${AgentLastName}`}
        </Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.supplier}>
        <Text style={{ color: valueColor }}>{SupplierTitle}</Text>
      </Descriptions.Item>
      <Descriptions.Item label={Words.front_side} span={2}>
        <Text style={{ color: valueColor }}>
          {utils.farsiNum(request.FrontSideAccountTitle)}
        </Text>
      </Descriptions.Item>

      {DetailsText.length > 0 && (
        <Descriptions.Item label={Words.descriptions} span={2}>
          <Text
            style={{
              color: Colors.purple[7],
              whiteSpace: "pre-line",
            }}
          >
            {utils.farsiNum(DetailsText)}
          </Text>
        </Descriptions.Item>
      )}
      {/* <Descriptions.Item label={Words.status} span={2}>
                        <Space>
                          {IsActive ? (
                            <CheckIcon style={{ color: Colors.green[6] }} />
                          ) : (
                            <LockIcon style={{ color: Colors.red[6] }} />
                          )}

                          <Text style={{ color: valueColor }}>
                            {`${IsActive ? Words.active : Words.inactive} `}
                          </Text>
                        </Space>
                      </Descriptions.Item> */}
    </Descriptions>
  );
};

const schema = {
  ItemID: Joi.number().required(),
  RequestID: Joi.number().required(),
  RefItemID: Joi.number().min(1).required().label(Words.item_title),
  RequestCount: Joi.number()
    .min(0)
    .max(999999)
    .positive()
    .precision(2)
    .label(Words.request_count),
  IsActive: Joi.boolean(),
  DetailsText: Joi.string()
    .min(5)
    .max(250)
    .allow("")
    .regex(utils.VALID_REGEX)
    .label(Words.descriptions),
};

const initRecord = {
  ItemID: 0,
  RequestID: 0,
  RefItemID: 0,
  RequestCount: 0,
  IsActive: true,
  DetailsText: "",
};

const formRef = React.createRef();

const InquiryRequestItemModal = ({
  isOpen,
  selectedObject,
  selectedBaseRequest,
  onOk,
  onCancel,
}) => {
  const [progress, setProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [record, setRecord] = useState({});

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.RefItemID = 0;
    record.RequestCount = 0;
    record.IsActive = true;
    record.DetailsText = "";

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    setRecord(initRecord);
    loadFieldsValue(formRef, initRecord);
    initModal(formRef, selectedObject, setRecord);
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

  const getItems = () => {
    let items = [...selectedBaseRequest?.Items];

    return items;
  };

  const handleChangeItem = (value) => {
    const rec = { ...record };
    rec.RefItemID = value;

    if (value === 0) {
      rec.RequestCount = 0;
    } else {
      rec.RequestCount = selectedBaseRequest?.Items?.find(
        (i) => i.ItemID === value
      )?.RequestCount;
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
              title={Words.item_title}
              dataSource={getItems()}
              keyColumn="ItemID"
              valueColumn={
                selectedBaseRequest.InquiryRequestTypeID === 1
                  ? "ProductTitle"
                  : "ServiceTitle"
              }
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
          {record?.RefItemID > 0 && (
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
          <Col xs={24}>
            <SwitchItem
              title={Words.status}
              fieldName="IsActive"
              initialValue={true}
              checkedTitle={Words.active}
              unCheckedTitle={Words.inactive}
              formConfig={formConfig}
            />
          </Col>
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

export default InquiryRequestItemModal;
