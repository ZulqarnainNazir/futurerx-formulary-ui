import React, { Component } from 'react'
import './StandardReporting.scss'
import { Card } from '@material-ui/core'
import { ArrowDownward, ArrowDropDown, ExpandLess } from '@material-ui/icons'
import Table from '../../shared/Frx-components/table/Table'
import actions from '../../../assets/icons/Actions.png'
import dots from '../../../assets/icons/dots1.png'
import settingsLogo from '../../../assets/icons/Settings.png'
import filter from '../../../assets/icons/Filter.png'
import downloadIcon from '../../../assets/icons/download.png'

export default class StandardReporting extends Component {
    render() {
        return (
            <div className="standardReporting">
                <Card style={{ border: "1px solid lightgrey", }} className="header">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ padding: "10px", color: "#1D54B4", fontWeight: 500 }}>
                            STANDARD REPORTING
                    </div>
                        <img style={{ marginRight: "20px" }} src={downloadIcon} alt="" width="16px" height="16px" />
                    </div>

                    <hr style={{ border: "1px solid lightgrey" }} />



                    <div className="grid-container">
                        <div style={{ backgroundColor: "#F9F9F9" }} className="grid-item">
                            <img src={settingsLogo} alt="" />
                        </div>
                        <div style={{ textAlign: "center", backgroundColor: "#F9F9F9" }} className="grid-item">
                            <div >
                                <input style={{ height: "25px" }} type="checkbox" />
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#F9F9F9", borderRight: "0px solid white" }} className="grid-item">
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                                        <div>
                                            <span style={{ color: "#666666" }}>
                                                ITEMS
                                  </span>
                                        </div>
                                        <div>
                                            <ArrowDropDown style={{ color: "#666666" }} fontSize="small" />
                                        </div>
                                    </div>
                                    <div>
                                        <img src={filter} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#F9F9F9", borderLeft: "0px solid white" }} className="grid-item">
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <div>
                                            <span style={{ color: "#666666" }}>
                                                Last Generated
                                  </span>
                                        </div>
                                        <div>
                                            <ArrowDropDown style={{ color: "#666666" }} fontSize="small" />
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
                        <div style={{ borderRight: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", fontSize: "12px", color: "#666666", }}>Validation Summary Export</span>
                        </div>
                        <div style={{ borderLeft: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>11/03/2020</span>
                        </div>
                        <div className="grid-item">
                            <img src={dots} alt="" /></div>
                        <div className="grid-item">
                            <input type="checkbox" />
                        </div>

                        <div style={{ borderRight: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>Annual FRF Change Report with Crosswalk</span>
                        </div>
                        <div style={{ borderLeft: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>11/09/2020</span>
                        </div>
                        <div className="grid-item">
                            <img src={dots} alt="" />
                        </div>
                        <div className="grid-item">
                            <input type="checkbox" />
                        </div>
                        <div style={{ borderRight: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>Compare/Activity Export</span>
                        </div>
                        <div style={{ borderLeft: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>11/03/2020</span>
                        </div>
                        <div className="grid-item">
                            <img src={dots} alt="" />
                        </div>
                        <div className="grid-item">
                            <input type="checkbox" />
                        </div>
                        <div style={{ borderRight: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>FRX Standard Full Formulary File</span>
                        </div>
                        <div style={{ borderLeft: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>Not yet generated</span>
                        </div>
                        <div className="grid-item">
                            <img src={dots} alt="" /></div>

                        <div className="grid-item">
                            <input type="checkbox" />
                        </div>

                        <div style={{ borderRight: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>FRRX Standard NDC File</span></div>
                        <div style={{ borderLeft: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>Not yet generated</span>
                        </div>

                        <div className="grid-item">
                            <img src={dots} alt="" />
                        </div>
                        <div className="grid-item">
                            <input type="checkbox" />
                        </div>
                        <div style={{ borderRight: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>FRX Standard PA Criteria</span>
                        </div>
                        <div style={{ borderLeft: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>Not yet generated</span>
                        </div>

                        <div className="grid-item">
                            <img src={dots} alt="" />
                        </div>
                        <div className="grid-item">
                            <input type="checkbox" />
                        </div>
                        <div style={{ borderRight: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>FRX Standard ST Criteria</span>
                        </div>
                        <div style={{ borderLeft: "0px solid white" }} className="grid-item">
                            <span style={{ display: "flex", justifyContent: "start", color: "#666666", }}>Not yet generated</span>
                        </div>

                    </div>


                </Card>

            </div>
        )
    }
}
