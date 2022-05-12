import React, { useState } from "react";
import { useMount } from "react-use";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Typography,
  Alert,
  Badge,
  Card,
  Space,
  Statistic,
  Tooltip,
} from "antd";
// import {
//   CheckOutlined as DoneIcon,
//   ThunderboltOutlined as EventIcon,
//   ClockCircleOutlined as ClockIcon,
//   HourglassOutlined as WaitingIcon,
//   FileDoneOutlined as RegedReportIcon,
//   FileUnknownOutlined as UnreadReportIcon,
// } from "@ant-design/icons";
import service from "./../../../../services/dashboard/user-dashboard-service";
import { handleError } from "./../../../../tools/form-manager";
import utils from "./../../../../tools/utils";
import Words from "./../../../../resources/words";
import Colors from "./../../../../resources/colors";
import ReloadButton from "../../../common/reload-button";
import MemberProfileImage from "./../../../common/member-profile-image";

const { Text } = Typography;

const DashboardTile = (props) => {
  const { title, value, color, link, inProgress /*, icon */ } = props;

  const link_prefix = "/home/official/tasks";

  return (
    <Card loading={inProgress} hoverable style={{ height: "100%" }}>
      <Link to={`${link_prefix}/${link}`}>
        <Statistic
          title={title}
          value={value}
          valueStyle={{
            color,
          }}
          // prefix={icon}
        />
      </Link>
    </Card>
  );
};

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
      const data = await service.getTaskStatistics();

      setStatistics(data);
      // initStatistics();
    } catch (ex) {
      handleError(ex);
    }

    setInProgress(false);
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
      <Col xs={24}>
        <Alert type="info" message={Words.my_tasks} />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="my-tasks"
          inProgress={inProgress}
          title={Words.today_tasks}
          value={MyTodayTasks > 0 ? utils.farsiNum(MyTodayTasks) : "-"}
          color={Colors.green[6]}
          // icon={<WaitingIcon style={{ color: Colors.green[6] }} />}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="my-tasks"
          inProgress={inProgress}
          title={Words.tomorrow_tasks}
          value={MyTomorrowTasks > 0 ? utils.farsiNum(MyTomorrowTasks) : "-"}
          color={Colors.purple[6]}
          // icon={<ClockIcon style={{ color: Colors.purple[6] }} />}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="my-tasks"
          inProgress={inProgress}
          title={Words.delayed_tasks}
          value={MyDelayedTasks > 0 ? utils.farsiNum(MyDelayedTasks) : "-"}
          color={Colors.red[6]}
          // icon={<EventIcon style={{ color: Colors.red[6] }} />}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="my-done-tasks"
          inProgress={inProgress}
          title={Words.done_tasks}
          value={MyDoneTasks > 0 ? utils.farsiNum(MyDoneTasks) : "-"}
          color={Colors.blue[6]}
          // icon={<DoneIcon style={{ color: Colors.blue[6] }} />}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="my-tasks"
          inProgress={inProgress}
          title={Words.new_reports}
          value={MyUnreadReports > 0 ? utils.farsiNum(MyUnreadReports) : "-"}
          color={Colors.red[5]}
          // icon={<UnreadReportIcon style={{ color: Colors.red[5] }} />}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="my-tasks"
          inProgress={inProgress}
          title={Words.reged_reports}
          value={MyRegedReports > 0 ? utils.farsiNum(MyRegedReports) : "-"}
          color={Colors.green[5]}
          // icon={<RegedReportIcon style={{ color: Colors.green[5] }} />}
        />
      </Col>
      <Col xs={24}>
        <Alert type="info" message={Words.following} />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.today_tasks}
          value={
            EmployeesTodayTasks > 0 ? utils.farsiNum(EmployeesTodayTasks) : "-"
          }
          color={Colors.green[6]}
          // icon={<WaitingIcon style={{ color: Colors.green[6] }} />}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.tomorrow_tasks}
          value={
            EmployeesTomorrowTasks > 0
              ? utils.farsiNum(EmployeesTomorrowTasks)
              : "-"
          }
          color={Colors.purple[6]}
          // icon={<ClockIcon style={{ color: Colors.purple[6] }} />}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.delayed_tasks}
          value={
            EmployeesDelayedTasks > 0
              ? utils.farsiNum(EmployeesDelayedTasks)
              : "-"
          }
          color={Colors.red[6]}
          // icon={<EventIcon style={{ color: Colors.red[6] }} />}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.done_tasks}
          value={
            EmployeesDoneTasks > 0 ? utils.farsiNum(EmployeesDoneTasks) : "-"
          }
          color={Colors.blue[6]}
          // icon={<DoneIcon style={{ color: Colors.blue[6] }} />}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.new_reports}
          value={
            EmployeesUnreadReports > 0
              ? utils.farsiNum(EmployeesUnreadReports)
              : "-"
          }
          color={Colors.red[5]}
          // icon={<UnreadReportIcon style={{ color: Colors.red[5] }} />}
        />
      </Col>
      <Col xs={12} lg={4} md={8}>
        <DashboardTile
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.reged_reports}
          value={
            EmployeesRegedReports > 0
              ? utils.farsiNum(EmployeesRegedReports)
              : "-"
          }
          color={Colors.green[5]}
          // icon={<RegedReportIcon style={{ color: Colors.green[5] }} />}
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
        <DashboardTile
          link="task-supervisions"
          inProgress={inProgress}
          title={Words.under_supervision_tasks}
          value={
            MyUnderSupervisionTasks > 0
              ? utils.farsiNum(MyUnderSupervisionTasks)
              : "-"
          }
          color={Colors.green[6]}
          // icon={<ClockIcon style={{ color: Colors.green[6] }} />}
        />
      </Col>
      <Col xs={12} lg={6}>
        <DashboardTile
          link="task-supervisions"
          inProgress={inProgress}
          title={Words.finished_supervision_tasks}
          value={
            MyFinishedSupervisionTasks > 0
              ? utils.farsiNum(MyFinishedSupervisionTasks)
              : "-"
          }
          color={Colors.purple[4]}
          // icon={<EventIcon style={{ color: Colors.purple[4] }} />}
        />
      </Col>
      <Col xs={12} lg={6}>
        <DashboardTile
          link="task-supervisions"
          inProgress={inProgress}
          title={Words.new_reports}
          value={
            MyUnreadSupervisionReports > 0
              ? utils.farsiNum(MyUnreadSupervisionReports)
              : "-"
          }
          color={Colors.red[5]}
          // icon={<UnreadReportIcon style={{ color: Colors.red[5] }} />}
        />
      </Col>
      <Col xs={12} lg={6}>
        <DashboardTile
          link="employees-tasks"
          inProgress={inProgress}
          title={Words.reged_reports}
          value={
            MyRegedSupervisionReports > 0
              ? utils.farsiNum(MyRegedSupervisionReports)
              : "-"
          }
          color={Colors.green[5]}
          // icon={<RegedReportIcon style={{ color: Colors.green[5] }} />}
        />
      </Col>
    </Row>
  );
};

export default UserTasksDashboard;
