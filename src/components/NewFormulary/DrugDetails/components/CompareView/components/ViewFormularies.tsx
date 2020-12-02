import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Button from '../../../../../shared/Frx-components/button/Button';
import FormularyComponent from './FormularyComponent'
import './CompareView.scss';

export default class ViewFormularies extends React.Component<any,any>{
    render(){
        return (
            <div className="compare-formularies-container">
                <h6>Select formulary to view activity</h6>
                <div className="view-formulary-form formulay-label">
                    <Grid container>
                        <Grid item xs={4}>
                            <div className="group select-formulary-name">
                                <label>Formulary Name <span className="astrict">*</span></label>
                                <input type="text" placeholder="2021Care926-1 v.1" className="base-input" />
                                <span className="select-formulary-write-icon">
                                <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6493 2.43847L14.2593 5.08105C14.3692 5.19238 14.3692 5.37402 14.2593 5.48535L7.93981 11.8838L5.25463 12.1855C4.89583 12.2266 4.59201 11.9189 4.63252 11.5557L4.93056 8.83691L11.25 2.43847C11.36 2.32715 11.5394 2.32715 11.6493 2.43847ZM16.3368 1.76758L14.9248 0.33789C14.485 -0.107422 13.7703 -0.107422 13.3275 0.33789L12.3032 1.375C12.1933 1.48633 12.1933 1.66797 12.3032 1.7793L14.9132 4.42187C15.0231 4.5332 15.2025 4.5332 15.3125 4.42187L16.3368 3.38476C16.7766 2.93652 16.7766 2.21289 16.3368 1.76758ZM11.1111 10.1435V13.126H1.85185V3.75097H8.50116C8.59375 3.75097 8.68056 3.71289 8.74711 3.64843L9.90451 2.47656C10.1244 2.2539 9.96817 1.87597 9.65856 1.87597H1.38889C0.622106 1.87597 0 2.50586 0 3.28222V13.5947C0 14.3711 0.622106 15.001 1.38889 15.001H11.5741C12.3409 15.001 12.963 14.3711 12.963 13.5947V8.97167C12.963 8.6582 12.5897 8.50292 12.3698 8.72265L11.2124 9.89452C11.1487 9.9619 11.1111 10.0498 11.1111 10.1435Z" fill="#707683"/>
                                </svg>
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <Box display="flex" justifyContent="flex-end" className="view-formulary-btn">
                                <Button label="View" />
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                           <FormularyComponent />
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}