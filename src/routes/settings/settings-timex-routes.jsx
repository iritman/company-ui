import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TimexSettingsDashboard from "../../components/app-modules/settings/timex-settings/timex-settings-dashboard";
import SecurityGuardsPage from "../../components/app-modules/settings/timex-settings/security-guards-page";
//---

const modulePath = "settings/timex";

const SettingsBasicInfoRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={TimexSettingsDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/security-guards`}
        exact
        render={() => <SecurityGuardsPage pageName="SecurityGuards" />}
      />
    </Switch>
  );
};

export default SettingsBasicInfoRoutes;
