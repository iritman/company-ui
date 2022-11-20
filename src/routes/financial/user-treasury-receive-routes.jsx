import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TreasuryBasicInfoDashboard from "../../components/app-modules/financial/treasury/receive/treasury-receive-dashboard";
import ReceiveRequestsPage from "../../components/app-modules/financial/treasury/receive/receive-requests-page";
import ReceiveReceiptsPage from "../../components/app-modules/financial/treasury/receive/receive-receipts-page";
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
      <ProtectedRoute
        path={`${path}/${modulePath}/receive-receipts`}
        exact
        render={() => <ReceiveReceiptsPage pageName="ReceiveReceipts" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserTreasuryReceiveRoutes;
