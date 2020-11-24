import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';

export default class HI extends React.Component<any,any>{
    state={
        panelGridTitle1: ['Home Infusion','Number of Drugs','added drugs','removed drugs'],
        panelTitleAlignment1: ['left','left','left','left'],
        panelGridValue1: []  
    }
    render(){
        return (
            <div className="bordered">
                <PanelHeader 
                    title="Home Infusion"
                    tooltip="Add or delete Home Infusion Status in Drug Grid below for the supplemental HPMS submission file and marketing material display." />
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