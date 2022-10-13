import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TreasuryBasicInfoDashboard from "../../components/app-modules/financial/treasury/basic-info/treasury-basic-info-dashboard";
import BankTypesPage from "../../components/app-modules/financial/treasury/basic-info/bank-types-page";
import BanksPage from "../../components/app-modules/financial/treasury/basic-info/banks-page";
import BankAccountTypesPage from "../../components/app-modules/financial/treasury/basic-info/bank-account-types-page";
import BankBranchesPage from "../../components/app-modules/financial/treasury/basic-info/bank-branches-page";
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
      <ProtectedRoute
        path={`${path}/${modulePath}/banks`}
        exact
        render={() => <BanksPage pageName="Banks" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/bank-account-types`}
        exact
        render={() => <BankAccountTypesPage pageName="BankAccountTypes" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/bank-branches`}
        exact
        render={() => <BankBranchesPage pageName="BankBranches" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserTreasuryBasicInfoRoutes;
