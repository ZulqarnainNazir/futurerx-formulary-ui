import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "../components/home/Home";
import MemberProfile from "../components/MemberProfile/MemberProfile";
import FrxGridContainer from "../components/shared/FrxGrid/FrxGridContainer";
import FrxChart from "../components/shared/FrxChart/FrxChart";
import Static from "../components/static/Static";
import ClaimsGrid from "../components/ClaimsGrid/ClaimsGrid";
import NavBar from "../../src/components/navigation-bar/NavBar";
import CallListDetails from "../components/communication/CallListDetails";
import PieChart from "../components/shapes/PieChart";

import LocationSearch from "../components/user-details/location-search/LocationSearch";
import DialogPopup from "../components/shared/FrxDialogPopup/FrxDialogPopup";
import PAInfo from "../components/formulary/Components/pa-info/PAInfo";
import DrugDetails from "../components/formulary/Components/drug-details/DrugDetails";
import paInfoObject from "../mocks/PaInfoMock";
import PrescriberProfile from "../components/prescriber/PrescriberProfile/PrescriberProfile";
import PharmacyProfile from "../components/PharmacyProfile/PharmacyProfileInfo/PharmacyProfile";
import AdvancedSearch from "../components/AdvancedSearch/AdvancdSearch";
import Formulary from "../components/NewFormulary/NewFormulary";
import EntityOwnershipContainer from "../components/NewFormulary/EntityOwnership/EntityOwnershipContainer";
import PlanInformation from "../components/NewFormulary/EntityOwnership/PlanInformation/PlanInformation";
import PlanInformationConfiguration from "../components/NewFormulary/EntityOwnership/PlanIfonmationConfiguaration/PlanInformationConfiguration";
import SetupFormularyGrid from "../components/SetupFormularyGrid/SetupFormularyGrid";
import MassMaintenanceTier from "../components/NewFormulary/MassMaintenance/configure/MassMaintenanceTier";

class MainRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/" render={(props) => <Formulary {...props} />} />
          <Route
            exact
            path="/entityownership"
            render={(props) => <EntityOwnershipContainer {...props} />}
          />
          {/* <Route
            exact
            path="/planinformation"
            render={(props) => <PlanInformation {...props} /> }
          /> */}
          <Route
            exact
            path="/prescriber"
            render={(props) => <PrescriberProfile {...props} />}
          />
          <Route
            exact
            path="/planinformationconfig"
            render={(props) => <PlanInformationConfiguration {...props} />}
          />
          

          <Route
            exact
            path="/prescriber"
            render={(props) => <PrescriberProfile {...props} />}
          />
          <Route
            exact
            path="/pharmacy-profile"
            render={(props) => <PharmacyProfile {...props} />}
          />
          <Route
            exact
            path="/:path"
            render={(props) => <MemberProfile {...props} />}
          />
          <Route exact path="/home" render={(props) => <Home {...props} />} />

          <Route exact path="/home" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/dashboard"
            render={(props) => <MemberProfile {...props} />}
          />
          <Route
            exact
            path="/grid"
            render={(props) => <ClaimsGrid isPaid={false} {...props} />}
          />
          <Route path="/demo">
            <FrxChart
              onSelectStatItem={() => {}}
              data={{
                january: [
                  {
                    key: "paid",
                    value: 20,
                  },
                  {
                    key: "rejected",
                    value: 6,
                  },
                ],
                feburary: [
                  {
                    key: "paid",
                    value: 12,
                  },
                  {
                    key: "rejected",
                    value: 4,
                  },
                ],
                march: [
                  {
                    key: "paid",
                    value: 30,
                  },
                  {
                    key: "rejected",
                    value: 6,
                  },
                ],
                april: [
                  {
                    key: "paid",
                    value: 10,
                  },
                  {
                    key: "rejected",
                    value: 2,
                  },
                ],
                may: [
                  {
                    key: "paid",
                    value: 20,
                  },
                  {
                    key: "rejected",
                    value: 4,
                  },
                ],
                june: [
                  {
                    key: "paid",
                    value: 3,
                  },
                  {
                    key: "rejected",
                    value: 7,
                  },
                ],
                july: [
                  {
                    key: "paid",
                    value: 5,
                  },
                  {
                    key: "rejected",
                    value: 5,
                  },
                ],
                august: [
                  {
                    key: "paid",
                    value: 11,
                  },
                  {
                    key: "rejected",
                    value: 9,
                  },
                ],
                september: [
                  {
                    key: "paid",
                    value: 0,
                  },
                  {
                    key: "rejected",
                    value: 0,
                  },
                ],
                october: [
                  {
                    key: "paid",
                    value: 0,
                  },
                  {
                    key: "rejected",
                    value: 0,
                  },
                ],
                november: [
                  {
                    key: "paid",
                    value: 0,
                  },
                  {
                    key: "rejected",
                    value: 0,
                  },
                ],
                december: [
                  {
                    key: "paid",
                    value: 0,
                  },
                  {
                    key: "rejected",
                    value: 0,
                  },
                ],
              }}
            />
          </Route>
          <Route
            exact
            path="/static"
            render={(props) => <Static {...props} />}
          />
          <Route
            exact
            path="/static"
            render={(props) => <Static {...props} />}
          />
          <Route
            exact
            path="/static"
            render={(props) => <Static {...props} />}
          />
          <Route
            exact
            path="/search/:type"
            render={(props) => <AdvancedSearch {...props} />}
          ></Route>
          <Route
            exact
            path="/setup/formularyGrid"
            render={(props) => <SetupFormularyGrid {...props} />}
          ></Route>

          {/* <Route
            exact
            path="/pie"
            render={props => (
              <PieChart {...props} data={[56, 12, 78]} total={3} />
            )}
          /> */}
          {/* <Route
            exact
            path="/location-search"
            render={() => <LocationSearch />}
          /> */}
          {/* <Route exact path="/drug-details" render={() => <DrugDetails />} /> */}
          {/* <Route exact path="/pa-info" render={() => <PAInfo />} /> */}
        </Switch>
      </React.Fragment>
    );
  }
}

export default MainRouter;
