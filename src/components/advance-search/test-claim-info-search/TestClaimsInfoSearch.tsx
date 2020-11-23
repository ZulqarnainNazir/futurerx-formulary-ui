import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import {Input, InputAdornment} from "@material-ui/core";
import {Button, DatePicker, Select, Tag} from "antd";
import NewTestClaim from "../../member/NewTestClaim";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";

import "./TestClaimsInfoSearch.scss";
const {Option} = Select;
interface Props {}
interface State {}

class TestClaimsInfoSearch extends Component<Props, State> {
  state = {
    isNewTestClaimPopupOpen: false,
  };

  tagRender = (props) => {
    const {label, value, closable, onClose} = props;
    console.log(props);
    // alert("tagRender");
    return <Tag>{label}</Tag>;
  };

  onHandleNewTestClaimPopUp = () => {
    this.setState({
      isNewTestClaimPopupOpen: !this.state.isNewTestClaimPopupOpen,
    });
  };

  render() {
    const options = [
      {value: "Madicare"},
      {value: "options 1"},
      {value: "options 2"},
      {value: "options 3"},
    ];
    return (
      <div className="TestClaimsInfoSearch">
        <Grid container className="test-claim-info-search">
          <Grid
            item
            container
            className="test-claim-info-member-info-container"
          >
            <Grid item sm={4} className="member-info-heading">
              Member Information
            </Grid>
            <Grid item sm={5} className="member-info-search-field">
              <Input
                className="member-search__input"
                placeholder="Member"
                type="text"
                disableUnderline={true}
                startAdornment={
                  // <InputAdornment position="start">
                  <svg
                    className="member-search__icon"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                      fill="#999999"
                    />
                  </svg>

                  // {/* </InputAdornment> */}
                }
                // variant="outlined"
                //   name="claimId"
                //   value={this.state.claimId}
                //   onChange={(e) => this.handleInputChange(e)}
              />
              <Select
                placeholder="Medicare"
                // value={this.state.status}
                // onChange={this.onSelectStatus}
                mode="tags"
                showArrow
                defaultValue={["Medicare"]}
                tagRender={this.tagRender}
                options={options}
                className="member-search__input--dropdown medicater-dropdown"
                suffixIcon={
                  <svg
                    className="ant-select-suffix"
                    width="6"
                    height="8"
                    viewBox="0 0 6 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.79875 0H0.20125C0.0333594 0 -0.0603867 0.147179 0.0435863 0.247656L2.84234 2.94215C2.92245 3.01928 3.0767 3.01928 3.15766 2.94215L5.95641 0.247656C6.06039 0.147179 5.96664 0 5.79875 0Z"
                      fill="#999999"
                    />
                  </svg>
                }
              >
                {/* <Option value="">Status</Option> */}
                {/* <Option value="Medicare">Medicare</Option> */}
              </Select>
            </Grid>
            <Grid item sm={2} className="member-info-test-claim-button">
              <Button
                className="test-claim-button"
                onClick={this.onHandleNewTestClaimPopUp}
              >
                + New Test Claim
              </Button>
            </Grid>
          </Grid>

          <Grid item container className="test-claim-information-contianer">
            <Grid
              item
              container
              sm={4}
              className="test-claim-information-heading"
            >
              Test Claim Information
            </Grid>
            <Grid item sm={5} className="test-claim-information-search-field">
              <Input
                className="member-search__input"
                placeholder="Test Claim ID"
                type="text"
                disableUnderline={true}
                startAdornment={
                  // <InputAdornment position="start">
                  <svg
                    className="member-search__icon"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                      fill="#999999"
                    />
                  </svg>

                  // {/* </InputAdornment> */}
                }
                // variant="outlined"
                //   name="claimId"
                //   value={this.state.claimId}
                //   onChange={(e) => this.handleInputChange(e)}
              />
              <Grid
                item
                container
                className="test-claim-status-dhuHistory-container"
                // spacing={1}
              >
                <Grid item sm={6} className="test-claim-status">
                  <DropDown
                    placeholder="Status"
                    className="member-search__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={["Paid", "Rejected", "B3"]}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>
                <Grid item sm={6} className="test-claim-duhHistory">
                  <DropDown
                    placeholder="DUR History"
                    className="member-search__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={["--NA--"]}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>
                <Grid item sm={12} className="test-claim-type-dropdown">
                  <DropDown
                    placeholder="Test Claim Type"
                    className="member-search__input--dropdown"
                    // dropdownClassName="formulary-service-year-dropdown"
                    // defaultValue={this.state.medicareTyep}
                    options={["--NA--"]}
                    // onSelect={this.onSelectforMedicare}
                  />
                </Grid>
                <Input
                  className="member-search__input"
                  placeholder="Drug Label"
                  type="text"
                  disableUnderline={true}
                  startAdornment={
                    // <InputAdornment position="start">
                    <svg
                      className="member-search__icon"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                        fill="#999999"
                      />
                    </svg>

                    // {/* </InputAdornment> */}
                  }
                  // variant="outlined"
                  //   name="claimId"
                  //   value={this.state.claimId}
                  //   onChange={(e) => this.handleInputChange(e)}
                />
                <Input
                  className="member-search__input"
                  placeholder="RX #"
                  type="text"
                  disableUnderline={true}
                  startAdornment={
                    // <InputAdornment position="start">
                    <svg
                      className="member-search__icon"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                        fill="#999999"
                      />
                    </svg>

                    // {/* </InputAdornment> */}
                  }
                  // variant="outlined"
                  //   name="claimId"
                  //   value={this.state.claimId}
                  //   onChange={(e) => this.handleInputChange(e)}
                />
                <Input
                  className="member-search__input"
                  placeholder="Prescriber"
                  type="text"
                  disableUnderline={true}
                  startAdornment={
                    // <InputAdornment position="start">
                    <svg
                      className="member-search__icon"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                        fill="#999999"
                      />
                    </svg>

                    // {/* </InputAdornment> */}
                  }
                  // variant="outlined"
                  //   name="claimId"
                  //   value={this.state.claimId}
                  //   onChange={(e) => this.handleInputChange(e)}
                />
                <Input
                  className="member-search__input"
                  placeholder="Pharmacy"
                  type="text"
                  disableUnderline={true}
                  startAdornment={
                    // <InputAdornment position="start">
                    <svg
                      className="member-search__icon"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z"
                        fill="#999999"
                      />
                    </svg>

                    // {/* </InputAdornment> */}
                  }
                  // variant="outlined"
                  //   name="claimId"
                  //   value={this.state.claimId}
                  //   onChange={(e) => this.handleInputChange(e)}
                />
              </Grid>
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
          <Grid item container className="test-claim-date-container">
            <Grid item sm={4} className="date-heading">
              Dates
            </Grid>
            <Grid item container sm={5} className="date-container">
              <Grid item sm={6} className="date-effectiveDate-contianer">
                <DatePicker
                  panelRender={(panelNode) => {
                    return (
                      <div>
                        <span className="frx-date-picker__panel">
                          Pick a date
                          <svg
                            className="frx-date-picker__panel-close-icon"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99419 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600273 0.000414325C0.460452 0.00581497 0.32782 0.0637772 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.352901 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99419 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
                              fill="#666666"
                            />
                          </svg>
                        </span>
                        {panelNode}
                      </div>
                    );
                  }}
                  className="member-search__input "
                  // onChange={this.handleStartDate}
                  // value={this.state.startDate}
                  dropdownClassName="member-search__date-calender"
                  placeholder="Start Date"
                  suffixIcon={
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ant-picker-suffix"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                        fill="#C4C4C4"
                      />
                    </svg>
                  }
                />
              </Grid>
              <Grid item sm={6} className="date-dueDate-contianer">
                <DatePicker
                  panelRender={(panelNode) => {
                    return (
                      <div>
                        <span className="frx-date-picker__panel">
                          Pick a date
                          <svg
                            className="frx-date-picker__panel-close-icon"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.81641 4.97248L9.86641 0.922476C9.95743 0.816197 10.005 0.679488 9.99959 0.539668C9.99419 0.399848 9.93622 0.267216 9.83728 0.168274C9.73834 0.0693328 9.60571 0.0113701 9.46589 0.00596948C9.32607 0.000568837 9.18936 0.048128 9.08308 0.139143L5.03308 4.18914L0.98308 0.133587C0.876801 0.0425723 0.740093 -0.00498632 0.600273 0.000414325C0.460452 0.00581497 0.32782 0.0637772 0.228878 0.162719C0.129937 0.26166 0.0719742 0.394293 0.0665736 0.534113C0.0611729 0.673933 0.108732 0.810642 0.199747 0.91692L4.24975 4.97248L0.194191 9.02248C0.136035 9.07228 0.088801 9.13357 0.0554548 9.20249C0.0221085 9.27142 0.00336926 9.34649 0.000413989 9.423C-0.00254129 9.49951 0.0103509 9.57581 0.0382812 9.6471C0.0662115 9.71839 0.108577 9.78314 0.162719 9.83728C0.21686 9.89142 0.281609 9.93379 0.352901 9.96172C0.424192 9.98965 0.500488 10.0025 0.576999 9.99959C0.653509 9.99663 0.728583 9.97789 0.797508 9.94455C0.866433 9.9112 0.92772 9.86397 0.977524 9.80581L5.03308 5.75581L9.08308 9.80581C9.18936 9.89682 9.32607 9.94438 9.46589 9.93898C9.60571 9.93358 9.73834 9.87562 9.83728 9.77668C9.93622 9.67774 9.99419 9.5451 9.99959 9.40528C10.005 9.26546 9.95743 9.12876 9.86641 9.02248L5.81641 4.97248Z"
                              fill="#666666"
                            />
                          </svg>
                        </span>
                        {panelNode}
                      </div>
                    );
                  }}
                  className="member-search__input member-search__input--date"
                  // onChange={this.handleStartDate}
                  // value={this.state.startDate}
                  dropdownClassName="member-search__date-calender"
                  placeholder="End Date"
                  suffixIcon={
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ant-picker-suffix"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 20H2C0.897 20 0 19.103 0 18V4C0 2.897 0.897 2 2 2H4V0H6V2H12V0H14V2H16C17.103 2 18 2.897 18 4V18C18 19.103 17.103 20 16 20ZM16.001 18L16 6H2V18H16.001ZM6 9H4V11H6V9ZM6 13H4V15H6V13ZM10 9H8V11H10V9ZM10 13H8V15H10V13ZM14 9H12V11H14V9ZM14 13H12V15H14V13Z"
                        fill="#C4C4C4"
                      />
                    </svg>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {this.state.isNewTestClaimPopupOpen ? (
          <NewTestClaim
            isOpen={
              this.state.isNewTestClaimPopupOpen
              // this.state.openPopup
            }
            onClose={this.onHandleNewTestClaimPopUp}
            panelName=""
            title="New Test Claim"
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default TestClaimsInfoSearch;
