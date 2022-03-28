import React from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Button } from "antd";
import { InfoCircleOutlined as InfoIcon } from "@ant-design/icons";
import Words from "../../../../resources/words";
import service from "../../../../services/official/timex/user-my-vacations-service";
import {
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import { usePageContext } from "../../../contexts/page-context";
import Colors from "../../../../resources/colors";
import VacationModal from "./user-my-vacation-modal";
import SearchModal from "./user-my-vacation-search-modal";
import DetailsModal from "./vacation-details-modal";
import { getSheets, baseColumns } from "./vacations-page-items";

const handleCheckEditable = (row) => row.Editable;
const handleCheckDeletable = (row) => row.Deletable;

const recordID = "VacationID";

const UserMyVacationsPage = ({ pageName }) => {
  const {
    progress,
    searched,
    setSearched,
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
            title={Words.my_vacations}
            sheets={getSheets(records, "MyVacations")}
            fileName="MyVacations"
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
        <VacationModal
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
          vacation={selectedObject}
        />
      )}
    </>
  );
};

export default UserMyVacationsPage;
