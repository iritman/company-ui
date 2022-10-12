import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TreasuryBasicInfoDashboard from "../../components/app-modules/financial/treasury/basic-info/treasury-basic-info-dashboard";
import BankTypesPage from "../../components/app-modules/financial/treasury/basic-info/bank-types-page";
//---

const modulePath = "financial/treasury/basic";

const UserTreasuryBasicInfoRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={TreasuryBasicInfoDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/bank-types`}
        exact
        render={() => <BankTypesPage pageName="BankTypes" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserTreasuryBasicInfoRoutes;
