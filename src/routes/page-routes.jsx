import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainDashboard from "../pages/main-dashboard";
import OfficialDashboard from "../components/app-modules/officials/official-dashboard";
import OrgDashboard from "../components/app-modules/officials/org/org-dashboard";
import ProvincesPage from "../components/app-modules/officials/org/provinces-page";
//---

const PageRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/official`}
        exact
        component={OfficialDashboard}
      />
      <ProtectedRoute
        path={`${path}/official/org`}
        exact
        component={OrgDashboard}
      />
      <ProtectedRoute
        path={`${path}/official/org/provinces`}
        exact
        render={() => <ProvincesPage pageName="Provinces" />}
      />
      <ProtectedRoute path={`${path}/`} exact component={MainDashboard} />
    </Switch>
  );
};

export default PageRoutes;
