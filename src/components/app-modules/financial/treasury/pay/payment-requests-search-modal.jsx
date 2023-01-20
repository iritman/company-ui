import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col } from "antd";
import Joi from "joi-browser";
import ModalWindow from "../../../../common/modal-window";
import Words from "../../../../../resources/words";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  handleError,
} from "../../../../../tools/form-manager";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import service from "../../../../../services/financial/treasury/pay/payment-requests-service";
import DropdownItem from "../../../../form-controls/dropdown-item";
import DateItem from "../../../../form-controls/date-item";
import NumericInputItem from "../../../../form-controls/numeric-input-item";

const schema = {
  RequestID: Joi.number().label(Words.id),
  CurrencyID: Joi.number(),
  PayTypeID: Joi.number(),
  FrontSideAccountID: Joi.number(),
  FromRequestDate: Joi.string().allow(""),
  ToRequestDate: Joi.string().allow(""),
  StatusID: Joi.number(),
};

const initRecord = {
  RequestID: 0,
  CurrencyID: 0,
  PayTypeID: 0,
  FrontSideAccountID: 0,
  FromRequestDate: "",
  ToRequestDate: "",
  StatusID: 0,
};

const formRef = React.createRef();

const PaymentRequestsSearchModal = ({ isOpen, filter, onOk, onCancel }) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [frontSideAccountSearchProgress, setFrontSideAccountSearchProgress] =
    useState(false);
  const [frontSideAccounts, setFrontSideAccounts] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [payTypes, setPayTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.RequestID = 0;
    record.CurrencyID = 0;
    record.PayTypeID = 0;
    record.FrontSideAccountID = 0;
    record.FromRequestDate = "";
    record.ToRequestDate = "";
    record.StatusID = 0;

    setRecord(record);
    setErrors({});
    setFrontSideAccounts([]);
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();

    setRecord(initRecord);
    initModal(formRef, filter, setRecord);

    setProgress(true);
    try {
      const data = await service.getParams();

      const { Currencies, PayTypes, Statuses } = data;

      setCurrencies(Currencies);
      setPayTypes(PayTypes);
      setStatuses(Statuses);
    } catch (err) {
      handleError(err);
    }
    setProgress(false);
  });

  const handleChangeFrontSideAccount = (value) => {
    const rec = { ...record };
    rec.FrontSideAccountID = value || 0;
    setRecord(rec);
  };

  const handleSearchFrontSideAccount = async (searchText) => {
    setFrontSideAccountSearchProgress(true);

    try {
      const data = await service.searchFronSideAccounts(searchText);

      setFrontSideAccounts(data);
    } catch (ex) {
      handleError(ex);
    }

    setFrontSideAccountSearchProgress(false);
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      inProgress={progress}
      disabled={validateForm({ record, schema }) && true}
      searchModal
      onClear={clearRecord}
      onSubmit={() => onOk(record)}
      onCancel={onCancel}
      width={850}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[10, 5]} style={{ marginLeft: 1 }}>
          <Col xs={24} md={12}>
            <NumericInputItem
              horizontal
              title={Words.id}
              fieldName="RequestID"
              min={0}
              max={9999999999}
              formConfig={formConfig}
              autoFocus
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.currency}
              dataSource={currencies}
              keyColumn="CurrencyID"
              valueColumn="Title"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.pay_type}
              dataSource={payTypes}
              keyColumn="PaytypeID"
              valueColumn="Title"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.front_side_account}
              dataSource={frontSideAccounts}
              keyColumn="FrontSideAccountID"
              valueColumn="Title"
              formConfig={formConfig}
              loading={frontSideAccountSearchProgress}
              onSearch={handleSearchFrontSideAccount}
              onChange={handleChangeFrontSideAccount}
            />
          </Col>

          <Col xs={24} md={12}>
            <DateItem
              horizontal
              title={Words.from_request_date}
              fieldName="FromRequestDate"
              formConfig={formConfig}
            />
          </Col>
          <Col xs={24} md={12}>
            <DateItem
              horizontal
              title={Words.to_request_date}
              fieldName="ToRequestDate"
              formConfig={formConfig}
            />
          </Col>

          <Col xs={24} md={12}>
            <DropdownItem
              title={Words.status}
              dataSource={statuses}
              keyColumn="StatusID"
              valueColumn="Title"
              formConfig={formConfig}
            />
          </Col>
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default PaymentRequestsSearchModal;
