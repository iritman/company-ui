import React, { useState } from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, Button, Space, Tooltip } from "antd";
import { FaUsersCog as AgentIcon } from "react-icons/fa";
import { InfoCircleOutlined as InfoIcon } from "@ant-design/icons";
import Words from "../../../../resources/words";
import utils from "./../../../../tools/utils";
import service from "./../../../../services/org/companies-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  getSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import CompanyModal from "./company-modal";
import CompanyDetailsModal from "./company-details-modal";
import CompanyAgentsModal from "./company-agents-modal";
import Colors from "../../../../resources/colors";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "Companies",
    data: records,
    columns: [
      { label: Words.id, value: "CompanyID" },
      { label: Words.title, value: "CompanyTitle" },
      { label: Words.province, value: "ProvinceTitle" },
      { label: Words.city, value: "CityTitle" },
      { label: Words.office_tel, value: "OfficeTitle" },
      { label: Words.fax, value: "Fax" },
      { label: Words.address, value: "Address" },
      { label: Words.postal_code, value: "PostalCode" },
      { label: Words.national_id, value: "NationalID" },
      { label: Words.financial_code, value: "FinancialCode" },
      { label: Words.reg_no, value: "RegNo" },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 100,
    align: "center",
    dataIndex: "CompanyID",
    sorter: getSorter("CompanyID"),
    render: (CompanyID) => <Text>{utils.farsiNum(`${CompanyID}`)}</Text>,
  },
  {
    title: Words.title,
    width: 250,
    align: "center",
    ellipsis: true,
    dataIndex: "CompanyTitle",
    sorter: getSorter("CompanyTitle"),
    render: (CompanyTitle) => <Text>{utils.farsiNum(CompanyTitle)}</Text>,
  },
  {
    title: Words.reg_no,
    width: 100,
    align: "center",
    ellipsis: true,
    dataIndex: "RegNo",
    sorter: getSorter("RegNo"),
    render: (RegNo) => <Text>{utils.farsiNum(RegNo)}</Text>,
  },
  {
    title: Words.province,
    width: 120,
    align: "center",
    ellipsis: true,
    dataIndex: "ProvinceTitle",
    sorter: getSorter("ProvinceTitle"),
    render: (ProvinceTitle) => <Text>{utils.farsiNum(ProvinceTitle)}</Text>,
  },
  {
    title: Words.city,
    width: 120,
    align: "center",
    ellipsis: true,
    dataIndex: "CityTitle",
    sorter: getSorter("CityTitle"),
    render: (CityTitle) => <Text>{utils.farsiNum(CityTitle)}</Text>,
  },
];

const recordID = "CompanyID";

const CompaniesPage = ({ pageName }) => {
  const [progress, setProgress] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [records, setRecords] = useState([]);
  const [access, setAccess] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAgentsModal, setShowAgentsModal] = useState(false);

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

  const getOperationalButtons = (record) => {
    return (
      <Space>
        <Button
          type="link"
          icon={<InfoIcon style={{ color: Colors.green[6] }} />}
          onClick={() => {
            setSelectedObject(record);
            setShowDetails(true);
          }}
        />

        <Tooltip title={Words.comp_agents}>
          <Button
            type="link"
            icon={<AgentIcon style={{ color: Colors.gold[6] }} size={20} />}
            onClick={() => {
              setSelectedObject(record);
              setShowAgentsModal(true);
            }}
          />
        </Tooltip>
      </Space>
    );
  };

  const columns = access
    ? getColumns(
        baseColumns,
        getOperationalButtons,
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
            title={Words.companies}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="Companies"
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
        <CompanyModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}

      {showDetails && (
        <CompanyDetailsModal
          onOk={() => {
            setShowDetails(false);
            setSelectedObject(null);
          }}
          isOpen={showDetails}
          company={selectedObject}
        />
      )}

      {showAgentsModal && (
        <CompanyAgentsModal
          onOk={() => {
            setSelectedObject(null);
            setShowAgentsModal(false);
          }}
          isOpen={showAgentsModal}
          company={selectedObject}
        />
      )}
    </>
  );
};

export default CompaniesPage;
