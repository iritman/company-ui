import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainMenu from "../components/menus/main-menu";
import OfficialMenu from "../components/menus/official-menu";
//---

const MenuRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/official`}
        exact
        component={OfficialMenu}
      />
      <ProtectedRoute path={`${path}/`} exact component={MainMenu} />
    </Switch>
  );
};

export default MenuRoutes;
