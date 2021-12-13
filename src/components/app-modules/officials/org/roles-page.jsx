import React, { useState } from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, Button } from "antd";
import Words from "../../../../resources/words";
import utils from "./../../../../tools/utils";
import service from "./../../../../services/org/roles-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  getSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import RoleModal from "./role-modal";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "Roles",
    data: records,
    columns: [
      { label: Words.id, value: "RoleID" },
      { label: Words.title, value: "RoleTitle" },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 100,
    align: "center",
    dataIndex: "RoleID",
    sorter: getSorter("RoleID"),
    render: (RoleID) => <Text>{utils.farsiNum(`${RoleID}`)}</Text>,
  },
  {
    title: Words.title,
    width: 200,
    align: "center",
    ellipsis: true,
    dataIndex: "RoleTitle",
    sorter: getSorter("RoleTitle"),
    render: (RoleTitle) => <Text>{utils.farsiNum(RoleTitle)}</Text>,
  },
];

const recordID = "RoleID";

const RolesPage = ({ pageName }) => {
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
            title={Words.roles}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="Roles"
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
        <RoleModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}
    </>
  );
};

export default RolesPage;
