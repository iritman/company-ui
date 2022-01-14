import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import UserTimexDashboard from "../../components/app-modules/official/timex/user-timex-dashboard";
import UserSecurityGuardRegedCardsPage from "../../components/app-modules/official/timex/user-security-guard-reged-cards-page";
import UserMyRegedCardsPage from "../../components/app-modules/official/timex/user-my-reged-cards-page";
import UserMyWorkShiftsPage from "../../components/app-modules/official/timex/user-my-work-shifts-page";
//---
import UserMembersRegedCardsPage from "../../components/app-modules/official/timex/user-members-reged-cards-page";
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
      {/* --- */}
      <ProtectedRoute
        path={`${path}/${modulePath}/members-reged-cards`}
        exact
        render={() => (
          <UserMembersRegedCardsPage pageName="user-MembersRegedCards" />
        )}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserOrgRoutes;
