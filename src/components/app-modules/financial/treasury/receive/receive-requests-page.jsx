import React from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, message } from "antd";
import Words from "../../../../../resources/words";
import Colors from "../../../../../resources/colors";
import utils from "../../../../../tools/utils";
import service from "../../../../../services/financial/treasury/receive/receive-requests-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
  handleError,
} from "../../../../../tools/form-manager";
import SimpleDataTable from "../../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../../common/simple-data-page-header";
import ReceiveRequestModal from "./receive-request-modal";
import SearchModal from "./receive-requests-search-modal";
import DetailsModal from "./receive-request-details-modal";
import { usePageContext } from "../../../../contexts/page-context";
import DetailsButton from "../../../../common/details-button";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "ReceiveRequests",
    data: records,
    columns: [
      { label: Words.id, value: "RequestID" },
      { label: Words.front_side_account_id, value: "FrontSideAccountID" },
      { label: Words.account_no, value: "AccountNo" },
      { label: Words.first_name, value: "FirstName" },
      { label: Words.last_name, value: "LastName" },
      { label: Words.company, value: "CompanyTitle" },
      { label: Words.currency, value: "CurrencyTitle" },
      { label: Words.standard_description, value: "DetailsText" },

      { label: Words.receive_base, value: "BaseTypeTitle" },
      { label: Words.base_doc_id, value: "BaseDocID" },
      { label: Words.requestable_balance, value: "DetailsText" },
      { label: Words.settlement_date, value: "SettlementDate" },
      { label: Words.status, value: "StatusTitle" },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 75,
    align: "center",
    dataIndex: "RequestID",
    sorter: getSorter("RequestID"),
    render: (RequestID) => <Text>{utils.farsiNum(`${RequestID}`)}</Text>,
  },
  {
    title: Words.front_side,
    width: 200,
    align: "center",
    // dataIndex: "Title",
    sorter: getSorter("LastName"),
    render: (record) => (
      <Text style={{ color: Colors.cyan[6] }}>
        {utils.farsiNum(
          record.MemberID > 0
            ? `${record.FirstName} ${record.LastName} - ${record.AccountNo}`
            : `${record.CompanyTitle} - ${record.AccountNo}`
        )}
      </Text>
    ),
  },
  {
    title: Words.receive_date,
    width: 150,
    align: "center",
    dataIndex: "ReceiveDate",
    sorter: getSorter("ReceiveDate"),
    render: (ReceiveDate) => (
      <Text style={{ color: Colors.blue[6] }}>
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

const recordID = "RequestID";

const ReceiveRequestsPage = ({ pageName }) => {
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

  const handleSaveReceiveRequestItem = async (receive_item) => {
    const saved_receive_request_item = await service.saveItem(receive_item);

    const rec = { ...selectedObject };
    if (receive_item.ItemID === 0)
      rec.Items = [...rec.Items, saved_receive_request_item];
    else {
      const index = rec.Items.findIndex(
        (i) => i.ItemID === receive_item.ItemID
      );
      rec.Items[index] = saved_receive_request_item;
    }
    setSelectedObject(rec);

    //------

    const receive_request_index = records.findIndex(
      (receive_request) => receive_request.RequestID === receive_item.RequestID
    );

    records[receive_request_index] = selectedObject;

    //------

    setRecords([...records]);

    return saved_receive_request_item;
  };

  const handleDeleteReceiveRequestItem = async (item_id) => {
    await service.deleteItem(item_id);

    if (selectedObject) {
      const rec = { ...selectedObject };
      rec.Items = rec.Items.filter((i) => i.ItemID !== item_id);
      setSelectedObject(rec);

      //------

      const receive_request_index = records.findIndex(
        (receive_request) => receive_request.RequestID === rec.RequestID
      );

      records[receive_request_index] = rec;
      // records[receive_request_index].Items = records[
      //   receive_request_index
      // ].Items.filter((i) => y.ItemID !== item_id);

      setRecords([...records]);
    }
  };

  const handleApproveReceiveRequest = async () => {
    setProgress(true);

    try {
      const data = await service.approveReciveRequest(selectedObject.RequestID);

      // Update selected object
      selectedObject.StatusID = 2; // Approve
      selectedObject.StatusTitle = Words.receive_request_status_2;
      setSelectedObject({ ...selectedObject });

      // Update records
      const request_index = records.findIndex(
        (r) => r.RequestID === selectedObject.RequestID
      );
      records[request_index] = { ...selectedObject };
      setRecords([...records]);

      //---
      message.success(data.Message);
    } catch (ex) {
      handleError(ex);
    }

    setProgress(false);
  };

  const handleRejecetReceiveRequest = async () => {
    setProgress(true);

    try {
      const data = await service.rejectReciveRequest(selectedObject.RequestID);

      // Update selected object
      selectedObject.StatusID = 3; // Reject
      selectedObject.StatusTitle = Words.receive_request_status_3;
      setSelectedObject({ ...selectedObject });

      // Update records
      const request_index = records.findIndex(
        (r) => r.RequestID === selectedObject.RequestID
      );
      records[request_index] = { ...selectedObject };
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
            title={Words.receive_requests}
            sheets={getSheets(records)}
            fileName="ReceiveRequests"
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
        <ReceiveRequestModal
          access={access}
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
          onSaveReceiveRequestItem={handleSaveReceiveRequestItem}
          onDeleteReceiveRequestItem={handleDeleteReceiveRequestItem}
          onReject={handleRejecetReceiveRequest}
          onApprove={handleApproveReceiveRequest}
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

export default ReceiveRequestsPage;
