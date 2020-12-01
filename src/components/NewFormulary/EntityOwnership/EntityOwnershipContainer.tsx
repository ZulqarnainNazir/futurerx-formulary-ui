import React, {Component} from "react";
import {Card, CardHeader, CardContent, Grid, Button} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import BreadCrumPanel from "./components/BreadCrumPanel";
import {
  entityOwnershipData,
  entityOwnershipData1,
} from "./EnitityOwnershipMockData/MockDataForEntity";
import PlanInformationConfiguration from "./PlanIfonmationConfiguaration/PlanInformationConfiguration";
import PlanInformation from "./PlanInformation/PlanInformation";
import DialogPopup from "../../shared/FrxDialogPopup/FrxDialogPopup";
import CustomDatePicker from "./components/CustomDatePicker";
import {Link} from "react-router-dom";

import "./EntityOwnershipContainer.scss";

interface Props {}
interface State {}

class EntityOwnershipContainer extends Component<Props, State> {
  state = {
    arrowIconState: false,
    isAllCollaps: false,
    data: entityOwnershipData1(), // entityOwnershipData(),
    breadCrumbStatus: {},
    effectiveDate: "",
    isPlanInfoCardShown: false,
    isPlanConfigCardShow: false,
  };

  onHandleIcons = () => {
    this.setState({arrowIconState: !this.state.arrowIconState});
  };
  onHandleCollaps = () => {
    this.setState({isAllCollaps: !this.state.isAllCollaps});
  };

  onHandleCheckboxlist = (e, list) => {
    console.log("[list]:", list);
  };
  handleEffectiveDate = (date) => {
    this.setState({effectiveDate: date});
  };

  onSavePlanInfoCard = () => {
    this.setState({isPlanInfoCardShown: true});
  };
  onCancelPlanInfoCard = () => {
    this.setState({isPlanInfoCardShown: false});
  };

  onPlanConfig = () => {
    this.setState({isPlanConfigCardShow: true});
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
              <span className="collapse-label" onClick={this.onHandleCollaps}>
                Collapse All
              </span>
            </Grid>

            <div className="entity-data-container">
              {entityData.map((entity, ind) => (
                <>
                  <BreadCrumPanel
                    label={"customer"}
                    value={entity.owner.value}
                    checked={true}
                    collaps={this.state.isAllCollaps}
                    isDefault={entity.owner.default}
                  >
                    <div
                      // style={{marginLeft: "22px"}}
                      className="breadcrum-data client-info"
                    >
                      <BreadCrumPanel
                        label={"client"}
                        value={entity.client.value}
                        checked={true}
                        isDefault={entity.client.default}
                      >
                        <div
                          // style={{marginLeft: "22px"}}
                          className="breadcrum-data carrier-info"
                        >
                          <BreadCrumPanel
                            label={"Carrier"}
                            value={entity.carrier.value}
                            checked={true}
                            isDefault={entity.carrier.default}
                          >
                            <div
                              // style={{marginLeft: "22px"}}
                              className="breadcrum-data account-info"
                            >
                              <BreadCrumPanel
                                label={"Account"}
                                value={entity.account.value}
                                checked={true}
                                isDefault={entity.account.default}
                              >
                                <div
                                  // style={{marginLeft: "22px"}}
                                  className="breadcrum-data group-info"
                                >
                                  {entity.groups.map((group, ind) => (
                                    <>
                                      <BreadCrumPanel
                                        label={`Group  ${ind + 1}`}
                                        value={group.id}
                                        checked={true}
                                        isDefault={group.default}
                                      >
                                        <div
                                          className="breadcrum-data group-data-info"
                                          // style={{marginLeft: "22px"}}
                                        >
                                          <Grid
                                            container
                                            className="data-list-container"
                                            // justify="space-between"
                                          >
                                            {/* <Grid container item sm={4}> */}
                                            {group.list.map((li) => (
                                              // <div>
                                              // <Grid item sm={3} className="data-list">
                                              <div
                                                style={{
                                                  minWidth: "250px",
                                                  // marginLeft: "2rem",
                                                }}
                                              >
                                                <Checkbox
                                                  color="primary"
                                                  className="checkbox1"
                                                  size="small"
                                                  onChange={(e) =>
                                                    this.onHandleCheckboxlist(
                                                      e,
                                                      li
                                                    )
                                                  }
                                                />
                                                {/* <span className="list"> */}
                                                <span
                                                  className="list"
                                                  style={{
                                                    display: "inline-block",
                                                    maxWidth: "210px",
                                                    // textAlign:"center"
                                                    // minHeight: "50px",
                                                    // border: "1px solid red",
                                                  }}
                                                >
                                                  {li}
                                                </span>
                                                {/* </span> */}
                                              </div>
                                              // </Grid>
                                              // </div>
                                            ))}
                                            {/* </Grid> */}
                                          </Grid>
                                        </div>
                                      </BreadCrumPanel>
                                    </>
                                  ))}
                                </div>
                              </BreadCrumPanel>
                            </div>
                          </BreadCrumPanel>
                        </div>
                      </BreadCrumPanel>
                    </div>
                  </BreadCrumPanel>
                </>
              ))}
            </div>
          </CardContent>
          <div className="btn-group">
            <Button className="btn btn-cancel">Cancel</Button>
            {/* <Link to={"/planinformation"} className="btn btn-save">
              Save
            </Link> */}
            <Button className="btn btn-save" onClick={this.onSavePlanInfoCard}>
              Save
            </Button>
          </div>
        </Card>
        {this.state.isPlanInfoCardShown ? (
          <PlanInformation onSave={this.onPlanConfig} />
        ) : null}
        {this.state.isPlanConfigCardShow ? (
          <PlanInformationConfiguration />
        ) : null}

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
