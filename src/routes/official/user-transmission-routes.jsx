import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import UserTransmissionDashboard from "../../components/app-modules/official/transmission/user-transmission-dashboard";
// import UserOrgChartPage from "../../components/app-modules/official/org/user-org-chart-page";
// import UserDutiesPage from "../../components/app-modules/official/org/user-duties-page";
// import UserMembersDutiesPage from "../../components/app-modules/official/org/user-members-duties-page";
//---

const modulePath = "official/transmission";

const UserTransmissionRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={UserTransmissionDashboard}
      />
      {/* <ProtectedRoute
        path={`${path}/${modulePath}/org-chart`}
        exact
        render={() => <UserOrgChartPage pageName="user-OrgChart" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/my-duties`}
        exact
        render={() => <UserDutiesPage pageName="user-Duties" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/members-duties`}
        exact
        render={() => <UserMembersDutiesPage pageName="user-MembersDuties" />}
      /> */}
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserTransmissionRoutes;
