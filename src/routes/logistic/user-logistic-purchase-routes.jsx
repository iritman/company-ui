import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import PurchaseDashboard from "../../components/app-modules/logistic/purchase/logistic-purchase-dashboard";
import PurchaseRequestsPage from "../../components/app-modules/logistic/purchase/purchase-requests/purchase-requests-page";
import CallForPricesPage from "../../components/app-modules/logistic/purchase/call-for-prices/call-for-prices-page";
import InvoicesPage from "../../components/app-modules/logistic/purchase/invoices/invoices-page";
import PurchaseCommandsPage from "../../components/app-modules/logistic/purchase/commands/purchase-commands-page";
import PurchaseOrdersPage from "../../components/app-modules/logistic/purchase/orders/purchase-orders-page";
import PurchaseDeliveriesPage from "../../components/app-modules/logistic/purchase/deliveries/purchase-deliveries-page";
//---

const modulePath = "logistic/purchase";

const UserLogisticPurchaseRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={PurchaseDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/purchase-requests`}
        exact
        render={() => <PurchaseRequestsPage pageName="PurchaseRequests" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/call-for-prices`}
        exact
        render={() => <CallForPricesPage pageName="CallForPrices" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/invoices`}
        exact
        render={() => <InvoicesPage pageName="Invoices" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/purchase-commands`}
        exact
        render={() => <PurchaseCommandsPage pageName="PurchaseCommands" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/purchase-orders`}
        exact
        render={() => <PurchaseOrdersPage pageName="PurchaseOrders" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/purchase-deliveries`}
        exact
        render={() => <PurchaseDeliveriesPage pageName="PurchaseDeliveries" />}
      />

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserLogisticPurchaseRoutes;
