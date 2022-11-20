import React from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, message } from "antd";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import service from "../../../../../services/financial/treasury/receive/receive-receipts-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
  handleError,
} from "../../../../../tools/form-manager";
import SimpleDataTable from "../../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../../common/simple-data-page-header";
import ReceiveReceiptModal from "./receive-receipt-modal";
import SearchModal from "./receive-receipts-search-modal";
import DetailsModal from "./receive-receipt-details-modal";
import { usePageContext } from "../../../../contexts/page-context";
import DetailsButton from "../../../../common/details-button";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "ReceiveReceipts",
    data: records,
    columns: [
      { label: Words.id, value: "ReceiveID" },
      { label: Words.receipt_receive_type, value: "ReceiveTypeTitle" },
      {
        label: Words.delivery_member,
        value: (record) =>
          record.DeliveryMemberID > 0
            ? `${record.DeliveryMemberFirstName} ${record.DeliveryMemberLastName}`
            : record.DeliveryMember,
      },
      {
        label: Words.receive_date,
        value: (record) =>
          record.ReceiveDate.length > 0
            ? utils.slashDate(record.ReceiveDate)
            : "",
      },
      { label: Words.regards, value: "RegardTitle" },
      { label: Words.cash_box, value: "CashBoxTitle" },
      { label: Words.standard_description, value: "DetailsText" },
      {
        label: Words.reg_date,
        value: (record) => utils.slashDate(record.RegDate),
      },
      {
        label: Words.reg_time,
        value: (record) => utils.colonTime(record.RegTime),
      },
      {
        label: Words.registerar,
        value: (record) =>
          `${record.RegMemberFirstName} ${record.RegMemberLastName}`,
      },
      { label: Words.status, value: "StatusTitle" },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 75,
    align: "center",
    dataIndex: "ReceiveID",
    sorter: getSorter("ReceiveID"),
    render: (ReceiveID) => <Text>{utils.farsiNum(`${ReceiveID}`)}</Text>,
  },
  {
    title: Words.receipt_receive_type,
    width: 150,
    align: "center",
    dataIndex: "ReceiveTypeTitle",
    sorter: getSorter("ReceiveTypeTitle"),
    render: (ReceiveTypeTitle) => (
      <Text style={{ color: Colors.cyan[6] }}>{ReceiveTypeTitle}</Text>
    ),
  },
  {
    title: Words.receive_date,
    width: 150,
    align: "center",
    dataIndex: "ReceiveDate",
    sorter: getSorter("ReceiveDate"),
    render: (ReceiveDate) => (
      <Text style={{ color: Colors.cyan[6] }}>
        {utils.farsiNum(utils.slashDate(ReceiveDate))}
      </Text>
    ),
  },
  {
    title: Words.status,
    width: 150,
    align: "center",
    // dataIndex: "StatusTitle",
    sorter: getSorter("StatusTitle"),
    render: (record) => (
      <Text
        style={{
          color:
            record.StatusID === 1
              ? Colors.grey[6]
              : record.StatusID === 2
              ? Colors.green[6]
              : Colors.red[6],
        }}
      >
        {record.StatusTitle}
      </Text>
    ),
  },
];

const recordID = "ReceiveID";

const ReceiveReceiptsPage = ({ pageName }) => {
  const {
    progress,
    setProgress,
    searched,
    setSearched,
    records,
    setRecords,
    access,
    setAccess,
    selectedObject,
    setSelectedObject,
    showModal,
    showDetails,
    setShowDetails,
    showSearchModal,
    setShowSearchModal,
    filter,
    setFilter,
  } = usePageContext();

  useMount(async () => {
    handleResetContext();
    await checkAccess(setAccess, pageName);
  });

  const {
    handleCloseModal,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSave,
    handleResetContext,
  } = GetSimplaDataPageMethods({
    service,
    recordID,
  });

  const handleSearch = async (filter) => {
    setFilter(filter);
    setShowSearchModal(false);

    setProgress(true);

    try {
      const data = await service.searchData(filter);

      setRecords(data);
      setSearched(true);
    } catch (err) {
      handleError(err);
    }

    setProgress(false);
  };

  const getOperationalButtons = (record) => {
    return (
      <DetailsButton
        record={record}
        setSelectedObject={setSelectedObject}
        setShowDetails={setShowDetails}
      />
    );
  };

  const columns = access
    ? getColumns(
        baseColumns,
        getOperationalButtons,
        access,
        handleEdit,
        handleDelete,
        (row) => row.StatusID === 1, // can edit func
        (row) => row.StatusID === 1 // can delete func
      )
    : [];

  const handleClear = () => {
    setRecords([]);
    setFilter(null);
    setSearched(false);
  };

  const handleSaveReceiveReceiptItem = async (receive_item) => {
    const saved_receive_receipt_item = await service.saveItem(receive_item);

    const rec = { ...selectedObject };
    if (receive_item.ItemID === 0)
      rec.Items = [...rec.Items, saved_receive_receipt_item];
    else {
      const index = rec.Items.findIndex(
        (i) => i.ItemID === receive_item.ItemID
      );
      rec.Items[index] = saved_receive_receipt_item;
    }
    setSelectedObject(rec);

    //------

    const receive_receipt_index = records.findIndex(
      (receive_receipt) => receive_receipt.ReceiveID === receive_item.ReceiveID
    );

    records[receive_receipt_index] = selectedObject;

    //------

    setRecords([...records]);

    return saved_receive_receipt_item;
  };

  const handleDeleteReceiveReceiptItem = async (item_id) => {
    await service.deleteItem(item_id);

    if (selectedObject) {
      const rec = { ...selectedObject };
      rec.Items = rec.Items.filter((i) => i.ItemID !== item_id);
      setSelectedObject(rec);

      //------

      const receive_receipt_index = records.findIndex(
        (receive_receipt) => receive_receipt.ReceiveID === rec.ReceiveID
      );

      records[receive_receipt_index] = rec;
      // records[receive_receipt_index].Items = records[
      //   receive_receipt_index
      // ].Items.filter((i) => y.ItemID !== item_id);

      setRecords([...records]);
    }
  };

  const handleApproveReceiveReceipt = async () => {
    setProgress(true);

    try {
      const data = await service.approveReciveReceipt(selectedObject.ReceiveID);

      // Update selected object
      selectedObject.StatusID = 2; // Approve
      selectedObject.StatusTitle = Words.receive_receipt_status_2;
      setSelectedObject({ ...selectedObject });

      // Update records
      const receipt_index = records.findIndex(
        (r) => r.ReceiveID === selectedObject.ReceiveID
      );
      records[receipt_index] = { ...selectedObject };
      setRecords([...records]);

      //---
      message.success(data.Message);
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  const handleRejecetReceiveReceipt = async () => {
    setProgress(true);

    try {
      const data = await service.rejectReciveReceipt(selectedObject.ReceiveID);

      // Update selected object
      selectedObject.StatusID = 3; // Reject
      selectedObject.StatusTitle = Words.receive_receipt_status_3;
      setSelectedObject({ ...selectedObject });

      // Update records
      const receipt_index = records.findIndex(
        (r) => r.ReceiveID === selectedObject.ReceiveID
      );
      records[receipt_index] = { ...selectedObject };
      setRecords([...records]);

      //---
      message.success(data.Message);
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  //------

  return (
    <>
      <Spin spinning={progress}>
        <Row gutter={[10, 15]}>
          <SimpleDataPageHeader
            title={Words.receive_receipts}
            sheets={getSheets(records)}
            fileName="ReceiveReceipts"
            onSearch={() => setShowSearchModal(true)}
            onClear={handleClear}
            onAdd={access?.CanAdd && handleAdd}
          />

          <Col xs={24}>
            {searched && (
              <SimpleDataTable records={records} columns={columns} />
            )}
          </Col>
        </Row>
      </Spin>

      {showSearchModal && (
        <SearchModal
          onOk={handleSearch}
          onCancel={() => setShowSearchModal(false)}
          isOpen={showSearchModal}
          filter={filter}
        />
      )}

      {showModal && (
        <ReceiveReceiptModal
          access={access}
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
          onSaveReceiveReceiptItem={handleSaveReceiveReceiptItem}
          onDeleteReceiveReceiptItem={handleDeleteReceiveReceiptItem}
          onReject={handleRejecetReceiveReceipt}
          onApprove={handleApproveReceiveReceipt}
        />
      )}

      {showDetails && (
        <DetailsModal
          isOpen={showDetails}
          selectedObject={selectedObject}
          onOk={() => {
            setShowDetails(false);
            setSelectedObject(null);
          }}
        />
      )}
    </>
  );
};

export default ReceiveReceiptsPage;
