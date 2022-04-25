import React from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Button, Typography, Space } from "antd";
import {
  SearchOutlined as SearchIcon,
  PlusOutlined as PlusIcon,
  //   ReloadOutlined as ReloadIcon,
  //   DownloadOutlined as DownloadIcon,
  //   SnippetsOutlined as ViewAllIcon,
} from "@ant-design/icons";
import Words from "../../../../resources/words";
// import utils from "../../../../tools/utils";
import service from "../../../../services/official/tasks/employees-tasks-service";
import {
  checkAccess,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import EmployeeTaskModal from "./user-employee-task-modal";
import { usePageContext } from "../../../contexts/page-context";

const { Text } = Typography;

const recordID = "TaskID";

const UserEmployeesTasksPage = ({ pageName }) => {
  const {
    progress,
    //   searched,
    //   searchText,
    //   setSearchText,
    //   records,
    //   setRecords,
    //   access,
    setAccess,
    selectedObject,
    // setSelectedObject,
    showModal,
    setShowModal,
  } = usePageContext();

  useMount(async () => {
    handleResetContext();
    await checkAccess(setAccess, pageName);
  });

  const {
    handleCloseModal,
    // handleGetAll,
    // handleSearch,
    // handleAdd,
    // handleEdit,
    // handleDelete,
    handleSave,
    handleResetContext,
  } = GetSimplaDataPageMethods({
    service,
    recordID,
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  //------

  return (
    <>
      <Spin spinning={progress}>
        <Row gutter={[10, 15]}>
          <Col xs={24}>
            <Text
              style={{
                paddingBottom: 20,
                paddingRight: 5,
                fontSize: 18,
              }}
              strong
              type="success"
            >
              {Words.employees_tasks}
            </Text>
          </Col>

          <Col xs={24}>
            <Space>
              <Button
                type="primary"
                icon={<SearchIcon />}
                onClick={() => console.log("search")}
              >
                {Words.search}
              </Button>
              <Button
                type="primary"
                icon={<PlusIcon />}
                onClick={handleShowModal}
              >
                {Words.new_task}
              </Button>
            </Space>
          </Col>
        </Row>
      </Spin>

      {showModal && (
        <EmployeeTaskModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}
    </>
  );
};

export default UserEmployeesTasksPage;
