import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';

export default class SO extends React.Component<any,any>{
    state={
        panelGridTitle1: ['Medicare User Defined Field','Number of Drugs','added drugs','removed drugs'],
        panelTitleAlignment1: ['left','center','center','center'],
        panelGridValue1: [
            ['test1','0','0','0']
        ]  
    }
    render(){
        return (
            <div className="bordered">
                <PanelHeader 
                    title="User Defined Fields"
                    tooltip="User Defined Fields" />
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