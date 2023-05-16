import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
import UserLogisticDashboard from "../../components/app-modules/logistic/user-logistic-dashboard";
import UserLogisticBasicInfoRoutes from "./user-logistic-basic-info-routes";
//---

const UserLogisticRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/logistic`}
        exact
        component={UserLogisticDashboard}
      />
      <ProtectedRoute
        path={`${path}/logistic/basic-info`}
        render={() => <UserLogisticBasicInfoRoutes path={path} />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserLogisticRoutes;
