import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import UserProcessesDashboard from "../../components/app-modules/official/processes/user-processes-dashboard";
import UserDismissalsPage from "../../components/app-modules/official/processes/dismissals/user-dismissals-page";
import UserOfficialCheckDismissalsPage from "../../components/app-modules/official/processes/dismissals/user-official-check-dismissals-page";
import UserEduFundsPage from "../../components/app-modules/official/processes/edu-funds/user-edu-funds-page";
import UserOfficialCheckEduFundsPage from "../../components/app-modules/official/processes/edu-funds/user-official-check-edu-funds-page";
import UserViolationsPage from "../../components/app-modules/official/processes/violations/user-violations-page";
import UserOfficialCheckViolationsPage from "../../components/app-modules/official/processes/violations/user-official-check-violations-page";
import UserViolationAnnouncesPage from "../../components/app-modules/official/processes/violations/user-violation-announces-page";
import UserDepartmentViolationResponsesPage from "../../components/app-modules/official/processes/violations/user-department-violation-responses-page";
import UserMyViolationResponsesPage from "../../components/app-modules/official/processes/violations/user-my-violation-responses-page";
import UserOfficialCheckCheckoutsPage from "../../components/app-modules/official/processes/checkouts/user-official-check-checkouts-page";
import UserDepartmentCheckoutsPage from "../../components/app-modules/official/processes/checkouts/user-department-checkouts-page";
import UserInformaticCheckoutsPage from "../../components/app-modules/official/processes/checkouts/user-informatic-checkouts-page";
import UserStoreCheckoutsPage from "../../components/app-modules/official/processes/checkouts/user-store-checkouts-page";
import UserFinancialCheckoutsPage from "../../components/app-modules/official/processes/checkouts/user-financial-checkouts-page";
//---

const modulePath = "official/processes";

const UserOrgRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={UserProcessesDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/dismissals`}
        exact
        render={() => <UserDismissalsPage pageName="user-Dismissals" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/dismissals-check-official`}
        exact
        render={() => (
          <UserOfficialCheckDismissalsPage pageName="user-DismissalsCheckOfficial" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/edu-funds`}
        exact
        render={() => <UserEduFundsPage pageName="user-EduFunds" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/edu-funds-check-official`}
        exact
        render={() => (
          <UserOfficialCheckEduFundsPage pageName="user-EduFundsCheckOfficial" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/violations`}
        exact
        render={() => <UserViolationsPage pageName="user-Violations" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/violations-check-official`}
        exact
        render={() => (
          <UserOfficialCheckViolationsPage pageName="user-ViolationsCheckOfficial" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/my-violation-announces`}
        exact
        render={() => (
          <UserViolationAnnouncesPage pageName="user-MyViolationAnnounces" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/department-violation-responses`}
        exact
        render={() => (
          <UserDepartmentViolationResponsesPage pageName="user-DepartmentViolationResponses" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/my-violation-responses`}
        exact
        render={() => (
          <UserMyViolationResponsesPage pageName="user-MyViolationResponses" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/checkouts-check-official`}
        exact
        render={() => (
          <UserOfficialCheckCheckoutsPage pageName="user-CheckoutsCheckOfficial" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/department-checkouts`}
        exact
        render={() => (
          <UserDepartmentCheckoutsPage pageName="user-DepartmentCheckouts" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/informatic-checkouts`}
        exact
        render={() => (
          <UserInformaticCheckoutsPage pageName="user-InformaticCheckouts" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/store-checkouts`}
        exact
        render={() => <UserStoreCheckoutsPage pageName="user-StoreCheckouts" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/financial-checkouts`}
        exact
        render={() => (
          <UserFinancialCheckoutsPage pageName="user-FinancialCheckouts" />
        )}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserOrgRoutes;
