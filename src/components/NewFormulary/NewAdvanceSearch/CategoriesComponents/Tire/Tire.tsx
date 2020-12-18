import React, { Component } from "react";
import { Checkbox, Button, Grid } from "@material-ui/core";

import "./Tire.scss";

interface Props {}
interface State {}
const tires = [
  {
    id: 1,
    lable: "Tier 0",
  },
  {
    id: 2,
    lable: "Tier 1",
  },
  {
    id: 3,
    lable: "Tier 2",
  },
  {
    id: 4,
    lable: "Tier 3",
  },
  {
    id: 5,
    lable: "Tier 4",
  },
  {
    id: 6,
    lable: "Tier 5",
  },
  {
    id: 7,
    lable: "Tier 6",
  },
  {
    id: 8,
    lable: "Tier 7",
  },
  {
    id: 9,
    lable: "Tier 8",
  },
  {
    id: 10,
    lable: "No Tier ",
  },
];

class Tire extends Component<Props, State> {
  state = {
    tireList: [],
    selectedTire: [],
  };

  onSelectTire = (e, selectedTire) => {
    const currentTires: any = [...this.state.tireList];
    const currentSelectedTire: any = [...this.state.selectedTire];
    if (e.target.checked) {
      currentSelectedTire.push(selectedTire);
      currentTires.map((tire) => {
        if (tire.id === selectedTire.id) {
          tire["isChecked"] = e.target.checked;
        }
      });

      this.setState({
        tireList: currentTires,
        selectedTire: currentSelectedTire,
      });
    } else {
      this.setState({
        tireList: currentTires.map((tire) => {
          if (tire.id === selectedTire.id) {
            tire["isChecked"] = e.target.checked;
          }
          return tire;
        }),
        selectedTire: currentSelectedTire.filter(
          (tire) => tire.id !== selectedTire.id
        ),
      });
    }
  };

  onSelectAll = () => {
    const currentTires: any = [...this.state.tireList];
    currentTires.map((tire) => (tire["isChecked"] = true));
    this.setState({ tireList: currentTires, selectedTire: currentTires });
  };

  componentDidMount = () => {
    tires.map((tire) => (tire["isChecked"] = false));
    this.setState({ tireList: tires });
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

export default Tire;
