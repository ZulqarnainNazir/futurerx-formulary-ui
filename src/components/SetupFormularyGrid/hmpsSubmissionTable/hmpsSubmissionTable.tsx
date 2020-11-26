import { Card, Input } from "@material-ui/core";
import { ArrowDownward, ArrowDropDown, ExpandLess } from "@material-ui/icons";
import React, { Component } from "react";
import Table from "../../shared/Frx-components/table/Table";
import actions from "../../../assets/icons/Actions.png";
import dots from "../../../assets/icons/dots1.png";
import settingsLogo from "../../../assets/icons/Settings.png";
import filter from "../../../assets/icons/Filter.png";
import downloadIcon from "../../../assets/icons/download.png";
import "./hmpsSubmissionTable.scss";

export default class HmpsSubmissionTable extends Component {
  render() {
    return (
      <div className="hmpsSubmissionTable">
        <Card style={{ border: "1px solid lightgrey" }} className="header">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "10px", color: "#1D54B4", fontWeight: 500 }}>
              HMPS SUBMISSION AND SUPPLEMENTAL OR ALTERNATIVE MODAL FORMULARY
              FILES
            </div>
            <img
              style={{ marginRight: "20px" }}
              src={downloadIcon}
              alt=""
              width="16px"
              height="16px"
            />
          </div>

          <hr style={{ border: "1px solid lightgrey" }} />

          <div className="grid-container">
            <div style={{ backgroundColor: "#F9F9F9" }} className="grid-item">
              <img src={settingsLogo} alt="" />
            </div>
            <div
              style={{ textAlign: "center", backgroundColor: "#F9F9F9" }}
              className="grid-item"
            >
              <div>
                <input type="checkbox" />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#F9F9F9",
                borderRight: "0px solid white",
              }}
              className="grid-item"
            >
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <span style={{ color: "#666666" }}>FILES</span>
                    </div>
                    <div>
                      <ArrowDropDown
                        style={{ color: "#666666" }}
                        fontSize="small"
                      />
                    </div>
                  </div>
                  <div>
                    <img src={filter} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#F9F9F9",
                borderLeft: "0px solid white",
              }}
              className="grid-item"
            >
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <span style={{ color: "#666666" }}>LAST GENERATED</span>
                    </div>
                    <div>
                      <ArrowDropDown
                        style={{ color: "#666666" }}
                        fontSize="small"
                      />
                    </div>
                  </div>
                  <div>
                    <img src={filter} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-item">
              <img src={dots} alt="" />
            </div>
            <div className="grid-item">
              <input type="checkbox" />
            </div>
            <div
              style={{ borderRight: "0px solid white" }}
              className="grid-item"
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "start",
                  fontSize: "12px",
                  color: "#666666",
                }}
              >
                Excluded Drug
              </span>
            </div>
            <div
              style={{ borderLeft: "0px solid white" }}
              className="grid-item"
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "start",
                  color: "#666666",
                }}
              >
                label
              </span>
            </div>
            <div className="grid-item">
              <img src={dots} alt="" />
            </div>
            <div className="grid-item">
              <input type="checkbox" />
            </div>

            <div
              style={{ borderRight: "0px solid white" }}
              className="grid-item"
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "start",
                  color: "#666666",
                }}
              >
                Free First Fill
              </span>
            </div>
            <div
              style={{ borderLeft: "0px solid white" }}
              className="grid-item"
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "start",
                  color: "#666666",
                }}
              >
                label
              </span>
            </div>
            <div className="grid-item">
              <img src={dots} alt="" />
            </div>
            <div className="grid-item">
              <input type="checkbox" />
            </div>
            <div
              style={{ borderRight: "0px solid white" }}
              className="grid-item"
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "start",
                  color: "#666666",
                }}
              >
                Home Infusion
              </span>
            </div>
            <div
              style={{ borderLeft: "0px solid white" }}
              className="grid-item"
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "start",
                  color: "#666666",
                }}
              >
                label
              </span>
            </div>
            <div className="grid-item">
              <img src={dots} alt="" />
            </div>
            <div className="grid-item">
              <input type="checkbox" />
            </div>
            <div
              style={{ borderRight: "0px solid white" }}
              className="grid-item"
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "start",
                  color: "#666666",
                }}
              >
                HPMS Delta Formulary File
              </span>
            </div>
            <div
              style={{ borderLeft: "0px solid white" }}
              className="grid-item"
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "start",
                  color: "#666666",
                }}
              >
                label
              </span>
            </div>
            <div className="grid-item">
              <img src={dots} alt="" />
            </div>

            <div className="grid-item">
              <input type="checkbox" />
            </div>

            <div
              style={{ borderRight: "0px solid white" }}
              className="grid-item"
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "start",
                  color: "#666666",
                }}
              >
                {" "}
                HPMS Full Formulary File
              </span>
            </div>
            <div
              style={{ borderLeft: "0px solid white" }}
              className="grid-item"
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "start",
                  color: "#666666",
                }}
              >
                label
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
