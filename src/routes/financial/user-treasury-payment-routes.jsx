import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TreasuryPaymentDashboard from "../../components/app-modules/financial/treasury/pay/treasury-payment-dashboard";
import PaymentRequestsPage from "../../components/app-modules/financial/treasury/pay/payment-requests-page";
//---

const modulePath = "financial/treasury/pay";

const UserTreasuryPaymentRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={TreasuryPaymentDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/payment-requests`}
        exact
        render={() => <PaymentRequestsPage pageName="PaymentRequests" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserTreasuryPaymentRoutes;
