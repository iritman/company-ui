import React from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, Button } from "antd";
import { InfoCircleOutlined as InfoIcon } from "@ant-design/icons";
import Words from "../../../../resources/words";
import utils from "../../../../tools/utils";
import service from "../../../../services/official/timex/user-security-guard-reged-cards-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import { usePageContext } from "../../../contexts/page-context";
import Colors from "../../../../resources/colors";
import RegedCardModal from "./user-security-guard-reged-card-modal";
import SearchModal from "./user-security-guard-reged-card-search-modal";
import DetailsModal from "./user-security-guard-reged-card-details-modal";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "SecurityGuardRegedCards",
    data: records,
    columns: [
      { label: Words.id, value: "RegID" },
      {
        label: Words.employee,
        value: (record) => `${record.FirstName} ${record.LastName}`,
      },
      { label: Words.card_no, value: "CardNo" },
      {
        label: Words.reg_date,
        value: (record) => utils.slashDate(record.CardRegDate),
      },
      {
        label: Words.reg_time,
        value: (record) => utils.colonTime(record.CardRegTime),
      },

      {
        label: Words.reg_member,
        value: (record) => `${record.RegFirstName} ${record.RegLastName}`,
      },
      {
        label: Words.reg_date,
        value: (record) => utils.slashDate(record.RegRegDate),
      },
      {
        label: Words.reg_time,
        value: (record) => utils.colonTime(record.RegRegTime),
      },
      {
        label: Words.descriptions,
        value: (record) => record.DetailsText,
      },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 75,
    align: "center",
    dataIndex: "RegID",
    sorter: getSorter("RegID"),
    render: (RegID) => <Text>{utils.farsiNum(`${RegID}`)}</Text>,
  },
  {
    title: Words.full_name,
    width: 150,
    align: "center",
    sorter: getSorter("LastName"),
    render: (record) => (
      <Text style={{ color: Colors.blue[6] }}>
        {`${record.FirstName} ${record.LastName}`}
      </Text>
    ),
  },
  {
    title: Words.card_no,
    width: 100,
    align: "center",
    dataIndex: "CardNo",
    sorter: getSorter("CardNo"),
    render: (CardNo) => (
      <Text style={{ color: Colors.orange[6] }}>
        {utils.farsiNum(`${CardNo}`)}
      </Text>
    ),
  },
  {
    title: Words.reg_date,
    width: 100,
    align: "center",
    dataIndex: "CardRegDate",
    sorter: getSorter("CardRegDate"),
    render: (CardRegDate) => (
      <Text style={{ color: Colors.magenta[6] }}>
        {`${utils.weekDayNameFromText(CardRegDate)} - ${utils.farsiNum(
          utils.slashDate(CardRegDate)
        )}`}
      </Text>
    ),
  },
  {
    title: Words.reg_time,
    width: 100,
    align: "center",
    dataIndex: "CardRegTime",
    sorter: getSorter("CardRegTime"),
    render: (CardRegTime) => (
      <Text style={{ color: Colors.green[6] }}>
        {utils.farsiNum(utils.colonTime(CardRegTime))}
      </Text>
    ),
  },
];

const handleCheckEditable = (row) => row.CanEdit;
const handleCheckDeletable = (row) => row.CanDelete;

const recordID = "RegID";

const UserSecurityGuardRegedCardsPage = ({ pageName }) => {
  const {
    progress,
    searched,
    setSearched,
    searchText,
    setSearchText,
    records,
    setRecords,
    access,
    setAccess,
    selectedObject,
    setSelectedObject,
    showDetails,
    setShowDetails,
    showModal,
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
    handleAdvancedSearch,
  } = GetSimplaDataPageMethods({
    service,
    recordID,
  });

  const getOperationalButtons = (record) => {
    return (
      <>
        {record.RegTypeID !== 1 && (
          <Button
            type="link"
            icon={<InfoIcon style={{ color: Colors.green[6] }} />}
            onClick={() => {
              setSelectedObject(record);
              setShowDetails(true);
            }}
          />
        )}
      </>
    );
  };

  const columns = access
    ? getColumns(
        baseColumns,
        getOperationalButtons,
        access,
        handleEdit,
        handleDelete,
        handleCheckEditable,
        handleCheckDeletable
      )
    : [];

  const handleClear = () => {
    setRecords([]);
    setFilter(null);
    setSearched(false);
  };

  //------

  return (
    <>
      <Spin spinning={progress}>
        <Row gutter={[10, 15]}>
          <SimpleDataPageHeader
            title={Words.security_guard_reged_cards}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="SecurityGuardRegedCards"
            onSearchTextChanged={(e) => setSearchText(e.target.value)}
            onSearch={() => setShowSearchModal(true)}
            onClear={handleClear}
            onGetAll={null}
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
          onOk={handleAdvancedSearch}
          onCancel={() => setShowSearchModal(false)}
          isOpen={showSearchModal}
          filter={filter}
        />
      )}

      {showModal && (
        <RegedCardModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}

      {showDetails && (
        <DetailsModal
          onOk={() => {
            setShowDetails(false);
            setSelectedObject(null);
          }}
          isOpen={showDetails}
          regedCard={selectedObject}
        />
      )}
    </>
  );
};

export default UserSecurityGuardRegedCardsPage;
