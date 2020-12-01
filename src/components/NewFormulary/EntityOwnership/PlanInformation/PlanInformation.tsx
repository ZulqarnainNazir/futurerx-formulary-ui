import React, {Component} from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Input,
} from "@material-ui/core";
import EntityTable from "../components/Table/EntityTable";
import PlanInformationConfiguration from "../PlanIfonmationConfiguaration/PlanInformationConfiguration";
import {Link} from "react-router-dom";
import "./PlanInformation.scss";

interface Props {
  onSave: () => any;
}
interface State {}

class PlanInformation extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="PlanInformation">
        <Card className="planInformation-card">
          <CardHeader
            className="planInformation-card-header"
            title="PLAN INFORMATION"
          />
          <CardContent className="planInformation-card-container">
            <EntityTable />
          </CardContent>
          <div className="btn-group">
            {/* <Button className="btn btn-cancel">Cancel</Button> */}
            <Button className="btn btn-save" onClick={this.props.onSave}>
              Configure
            </Button>
            {/* <Link to={"/planinformationconfig"} className="btn btn-save">
              Configure
            </Link> */}
          </div>
        </Card>
      </div>
    );
  }
}

export default PlanInformation;
