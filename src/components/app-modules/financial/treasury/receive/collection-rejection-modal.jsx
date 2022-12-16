import React, { useState } from "react";
import { useMount } from "react-use";
import { Form, Row, Col, Tabs } from "antd";
import ModalWindow from "../../../../common/modal-window";
import Words from "../../../../../resources/words";
import Colors from "./../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import {
  loadFieldsValue,
  initModal,
  saveModalChanges,
  handleError,
} from "../../../../../tools/form-manager";
import service from "../../../../../services/financial/treasury/receive/collection-rejections-service";
import {
  schema,
  initRecord,
  getNewButton,
  getFooterButtons,
  calculatePrice,
  getTabPanes,
  getDisableStatus,
} from "./collection-rejection-modal-code";
import DateItem from "../../../../form-controls/date-item";
import DropdownItem from "../../../../form-controls/dropdown-item";
import TextItem from "./../../../../form-controls/text-item";
import {
  useModalContext,
  useResetContext,
} from "../../../../contexts/modal-context";
import ChequeModal from "./collection-rejection-cheque-modal";
import DemandModal from "./collection-rejection-demand-modal";
import { v4 as uuid } from "uuid";

const formRef = React.createRef();

const CollectionRejectionModal = ({
  access,
  isOpen,
  selectedObject,
  onOk,
  onCancel,
  onSaveCollectionRejectionItem,
  onDeleteCollectionRejectionItem,
  onReject,
  onApprove,
}) => {
  const { progress, setProgress, record, setRecord, errors, setErrors } =
    useModalContext();

  const [companyBankAccounts, setCompanyBankAccounts] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [itemTypes] = useState([
    { ItemType: 1, Title: Words.cheque },
    { ItemType: 2, Title: Words.demand },
  ]);
  const [standardDetails, setStandardDetails] = useState([]);
  const [itemStatuses, setItemStatuses] = useState([]);
  const [hasSaveApproveAccess, setHasSaveApproveAccess] = useState(false);
  const [hasRejectAccess, setHasRejectAccess] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showChequeModal, setShowChequeModal] = useState(false);
  const [showDemandModal, setShowDemandModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState("cheques");
  const [bankAccountCheques, setBankAccountCheques] = useState([]);
  const [bankAccountDemands, setBankAccountDemands] = useState([]);

  const resetContext = useResetContext();

  const formConfig = {
    schema,
    record,
    setRecord,
    errors,
    setErrors,
  };

  const clearRecord = () => {
    record.CompanyBankAccountID = 0;
    record.CurrencyID = 0;
    record.ItemType = 0;
    record.CollectionRejectionDate = "";
    record.StandardDetailsID = 0;
    record.StatusID = 1;
    record.Cheques = [];
    record.Demands = [];

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
      //------ load receipt params

      let data = await service.getParams();

      let {
        CompanyBankAccounts,
        Currencies,
        StandardDetails,
        ItemStatuses,
        HasSaveApproveAccess,
        HasRejectAccess,
      } = data;

      setCompanyBankAccounts(CompanyBankAccounts);
      setCurrencies(Currencies);
      setStandardDetails(StandardDetails);
      setItemStatuses(ItemStatuses);
      setHasSaveApproveAccess(HasSaveApproveAccess);
      setHasRejectAccess(HasRejectAccess);

      if (selectedObject !== null) {
        await loadBankAccountCheques(selectedObject.CompanyBankAccountID);
        await loadBankAccountDemands(selectedObject.CompanyBankAccountID);
      }
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

  const loadBankAccountCheques = async (bank_account_id) => {
    setProgress(true);

    try {
      const data = await service.getCheques(bank_account_id);
      setBankAccountCheques(data.Cheques);
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  const loadBankAccountDemands = async (bank_account_id) => {
    setProgress(true);

    try {
      const data = await service.getDemands(bank_account_id);
      setBankAccountDemands(data.Demands);
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  const handleChangeBankAccount = async (value) => {
    const rec = { ...record };
    rec.CompanyBankAccountID = value || 0;
    setRecord(rec);

    //--- load cheques for selected bank account

    if (value > 0) {
      setProgress(true);
      try {
        await loadBankAccountCheques(value);
        await loadBankAccountDemands(value);
      } catch (ex) {
        handleError(ex);
      }
      setProgress(false);
    } else {
      setBankAccountCheques([]);
      setBankAccountDemands([]);
    }
  };

  //------

  const handleSaveCheque = async (cheque) => {
    if (selectedObject !== null) {
      cheque.CollectionRejectionID = selectedObject.CollectionRejectionID;
      cheque.Amount = bankAccountCheques.find(
        (c) => c.ChequeID === cheque.ChequeID
      )?.Amount;

      const saved_cheque = await onSaveCollectionRejectionItem(
        "cheque",
        "ItemID",
        cheque
      );

      const index = record.Cheques.findIndex(
        (item) => item.ItemID === cheque.ItemID
      );

      if (index === -1) {
        record.Cheques = [...record.Cheques, saved_cheque];
      } else {
        record.Cheques[index] = saved_cheque;
      }
    } else {
      const cheque_to_save = bankAccountCheques.find(
        (c) => c.ChequeID === cheque.ChequeID
      );

      //--- add needed fields (ItemID, StatusID, StatusTitle) to selected cheque

      cheque_to_save.ItemID = cheque.ItemID;
      cheque_to_save.StatusID = cheque.StatusID;
      cheque_to_save.StatusTitle = itemStatuses.find(
        (s) => s.StatusID === cheque.StatusID
      )?.Title;

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
        await onDeleteCollectionRejectionItem(
          "cheque",
          "ItemID",
          cheque_to_delete.ItemID
        );

        //--- After delete cheque, update new selectable cheques
        await loadBankAccountCheques(selectedObject.CompanyBankAccountID);

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

  const handleSaveDemand = async (demand) => {
    if (selectedObject !== null) {
      demand.CollectionRejectionID = selectedObject.CollectionRejectionID;
      demand.Amount = bankAccountDemands.find(
        (c) => c.DemandID === demand.DemandID
      )?.Amount;

      const saved_demand = await onSaveCollectionRejectionItem(
        "demand",
        "ItemID",
        demand
      );

      const index = record.Demands.findIndex(
        (item) => item.ItemID === demand.ItemID
      );

      if (index === -1) {
        record.Demands = [...record.Demands, saved_demand];
      } else {
        record.Demands[index] = saved_demand;
      }
    } else {
      const demand_to_save = bankAccountDemands.find(
        (c) => c.DemandID === demand.DemandID
      );

      //--- add needed fields (ItemID, StatusID, StatusTitle) to selected demand

      demand_to_save.ItemID = demand.ItemID;
      demand_to_save.StatusID = demand.StatusID;
      demand_to_save.StatusTitle = itemStatuses.find(
        (s) => s.StatusID === demand.StatusID
      )?.Title;

      //--- managing unique id (UID) for new items
      if (demand_to_save.ItemID === 0 && selectedItem === null) {
        demand_to_save.UID = uuid();
        record.Demands = [...record.Demands, demand_to_save];
      } else if (demand_to_save.ItemID === 0 && selectedItem !== null) {
        const index = record.Demands.findIndex(
          (item) => item.UID === selectedItem.UID
        );
        record.Demands[index] = demand_to_save;
      }
    }

    //------

    setRecord({ ...record });
    setSelectedItem(null);
  };

  const handleDeleteDemand = async (demand_to_delete) => {
    setProgress(true);

    try {
      if (demand_to_delete.ItemID > 0) {
        await onDeleteCollectionRejectionItem(
          "demand",
          "ItemID",
          demand_to_delete.ItemID
        );

        //--- After delete demand, update new selectable demands
        await loadBankAccountDemands(selectedObject.CompanyBankAccountID);

        record.Demands = record.Demands.filter(
          (i) => i.ItemID !== demand_to_delete.ItemID
        );
      } else {
        record.Demands = record.Demands.filter(
          (i) => i.UID !== demand_to_delete.UID
        );
      }

      setRecord({ ...record });
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  const handleCloseDemandModal = () => {
    setSelectedItem(null);
    setShowDemandModal(false);
  };

  const handleEditDemand = (data) => {
    setSelectedItem(data);
    setShowDemandModal(true);
  };

  //------

  const handleShowNewModal = () => {
    switch (selectedTab) {
      case "cheques":
        setShowChequeModal(true);
        break;
      case "demands":
        setShowDemandModal(true);
        break;
      default:
        break;
    }
  };

  const handleClickNewButton = () => {
    setSelectedItem(null);
    handleShowNewModal();
  };

  const isNewButtonVisible = () => {
    return (
      status_id === 1 &&
      record.CompanyBankAccountID > 0 &&
      ((selectedTab === "cheques" && filteredCheques.length > 0) ||
        (selectedTab === "demands" && filteredDemands.length > 0))
    );
  };

  //------

  const status_id =
    selectedObject === null ? record.StatusID : selectedObject.StatusID;

  const price = calculatePrice(record);

  const footerConfig = {
    selectedObject,
    handleSubmit,
    handleSubmitAndApprove,
    onApprove,
    hasRejectAccess,
    onReject,
    onCancel,
    clearRecord,
    progress,
    hasSaveApproveAccess,
  };

  const tabPanesConfig = {
    record,
    price,
    access,
    status_id,
    handleEditCheque,
    handleDeleteCheque,
    handleEditDemand,
    handleDeleteDemand,
  };

  const filteredCheques = bankAccountCheques.filter(
    (c) => !record.Cheques.find((cc) => cc.ChequeID === c.ChequeID)
  );

  const filteredDemands = bankAccountDemands.filter(
    (d) => !record.Demands.find((dd) => dd.DemandID === d.DemandID)
  );

  return (
    <>
      <ModalWindow
        isOpen={isOpen}
        isEdit={isEdit}
        inProgress={progress}
        disabled={getDisableStatus(record)}
        width={1050}
        footer={getFooterButtons(getDisableStatus(record), footerConfig)}
        onCancel={onCancel}
      >
        <Form ref={formRef} name="dataForm">
          <Row gutter={[5, 1]} style={{ marginLeft: 1 }}>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.bank_account}
                dataSource={companyBankAccounts}
                keyColumn="CompanyBankAccountID"
                valueColumn="InfoTitle"
                formConfig={formConfig}
                onChange={handleChangeBankAccount}
                required
                autoFocus
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.item_type}
                dataSource={itemTypes}
                keyColumn="ItemType"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.currency}
                dataSource={currencies}
                keyColumn="CurrencyID"
                valueColumn="Title"
                formConfig={formConfig}
                required
              />
            </Col>
            <Col xs={24} md={12}>
              <DateItem
                horizontal
                required
                title={Words.collection_rejection_date}
                fieldName="CollectionRejectionDate"
                formConfig={formConfig}
              />
            </Col>
            <Col xs={24} md={12}>
              <DropdownItem
                title={Words.standard_description}
                dataSource={standardDetails}
                keyColumn="StandardDetailsID"
                valueColumn="DetailsText"
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

            <Col xs={24}>
              <Form.Item>
                <Tabs
                  type="card"
                  defaultActiveKey="1"
                  onChange={(key) => setSelectedTab(key)}
                  items={getTabPanes(tabPanesConfig)}
                />
              </Form.Item>
            </Col>

            {isNewButtonVisible() && (
              <Col xs={24}>
                <Form.Item>{getNewButton(handleClickNewButton)}</Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </ModalWindow>

      {showChequeModal && (
        <ChequeModal
          isOpen={showChequeModal}
          selectedObject={selectedItem}
          cheques={filteredCheques}
          itemStatuses={itemStatuses}
          onOk={handleSaveCheque}
          onCancel={handleCloseChequeModal}
        />
      )}

      {showDemandModal && (
        <DemandModal
          isOpen={showDemandModal}
          selectedObject={selectedItem}
          demands={filteredDemands}
          itemStatuses={itemStatuses}
          onOk={handleSaveDemand}
          onCancel={handleCloseDemandModal}
        />
      )}
    </>
  );
};

export default CollectionRejectionModal;