import { Grid } from '@material-ui/core';
import React from 'react';

export default class MemberAlertRowExpanded extends React.Component<any, any>{
    state = {
        //data: rowData,
        isDetail: false
    }
    render() {
        return (
            <>
                <div className="expanded-data">
                    <Grid container>
                        <Grid item xs={6} className="left-side">
                            <div>
                                Term Date <span>*</span>
                                <input type="text" placeholder="Add Term Date" />
                            </div>
                            <div>
                                Term Date <span>*</span>
                                <input type="text" placeholder="Add a custom note to help other users understand why this barrieris being termed" />
                            </div>
                            <div>
                                <button>Cancel</button>
                                <button>Save</button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div>
                                Rayan Tait <span>*</span>
                                <p>We need to figure out something</p>
                            </div>
                            <div>
                                Term Date <span>*</span>
                                <input type="text" placeholder="Add a custom note to help other users understand why this barrieris being termed" />
                            </div>
                            <div>
                                <button>Save Note</button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </>
        )
    }
}