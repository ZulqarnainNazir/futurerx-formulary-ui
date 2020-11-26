import React, {Component} from "react";
import {Card, CardHeader, CardContent, Grid, Button} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import BreadCrumPanel from "./components/BreadCrumPanel";
import {entityOwnershipData} from "./EnitityOwnershipMockData/MockDataForEntity";
import PlanInformationConfiguration from "./PlanIfonmationConfiguaration/PlanInformationConfiguration";
import DialogPopup from "../../shared/FrxDialogPopup/FrxDialogPopup";
import CustomDatePicker from "./components/CustomDatePicker";

import "./EntityOwnershipContainer.scss";

interface Props {}
interface State {}

class EntityOwnershipContainer extends Component<Props, State> {
  state = {
    arrowIconState: false,
    checked: false,
    data: entityOwnershipData(),
    breadCrumbStatus: {},
    effectiveDate: "",
  };

  onHandleIcons = () => {
    this.setState({arrowIconState: !this.state.arrowIconState});
  };
  handleChange = () => {
    this.setState({checked: !this.state.checked});
  };

  handleEffectiveDate = (date) => {
    this.setState({effectiveDate: date});
  };

  render() {
    const entityData = Object.values(this.state.data);

    return (
      <div className="EntityOwnershipContainer">
        <Card className="entityOwnerShip-card">
          <CardHeader
            className="card-header"
            title="FORMULARY WITH ADJUDICATION"
          >
            {/* FORMULARY WITH ADJUDICATION */}
          </CardHeader>
          <CardContent className="card-container">
            <Grid
              container
              justify="space-between"
              className="grid-info-container"
            >
              <span className="info-tag">
                *Grey stars indicate this formulary is set as the default.
              </span>
              <span className="collapse-label">Collapse All</span>
            </Grid>

            <div className="entity-data-container">
              {entityData.map((entity, ind) => (
                <>
                  <BreadCrumPanel label={"customer"} value={entity.owner} />

                  <div
                    // style={{marginLeft: "22px"}}
                    className="breadcrum-data client-info"
                  >
                    <BreadCrumPanel label={"client"} value={entity.client} />
                    <div
                      // style={{marginLeft: "22px"}}
                      className="breadcrum-data carrier-info"
                    >
                      <BreadCrumPanel
                        label={"Carrier"}
                        value={entity.carrier}
                      />
                      <div
                        // style={{marginLeft: "22px"}}
                        className="breadcrum-data account-info"
                      >
                        <BreadCrumPanel
                          label={"Account"}
                          value={entity.account}
                        />
                        <div
                          // style={{marginLeft: "22px"}}
                          className="breadcrum-data group-info"
                        >
                          {entity.groups.map((group, ind) => (
                            <>
                              <BreadCrumPanel
                                label={`Group  ${ind + 1}`}
                                value={group.id}
                              />
                              <div
                                className="breadcrum-data group-data-info"
                                // style={{marginLeft: "22px"}}
                              >
                                <Grid container className="data-list-container">
                                  {/* <Grid container item sm={4}> */}
                                  {group.list.map((li) => (
                                    // <div>
                                    <Grid item sm={3} className="data-list">
                                      <div>
                                        <Checkbox
                                          color="primary"
                                          className="checkbox1"
                                          size="small"
                                        />
                                        {/* <span className="list"> */}
                                        <span className="list">{li}</span>
                                        {/* </span> */}
                                      </div>
                                    </Grid>
                                    // </div>
                                  ))}
                                  {/* </Grid> */}
                                </Grid>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </CardContent>
          <div className="btn-group">
            <Button className="btn btn-cancel">Cancel</Button>
            <Button className="btn btn-save">Save</Button>
          </div>
        </Card>
        {<PlanInformationConfiguration />}

        <DialogPopup
          className="entity-diogPopup warning-popoup"
          open={false}
          positiveActionText="Yes, Override"
          negativeActionText="No, Cancel"
          title="WARNING"
          showCloseIcon
          showActions={true}
          handleClose={() => {}}
          handleAction={() => {}}
        >
          <div style={{minWidth: "600px", minHeight: "180px"}}>
            <p className="info-heading">
              Group has <span>Formulary 1 </span> currently set as default. Do
              you want to override?
            </p>
          </div>
        </DialogPopup>

        <DialogPopup
          className="entity-diogPopup effective-date-selection-popup"
          open={false}
          positiveActionText="Save"
          negativeActionText="Cancel"
          title="EFFECTIVE DATE"
          showCloseIcon
          showActions={true}
          handleClose={() => {}}
          handleAction={() => {}}
        >
          <div style={{minWidth: "600px", minHeight: "180px"}}>
            <p className="info-heading">
              Select the Effective Date for the override.
            </p>
            <CustomDatePicker
              className="date-select__input "
              onChange={this.handleEffectiveDate}
              value={this.state.effectiveDate}
              placeholder="Effective Date"
            />
          </div>
        </DialogPopup>
      </div>
    );
  }
}

export default EntityOwnershipContainer;
