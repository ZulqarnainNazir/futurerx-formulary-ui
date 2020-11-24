import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';

export default class CB extends React.Component<any,any>{
    state={
        panelGridTitle1: ['','Number of Drugs','added drugs','removed drugs'],
        panelTitleAlignment1: ['left','center','center','center'],
        panelGridValue1: [
            ['INCLUDED','0','0','0'],
            ['EXCLUDED','0','0','0']
        ]  
    }
    render(){
        return (
            <div className="bordered">
                <PanelHeader 
                    title="Capped Benefits"
                    tooltip="Ability for system to display Capped Benefits section WHEN ‘Additional Demonstration Drugs (MMP Only)’ or ‘Excluded’ is selected in “Supplemental Benefits Or Alternative Models”." />
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