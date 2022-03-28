import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import UserTimexDashboard from "../../components/app-modules/official/timex/user-timex-dashboard";
import UserSecurityGuardRegedCardsPage from "../../components/app-modules/official/timex/user-security-guard-reged-cards-page";
import UserMyRegedCardsPage from "../../components/app-modules/official/timex/user-my-reged-cards-page";
import UserMyWorkShiftsPage from "../../components/app-modules/official/timex/user-my-work-shifts-page";
import UserMyVacationsPage from "../../components/app-modules/official/timex/user-my-vacations-page";
import UserMyMissionsPage from "../../components/app-modules/official/timex/user-my-missions-page";
import UserVacationReplaceWorkRequestsPage from "../../components/app-modules/official/timex/user-vacation-replace-work-requests-page";
import UserMissionReplaceWorkRequestsPage from "../../components/app-modules/official/timex/user-mission-replace-work-requests-page";
//---
import UserMembersRegedCardsPage from "../../components/app-modules/official/timex/user-members-reged-cards-page";
import UserMembersWorkShiftsPage from "../../components/app-modules/official/timex/user-members-work-shifts-page";
import UserMembersNewVacationsCheckManagerPage from "../../components/app-modules/official/timex/user-members-new-vacations-check-manager-page";
import UserMembersNewVacationsCheckOfficialPage from "../../components/app-modules/official/timex/user-members-new-vacations-check-official-page";
import UserMembersVacationsPage from "../../components/app-modules/official/timex/user-members-vacations-page";
import UserMembersNewMissionsCheckManagerPage from "../../components/app-modules/official/timex/user-members-new-missions-check-manager-page";
import UserMembersNewMissionsCheckOfficialPage from "../../components/app-modules/official/timex/user-members-new-missions-check-official-page";
import UserMembersMissionsPage from "../../components/app-modules/official/timex/user-members-missions-page";
import UserMembersMissionNewReportsPage from "../../components/app-modules/official/timex/user-members-mission-new-reports-page";
import UserMembersExtraWorkRequestsPage from "../../components/app-modules/official/timex/user-members-extra-work-requests-page";
import UserOfficialCheckExtraWorkRequestsPage from "../../components/app-modules/official/timex/user-official-check-extra-work-requests-page";
import UserOfficialCheckRegedCardsPage from "../../components/app-modules/official/timex/user-official-check-reged-cards-page";
import UserOfficialNoAlternativeEmployeesPage from "../../components/app-modules/official/timex/user-official-check-no-alternative-employees-page";
import UserOfficialCheckMembersVacationsPage from "../../components/app-modules/official/timex/user-official-check-members-vacations-page";
//---

const modulePath = "official/timex";

const UserOrgRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={UserTimexDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/security-guard-reged-cards`}
        exact
        render={() => (
          <UserSecurityGuardRegedCardsPage pageName="user-SecurityGuardRegedCards" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/my-reged-cards`}
        exact
        render={() => <UserMyRegedCardsPage pageName="user-MyRegedCards" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/my-work-shifts`}
        exact
        render={() => <UserMyWorkShiftsPage pageName="user-MyWorkShifts" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/my-vacations`}
        exact
        render={() => <UserMyVacationsPage pageName="user-MyVacations" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/my-missions`}
        exact
        render={() => <UserMyMissionsPage pageName="user-MyMissions" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/vacation-replace-work-requests`}
        exact
        render={() => (
          <UserVacationReplaceWorkRequestsPage pageName="user-VacationReplaceWorkRequests" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/mission-replace-work-requests`}
        exact
        render={() => (
          <UserMissionReplaceWorkRequestsPage pageName="user-MissionReplaceWorkRequests" />
        )}
      />
      {/* --- */}
      <ProtectedRoute
        path={`${path}/${modulePath}/members-reged-cards`}
        exact
        render={() => (
          <UserMembersRegedCardsPage pageName="user-MembersRegedCards" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/members-work-shifts`}
        exact
        render={() => (
          <UserMembersWorkShiftsPage pageName="user-MembersWorkShifts" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/members-new-vacations-check-manager`}
        exact
        render={() => (
          <UserMembersNewVacationsCheckManagerPage pageName="user-MembersNewVacationsCheckManager" />
        )}
      />

      <ProtectedRoute
        path={`${path}/${modulePath}/members-new-vacations-check-official`}
        exact
        render={() => (
          <UserMembersNewVacationsCheckOfficialPage pageName="user-MembersNewVacationsCheckOfficial" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/members-vacations`}
        exact
        render={() => (
          <UserMembersVacationsPage pageName="user-MembersVacations" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/members-new-missions-check-manager`}
        exact
        render={() => (
          <UserMembersNewMissionsCheckManagerPage pageName="user-MembersNewMissionsCheckManager" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/members-new-missions-check-official`}
        exact
        render={() => (
          <UserMembersNewMissionsCheckOfficialPage pageName="user-MembersNewMissionsCheckOfficial" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/members-missions`}
        exact
        render={() => (
          <UserMembersMissionsPage pageName="user-MembersMissions" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/members-new-mission-reports`}
        exact
        render={() => (
          <UserMembersMissionNewReportsPage pageName="user-MembersNewMissionReports" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/members-extra-work-requests`}
        exact
        render={() => (
          <UserMembersExtraWorkRequestsPage pageName="user-MembersExtraWorkRequests" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/official-check-extra-work-requests`}
        exact
        render={() => (
          <UserOfficialCheckExtraWorkRequestsPage pageName="user-OfficialCheckExtraWorkRequests" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/official-check-reged-cards`}
        exact
        render={() => (
          <UserOfficialCheckRegedCardsPage pageName="user-OfficialCheckRegedCards" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/official-check-no-alternative-employees`}
        exact
        render={() => (
          <UserOfficialNoAlternativeEmployeesPage pageName="user-OfficialCheckNoAlternativeEmployees" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/official-check-members-vacations`}
        exact
        render={() => (
          <UserOfficialCheckMembersVacationsPage pageName="user-OfficialCheckMembersVacations" />
        )}
      />
      {/* --- */}
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserOrgRoutes;
