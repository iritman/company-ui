import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import AccountsDashboard from "../../components/app-modules/financial/accounts/accounts-dashboard";
import TafsilTypesPage from "../../components/app-modules/financial/accounts/tafsil-types-page";
//---

const modulePath = "financial/accounts";

const UserPublicSettingsRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={AccountsDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/tafsil-types`}
        exact
        render={() => <TafsilTypesPage pageName="TafsilTypes" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserPublicSettingsRoutes;
