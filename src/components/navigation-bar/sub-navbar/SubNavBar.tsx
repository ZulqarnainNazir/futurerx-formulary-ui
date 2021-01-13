import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Select } from "antd";

import { Grid, Container } from "@material-ui/core";
import AdvanceSearchContainer from "../../advance-search/AdvanceSearchContainer";
import DialogPopup from "../../shared/FrxDialogPopup/FrxDialogPopup";
import {ReactComponent as Navhamburger} from "../../../assets/icons/nav-hamburger.svg";

import "./SubNavBar.scss";
import FrxLoader from "../../shared/FrxLoader/FrxLoader";
import CommonDialogAction from "../components/CommonDialogActions/CommonDialogAction";
import { SelectAll } from "@material-ui/icons";

const { Option } = Select;
interface Props {
  history: any;
}
interface State {}

class SubNavBar extends Component<Props, State> {
  state = {
    advanceSearchPopUpOpen: false,
    searchType: "member"
  };

  handleAdvanceSearchPopUp = () => {
    this.setState({
      advanceSearchPopUpOpen: !this.state.advanceSearchPopUpOpen
    });
  };

  handleSearch = () => {
    console.log("search router histore ", this.props, this.state.searchType);
    setTimeout(() => {
      if (this.state.searchType !== "") {
        // window.location.pathname = `/search/${this.state.searchType}`
        console.log(
          "search router histore ",
          this.props,
          this.state.searchType
        );
        this.handleAdvanceSearchPopUp();
        this.props.history.push(`/search/${this.state.searchType}`);
      }
    }, 300);
  };
  render() {
    return (
      <div className="sub-navbar">
        <AppBar position="static">
          <Toolbar>
            <Grid container>
              <Grid item sm={7}>
                <div className="nav-menu-right">
                <Navhamburger className="nav-hamburger-icon" />
                <span className="subNavBar-icon-select-dropdown-container">
                  <Select
                    placeholder="Navigation"
                    size="large"
                    className="subBar-dropdown-container"
                    suffixIcon={
                      <>
                        <svg
                          className="ant-select-suffix"
                          width="9"
                          height="5"
                          viewBox="0 0 9 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.223752 0.24549C0.531543 -0.0693596 0.960049 -0.0940675 1.33632 0.24549L4.09513 2.89065L6.85395 0.24549C7.23022 -0.0940675 7.65943 -0.0693596 7.9651 0.24549C8.27289 0.559634 8.25313 1.0905 7.9651 1.38559C7.67849 1.68067 4.65071 4.56373 4.65071 4.56373C4.57861 4.63846 4.49219 4.69789 4.39662 4.73849C4.30104 4.77908 4.19827 4.8 4.09443 4.8C3.99059 4.8 3.88782 4.77908 3.79224 4.73849C3.69666 4.69789 3.61025 4.63846 3.53815 4.56373C3.53815 4.56373 0.511776 1.68067 0.223752 1.38559C-0.0649778 1.0905 -0.0840382 0.559634 0.223752 0.24549Z"
                            fill="white"
                          />
                        </svg>
                      </>
                    }
                    dropdownClassName="subNavBar-select-dropdown"
                  >
                    <Option
                      style={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "11px"
                      }}
                      className="antd-select-dropdown-options"
                      value=""
                    >
                      options
                    </Option>
                  </Select>
                </span>
                </div>
              </Grid>
              <Grid
                item
                container
                sm={5}
                justify="flex-end"
                alignContent="center"
                className="subNavBar-search-icon"
              >
                {/* <svg
                  onClick={this.handleAdvanceSearchPopUp}
                  className="subNavBar-search-icons"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8368 10.3748L9.49991 8.03828C9.39444 7.93282 9.25146 7.87423 9.10145 7.87423H8.71939C9.36631 7.04697 9.75071 6.00644 9.75071 4.87452C9.75071 2.18182 7.56852 0 4.87536 0C2.18219 0 0 2.18182 0 4.87452C0 7.56723 2.18219 9.74905 4.87536 9.74905C6.00747 9.74905 7.04817 9.36471 7.87558 8.7179V9.09989C7.87558 9.24988 7.93417 9.39283 8.03965 9.49829L10.3765 11.8348C10.5969 12.0551 10.9531 12.0551 11.1711 11.8348L11.8345 11.1716C12.0548 10.9513 12.0548 10.5951 11.8368 10.3748ZM4.87536 7.87423C3.2182 7.87423 1.87514 6.53374 1.87514 4.87452C1.87514 3.21765 3.21586 1.87482 4.87536 1.87482C6.53251 1.87482 7.87558 3.21531 7.87558 4.87452C7.87558 6.53139 6.53485 7.87423 4.87536 7.87423Z"
                    fill="white"
                  />
                </svg> */}
                <CommonDialogAction />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <DialogPopup
          className="frx-advance-serach"
          open={this.state.advanceSearchPopUpOpen}
          positiveActionText="Search"
          negativeActionText="Cancel"
          title="Advanced Search"
          showCloseIcon
          showActions={true}
          handleClose={this.handleAdvanceSearchPopUp}
          handleAction={this.handleSearch}
        >
          <AdvanceSearchContainer
            onSelect={(c: any) => {
              console.log("sub nav ", c);
              this.setState({ searchType: c });
            }}
          />
        </DialogPopup>
      </div>
    );
  }
}
export default SubNavBar;
