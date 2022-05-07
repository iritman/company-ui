import React from "react";
import { useMount } from "react-use";
import {
  Spin,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Card,
  Tag,
  Badge,
  message,
  Alert,
} from "antd";
import {
  SearchOutlined as SearchIcon,
  PlusOutlined as PlusIcon,
  PaperClipOutlined as AttachedFileIcon,
  PushpinOutlined as PinIcon,
  FileTextOutlined as FileIcon,
  EyeInvisibleOutlined as UnseenIcon,
  // EyeOutlined as SeenIcon,
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
import Colors from "./../../../../resources/colors";
import MemberProfileImage from "./../../../common/member-profile-image";
import utils from "./../../../../tools/utils";
import { handleError } from "./../../../../tools/form-manager";

const { Text } = Typography;

const recordID = "TaskID";

const UserEmployeesTasksPage = ({ pageName }) => {
  const {
    progress,
    //   searched,
    //   searchText,
    //   setSearchText,
    records,
    setRecords,
    // access,
    setAccess,
    selectedObject,
    setSelectedObject,
    showModal,
    setShowModal,
  } = usePageContext();

  const {
    handleCloseModal,
    handleGetAll,
    // handleSearch,
    // handleAdd,
    // handleEdit,
    handleDelete,
    handleSave,
    handleResetContext,
  } = GetSimplaDataPageMethods({
    service,
    recordID,
  });

  useMount(async () => {
    handleResetContext();
    await checkAccess(setAccess, pageName);

    await handleGetAll();
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  //------

  const task_categories = [
    { categoryID: 1, title: Words.today_tasks, key: "today" },
    { categoryID: 2, title: Words.tomorrow_tasks, key: "tomorrow" },
    { categoryID: 3, title: Words.this_month_tasks, key: "this_month" },
    { categoryID: 4, title: Words.has_delay_tasks, key: "has_delay" },
    { categoryID: 5, title: Words.future_tasks, key: "future" },
  ];

  task_categories.forEach((category) => {
    category.tasks = records.filter(
      (task) => task.TaskCategory === category.key
    );
  });

  const filtered_task_categories = task_categories.filter(
    (category) => category.tasks.length > 0
  );

  const getDelayText = (delayInfo) => {
    let result = "";

    const { Days, Hours, Minutes } = delayInfo;

    if (Days > 0)
      result = utils.farsiNum(`${Days} ${Words.day} ${Words.delay}`);
    else if (Hours > 0)
      result = utils.farsiNum(`${Hours} ${Words.hour} ${Words.delay}`);
    else if (Minutes > 0)
      result = utils.farsiNum(`${Minutes} ${Words.minute} ${Words.delay}`);

    return result;
  };

  const getRibonColor = (key) => {
    let result = "blue";

    switch (key) {
      case "today":
        result = "green";
        break;
      case "tomorrow":
        result = "cyan";
        break;
      case "this_month":
        result = "purple";
        break;
      case "has_delay":
        result = "red";
        break;
      case "future":
        result = "magenta";
        break;
      default:
        result = "blue";
        break;
    }

    return result;
  };

  const handleSelectTask = (task) => {
    setSelectedObject(task);
    setShowModal(true);
  };

  const handleSaveReport = async (report) => {
    const result = await service.saveReport(report);

    const index = records.findIndex((task) => task.TaskID === report.TaskID);
    records[index].Reports = result;

    setSelectedObject({ ...records[index] });
    setRecords([...records]);
  };

  const handleDeleteReport = async (report) => {
    try {
      const result = await service.deleteReport(report.ReportID);

      const index = records.findIndex((task) => task.TaskID === report.TaskID);
      records[index].Reports = records[index].Reports.filter(
        (r) => r.ReportID !== report.ReportID
      );

      setSelectedObject({ ...records[index] });
      setRecords([...records]);

      message.success(result.Message);
    } catch (ex) {
      handleError(ex);
    }
  };

  const handleSeenReports = async () => {
    try {
      await service.makeReportsSeen(selectedObject.TaskID);

      const index = records.findIndex(
        (task) => task.TaskID === selectedObject.TaskID
      );
      records[index].NewReportsCount = 0;

      setSelectedObject({ ...records[index] });
      setRecords([...records]);
    } catch (ex) {
      handleError(ex);
    }
  };

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

          {records.length > 0 ? (
            <>
              {filtered_task_categories.map((category) => (
                <React.Fragment key={category.key}>
                  <Col xs={24}>
                    <Badge.Ribbon
                      placement="start"
                      color={getRibonColor(category.key)}
                      text={
                        <Text style={{ color: Colors.white, fontSize: 14 }}>
                          {category.title}
                        </Text>
                      }
                    >
                      <div style={{ height: 30 }} />
                    </Badge.Ribbon>
                  </Col>
                  <Col xs={24}>
                    {category.tasks.map((task) => (
                      <Card
                        key={task.TaskID}
                        size="small"
                        hoverable
                        onClick={() => handleSelectTask(task)}
                      >
                        <Row gutter={[10]}>
                          <Col xs={24} md={12}>
                            <Space>
                              {task.Files.length > 0 && (
                                <AttachedFileIcon
                                  style={{
                                    color: Colors.orange[6],
                                    fontSize: 18,
                                  }}
                                />
                              )}

                              {task.Reports.length > 0 && (
                                <FileIcon
                                  style={{
                                    color:
                                      task.NewReportsCount > 0
                                        ? Colors.red[6]
                                        : Colors.blue[5],
                                    fontSize: 18,
                                  }}
                                />
                              )}

                              <Text>{task.Title}</Text>
                            </Space>
                          </Col>
                          <Col xs={24} md={12} style={{ direction: "ltr" }}>
                            <Space>
                              <Col xs={24}>
                                {task.Tags.map((tag) => (
                                  <Tag
                                    color={tag.Color}
                                    style={{ margin: 3 }}
                                    icon={<PinIcon />}
                                    key={tag.TagID}
                                  >
                                    {tag.Title}
                                  </Tag>
                                ))}
                              </Col>

                              {task.SeenDate.length === 0 && (
                                <UnseenIcon
                                  style={{
                                    color: Colors.blue[6],
                                    fontSize: 16,
                                  }}
                                />
                              )}

                              <MemberProfileImage
                                fileName={task.ResponsePicFileName}
                                size="small"
                              />

                              {task.ReminderInfo.HasDelay && (
                                <Text style={{ color: Colors.red[6] }}>
                                  {getDelayText(task.ReminderInfo)}
                                </Text>
                              )}
                            </Space>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Col>
                </React.Fragment>
              ))}
            </>
          ) : (
            <Col xs={24}>
              <Alert
                type="warning"
                showIcon
                message={Words.messages.no_any_tasks}
              />
            </Col>
          )}
        </Row>
      </Spin>

      {showModal && (
        <EmployeeTaskModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          onDelete={handleDelete}
          onSubmitReport={handleSaveReport}
          onDeleteReport={handleDeleteReport}
          onSeenReports={handleSeenReports}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}
    </>
  );
};

export default UserEmployeesTasksPage;
