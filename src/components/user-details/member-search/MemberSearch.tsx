import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {Input, InputAdornment} from "@material-ui/core";

//ant and materil imports
import {Button, DatePicker, Select} from "antd";

import AccountCircle from "@material-ui/icons/AccountCircle";

import "./MemberSearch.scss";

interface Props {}
interface State {}
const {Option} = Select;
export default class MemberSearch extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="member-search-container">
        <Grid container justify="space-between" spacing={1}>
          {/* <Grid container spacing={2}> */}
          <Grid item sm={6}>
            <Input
              className="member-search__input"
              placeholder="First Name"
              type="text"
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
          <Grid item sm={6}>
            <Input
              className="member-search__input"
              placeholder="Last Name"
              type="text"
              //   name="claimId"
              //   value={this.state.claimId}
              //   onChange={(e) => this.handleInputChange(e)}
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
            />
          </Grid>
          {/* </Grid> */}
          {/* <Grid container spacing={2}> */}
          <Grid item sm={6}>
            <DatePicker
              className="member-search__input member-search__input--date"
              // onChange={this.handleStartDate}
              // value={this.state.startDate}
              dropdownClassName="member-search__date-calender"
              placeholder="Date of Birth"
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
          <Grid item sm={6}>
            <Input
              className="member-search__input"
              placeholder="Member ID"
              type="text"
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
              // name="claimId"
              // value={this.state.claimId}
              // onChange={(e) => this.handleInputChange(e)}
            />
          </Grid>
          {/* </Grid> */}
          {/* <Grid container spacing={2}> */}
          <Grid item sm={6}>
            <Select
              placeholder="Line of Bussiness"
              // value={this.state.status}
              // onChange={this.onSelectStatus}
              className="member-search__input member-search__input--dropdown"
              suffixIcon={
                <svg
                  className="ant-select-suffix"
                  width="8"
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
              <Option value="Paid">Paid</Option>
              <Option value="Rejected">Rejected</Option>
              <Option value="BS3">B3</Option>
            </Select>
          </Grid>
          <Grid item sm={6}>
            <Input
              className="member-search__input"
              placeholder="Group Number"
              type="text"
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
              //   name="claimId"
              //   value={this.state.claimId}
              //   onChange={(e) => this.handleInputChange(e)}
            />
          </Grid>
          {/* </Grid> */}
        </Grid>
      </div>
    );
  }
}
