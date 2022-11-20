import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TreasuryCollectorAgentDashboard from "../../components/app-modules/financial/treasury/collector-agent/treasury-collector-agent-dashboard";
import CollectorAgentsPage from "../../components/app-modules/financial/treasury/collector-agent/collector-agents-page";
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
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserTreasuryReceiveRoutes;
