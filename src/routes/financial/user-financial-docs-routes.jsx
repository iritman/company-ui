import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import FinancialDocsDashboard from "../../components/app-modules/financial/financial-docs/financial-docs-dashboard";
import VouchersPage from "../../components/app-modules/financial/financial-docs/vouchers/vouchers-page";
//---

const modulePath = "financial/docs";

const UserFinancialDocsRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={FinancialDocsDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/vouchers`}
        exact
        render={() => <VouchersPage pageName="Vouchers" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserFinancialDocsRoutes;
