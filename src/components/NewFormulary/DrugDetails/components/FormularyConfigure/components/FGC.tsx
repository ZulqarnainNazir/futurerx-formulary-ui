import React from "react";
import { connect } from "react-redux";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import { getDrugDetailsFGC } from "../../../../../../redux/slices/formulary/drugDetails/fgc/fgcActionCreation";

function mapDispatchToProps(dispatch) {
  return {
    getDrugDetailsFGC: (a) => dispatch(getDrugDetailsFGC(a)),
  };
}

class FGC extends React.Component<any, any> {
  state = {
    panelGridTitle1: [
      "Tier Number",
      "Tier Descripion",
      "Full Gap Coverage",
      "Partial Gap Coverage",
    ],
    panelTitleAlignment1: ["left", "left", "center", "center"],
    panelGridValue1: []
  };

  onApplyHandler = () => {
    alert(1);
  };

  componentDidMount() {
    this.props.getDrugDetailsFGC().then((json) => {
      let tmpData =
        json.payload && json.payload.data ? json.payload.data : [];

      let rows = tmpData.map((ele) => {
        let curRow = [
          ele["tier_value"],
          ele["tier_label"],
        ];
        curRow.push("checkbox");
        curRow.push("checkbox");
        return curRow;
      });

      this.setState({
        panelGridValue1: rows,
      });
    });
  }

  render() {
    return (
      <>
        <div className="bordered">
          <PanelHeader title="Full Gap Coverage" tooltip="Full Gap Coverage" />
          <div className="inner-container bg-light-grey">
            <PanelGrid
              panelGridTitle={this.state.panelGridTitle1}
              panelGridValue={this.state.panelGridValue1}
              panelTitleAlignment={this.state.panelTitleAlignment1}
            />
          </div>
        </div>
        <Box display="flex" justifyContent="flex-end">
          <Button label="Apply" onClick={this.onApplyHandler} />
        </Box>
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(FGC);
