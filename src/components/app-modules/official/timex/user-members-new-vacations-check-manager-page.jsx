import React from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Button, message } from "antd";
import { InfoCircleOutlined as InfoIcon } from "@ant-design/icons";
import Words from "../../../../resources/words";
import service from "../../../../services/official/timex/user-members-new-vacations-check-manager-service";
import {
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
  handleError,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import { usePageContext } from "../../../contexts/page-context";
import Colors from "../../../../resources/colors";
import SearchModal from "./user-members-new-vacations-check-manager-search-modal";
import DetailsModal from "./user-members-new-vacations-check-manager-details-modal";
import { getSheets, baseColumns } from "./vacations-page-items";

const handleCheckEditable = (row) => false;
const handleCheckDeletable = (row) => false;

const recordID = "VacationID";

const UserMembersNewVacationsCheckManagerPage = ({ pageName }) => {
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

    const default_filter_for_new_requests = {
      MemberID: 0,
      VacationTypeID: 0,
      FromDate: "",
      ToDate: "",
    };

    setFilter(default_filter_for_new_requests);

    //------

    setProgress(true);

    try {
      await handleAdvancedSearch(default_filter_for_new_requests);
    } catch (err) {
      handleError(err);
    }

    setProgress(false);
  });

  const { handleEdit, handleDelete, handleResetContext, handleAdvancedSearch } =
    GetSimplaDataPageMethods({
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

  const handleSaveResponse = async (response) => {
    const data = await service.saveResponse(response);

    const index = records.findIndex(
      (v) => (v.VacationID = response.VacationID)
    );
    records[index] = data;
    setSelectedObject(data);

    message.success(Words.messages.your_response_submitted);
  };

  return (
    <>
      <Spin spinning={progress}>
        <Row gutter={[10, 15]}>
          <SimpleDataPageHeader
            title={Words.members_vacations_check_manager}
            sheets={getSheets(records, "VacationWaitForManagerCheck")}
            fileName="VacationWaitForManagerCheck"
            onSearch={() => setShowSearchModal(true)}
            onClear={handleClear}
            onGetAll={null}
            onAdd={null}
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

      {showDetails && (
        <DetailsModal
          onOk={() => {
            setShowDetails(false);
            setSelectedObject(null);
          }}
          isOpen={showDetails}
          vacation={selectedObject}
          onResponse={handleSaveResponse}
        />
      )}
    </>
  );
};

export default UserMembersNewVacationsCheckManagerPage;
