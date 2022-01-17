import React from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, Button, message } from "antd";
import { InfoCircleOutlined as InfoIcon } from "@ant-design/icons";
import Words from "../../../../resources/words";
import utils from "../../../../tools/utils";
import service from "../../../../services/official/timex/user-replace-work-requests-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
  handleError,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import { usePageContext } from "../../../contexts/page-context";
import Colors from "../../../../resources/colors";
// import VacationModal from "./user-my-vacation-modal";
import ReplaceWorkRequestSearchModal from "./user-replace-work-request-search-modal";
import ReplaceWorkRequestDetailsModal from "./user-replace-work-request-details-modal";

const { Text } = Typography;

const getVacationStatusColor = (statusID) => {
  let color = Colors.grey[6];

  switch (statusID) {
    case 2:
      color = Colors.green[6];
      break;
    case 3:
      color = Colors.red[6];
      break;
    default:
      color = Colors.grey[6];
      break;
  }

  return color;
};

const getVacationStatusTitle = (statusID) => {
  let title = Words.in_progress;

  switch (statusID) {
    case 2:
      title = Words.accepted;
      break;
    case 3:
      title = Words.rejected;
      break;
    default:
      title = Words.in_progress;
      break;
  }

  return title;
};

const getSheets = (records) => [
  {
    title: "ReplaceWorkRequests",
    data: records,
    columns: [
      { label: Words.id, value: "VacationID" },
      {
        label: Words.full_name,
        value: (record) => `${record.FirstName} ${record.LastName}`,
      },
      {
        label: Words.vacation_type,
        value: (record) => `${record.VacationTypeTitle}`,
      },
      {
        label: Words.reg_date,
        value: (record) => utils.slashDate(record.RegDate),
      },
      {
        label: Words.reg_time,
        value: (record) => utils.colonTime(record.RegTime),
      },
      {
        label: Words.from_date,
        value: (record) => utils.slashDate(record.StartDate),
      },
      {
        label: Words.from_time,
        value: (record) => utils.colonTime(record.StartTime),
      },
      {
        label: Words.to_date,
        value: (record) => utils.slashDate(record.FinishDate),
      },
      {
        label: Words.to_time,
        value: (record) => utils.colonTime(record.FinishTime),
      },
      {
        label: Words.descriptions,
        value: (record) => record.DetailsText,
      },
      {
        label: Words.status,
        value: (record) => getVacationStatusTitle(record.FinalStatusID),
      },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 75,
    align: "center",
    dataIndex: "VacationID",
    sorter: getSorter("VacationID"),
    render: (VacationID) => <Text>{utils.farsiNum(`${VacationID}`)}</Text>,
  },
  {
    title: Words.vacation_type,
    width: 120,
    align: "center",
    dataIndex: "VacationTypeTitle",
    sorter: getSorter("VacationTypeTitle"),
    render: (VacationTypeTitle) => (
      <Text style={{ color: Colors.blue[6] }}>{VacationTypeTitle}</Text>
    ),
  },
  {
    title: Words.from_date,
    width: 120,
    align: "center",
    dataIndex: "StartDate",
    sorter: getSorter("StartDate"),
    render: (StartDate) => (
      <Text style={{ color: Colors.green[6] }}>
        {`${utils.weekDayNameFromText(StartDate)} - ${utils.farsiNum(
          utils.slashDate(StartDate)
        )}`}
      </Text>
    ),
  },
  {
    title: Words.from_time,
    width: 100,
    align: "center",
    dataIndex: "StartTime",
    sorter: getSorter("StartTime"),
    render: (StartTime) => (
      <>
        {StartTime.Length > 0 && (
          <Text style={{ color: Colors.magenta[6] }}>
            {`${utils.farsiNum(utils.colonTime(StartTime))}`}
          </Text>
        )}
      </>
    ),
  },
  {
    title: Words.to_date,
    width: 120,
    align: "center",
    dataIndex: "FinishDate",
    sorter: getSorter("FinishDate"),
    render: (FinishDate) => (
      <Text style={{ color: Colors.green[6] }}>
        {`${utils.weekDayNameFromText(FinishDate)} - ${utils.farsiNum(
          utils.slashDate(FinishDate)
        )}`}
      </Text>
    ),
  },
  {
    title: Words.to_time,
    width: 100,
    align: "center",
    dataIndex: "FinishTime",
    sorter: getSorter("FinishTime"),
    render: (FinishTime) => (
      <>
        {FinishTime.Length > 0 && (
          <Text style={{ color: Colors.magenta[6] }}>
            {`${utils.farsiNum(utils.colonTime(FinishTime))}`}
          </Text>
        )}
      </>
    ),
  },
  {
    title: Words.status,
    width: 100,
    align: "center",
    dataIndex: "FinalStatusID",
    sorter: getSorter("FinalStatusID"),
    render: (FinalStatusID) => (
      <Text style={{ color: getVacationStatusColor(FinalStatusID) }}>
        {getVacationStatusTitle(FinalStatusID)}
      </Text>
    ),
  },
];

const handleCheckEditable = (row) => row.Editable;
const handleCheckDeletable = (row) => row.Deletable;

const recordID = "VacationID";

const UserReplaceWorkRequestsPage = ({ pageName }) => {
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
    showModal,
    showSearchModal,
    setShowSearchModal,
    filter,
    setFilter,
  } = usePageContext();

  useMount(async () => {
    handleResetContext();

    await checkAccess(setAccess, pageName);

    const default_filter_for_new_requests = {
      SearchTypeID: 1,
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
            title={Words.replace_work_requests}
            sheets={getSheets(records)}
            fileName="ReplaceWorkRequests"
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
        <ReplaceWorkRequestSearchModal
          onOk={handleAdvancedSearch}
          onCancel={() => setShowSearchModal(false)}
          isOpen={showSearchModal}
          filter={filter}
        />
      )}

      {/* {showModal && (
        <VacationModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )} */}

      {showDetails && (
        <ReplaceWorkRequestDetailsModal
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

export default UserReplaceWorkRequestsPage;
