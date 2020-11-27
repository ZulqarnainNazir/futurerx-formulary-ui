import React from 'react'
import Grid from "@material-ui/core/Grid";
import { Button, Input, Box } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import DropDown from '../../../../../../shared/Frx-components/dropdown/DropDown';
import CheckboxLabels from './CheckBox'

interface Props{
    clear?:any;
    title:string;
    deleteField?:any
}

export default class CategoryForm extends React.Component<Props, any>{
    
    render() {
        return (
           
                <div className="main-wrapper">
                    <div className="row-wrapper">
                        <div className="arrow-wrapper">
                            <Box component="span" display="block">
                                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                                </svg>
                            </Box>
                        </div>
                        <div className="search-wrapper">
                            <div className="search-header">
                                <div className="panel">
        <span>{this.props.title}</span>
                                    <div className="panel-tooltip">
                                        <Tooltip
                                            classes={{
                                                tooltip: 'custom-tooltip panel-tooltip'
                                            }}
                                            title='fsd'
                                            placement="top-start"
                                            arrow>
                                            <svg className="info-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.3335 3.66732H7.66683V5.00065H6.3335V3.66732ZM6.3335 6.33398H7.66683V10.334H6.3335V6.33398ZM7.00016 0.333984C3.32016 0.333984 0.333496 3.32065 0.333496 7.00065C0.333496 10.6807 3.32016 13.6673 7.00016 13.6673C10.6802 13.6673 13.6668 10.6807 13.6668 7.00065C13.6668 3.32065 10.6802 0.333984 7.00016 0.333984ZM7.00016 12.334C4.06016 12.334 1.66683 9.94065 1.66683 7.00065C1.66683 4.06065 4.06016 1.66732 7.00016 1.66732C9.94016 1.66732 12.3335 4.06065 12.3335 7.00065C12.3335 9.94065 9.94016 12.334 7.00016 12.334Z" fill="#1D54B4" />
                                            </svg>
                                        </Tooltip>
                                    </div>
                                </div>
                                <span>
                                    <DropDown options={[1, 2, 3]} />
                                </span>
                            </div>
                            <div className="search-form">
                                <div className="from-panel">
                                    <span>Select the formulary file:</span>
                                    <Button variant="contained">Select all</Button>
                                </div>
                                <CheckboxLabels />
                            </div>
                        </div>
                        <div className="delete-wrapper">
                            <Box component="span" display="block" onClick={this.props.deleteField}>
                                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.74967 13.0417C1.74967 13.9125 2.46217 14.625 3.33301 14.625H9.66634C10.5372 14.625 11.2497 13.9125 11.2497 13.0417V3.54167H1.74967V13.0417ZM12.0413 1.16667H9.27051L8.47884 0.375H4.52051L3.72884 1.16667H0.958008V2.75H12.0413V1.16667Z" fill="#999999" />
                                </svg>
                            </Box>
                        </div>
                    </div>
                </div>
        )
    }

}