import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TransmissionDashboard from "../../components/app-modules/settings/transmission/transmission-dashboard";
import VehicleTypesPage from "../../components/app-modules/settings/transmission/vehicle-types-page";
//---

const modulePath = "settings/transmission";

const TransmissionRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={TransmissionDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/vehicle-types`}
        exact
        render={() => <VehicleTypesPage pageName="VehicleTypes" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default TransmissionRoutes;
