import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
import UserFinancialDashboard from "../../components/app-modules/financial/user-financial-dashboard";
import UserPublicSettingsRoutes from "./user-public-settings-routes";
import UserStoreManagementRoutes from "./user-store-management-routes";
import UserAccountsRoutes from "./user-accounts-routes";
//---

const UserFinancialRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/financial`}
        exact
        component={UserFinancialDashboard}
      />
      <ProtectedRoute
        path={`${path}/financial/public-settings`}
        render={() => <UserPublicSettingsRoutes path={path} />}
      />
      <ProtectedRoute
        path={`${path}/financial/store-mgr`}
        render={() => <UserStoreManagementRoutes path={path} />}
      />
      <ProtectedRoute
        path={`${path}/financial/accounts`}
        render={() => <UserAccountsRoutes path={path} />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserFinancialRoutes;
