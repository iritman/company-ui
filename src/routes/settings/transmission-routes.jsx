import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TransmissionDashboard from "../../components/app-modules/settings/transmission/transmission-dashboard";
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
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default TransmissionRoutes;
