import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TimexDashboard from "../../components/app-modules/settings/timex/timex-dashboard";
import SecurityGuardsPage from "../../components/app-modules/settings/timex/security-guards-page";
import SecurityGuardRegedCardsPage from "../../components/app-modules/settings/timex/security-guard-reged-cards-page";
import VacationTypesPage from "../../components/app-modules/settings/timex/vacation-types-page";
import MissionTypesPage from "../../components/app-modules/settings/timex/mission-types-page";
import HolidaysPage from "../../components/app-modules/settings/timex/holidays-page";
import WorkShiftsPage from "../../components/app-modules/settings/timex/work-shifts-page";
import GroupShiftsPage from "../../components/app-modules/settings/timex/group-shifts-page";
import EmployeeShiftsPage from "../../components/app-modules/settings/timex/employee-shifts-page";
import RegedCardsPage from "../../components/app-modules/settings/timex/reged-cards-page";
//---

const modulePath = "settings/timex";

const BasicInfoRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={TimexDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/security-guards`}
        exact
        render={() => <SecurityGuardsPage pageName="SecurityGuards" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/security-guard-reged-cards`}
        exact
        render={() => (
          <SecurityGuardRegedCardsPage pageName="SecurityGuardRegedCards" />
        )}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/security-guards`}
        exact
        render={() => <SecurityGuardsPage pageName="SecurityGuards" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/vacation-types`}
        exact
        render={() => <VacationTypesPage pageName="VacationTypes" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/mission-types`}
        exact
        render={() => <MissionTypesPage pageName="MissionTypes" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/holidays`}
        exact
        render={() => <HolidaysPage pageName="Holidays" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/work-shifts`}
        exact
        render={() => <WorkShiftsPage pageName="WorkShifts" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/group-shifts`}
        exact
        render={() => <GroupShiftsPage pageName="GroupShifts" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/employee-shifts`}
        exact
        render={() => <EmployeeShiftsPage pageName="EmployeeShifts" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/reged-cards`}
        exact
        render={() => <RegedCardsPage pageName="RegedCards" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default BasicInfoRoutes;