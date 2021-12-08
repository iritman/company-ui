import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainDashboard from "../pages/main-dashboard";
import OfficialDashboard from "../components/app-modules/officials/official-dashboard";
//---

const DashboardRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/cat/official`}
        exact
        component={OfficialDashboard}
      />
      <ProtectedRoute path={`${path}/`} exact component={MainDashboard} />
    </Switch>
  );
};

export default DashboardRoutes;
