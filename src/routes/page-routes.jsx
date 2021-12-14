import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainDashboard from "../pages/main-dashboard";
import OfficialDashboard from "../components/app-modules/officials/official-dashboard";
import OrgDashboard from "../components/app-modules/officials/org/org-dashboard";
import ProvincesPage from "../components/app-modules/officials/org/provinces-page";
import CitiesPage from "../components/app-modules/officials/org/cities-page";
import RolesPage from "../components/app-modules/officials/org/roles-page";
import DepartmentsPage from "../components/app-modules/officials/org/departments-page";
import CompaniesPage from "../components/app-modules/officials/org/companies-page";
import MembersPage from "../components/app-modules/officials/org/members-page";
import EmployeesPage from "../components/app-modules/officials/org/employees-page";
import CompanyAgentsPage from "../components/app-modules/officials/org/company-agents-page";
//---

const PageRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/official`}
        exact
        component={OfficialDashboard}
      />
      <ProtectedRoute
        path={`${path}/official/org`}
        exact
        component={OrgDashboard}
      />
      <ProtectedRoute
        path={`${path}/official/org/provinces`}
        exact
        render={() => <ProvincesPage pageName="Provinces" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/cities`}
        exact
        render={() => <CitiesPage pageName="Cities" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/roles`}
        exact
        render={() => <RolesPage pageName="Roles" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/departments`}
        exact
        render={() => <DepartmentsPage pageName="Departments" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/companies`}
        exact
        render={() => <CompaniesPage pageName="Companies" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/members`}
        exact
        render={() => <MembersPage pageName="Members" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/employees`}
        exact
        render={() => <EmployeesPage pageName="Employees" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/company-agents`}
        exact
        render={() => <CompanyAgentsPage pageName="CompanyAgents" />}
      />
      <ProtectedRoute path={`${path}/`} exact component={MainDashboard} />
    </Switch>
  );
};

export default PageRoutes;
