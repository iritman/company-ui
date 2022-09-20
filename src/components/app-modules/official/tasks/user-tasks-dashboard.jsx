import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col, Typography, Space, Checkbox } from "antd";
import service from "./../../../../services/dashboard/user-dashboard-service";
import { handleError } from "./../../../../tools/form-manager";
import Words from "./../../../../resources/words";
import ReloadButton from "../../../common/reload-button";
import PersonalStatistics from "./personal-statistics";
import DepartmentsTree from "./departments-tree";

const { Text } = Typography;

// const link_prefix = "/home/official/tasks";

const default_personal_statistics = {
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
};

const UserTasksDashboard = () => {
  const [inProgress, setInProgress] = useState(false);
  const [statistics, setStatistics] = useState(default_personal_statistics);
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

  const handleCalculateSubDepartmentsChange = (e) => {
    setCalculateSubDepartments(e.target.checked);
  };

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
            <DepartmentsTree
              departments={departments}
              departmentID={departmentID}
              selectedDepartment={selectedDepartment}
              onChange={handleSelectedDepartmentChange}
            />
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
      {selectedDepartment === 0 && (
        <PersonalStatistics statistics={statistics} inProgress={inProgress} />
      )}
    </Row>
  );
};

export default UserTasksDashboard;
