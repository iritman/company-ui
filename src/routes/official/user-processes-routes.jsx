import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import UserProcessesDashboard from "../../components/app-modules/official/processes/user-processes-dashboard";
import UserDismissalsPage from "../../components/app-modules/official/processes/dismissals/user-dismissals-page";
import UserOfficialCheckDismissalsPage from "../../components/app-modules/official/processes/dismissals/user-official-check-dismissals-page";
// import UserDutiesPage from "../../components/app-modules/official/org/user-duties-page";
// import UserMembersDutiesPage from "../../components/app-modules/official/org/user-members-duties-page";
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

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserOrgRoutes;
