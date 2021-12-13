import React, { useState } from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, Button } from "antd";
import Words from "../../../../resources/words";
import utils from "./../../../../tools/utils";
import service from "./../../../../services/org/departments-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  getSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import DepartmentModal from "./department-modal";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "Departments",
    data: records,
    columns: [
      { label: Words.id, value: "DepartmentID" },
      { label: Words.title, value: "DepartmentTitle" },
      { label: Words.parent_department, value: "ParentDepartmentTitle" },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 100,
    align: "center",
    dataIndex: "DepartmentID",
    sorter: getSorter("DepartmentID"),
    render: (DepartmentID) => <Text>{utils.farsiNum(`${DepartmentID}`)}</Text>,
  },
  {
    title: Words.title,
    width: 200,
    align: "center",
    ellipsis: true,
    dataIndex: "DepartmentTitle",
    sorter: getSorter("DepartmentTitle"),
    render: (DepartmentTitle) => <Text>{utils.farsiNum(DepartmentTitle)}</Text>,
  },
  {
    title: Words.parent_department,
    width: 200,
    align: "center",
    ellipsis: true,
    dataIndex: "ParentDepartmentTitle",
    sorter: getSorter("ParentDepartmentTitle"),
    render: (ParentDepartmentTitle) => (
      <Text>{utils.farsiNum(ParentDepartmentTitle)}</Text>
    ),
  },
];

const recordID = "DepartmentID";

const DepartmentsPage = ({ pageName }) => {
  const [progress, setProgress] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [records, setRecords] = useState([]);
  const [access, setAccess] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useMount(async () => {
    await checkAccess(setAccess, pageName);
  });

  const {
    handleCloseModal,
    handleGetAll,
    handleSearch,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSave,
  } = getSimplaDataPageMethods({
    service,
    recordID,
    showModal,
    setShowModal,
    setSelectedObject,
    setProgress,
    records,
    setRecords,
    setSearched,
    searchText,
    setSearchText,
  });

  // const getOperationalButtons = (record) => {
  //   return (
  //     <Button
  //       type="link"
  //       icon={<EditIcon />}
  //       onClick={() => handleEdit(record)}
  //     />
  //   );
  // };

  const columns = access
    ? getColumns(
        baseColumns,
        null, //getOperationalButtons,
        access,
        handleEdit,
        handleDelete
      )
    : [];

  //------

  return (
    <>
      <Spin spinning={progress}>
        <Row gutter={[10, 15]}>
          <SimpleDataPageHeader
            title={Words.departments}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="Departments"
            onSearchTextChanged={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
            onClear={() => setRecords([])}
            onGetAll={handleGetAll}
            onAdd={access?.CanAdd && handleAdd}
          />

          <Col xs={24}>
            {searched && (
              <SimpleDataTable records={records} columns={columns} />
            )}
          </Col>
        </Row>
      </Spin>

      {showModal && (
        <DepartmentModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}
    </>
  );
};

export default DepartmentsPage;
