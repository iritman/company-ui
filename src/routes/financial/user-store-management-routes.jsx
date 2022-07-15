import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import UserStoreManagementDashboard from "../../components/app-modules/financial/store-management/user-store-management-dashboard";
import UserStoresPage from "../../components/app-modules/financial/store-management/user-stores-page";
//---

const modulePath = "financial/store-mgr";

const UserStoreManagementRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={UserStoreManagementDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/stores`}
        exact
        render={() => <UserStoresPage pageName="user-Stores" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserStoreManagementRoutes;
