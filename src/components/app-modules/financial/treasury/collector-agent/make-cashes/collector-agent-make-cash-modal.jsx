import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Space, Popconfirm, Button, Tabs } from "antd";
import { QuestionCircleOutlined as QuestionIcon } from "@ant-design/icons";
import ModalWindow from "../../../../../common/modal-window";
import Words from "../../../../../../resources/words";
import Colors from "../../../../../../resources/colors";
import utils from "../../../../../../tools/utils";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../../../tools/form-manager";
import service from "../../../../../../services/financial/treasury/collector-agent/collector-agent-make-cashes-service";
import DateItem from "../../../../../form-controls/date-item";
import DropdownItem from "../../../../../form-controls/dropdown-item";
import InputItem from "../../../../../form-controls/input-item";
import TextItem from "../../../../../form-controls/text-item";
import {
  useModalContext,
  useResetContext,
} from "../../../../../contexts/modal-context";
import DetailsTable from "../../../../../common/details-table";
import { v4 as uuid } from "uuid";
import PriceViewer from "../../../../../common/price-viewer";
import {
  schema,
  initRecord,
  getChequeColumns,
  getNewButton,
  calculatePrice,
} from "./collector-agent-make-cash-modal-code";
import ChequeModal from "./collector-agent-make-cash-cheque-modal";

const { TabPane } = Tabs;

const formRef = React.createRef();

const CollectorAgentMakeCashModal = ({
  access,
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  onSaveCheque,
  onDeleteCheque,
  onSubmitReceiveReceipt,
  //   onReject,
  //   onApprove,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [agents, setAgents] = useState([]);
  const [standardDetails, setStandardDetails] = useState([]);
  const [hasSubmitReceiveReceiptAccess, setHasSubmitReceiveReceiptAccess] =
    useState(false);
  //   const [hasSaveApproveAccess, setHasSaveApproveAccess] = useState(false);
  //   const [hasRejectAccess, setHasRejectAccess] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showChequeModal, setShowChequeModal] = useState(false);

  const [selectedCheque, setSelectedCheque] = useState(null);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.CollectorAgentID = 0;
    record.OperationDate = "";
    record.SubNo = "";
    record.StandardDetailsID = 0;
    record.DetailsText = "";
    record.StatusID = 1;
    record.Cheques = [];

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord({ ...initRecord });
    loadFieldsValue(formRef, { ...initRecord });
    initModal(formRef, selectedObject, setRecord);
    //------

    setProgress(true);

    try {
      let data = await service.getParams();

      let {
        Agents,
        StandardDetails,
        HasSubmitReceiveReceiptAccess,
        /* HasSaveApproveAccess, HasRejectAccess */
      } = data;

      Agents.forEach((ag) => {
        ag.CollectorAgentID = ag.AgentID;
      });

      setAgents(Agents);
      setStandardDetails(StandardDetails);
      setHasSubmitReceiveReceiptAccess(HasSubmitReceiveReceiptAccess);
      //   setHasSaveApproveAccess(HasSaveApproveAccess);
      //   setHasRejectAccess(HasRejectAccess);
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

  // const handleSubmitAndApprove = async () => {
  //   record.StatusID = 2;
  //   setRecord({ ...record });

  //   saveModalChanges(
  //     formConfig,
  //     selectedObject,
  //     setProgress,
  //     onOk,
  //     clearRecord
  //   );
  // };

  //------

  const handleSelectCheque = (cheque) => {
    if (cheque.ChequeID > 0) setSelectedCheque(cheque);
    else setSelectedCheque(null);
  };

  const handleSaveCheque = async () => {
    if (selectedObject !== null) {
      const { ItemID, ChequeID, Amount } = selectedCheque;

      const saved_cheque = await onSaveCheque({
        ItemID,
        OperationID: selectedObject.OperationID,
        ChequeID,
        Amount,
      });

      const index = record.Cheques.findIndex(
        (item) => item.ItemID === selectedCheque.ItemID
      );

      if (index === -1) {
        record.Cheques = [...record.Cheques, saved_cheque];
      } else {
        record.Cheques[index] = saved_cheque;
      }
    } else {
      const cheque_to_save = { ...selectedCheque };

      //--- managing unique id (UID) for new items
      if (cheque_to_save.ItemID === 0 && selectedItem === null) {
        cheque_to_save.UID = uuid();
        record.Cheques = [...record.Cheques, cheque_to_save];
      } else if (cheque_to_save.ItemID === 0 && selectedItem !== null) {
        const index = record.Cheques.findIndex(
          (item) => item.UID === selectedItem.UID
        );
        record.Cheques[index] = cheque_to_save;
      }
    }

    //------

    setRecord({ ...record });
    setSelectedItem(null);
  };

  const handleDeleteCheque = async (cheque_to_delete) => {
    setProgress(true);

    try {
      if (cheque_to_delete.ItemID > 0) {
        await onDeleteCheque(cheque_to_delete.ItemID);

        record.Cheques = record.Cheques.filter(
          (i) => i.ItemID !== cheque_to_delete.ItemID
        );
      } else {
        record.Cheques = record.Cheques.filter(
          (i) => i.UID !== cheque_to_delete.UID
        );
      }

      setRecord({ ...record });
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  const handleCloseChequeModal = () => {
    setSelectedItem(null);
    setShowChequeModal(false);
  };

  const handleEditCheque = (data) => {
    setSelectedItem(data);
    setShowChequeModal(true);
  };

  //------

  const handleNewButtonClick = () => {
    setSelectedItem(null);
    setShowChequeModal(true);
  };

  const getFooterButtons = (is_disable) => {
    return (
      <Space>
        {selectedObject === null && (
          <>
            <Button
              key="submit-button"
              type="primary"
              onClick={handleSubmit}
              loading={progress}
              disabled={is_disable}
            >
              {Words.submit}
            </Button>

            {/* {hasSaveApproveAccess && (
              <Popconfirm
                title={
                  Words.questions
                    .sure_to_submit_approve_transfer_to_collector_agent
                }
                onConfirm={handleSubmitAndApprove}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
                key="submit-approve-button"
                disabled={is_disable || progress}
              >
                <Button
                  key="submit-approve-button"
                  type="primary"
                  disabled={is_disable || progress}
                >
                  {Words.submit_and_approve}
                </Button>
              </Popconfirm>
            )} */}

            <Button key="clear-button" onClick={clearRecord}>
              {Words.clear}
            </Button>
          </>
        )}

        {selectedObject !== null && selectedObject.ReceiveID === 0 && (
          <>
            {hasSubmitReceiveReceiptAccess && (
              <Popconfirm
                title={Words.questions.sure_to_submit_receive_receipt}
                onConfirm={onSubmitReceiveReceipt}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
                key="submit-receive-receipt-button"
                disabled={is_disable || progress}
              >
                <Button
                  key="submit-receive-receipt-button"
                  type="primary"
                  disabled={is_disable || progress}
                >
                  {Words.submit_receive_receipt}
                </Button>
              </Popconfirm>
            )}
          </>
        )}

        {/* {selectedObject !== null && selectedObject.StatusID === 1 && (
          <>
            {hasSaveApproveAccess && (
              <Popconfirm
                title={
                  Words.questions
                    .sure_to_submit_approve_transfer_to_collector_agent
                }
                onConfirm={onApprove}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
                key="submit-approve-button"
                disabled={is_disable || progress}
              >
                <Button
                  key="submit-approve-button"
                  type="primary"
                  disabled={is_disable || progress}
                >
                  {Words.submit_and_approve}
                </Button>
              </Popconfirm>
            )}

            {hasRejectAccess && (
              <Popconfirm
                title={Words.questions.sure_to_reject_request}
                onConfirm={onReject}
                okText={Words.yes}
                cancelText={Words.no}
                icon={<QuestionIcon style={{ color: "red" }} />}
                key="reject-confirm"
                disabled={progress}
              >
                <Button key="reject-button" type="primary" danger>
                  {Words.reject_request}
                </Button>
              </Popconfirm>
            )}
          </>
        )} */}

        <Button key="close-button" onClick={onCancel}>
          {Words.close}
        </Button>
      </Space>
    );
  };

  //------

  const getDisableStatus = () => {
    const is_disable =
      (record?.Cheques?.length || 0 + record?.Demands?.length || 0) === 0 ||
      (validateForm({ record, schema }) && true);

    return is_disable;
  };

  const status_id =
    selectedObject === null
      ? 1
      : selectedObject.ReceiveStatusID > 0
      ? selectedObject.ReceiveStatusID
      : 1;

  const price = calculatePrice(record);

  return (
    <>
      <ModalWindow
        isOpen={isOpen}
        isEdit={isEdit}
        inProgress={progress}
        disabled={getDisableStatus()}
        width={1050}
        footer={getFooterButtons(getDisableStatus())}
        onCancel={onCancel}
      >
        <Form ref={formRef} name="dataForm">
          <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.collector_agent}
                dataSource={agents}
                keyColumn="CollectorAgentID"
                valueColumn="TafsilAccountTitle"
                formConfig={formConfig}
                disabled={record.Cheques?.length > 0}
                required
                autoFocus
              />
            </Col>
            <Col xs={24} md={12}>
              <DateItem
                horizontal
                required
                title={Words.date}
                fieldName="OperationDate"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12}>
              <InputItem
                title={Words.sub_no}
                fieldName="SubNo"
                maxLength={50}
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={6}>
              <TextItem
                title={Words.receive_receipt_id}
                value={
                  selectedObject
                    ? selectedObject.ReceiveID > 0
                      ? utils.farsiNum(selectedObject.ReceiveID)
                      : "-"
                    : "-"
                }
                valueColor={Colors.magenta[6]}
              />
            </Col>
            <Col xs={24} md={6}>
              <TextItem
                title={Words.receive_receipt_status}
                value={
                  selectedObject
                    ? selectedObject.ReceiveID > 0
                      ? selectedObject.ReceiveStatusTitle
                      : "-"
                    : "-"
                }
                valueColor={
                  selectedObject
                    ? selectedObject.ReceiveStatusID === 1
                      ? Colors.grey[6]
                      : selectedObject.ReceiveStatusID === 2
                      ? Colors.green[6]
                      : Colors.red[6]
                    : Colors.magenta[6]
                }
              />
            </Col>
            <Col xs={24}>
              <DropdownItem
                title={Words.standard_details_text}
                dataSource={standardDetails}
                keyColumn="StandardDetailsID"
                valueColumn="DetailsText"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24}>
              <InputItem
                title={Words.standard_description}
                fieldName="DetailsText"
                multiline
                rows={2}
                showCount
                maxLength={250}
                formConfig={formConfig}
              />
            </Col>

            {price.Total > 0 && (
              <Col xs={24}>
                <TextItem
                  title={Words.price}
                  value={`${utils.farsiNum(utils.moneyNumber(price.Total))} ${
                    Words.ryal
                  }`}
                  valueColor={Colors.magenta[6]}
                />
              </Col>
            )}

            {record.Cheques && (
              <Col xs={24}>
                <Form.Item>
                  <Tabs type="card" defaultActiveKey="0">
                    <TabPane tab={Words.cheque} key="cheques">
                      <Row gutter={[0, 15]}>
                        <Col xs={24}>
                          <DetailsTable
                            records={record.Cheques}
                            columns={getChequeColumns(
                              access,
                              status_id,
                              handleEditCheque,
                              handleDeleteCheque
                            )}
                          />
                        </Col>
                        <Col xs={24}>
                          <PriceViewer price={price.ChequesAmount} />
                        </Col>
                      </Row>
                    </TabPane>
                  </Tabs>
                </Form.Item>
              </Col>
            )}

            {record.CollectorAgentID > 0 &&
              (!selectedObject ||
                selectedObject.ReceiveID === 0 ||
                selectedObject.ReceiveStatusID === 1) && (
                <Col xs={24}>
                  <Form.Item>{getNewButton(handleNewButtonClick)}</Form.Item>
                </Col>
              )}
          </Row>
        </Form>
      </ModalWindow>

      {showChequeModal && (
        <ChequeModal
          isOpen={showChequeModal}
          selectedObject={selectedItem}
          agentID={record.CollectorAgentID}
          currentCheques={record.Cheques}
          onSelectCheque={handleSelectCheque}
          onOk={handleSaveCheque}
          onCancel={handleCloseChequeModal}
        />
      )}
    </>
  );
};

export default CollectorAgentMakeCashModal;
