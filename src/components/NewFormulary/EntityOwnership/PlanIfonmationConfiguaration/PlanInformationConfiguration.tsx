import React, {Component} from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Input,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import "./PlanInformationConfiguration.scss";

interface Props {}
interface State {}

class PlanInformationConfiguration extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="PlanInformationConfiguration">
        <Card className="planInformationConfiguration-card">
          <CardHeader
            className="planInformationConfiguration-card-header"
            title="PLAN INFORMATION CONFIGURATION"
          >
            {/* FORMULARY WITH ADJUDICATION */}
          </CardHeader>
          <CardContent className="planInformationConfiguration-card-container">
            <div className="lable-input-container">
              <Grid container className="grid-container">
                <Grid
                  item
                  container
                  sm={6}
                  className="grid-item-container grid-collumn-1"
                >
                  <Grid item className="grid-items">
                    <div className="label-div">
                      Plan Information Configuration Name
                    </div>
                    <div className="input-div">
                      <Input
                        className="input-element"
                        //   placeholder="First Name"
                        type="text"
                        disableUnderline={true}
                        // variant="outlined"
                        //   name="claimId"
                        value={"North East PBPs"}
                        //   onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                  <Grid item className="grid-items">
                    <div className="label-div">Plan Name</div>
                    <div className="input-div">
                      <Input
                        className="input-element"
                        //   placeholder="First Name"
                        type="text"
                        disableUnderline={true}
                        // variant="outlined"
                        //   name="claimId"
                        value={"Medicare 1"}
                        //   onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                  <Grid item className="grid-items">
                    <div className="label-div">Phone Number</div>
                    <div className="input-div">
                      <Input
                        className="input-element"
                        //   placeholder="First Name"
                        type="text"
                        disableUnderline={true}
                        // variant="outlined"
                        //   name="claimId"
                        value={"888-888-8888"}
                        //   onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                  <Grid item className="grid-items">
                    <div className="label-div">TTY</div>
                    <div className="input-div">
                      <Input
                        className="input-element"
                        //   placeholder="First Name"
                        type="text"
                        disableUnderline={true}
                        // variant="outlined"
                        //   name="claimId"
                        value={"888-888-8888"}
                        //   onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sm={6}
                  className=" grid-item-container grid-collumn-2"
                >
                  <Grid item className="grid-items">
                    <div className="label-div">Website</div>
                    <div className="input-div">
                      <Input
                        className="input-element"
                        //   placeholder="First Name"
                        type="text"
                        disableUnderline={true}
                        // variant="outlined"
                        //   name="claimId"
                        value={"www.medicare1.com"}
                        //   onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                  <Grid item className="grid-items">
                    <div className="label-div">Days/Hours of Operation</div>
                    <div className="input-div">
                      <Input
                        className="input-element input-multiline"
                        //   placeholder="First Name"
                        type="text"
                        multiline
                        rows={10}
                        disableUnderline={true}
                        // variant="outlined"
                        //   name="claimId"
                        value={
                          "From October 1 to March 31, we are open 7 days a week, from 8 a.m. to 8 p.m. EST. From April 1 to September 30, we are open Monday through Friday, from 8 a.m. to 8 p.m. EST."
                        }
                        //   onChange={(e) => this.handleInputChange(e)}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <div className="btn-group">
            {/* <Button className="btn btn-cancel">Cancel</Button> */}
            {/* <Button className="btn btn-save">Save</Button> */}
            <Link to={"/planinformation"} className="btn btn-save">
              Save
            </Link>
          </div>
        </Card>
      </div>
    );
  }
}

export default PlanInformationConfiguration;
