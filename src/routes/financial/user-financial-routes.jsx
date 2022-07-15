import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
import UserFinancialDashboard from "../../components/app-modules/financial/user-financial-dashboard";
import UserStoreManagementRoutes from "./user-store-management-routes";
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
        path={`${path}/financial/store-mgr`}
        render={() => <UserStoreManagementRoutes path={path} />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserFinancialRoutes;
