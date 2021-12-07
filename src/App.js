import React from "react";
import "./styles/App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/protected-route";
import LoginPage from "./pages/login-page";
import LogoutPage from "./pages/logout-page";
import DashboardPage from "./pages/dashboard-page";
import NotFoundPage from "./pages/not-found-page";

const App = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/logout" component={LogoutPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <Redirect from="/" exact to="/dashboard" />
      <Route path="/not-found" component={NotFoundPage} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default App;
