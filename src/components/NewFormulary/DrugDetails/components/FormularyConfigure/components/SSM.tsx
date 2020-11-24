import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';

export default class SSM extends React.Component<any,any>{
    state={
        panelGridTitle1: ['Senior Saving Model','Number of Drugs','added drugs','removed drugs'],
        panelTitleAlignment1: ['left','left','left','left'],
        panelGridValue1: []  
    }
    render(){
        return (
            <div className="bordered">
                <PanelHeader 
                    title="Senior Saving Model"
                    tooltip="Define Senior Savings Model Designation in Drug Grid below for marketing material considerations." />
                <div className="inner-container bg-light-grey">
                    <PanelGrid 
                        panelGridTitle={this.state.panelGridTitle1} 
                        panelGridValue={this.state.panelGridValue1}
                        panelTitleAlignment={this.state.panelTitleAlignment1} />
                </div>
            </div>
        )
    }
}