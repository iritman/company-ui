import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Descriptions, Typography } from "antd";
import Joi from "joi-browser";
import ModalWindow from "./../../../../common/modal-window";
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
import service from "../../../../../services/financial/treasury/receive/bank-hand-overs-service";
import DropdownItem from "./../../../../form-controls/dropdown-item";

const { Text } = Typography;
const valueColor = Colors.blue[7];

const schema = {
  ItemID: Joi.number().required(),
  DemandID: Joi.number().required(),
};

const initRecord = {
  ItemID: 0,
  DemandID: 0,
};

const formRef = React.createRef();

const BankHandOverDemandModal = ({
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  onSelectDemand,
}) => {
  const [progress, setProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [record, setRecord] = useState({});

  const [demands, setDemands] = useState([]);

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.DemandID = 0;

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    setRecord(initRecord);
    loadFieldsValue(formRef, initRecord);
    initModal(formRef, selectedObject, setRecord);

    //------

    setProgress(true);

    try {
      const data = await service.getDemands();

      setDemands(data.Demands);
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
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

  const renderSelectedDemandInfo = () => {
    let result = <></>;

    if (demands && demands.length > 0) {
      const demand = demands.find((d) => d.DemandID === record.DemandID);

      const {
        //   DemandID,
        DemandNo,
        Amount,
        DueDate,
        //   DurationTypeID,
        DurationTypeTitle,
        //   FrontSideAccountID,
        //   FrontSideMemberID,
        FrontSideFirstName,
        FrontSideLastName,
        CompanyID,
        CompanyTitle,
        //   InfoTitle,
      } = demand;

      result = (
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
          {/* <Descriptions.Item label={Words.id}>
          <Text style={{ color: valueColor }}>
            {utils.farsiNum(`${DemandID}`)}
          </Text>
        </Descriptions.Item> */}
          <Descriptions.Item label={Words.demand_no}>
            <Text style={{ color: Colors.red[6] }}>
              {utils.farsiNum(`${DemandNo}`)}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.price}>
            <Text style={{ color: Colors.cyan[6] }}>
              {`${utils.farsiNum(utils.moneyNumber(Amount))} ${Words.ryal}`}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.due_date}>
            <Text style={{ color: valueColor }}>
              {utils.farsiNum(utils.slashDate(DueDate))}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.duration_type}>
            <Text style={{ color: valueColor }}>{DurationTypeTitle}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={Words.front_side}>
            <Text style={{ color: valueColor }}>
              {CompanyID > 0
                ? CompanyTitle
                : `${FrontSideFirstName} ${FrontSideLastName}`}
            </Text>
          </Descriptions.Item>
        </Descriptions>
      );
    }

    return result;
  };

  const handleChangeDemand = (value) => {
    const demand = demands.find((d) => d.DemandID === value);
    demand.ItemID = record.ItemID;
    onSelectDemand(demand);

    const rec = { ...record };
    rec.DemandID = value || 0;
    setRecord(rec);
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
      title={Words.reg_demand}
      width={900}
    >
      <Form ref={formRef} name="dataForm">
        <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
          <Col xs={24}>
            <DropdownItem
              title={Words.demand}
              dataSource={demands}
              keyColumn="DemandID"
              valueColumn="InfoTitle"
              formConfig={formConfig}
              required
              autoFocus
              onChange={handleChangeDemand}
            />
          </Col>

          {record.DemandID > 0 && (
            <Col xs={24}>{renderSelectedDemandInfo()}</Col>
          )}
        </Row>
      </Form>
    </ModalWindow>
  );
};

export default BankHandOverDemandModal;
