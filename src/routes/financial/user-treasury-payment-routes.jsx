import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TreasuryPaymentDashboard from "../../components/app-modules/financial/treasury/pay/treasury-payment-dashboard";
import PaymentRequestsPage from "../../components/app-modules/financial/treasury/pay/payment-request/payment-requests-page";
import PaymentOrdersPage from "../../components/app-modules/financial/treasury/pay/payment-order/payment-orders-page";
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
      <ProtectedRoute
        path={`${path}/${modulePath}/payment-orders`}
        exact
        render={() => <PaymentOrdersPage pageName="PaymentOrders" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserTreasuryPaymentRoutes;
