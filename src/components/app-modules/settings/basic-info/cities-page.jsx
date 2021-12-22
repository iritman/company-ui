import React, { useState } from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography } from "antd";
import Words from "../../../../resources/words";
import utils from "../../../../tools/utils";
import service from "../../../../services/org/cities-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  getSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import CityModal from "./city-modal";
import Colors from "../../../../resources/colors";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "Cities",
    data: records,
    columns: [
      { label: Words.id, value: "CityID" },
      { label: Words.title, value: "CityTitle" },
      { label: Words.province, value: "ProvinceTitle" },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 100,
    align: "center",
    dataIndex: "CityID",
    sorter: getSorter("CityID"),
    render: (CityID) => <Text>{utils.farsiNum(`${CityID}`)}</Text>,
  },
  {
    title: Words.title,
    width: 200,
    align: "center",
    ellipsis: true,
    dataIndex: "CityTitle",
    sorter: getSorter("CityTitle"),
    render: (CityTitle) => <Text>{utils.farsiNum(CityTitle)}</Text>,
  },
  {
    title: Words.province,
    width: 200,
    align: "center",
    ellipsis: true,
    dataIndex: "ProvinceTitle",
    sorter: getSorter("ProvinceTitle"),
    render: (ProvinceTitle) => (
      <Text style={{ color: Colors.magenta[6] }}>
        {utils.farsiNum(ProvinceTitle)}
      </Text>
    ),
  },
];

const recordID = "CityID";

const CitiesPage = ({ pageName }) => {
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

  const columns = access
    ? getColumns(baseColumns, null, access, handleEdit, handleDelete)
    : [];

  //------

  return (
    <>
      <Spin spinning={progress}>
        <Row gutter={[10, 15]}>
          <SimpleDataPageHeader
            title={Words.cities}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="Cities"
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
        <CityModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}
    </>
  );
};

export default CitiesPage;
