import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import UserStoreManagementDashboard from "../../components/app-modules/financial/store-management/user-store-management-dashboard";
import UserStoresPage from "../../components/app-modules/financial/store-management/user-stores-page";
import UserProductNaturesPage from "../../components/app-modules/financial/store-management/user-product-natures-page";
import UserMeasureTypesPage from "../../components/app-modules/financial/store-management/user-measure-types-page";
import UserMeasureUnitsPage from "../../components/app-modules/financial/store-management/user-measure-units-page";
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
        path={`${path}/${modulePath}/user-stores`}
        exact
        render={() => <UserStoresPage pageName="user-Stores" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/user-product-natures`}
        exact
        render={() => <UserProductNaturesPage pageName="user-ProductNatures" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/user-measure-types`}
        exact
        render={() => <UserMeasureTypesPage pageName="user-MeasureTypes" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/user-measure-units`}
        exact
        render={() => <UserMeasureUnitsPage pageName="user-MeasureUnits" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserStoreManagementRoutes;
