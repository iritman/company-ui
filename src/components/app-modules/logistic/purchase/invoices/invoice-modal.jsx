import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Divider, Typography } from "antd";
import ModalWindow from "../../../../common/modal-window";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import { v4 as uuid } from "uuid";
import {
  validateForm,
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../../tools/form-manager";
import service from "../../../../../services/logistic/purchase/invoices-service";
import InputItem from "../../../../form-controls/input-item";
import NumericInputItem from "../../../../form-controls/numeric-input-item";
import DateItem from "../../../../form-controls/date-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import TextItem from "../../../../form-controls/text-item";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import DetailsTable from "../../../../common/details-table";
import InvoiceItemModal from "./invoice-item-modal";
import {
  schema,
  initRecord,
  getInvoiceItemsColumns,
  getNewInvoiceItemButton,
  getFooterButtons,
} from "./invoice-modal-code";

const { Text } = Typography;

const formRef = React.createRef();

const InvoiceModal = ({
  access,
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  onSaveInvoiceItem,
  onDeleteInvoiceItem,
  onReject,
  onApprove,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [suppliers, setSuppliers] = useState([]);
  const [transportTypes, setTransportTypes] = useState([]);
  const [purchaseWays, setPurchaseWays] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);

  const [hasSaveApproveAccess, setHasSaveApproveAccess] = useState(false);
  const [hasRejectAccess, setHasRejectAccess] = useState(false);

  const [selectedInvoiceItem, setSelectedInvoiceItem] = useState(null);
  const [showInvoiceItemModal, setShowInvoiceItemModal] = useState(false);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.InvoiceNo = "";
    record.BaseID = 0;
    record.SupplierID = 0;
    record.TransportTypeID = 0;
    record.PurchaseWayID = 0;
    record.InvoiceDate = "";
    record.CreditDate = "";
    record.PaymentTypeID = 0;
    record.Prepaymentamount = 0;
    record.DetailsText = "";
    record.StatusID = 1;
    record.Items = [];

    setRecord(record);
    setErrors({});
    loadFieldsValue(formRef, record);
  };

  useMount(async () => {
    resetContext();
    setRecord(initRecord);
    initModal(formRef, selectedObject, setRecord);

    //------

    setProgress(true);

    try {
      const data = await service.getParams();

      let {
        Suppliers,
        TransportTypes,
        PurchaseWays,
        PaymentTypes,
        HasSaveApproveAccess,
        HasRejectAccess,
      } = data;

      setSuppliers(Suppliers);
      setTransportTypes(TransportTypes);
      setPurchaseWays(PurchaseWays);
      setPaymentTypes(PaymentTypes);
      setHasSaveApproveAccess(HasSaveApproveAccess);
      setHasRejectAccess(HasRejectAccess);
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

  const handleSubmitAndApprove = async () => {
    record.StatusID = 2;
    setRecord({ ...record });

    saveModalChanges(
      formConfig,
      selectedObject,
      setProgress,
      onOk,
      clearRecord
    );
  };

  //------

  const handleSaveInvoiceItem = async (invoice_item) => {
    if (selectedObject !== null) {
      invoice_item.InvoiceID = selectedObject.InvoiceID;

      const saved_invoice_item = await onSaveInvoiceItem(invoice_item);

      const index = record.Items.findIndex(
        (item) => item.ItemID === invoice_item.ItemID
      );

      if (index === -1) {
        record.Items = [...record.Items, saved_invoice_item];
      } else {
        record.Items[index] = saved_invoice_item;
      }
    } else {
      //While adding items temporarily, we have no jpin operation in database
      //So, we need to select titles manually
      const {
        ItemCode,
        ItemTitle,
        AgentFirstName,
        AgentLastName,
        MeasureUnitTitle,
      } = invoice_item.MoreInfo;

      delete invoice_item.MoreInfo;

      invoice_item = {
        ...invoice_item,
        ItemCode,
        ItemTitle,
        AgentFirstName,
        AgentLastName,
        MeasureUnitTitle,
      };
      //   const selectedRequest = getSelectedRequest();
      //   const { FrontSideAccountTitle, RequestDate } = selectedRequest;
      //   invoice_item = {
      //     ...invoice_item,
      //     FrontSideAccountTitle,
      //     RequestDate,
      //   };

      //   const selectedItem = getSelectedRequest()?.Items?.find(
      //     (i) => i.ItemID === invoice_item.RefItemID
      //   );

      //   if (record.RequestTypeID === 1) {
      //     //-- [purchase]
      //     const {
      //       ProductTitle,
      //       ProductCode,
      //       MeasureUnitTitle,
      //       AgentFirstName,
      //       AgentLastName,
      //       NeedDate,
      //       InquiryDeadline,
      //       SupplierTitle,
      //     } = selectedItem;
      //     invoice_item = {
      //       ...invoice_item,
      //       ProductTitle,
      //       ProductCode,
      //       MeasureUnitTitle,
      //       AgentFirstName,
      //       AgentLastName,
      //       NeedDate,
      //       InquiryDeadline,
      //       SupplierTitle,
      //     };
      //   } else {
      //     //-- [service]
      //     const {
      //       ServiceTitle,
      //       MeasureUnitTitle,
      //       AgentFirstName,
      //       AgentLastName,
      //       NeedDate,
      //       InquiryDeadline,
      //       SupplierTitle,
      //     } = selectedItem;

      //     invoice_item = {
      //       ...invoice_item,
      //       ServiceTitle,
      //       MeasureUnitTitle,
      //       AgentFirstName,
      //       AgentLastName,
      //       NeedDate,
      //       InquiryDeadline,
      //       SupplierTitle,
      //     };
      //   }
      //--- managing unique id (UID) for new items
      if (invoice_item.ItemID === 0 && selectedInvoiceItem === null) {
        invoice_item.UID = uuid();
        record.Items = [...record.Items, invoice_item];
      } else if (invoice_item.ItemID === 0 && selectedInvoiceItem !== null) {
        const index = record.Items.findIndex(
          (item) => item.UID === selectedInvoiceItem.UID
        );
        record.Items[index] = invoice_item;
      }
    }

    //------

    setRecord({ ...record });
    setSelectedInvoiceItem(null);
  };

  const handleDeleteInvoiceItem = async (item) => {
    setProgress(true);

    try {
      if (item.ItemID > 0) {
        await onDeleteInvoiceItem(item.ItemID);

        record.Items = record.Items.filter((i) => i.ItemID !== item.ItemID);
      } else {
        record.Items = record.Items.filter((i) => i.UID !== item.UID);
      }

      setRecord({ ...record });
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  const handleCloseInvoiceItemModal = () => {
    setSelectedInvoiceItem(null);
    setShowInvoiceItemModal(false);
  };

  const handleEditInvoiceItem = (data) => {
    setSelectedInvoiceItem(data);
    setShowInvoiceItemModal(true);
  };

  const handleNewItemClick = () => {
    setSelectedInvoiceItem(null);
    setShowInvoiceItemModal(true);
  };

  //------

  //   const handleChangeRequestTypes = async (value) => {
  //     const rec = { ...record };
  //     rec.RequestTypeID = value || 0;
  //     rec.BaseID = 0;

  //     setRecord(rec);
  //     loadFieldsValue(formRef, rec);

  //     //------

  //     if (value > 0) {
  //       setRequestTypeProgress(true);

  //       try {
  //         const data =
  //           value === 1
  //             ? await service.getRegedPurchaseRequests()
  //             : await service.getRegedServiceRequests();

  //         setRequests(data);
  //       } catch (ex) {
  //         handleError(ex);
  //       }

  //       setRequestTypeProgress(false);
  //     } else {
  //       setRequests([]);
  //     }
  //   };

  //   const getSelectedRequest = () => {
  //     let request = null;

  //     request = requests.find((r) => r.BaseID === record.BaseID);

  //     if (!request) request = null;
  //     else {
  //       request.InvoiceTypeID = record.RequestTypeID;
  //     }

  //     return request;
  //   };

  //------

  const is_disable =
    record?.Items?.length === 0 || (validateForm({ record, schema }) && true);

  const status_id =
    selectedObject === null ? record.StatusID : selectedObject.StatusID;

  const footer_config = {
    is_disable,
    progress,
    hasSaveApproveAccess,
    selectedObject,
    handleSubmit,
    handleSubmitAndApprove,
    hasRejectAccess,
    clearRecord,
    onApprove,
    onReject,
    onCancel,
  };

  //   ------

  //   const handleChangeSupplier = async (value) => {
  //     const rec = { ...record };
  //     rec.SupplierID = value || 0;

  //     setRecord(rec);
  //   };

  //   ------

  return (
    <>
      <ModalWindow
        isOpen={isOpen}
        isEdit={isEdit}
        inProgress={progress}
        disabled={is_disable}
        width={1050}
        footer={getFooterButtons(footer_config)}
        onCancel={onCancel}
      >
        <Form ref={formRef} name="dataForm">
          <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
            {selectedObject && (
              <Col xs={24}>
                <TextItem
                  title={Words.id}
                  value={
                    selectedObject
                      ? utils.farsiNum(selectedObject.InvoiceID)
                      : "-"
                  }
                  valueColor={Colors.magenta[6]}
                />
              </Col>
            )}
            <Col xs={24} md={12}>
              <InputItem
                title={Words.invoice_no}
                fieldName="InvoiceNo"
                maxLength={50}
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.supplier}
                dataSource={suppliers}
                keyColumn="SupplierID"
                valueColumn="Title"
                formConfig={formConfig}
                disabled={record?.Items?.length > 0}
                // onChange={handleChangeSupplier}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DateItem
                horizontal
                title={Words.invoice_date}
                fieldName="InvoiceDate"
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DateItem
                horizontal
                title={Words.credit_date}
                fieldName="CreditDate"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.transport_type}
                dataSource={transportTypes}
                keyColumn="TransportTypeID"
                valueColumn="Title"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.purchase_way}
                dataSource={purchaseWays}
                keyColumn="PurchaseWayID"
                valueColumn="Title"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.payment_type}
                dataSource={paymentTypes}
                keyColumn="PaymentTypeID"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <NumericInputItem
                horizontal
                title={Words.pre_payment_amount}
                fieldName="PrepaymentAmount"
                min={0}
                max={9999999999}
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24}>
              <InputItem
                title={Words.descriptions}
                fieldName="DetailsText"
                multiline
                rows={2}
                showCount
                maxLength={512}
                formConfig={formConfig}
              />
            </Col>

            {/* ToDo: Implement base_doc_id field based on the selected base type */}
            <Col xs={24}>
              <Divider orientation="right">
                <Text style={{ fontSize: 14, color: Colors.green[6] }}>
                  {Words.invoice_items}
                </Text>
              </Divider>
            </Col>

            {record.Items && (
              <>
                <Col xs={24}>
                  <Form.Item>
                    <Row gutter={[0, 15]}>
                      <Col xs={24}>
                        <DetailsTable
                          records={record.Items}
                          columns={getInvoiceItemsColumns(
                            access,
                            status_id,
                            handleEditInvoiceItem,
                            handleDeleteInvoiceItem
                          )}
                          emptyDataMessage={Words.no_invoice_item}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </>
            )}

            {status_id === 1 && (
              <Col xs={24}>
                <Form.Item>
                  {getNewInvoiceItemButton(
                    record?.SupplierID === 0,
                    handleNewItemClick
                  )}
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </ModalWindow>

      {showInvoiceItemModal && (
        <InvoiceItemModal
          isOpen={showInvoiceItemModal}
          selectedObject={selectedInvoiceItem}
          supplierID={record?.SupplierID}
          invoiceItems={record?.Items}
          onOk={handleSaveInvoiceItem}
          onCancel={handleCloseInvoiceItemModal}
        />
      )}
    </>
  );
};

export default InvoiceModal;
