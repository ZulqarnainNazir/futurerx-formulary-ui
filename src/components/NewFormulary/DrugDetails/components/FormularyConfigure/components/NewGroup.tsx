import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';
import CustomizedSwitches from './CustomizedSwitches';
import { TabInfo } from "../../../../../../models/tab.model";
import FrxMiniTabs from "../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import Button from '../../../../../shared/Frx-components/button/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { textFilters } from "../../../../../../utils/grid/filters";
import { getDrugDetailsColumn } from "../DrugGridColumn";
import { getDrugDetailData } from "../../../../../../mocks/DrugGridMock";
import FrxLoader from "../../../../../shared/FrxLoader/FrxLoader";
import DrugGrid from '../../DrugGrid';
import Tooltip from '@material-ui/core/Tooltip';
import { Box, Grid, Input } from '@material-ui/core';
import RadioButton from '../../../../../shared/Frx-components/radio-button/RadioButton';

interface Props{
    tooltip?:string;
    formType?:number;
}

export default function NewGroup(props: any) {
    console.log(props)
    return (
        <div className="new-group-des">
            <div className="panel header">
                <span>NEW GROUP DESCRIPTION</span>
            </div>
            <div className="inner-container">
                <div className="setting-1">
                    <span>What file type is this group description for? *</span>
                    <div className="marketing-material radio-group">
                        <RadioButton label="Formulary/OTC" name="marketing-material-radio1" checked />
                        <RadioButton label="Excluded" name="marketing-material-radio1" />
                        <RadioButton label="ADD" name="marketing-material-radio1" />
                    </div>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className="group">
                                <label>ST GROUP DESCRIPTION<span className="astrict">*</span></label>
                                <input type="text" />
                            </div>
                        </Grid>
                    </Grid>
                    {props.formType>0 && (<Grid container className="mb-20">
                        <Grid item xs={6}>
                            <div className="group">
                                <label>EXCLUDED DRUG FILE</label>
                                <input type="text" />
                            </div>
                        </Grid>
                    </Grid>)}
                </div>
                {props.formType===0 && (<div className="setting-1 mb-20">
                    <span>What type of drugs will this group contain? Select all that apply.</span>
                    <div className="marketing-material-chk radio-group">
                        <FormControlLabel control={<Checkbox />} label='RX' />
                        <FormControlLabel control={<Checkbox />} label='OTC' />
                    </div>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className="group">
                                <label>ST CRITERIA<span className="astrict">*</span>
                                    <div className="panel-tooltip">
                                        <Tooltip
                                            classes={{
                                                tooltip: 'custom-tooltip panel-tooltip'
                                            }}
                                            title={props.tooltip}
                                            placement="top-start"
                                            arrow>
                                            <svg className="info-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.3335 3.66732H7.66683V5.00065H6.3335V3.66732ZM6.3335 6.33398H7.66683V10.334H6.3335V6.33398ZM7.00016 0.333984C3.32016 0.333984 0.333496 3.32065 0.333496 7.00065C0.333496 10.6807 3.32016 13.6673 7.00016 13.6673C10.6802 13.6673 13.6668 10.6807 13.6668 7.00065C13.6668 3.32065 10.6802 0.333984 7.00016 0.333984ZM7.00016 12.334C4.06016 12.334 1.66683 9.94065 1.66683 7.00065C1.66683 4.06065 4.06016 1.66732 7.00016 1.66732C9.94016 1.66732 12.3335 4.06065 12.3335 7.00065C12.3335 9.94065 9.94016 12.334 7.00016 12.334Z" fill="#1D54B4" />
                                            </svg>
                                        </Tooltip>
                                    </div>
                                </label>
                                <input type="text" />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container className="mb-20">
                        <Grid item xs={6}>
                            <div className="group">
                                <label>ST CRITERIA CHANGE INDICATOR<span className="astrict">*</span></label>
                                <input type="text" />
                            </div>
                        </Grid>
                    </Grid>
                </div>)}
                <div className="setting-1 mb-20">
                    <span>MARKETING MATERIAL CONSIDERATIONS</span>
                    <div className="marketing-material-chk">
                        <FormControlLabel control={<Checkbox />} label='Supress Criteria and Display: Pending CMS Approval' />
                        <FormControlLabel control={<Checkbox />} label='Display Criteria for Drugs not on FRF' />
                    </div>
                    <span>do you want to add additional criteria?<span className="astrict">*</span></span>
                    <div className="marketing-material radio-group">
                        <RadioButton label="Yes" name="marketing-material-radio" checked />
                        <RadioButton label="No" name="marketing-material-radio" />
                    </div>
                </div>
                <div className="button-wrapper">
                    <Button label="Save Version Progress" className="Button" />
                    <Button label="Version to Initiate Change Request" className="Button" />
                    <Button label="Version Submitted to CMS" className="Button" />
                </div>
            </div>

        </div>
    )
}