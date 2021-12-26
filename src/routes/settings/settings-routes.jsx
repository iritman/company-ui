import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
import SettingsDashboard from "../../components/app-modules/settings/settings-dashboard";
//---
import SettingsBasicInfoRoutes from "./settings-basic-info-routes";
import SettingsTimexRoutes from "./settings-timex-routes";
//---

const SettingsRoute = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/settings`}
        exact
        component={SettingsDashboard}
      />
      <ProtectedRoute
        path={`${path}/settings/basic-info`}
        render={() => <SettingsBasicInfoRoutes path={path} />}
      />
      <ProtectedRoute
        path={`${path}/settings/timex`}
        render={() => <SettingsTimexRoutes path={path} />}
      />
    </Switch>
  );
};

export default SettingsRoute;
