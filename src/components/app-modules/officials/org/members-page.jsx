import React, { useState } from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography, Button } from "antd";
import { InfoCircleOutlined as InfoIcon } from "@ant-design/icons";
import {
  AiFillLock as LockIcon,
  AiOutlineCheck as CheckIcon,
} from "react-icons/ai";
import Words from "../../../../resources/words";
import utils from "./../../../../tools/utils";
import service from "./../../../../services/org/members-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  getSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import MemberModal from "./member-modal";
import MemberDetailsModal from "./member-details-modal";
import Colors from "../../../../resources/colors";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "Companies",
    data: records,
    columns: [
      { label: Words.id, value: "MemberID" },
      { label: Words.first_name, value: "FirstName" },
      { label: Words.last_name, value: "LastName" },
      {
        label: Words.gender,
        value: (record) => (record.GenderID === 1 ? Words.male : Words.female),
      },
      { label: Words.national_code, value: "NationalCode" },
      { label: Words.birth_date, value: "BirthDate" },
      { label: Words.mobile, value: "Mobile" },
      { label: Words.fix_tel, value: "FixTel" },
      { label: Words.province, value: "ProvinceTitle" },
      { label: Words.city, value: "CityTitle" },
      { label: Words.address, value: "Address" },
      { label: Words.postal_code, value: "PostalCode" },
      { label: Words.profile_image, value: "PicFileName" },
      { label: Words.username, value: "Username" },
      { label: Words.reg_date, value: "RegDate" },
      { label: Words.reg_time, value: "RegTime" },
      {
        label: Words.reg_member,
        value: (record) => `${record.RegFirstName} ${record.RegLastName}`,
      },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 100,
    align: "center",
    dataIndex: "MemberID",
    sorter: getSorter("MemberID"),
    render: (MemberID) => <Text>{utils.farsiNum(`${MemberID}`)}</Text>,
  },
  {
    title: Words.full_name,
    width: 250,
    align: "center",
    ellipsis: true,
    // dataIndex: "LastName",
    sorter: getSorter("LastName"),
    // render: (LastName) => <Text>{utils.farsiNum(LastName)}</Text>,
    render: (record) => (
      <Text
        style={{ color: Colors.blue[6] }}
      >{`${record.FirstName} ${record.LastName}`}</Text>
    ),
  },
  {
    title: Words.national_code,
    width: 100,
    align: "center",
    ellipsis: true,
    dataIndex: "NationalCode",
    sorter: getSorter("NationalCode"),
    render: (NationalCode) => (
      <Text style={{ color: Colors.orange[6] }}>
        {utils.farsiNum(NationalCode)}
      </Text>
    ),
  },
  {
    title: Words.mobile,
    width: 120,
    align: "center",
    ellipsis: true,
    dataIndex: "Mobile",
    sorter: getSorter("Mobile"),
    render: (Mobile) => (
      <Text style={{ color: Colors.magenta[6] }}>{utils.farsiNum(Mobile)}</Text>
    ),
  },
  {
    title: Words.status,
    width: 75,
    align: "center",
    ellipsis: true,
    // dataIndex: "Mobile",
    sorter: getSorter("IsActive"),
    render: (record) =>
      record.IsActive ? (
        <CheckIcon style={{ color: Colors.green[6] }} />
      ) : (
        <LockIcon style={{ color: Colors.red[6] }} />
      ),
  },
];

const recordID = "MemberID";

const MembersPage = ({ pageName }) => {
  const [progress, setProgress] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
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
            title={Words.members}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="Members"
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
        <MemberModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}

      {showDetails && (
        <MemberDetailsModal
          onOk={() => {
            setShowDetails(false);
            setSelectedObject(null);
          }}
          isOpen={showDetails}
          member={selectedObject}
        />
      )}
    </>
  );
};

export default MembersPage;