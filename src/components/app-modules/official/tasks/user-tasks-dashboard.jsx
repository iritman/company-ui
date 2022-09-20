import React, { useState } from "react";
import { useMount } from "react-use";
import {
  Row,
  Col,
  Typography,
  Alert,
  Badge,
  Space,
  Tooltip,
  TreeSelect,
  Checkbox,
} from "antd";
import service from "./../../../../services/dashboard/user-dashboard-service";
import { handleError } from "./../../../../tools/form-manager";
import utils from "./../../../../tools/utils";
import Words from "./../../../../resources/words";
import Colors from "./../../../../resources/colors";
import ReloadButton from "../../../common/reload-button";
import MemberProfileImage from "./../../../common/member-profile-image";
import StatisticTile from "../../../common/statistic-tile";
import FolderNode from "../../../common/folder-node";

const { Text } = Typography;
const { TreeNode } = TreeSelect;

const link_prefix = "/home/official/tasks";

const UserTasksDashboard = () => {
  const [inProgress, setInProgress] = useState(false);
  const [statistics, setStatistics] = useState({
    MyTomorrowTasks: 0,
    MyTodayTasks: 0,
    MyDelayedTasks: 0,
    MyDoneTasks: 0,
    MyUnreadReports: 0,
    MyRegedReports: 0,
    MyColleagues: [],
    //------
    MyUnderSupervisionTasks: 0,
    MyFinishedSupervisionTasks: 0,
    MyUnreadSupervisionReports: 0,
    MyRegedSupervisionReports: 0,
    //------
    EmployeesTomorrowTasks: 0,
    EmployeesTodayTasks: 0,
    EmployeesDelayedTasks: 0,
    EmployeesDoneTasks: false,
    EmployeesUnreadReports: 0,
    EmployeesRegedReports: 0,
  });
  const [departments, setDepartments] = useState([]);
  const [departmentID, setDepartmentID] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [calculateSubDepartments, setCalculateSubDepartments] = useState(false);

  const handleSelectedDepartmentChange = (newValue) => {
    setSelectedDepartment(newValue);

    if (newValue === 0) {
      setCalculateSubDepartments(false);
    }
  };

  // const initStatistics = () => {
  //   setStatistics({
  //     MyTomorrowTasks: 0,
  //     MyTodayTasks: 0,
  //     MyDelayedTasks: 7,
  //     MyDoneTasks: 6,
  //     MyUnreadReports: 0,
  //     MyRegedReports: 0,
  //     MyColleagues: [],
  //     //------
  //     MyUnderSupervisionTasks: 0,
  //     MyFinishedSupervisionTasks: 0,
  //     MyUnreadSupervisionReports: 0,
  //     MyRegedSupervisionReports: 0,
  //     //------
  //     EmployeesTomorrowTasks: 1,
  //     EmployeesTodayTasks: 2,
  //     EmployeesDelayedTasks: 3,
  //     EmployeesDoneTasks: false,
  //     EmployeesUnreadReports: 0,
  //     EmployeesRegedReports: 0
  //   });
  // };

  useMount(async () => {
    await loadStatistics();
  });

  const loadStatistics = async () => {
    setInProgress(true);

    try {
      const depInfo = await service.getMemberDepartmentInfo();

      const { Departments, DepartmentID } = depInfo;

      setDepartments(Departments);
      setDepartmentID(DepartmentID);

      const data = await service.getTaskStatistics(
        selectedDepartment,
        calculateSubDepartments
      );

      setStatistics(data);
    } catch (ex) {
      handleError(ex);
    }

    setInProgress(false);
  };

  const getSubDepartments = (depID) => {
    const subDepartments = departments.filter((d) => d.ParentID === depID);

    return (
      <>
        {subDepartments.map((sub_dep) => (
          <TreeNode
            key={sub_dep.DepartmentID}
            value={sub_dep.DepartmentID}
            title={
              <FolderNode
                title={
                  departments.find(
                    (d) => d.DepartmentID === sub_dep.DepartmentID
                  )?.Title
                }
                color={Colors.blue[6]}
              />
            }
          >
            {getSubDepartments(sub_dep.DepartmentID)}
          </TreeNode>
        ))}
      </>
    );
  };

  const handleCalculateSubDepartmentsChange = (e) => {
    setCalculateSubDepartments(e.target.checked);
  };

  const {
    MyTomorrowTasks,
    MyTodayTasks,
    MyDelayedTasks,
    MyDoneTasks,
    MyUnreadReports,
    MyRegedReports,
    MyColleagues,
    //------
    MyUnderSupervisionTasks,
    MyFinishedSupervisionTasks,
    MyUnreadSupervisionReports,
    MyRegedSupervisionReports,
    //------
    EmployeesTomorrowTasks,
    EmployeesTodayTasks,
    EmployeesDelayedTasks,
    EmployeesDoneTasks,
    EmployeesUnreadReports,
    EmployeesRegedReports,
  } = statistics;

  return (
    <Row gutter={[20, 16]}>
      <Col xs={24}>
        <Space>
          <Text
            style={{
              paddingBottom: 20,
              paddingRight: 5,
              fontSize: 18,
            }}
            strong
            type="success"
          >
            {Words.tasks}
          </Text>

          <ReloadButton
            tooltip={Words.update}
            inProgress={inProgress}
            onClick={loadStatistics}
          />
        </Space>
      </Col>
      {departmentID > 0 && (
        <>
          <Col xs={24} md={16}>
            <TreeSelect
              showSearch
              style={{
                width: "100%",
              }}
              value={selectedDepartment}
              dropdownStyle={{
                maxHeight: 400,
                overflow: "auto",
              }}
              placeholder={Words.select_department}
              allowClear
              treeDefaultExpandAll
              onChange={handleSelectedDepartmentChange}
              treeLine={{
                showLeafIcon: false,
              }}
            >
              <TreeNode
                key={0}
                value={0}
                title={
                  <FolderNode
                    title={Words.my_personal_statistics}
                    color={Colors.green[6]}
                  />
                }
              />
              <TreeNode
                key={departmentID}
                value={departmentID}
                title={
                  <FolderNode
                    title={
                      departments.find((d) => d.DepartmentID === departmentID)
                        ?.Title
                    }
                    color={Colors.blue[6]}
                  />
                }
              >
                {getSubDepartments(departmentID)}
              </TreeNode>
            </TreeSelect>
          </Col>
          <Col xs={24} md={8}>
            <Checkbox
              checked={calculateSubDepartments}
              disabled={selectedDepartment === 0}
              onChange={handleCalculateSubDepartmentsChange}
            >
              {Words.calculate_sub_departments}
            </Checkbox>
          </Col>
        </>
      )}
      <Col xs={24}>
        <Alert type="info" message={Words.my_tasks} />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="my-tasks"
          inProgress={inProgress}
          title={Words.today_tasks}
          value={MyTodayTasks > 0 ? utils.farsiNum(MyTodayTasks) : "-"}
          color={Colors.green[6]}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="my-tasks"
          inProgress={inProgress}
          title={Words.tomorrow_tasks}
          value={MyTomorrowTasks > 0 ? utils.farsiNum(MyTomorrowTasks) : "-"}
          color={Colors.purple[6]}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="my-tasks"
          inProgress={inProgress}
          title={Words.delayed_tasks}
          value={MyDelayedTasks > 0 ? utils.farsiNum(MyDelayedTasks) : "-"}
          color={Colors.red[6]}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="my-done-tasks"
          inProgress={inProgress}
          title={Words.done_tasks}
          value={MyDoneTasks > 0 ? utils.farsiNum(MyDoneTasks) : "-"}
          color={Colors.blue[6]}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="my-tasks"
          inProgress={inProgress}
          title={Words.new_reports}
          value={MyUnreadReports > 0 ? utils.farsiNum(MyUnreadReports) : "-"}
          color={Colors.red[5]}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="my-tasks"
          inProgress={inProgress}
          title={Words.reged_reports}
          value={MyRegedReports > 0 ? utils.farsiNum(MyRegedReports) : "-"}
          color={Colors.green[5]}
        />
      </Col>
      <Col xs={24}>
        <Alert type="info" message={Words.following} />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.today_tasks}
          value={
            EmployeesTodayTasks > 0 ? utils.farsiNum(EmployeesTodayTasks) : "-"
          }
          color={Colors.green[6]}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.tomorrow_tasks}
          value={
            EmployeesTomorrowTasks > 0
              ? utils.farsiNum(EmployeesTomorrowTasks)
              : "-"
          }
          color={Colors.purple[6]}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.delayed_tasks}
          value={
            EmployeesDelayedTasks > 0
              ? utils.farsiNum(EmployeesDelayedTasks)
              : "-"
          }
          color={Colors.red[6]}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.done_tasks}
          value={
            EmployeesDoneTasks > 0 ? utils.farsiNum(EmployeesDoneTasks) : "-"
          }
          color={Colors.blue[6]}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.new_reports}
          value={
            EmployeesUnreadReports > 0
              ? utils.farsiNum(EmployeesUnreadReports)
              : "-"
          }
          color={Colors.red[5]}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.reged_reports}
          value={
            EmployeesRegedReports > 0
              ? utils.farsiNum(EmployeesRegedReports)
              : "-"
          }
          color={Colors.green[5]}
        />
      </Col>
      <Col xs={24}>
        <Alert type="info" message={Words.colleagues} />
      </Col>
      {MyColleagues.length > 0 && (
        <Col xs={24}>
          {MyColleagues.map((colleague) => (
            <React.Fragment key={colleague.MemberID}>
              {colleague.CollaborationCount > 0 ? (
                <Space style={{ margin: 10 }}>
                  <Tooltip
                    title={
                      <Text style={{ color: Colors.white, fontSize: 12 }}>
                        {`${colleague.FirstName} ${colleague.LastName}`}
                      </Text>
                    }
                  >
                    <Badge
                      count={utils.farsiNum(`${colleague.CollaborationCount}`)}
                    >
                      <MemberProfileImage fileName={colleague.PicFileName} />
                    </Badge>
                  </Tooltip>
                </Space>
              ) : (
                <Tooltip
                  title={
                    <Text style={{ color: Colors.white, fontSize: 12 }}>
                      {`${colleague.FirstName} ${colleague.LastName}`}
                    </Text>
                  }
                >
                  <MemberProfileImage fileName={colleague.PicFileName} />
                </Tooltip>
              )}
            </React.Fragment>
          ))}
        </Col>
      )}
      <Col xs={24}>
        <Alert type="info" message={Words.task_supervisions} />
      </Col>
      <Col xs={12} lg={6}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="task-supervisions"
          inProgress={inProgress}
          title={Words.under_supervision_tasks}
          value={
            MyUnderSupervisionTasks > 0
              ? utils.farsiNum(MyUnderSupervisionTasks)
              : "-"
          }
          color={Colors.green[6]}
        />
      </Col>
      <Col xs={12} lg={6}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="task-supervisions"
          inProgress={inProgress}
          title={Words.finished_supervision_tasks}
          value={
            MyFinishedSupervisionTasks > 0
              ? utils.farsiNum(MyFinishedSupervisionTasks)
              : "-"
          }
          color={Colors.purple[4]}
        />
      </Col>
      <Col xs={12} lg={6}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="task-supervisions"
          inProgress={inProgress}
          title={Words.new_reports}
          value={
            MyUnreadSupervisionReports > 0
              ? utils.farsiNum(MyUnreadSupervisionReports)
              : "-"
          }
          color={Colors.red[5]}
        />
      </Col>
      <Col xs={12} lg={6}>
        <StatisticTile
          linkPrefix={link_prefix}
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.reged_reports}
          value={
            MyRegedSupervisionReports > 0
              ? utils.farsiNum(MyRegedSupervisionReports)
              : "-"
          }
          color={Colors.green[5]}
        />
      </Col>
    </Row>
  );
};

export default UserTasksDashboard;
