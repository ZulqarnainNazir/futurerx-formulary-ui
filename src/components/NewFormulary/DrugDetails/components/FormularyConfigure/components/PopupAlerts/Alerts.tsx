import React from 'react';
import Button from '@material-ui/core/Button';
import "./Alerts.scss";
import { Grid, Input } from '@material-ui/core';
import {BUTTONS,DELETE_ACTION,ARCHIVE_ACTION,MONTHS} from './Constents'
import CustomDatepicker from "../../../../../../shared/Frx-components/date-picker/CustomDatePicker";

interface Props {
    closePopup: () => void;
    popupType:any;
    cloneGroup:(e:any)=> void;
    newVersionGroup: (e:any) => void;
    archiveGroup:(e:any,param:any) => void;
    deleteGroup:(e:any,param:any)=> void;
    popuptitle:any;
}
export default class Alerts extends React.Component<Props, any> {
    state = {
        alertFormData: {
            startDate: undefined,
        },
        submitted: false,
    }

    handleChange = (event) => {
        const { alertFormData } = this.state;
        alertFormData[event.target.name] = event.target.value;
        this.setState({ alertFormData });
    }

    handleSubmit = () => {
        // this.setState({ submitted: true }, () => {
        //     setTimeout(() => this.setState({ submitted: false }), 5000);
        // });
    }

    handleStartDate = date => {
        this.setState({ alertFormData: {startDate: date} });
    };

    render() {
        const { closePopup,popupType,deleteGroup,cloneGroup,archiveGroup,newVersionGroup,popuptitle} = this.props
        return (
            <div className="popup-container">
            <div className={`content-wrapper ${popupType}`}>
                <div className="content">
                    {popupType=='clone' && (<React.Fragment>
                        <div className="label">New Name<span className="astrict">*</span></div>
                        <div className="input">
                            <input type="text" name=""/>
                        </div>
                    </React.Fragment>)}
                    {popupType=='newVersion' && (<React.Fragment>
                        <Grid container spacing={2}>
                            <Grid xs={6}>
                                <div className="label">Effective Date<span className="astrict">*</span></div>
                                <div className="calender">
                                <CustomDatepicker
                                className="claims-search__input claims-search__input--date"
                                onChange={this.handleStartDate}
                                value={this.state.alertFormData.startDate}
                                placeholder="Effective Date"
                                />
                                </div>
                            </Grid>
                            <Grid xs={6}>
                                <div className="label">Submission Month<span className="astrict">*</span></div>
                                <div className="input">
                                <select name="month" id="month">
                                    <option value="Month">Month</option>
                                    {MONTHS.map(e => {
                                        return <option value={e.abbreviation}>{e.abbreviation}</option>
                                    })}
                                </select>
                                </div>
                            </Grid>
                        </Grid>
                    </React.Fragment>)}
                    {popupType=='delete' && (<React.Fragment>
                        <div className="actionlabel">{DELETE_ACTION}{popuptitle}?</div>
                    </React.Fragment>)}
                    {popupType=='archive' && (<React.Fragment>
                        <div className="actionlabel">{ARCHIVE_ACTION}{popuptitle}?</div>
                    </React.Fragment>)}
                </div>
                <div className="button">
                    <Button variant="contained" onClick={closePopup}>Cancel</Button>
                    {
                        BUTTONS[popupType].map(btn=>{
                            const arg = btn.param;
                            const eventHandle:any ={
                                'clone':(e)=>cloneGroup(e),
                                'newVersion':(e)=>newVersionGroup(e),
                                'delete':(e)=>deleteGroup(e,arg),
                                'archive':(e)=>archiveGroup(e,arg)
                            }
                            return <Button variant="contained" className="visited" onClick={eventHandle[popupType]}>{btn.label}</Button>
                        })
                    }
                </div>
            </div>
            </div>
        );
    }
}