import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TreasuryBasicInfoDashboard from "../../components/app-modules/financial/treasury/receive/treasury-receive-dashboard";
import ReceiveRequestsPage from "../../components/app-modules/financial/treasury/receive/receive-requests-page";
//---

const modulePath = "financial/treasury/receive";

const UserTreasuryReceiveRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={TreasuryBasicInfoDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/receive-requests`}
        exact
        render={() => <ReceiveRequestsPage pageName="ReceiveRequests" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserTreasuryReceiveRoutes;
