import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TreasuryCollectorAgentDashboard from "../../components/app-modules/financial/treasury/collector-agent/treasury-collector-agent-dashboard";
import CollectorAgentsPage from "../../components/app-modules/financial/treasury/collector-agent/collector-agents-page";
import TransferToCollectorAgentsPage from "../../components/app-modules/financial/treasury/collector-agent/transfer-to-collector-agents-page";
//---

const modulePath = "financial/treasury/collector-agent";

const UserTreasuryReceiveRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={TreasuryCollectorAgentDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/collector-agents`}
        exact
        render={() => <CollectorAgentsPage pageName="CollectorAgents" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/transfer-to-collector-agents`}
        exact
        render={() => (
          <TransferToCollectorAgentsPage pageName="TransferToCollectorAgents" />
        )}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserTreasuryReceiveRoutes;
