import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import UserEDocsDashboard from "../../components/app-modules/official/edocs/user-edocs-dashboard";
import UserFolderGroupsPage from "../../components/app-modules/official/edocs/user-folder-groups-page";
import UserFoldersPage from "../../components/app-modules/official/edocs/user-folders-page";
//---

const modulePath = "official/edocs";

const UserOrgRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={UserEDocsDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/user-folder-groups`}
        exact
        render={() => <UserFolderGroupsPage pageName="user-FolderGroups" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/user-folders`}
        exact
        render={() => <UserFoldersPage pageName="user-Folders" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserOrgRoutes;
