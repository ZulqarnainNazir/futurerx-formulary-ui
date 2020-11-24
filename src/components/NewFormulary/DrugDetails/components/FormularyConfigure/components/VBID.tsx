import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';

export default class VBID extends React.Component<any,any>{
    state={
        panelGridTitle1: ['Value Based Insurance','Number of Drugs','added drugs','removed drugs'],
        panelTitleAlignment1: ['left','left','left','left'],
        panelGridValue1: []  
    }
    render(){
        return (
            <div className="bordered">
                <PanelHeader 
                    title="Value-Based Insurance Design"
                    tooltip="ADD File or delete Value-Based Insurance Design Status in Drug Grid below for the supplemental HPMS submission file and marketing material display." />
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