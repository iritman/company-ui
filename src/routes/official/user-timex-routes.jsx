import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import UserTimexDashboard from "../../components/app-modules/official/timex/user-timex-dashboard";
import UserSecurityGuardRegedCardsPage from "../../components/app-modules/official/timex/user-security-guard-reged-cards-page";
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
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserOrgRoutes;
