import React from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Button } from "antd";
import { InfoCircleOutlined as InfoIcon } from "@ant-design/icons";
import Words from "../../../../resources/words";
import service from "../../../../services/official/timex/user-official-check-members-vacations-service";
import {
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import { usePageContext } from "../../../contexts/page-context";
import Colors from "../../../../resources/colors";
import SearchModal from "./user-official-check-members-vacations-search-modal";
import DetailsModal from "./vacation-details-modal";
import { getSheets, baseColumns } from "./vacations-page-items";

const handleCheckEditable = (row) => false;
const handleCheckDeletable = (row) => false;

const recordID = "VacationID";

const UserOfficialCheckMembersVacations = ({ pageName }) => {
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
    showSearchModal,
    setShowSearchModal,
    filter,
    setFilter,
  } = usePageContext();

  useMount(async () => {
    handleResetContext();

    await checkAccess(setAccess, pageName);
  });

  const { handleResetContext, handleAdvancedSearch } = GetSimplaDataPageMethods(
    {
      service,
      recordID,
    }
  );

  const getOperationalButtons = (record) => {
    return (
      <Button
        type="link"
        icon={<InfoIcon style={{ color: Colors.green[6] }} />}
        onClick={() => {
          setSelectedObject(record);
          setShowDetails(true);
        }}
      />
    );
  };

  const columns = access
    ? getColumns(
        baseColumns,
        getOperationalButtons,
        access,
        null,
        null,
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
            title={Words.members_vacations}
            sheets={getSheets(records, "MembersVacations")}
            fileName="MembersVacations"
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
        />
      )}
    </>
  );
};

export default UserOfficialCheckMembersVacations;
