import React, { Component } from "react";
import { Checkbox, Button, Grid } from "@material-ui/core";
import { setAdvancedSearch } from "../../../../../redux/slices/formulary/advancedSearch/advancedSearchSlice";
import { connect } from "react-redux";

import "./Tire.scss";

function mapDispatchToProps(dispatch) {
  return {
    setAdvancedSearch: (a) => dispatch(setAdvancedSearch(a))
  };
}

const mapStateToProps = (state) => {
  return {
    advancedSearchBody: state?.advancedSearch?.advancedSearchBody,
    populateGrid: state?.advancedSearch?.populateGrid,
    closeDialog: state?.advancedSearch?.closeDialog,
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id
  };
};

interface Props {
  tierChanged: (a) => void;
  advancedSearchBody: any;
  formulary_lob_id: any;
}
interface State { }
const tires = [
  {
    id: 1,
    lable: "Tier 0",
    key: 0
  },
  {
    id: 2,
    lable: "Tier 1",
    key: 1
  },
  {
    id: 3,
    lable: "Tier 2",
    key: 2
  },
  {
    id: 4,
    lable: "Tier 3",
    key: 3
  },
  {
    id: 5,
    lable: "Tier 4",
    key: 4
  },
  {
    id: 6,
    lable: "Tier 5",
    key: 5
  },
  {
    id: 7,
    lable: "Tier 6",
    key: 6
  },
  {
    id: 8,
    lable: "Tier 7",
    key: 7
  },
  {
    id: 9,
    lable: "Tier 8",
    key: 8
  },
  {
    id: 10,
    lable: "No Tier ",
    key: -1
  },
];

const tiresNonMcr = [
  {
    id: 2,
    lable: "Tier 1",
    key: 1
  },
  {
    id: 3,
    lable: "Tier 2",
    key: 2
  },
  {
    id: 4,
    lable: "Tier 3",
    key: 3
  },
  {
    id: 5,
    lable: "Tier 4",
    key: 4
  },
  {
    id: 6,
    lable: "Tier 5",
    key: 5
  },
  {
    id: 7,
    lable: "Tier 6",
    key: 6
  },
  {
    id: 8,
    lable: "Tier 7",
    key: 7
  },
  {
    id: 9,
    lable: "Tier 8",
    key: 8
  },
  {
    id: 10,
    lable: "Tier 9",
    key: 9
  },
  {
    id: 11,
    lable: "Tier 10",
    key: 10
  },
  {
    id: 12,
    lable: "Tier 11",
    key: 11
  },
  {
    id: 13,
    lable: "Tier 12",
    key: 12
  },
  {
    id: 14,
    lable: "Tier 13",
    key: 13
  },
  {
    id: 15,
    lable: "Tier 14",
    key: 14
  },
  {
    id: 16,
    lable: "Tier 15",
    key: 15
  },
  {
    id: 17,
    lable: "Tier 16",
    key: 16
  },
  {
    id: 18,
    lable: "Tier 17",
    key: 17
  },
  {
    id: 19,
    lable: "Tier 18",
    key: 18
  },
  {
    id: 20,
    lable: "Tier 19",
    key: 19
  },
  {
    id: 21,
    lable: "Tier 20",
    key: 20
  },
  {
    id: 22,
    lable: "No Tier ",
    key: -1
  },
];

class Tire extends Component<Props, State> {
  state = {
    tireList: [],
    selectedTire: [],
  };

  onSelectTire = (e, selectedTire) => {
    let currentTires: any = [...this.state.tireList];
    let currentSelectedTire: any = [...this.state.selectedTire];
    if (e.target.checked) {
      currentSelectedTire.push(selectedTire);
      currentTires.map((tire) => {
        if (tire.id === selectedTire.id) {
          tire["isChecked"] = e.target.checked;
        }
      });

      this.props.tierChanged(currentTires);

      this.setState({
        tireList: currentTires,
        selectedTire: currentSelectedTire,
      });
    } else {
      currentTires = currentTires.map((tire) => {
        if (tire.id === selectedTire.id) {
          tire["isChecked"] = e.target.checked;
        }
        return tire;
      });

      currentSelectedTire = currentSelectedTire.filter(
        (tire) => tire.id !== selectedTire.id
      );

      /*this.setState({
        tireList: currentTires.map((tire) => {
          if (tire.id === selectedTire.id) {
            tire["isChecked"] = e.target.checked;
          }
          return tire;
        }),
        selectedTire: currentSelectedTire.filter(
          (tire) => tire.id !== selectedTire.id
        ),
      });*/

      this.props.tierChanged(currentTires);

      this.setState({
        tireList: currentTires,
        selectedTire: currentSelectedTire,
      });
    }
  };

  onSelectAll = () => {
    const currentTires: any = [...this.state.tireList];
    currentTires.map((tire) => (tire["isChecked"] = true));
    this.props.tierChanged(currentTires);
    this.setState({ tireList: currentTires, selectedTire: currentTires });
  };

  componentDidMount = () => {
    let setTiers = Array();
    let noTier: any = false;
    if (this.props.advancedSearchBody && this.props.advancedSearchBody.additional_filter) {
      setTiers = this.props.advancedSearchBody.additional_filter.tiers;
      noTier = this.props.advancedSearchBody.additional_filter.is_no_tier;
    }
    if (this.props.formulary_lob_id == 1) {
      tires.map((tire) => (tire["isChecked"] = (setTiers.includes(tire['key']) || (noTier && tire['key'] == -1) ? true : false)));
      this.props.tierChanged(tires);
      this.setState({ tireList: tires });
    } else {
      tiresNonMcr.map((tire) => (tire["isChecked"] = (setTiers.includes(tire['key']) || (noTier && tire['key'] == -1) ? true : false)));
      this.props.tierChanged(tiresNonMcr);
      this.setState({ tireList: tiresNonMcr });
    }
  };

  render() {
    const { tireList } = this.state;
    let renderElement: any;
    if (tireList.length >= 0) {
      renderElement = (
        <div className="tire-list">
          {/* <Grid container> */}
          {tireList.map((tire: any) => (
            // <Grid item sm={3} zeroMinWidth>
            <span key={tire.id} className="__list">
              <Checkbox
                color="primary"
                style={{ borderRadius: "15px" }}
                onClick={(e) => {
                  this.onSelectTire(e, tire);
                }}
                checked={tire.isChecked}
                size="small"
              />
              <label htmlFor="" className="__list-lable">
                {tire.lable}
              </label>
            </span>
            // </Grid>
          ))}
          {/* </Grid> */}
        </div>
      );
    } else {
      renderElement = null;
    }

    return (
      <div className="__root-tire-container">
        <div
          className="tire-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span className="heading">Select the Tier:</span>
          <Button className="select_all_button" onClick={this.onSelectAll}>
            Select All
          </Button>
        </div>
        <div className="tire-list-contianer">{renderElement}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tire);
