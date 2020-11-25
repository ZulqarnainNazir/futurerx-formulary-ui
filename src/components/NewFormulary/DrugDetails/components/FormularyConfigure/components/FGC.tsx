import React from 'react';
import PanelHeader from './PanelHeader';
import PanelGrid from './panelGrid';

export default class FGC extends React.Component<any,any>{
    state={
        panelGridTitle1: ['Tier Number','Tier Descripion','Full Gap Coverage','Partial Gap Coverage'],
        panelTitleAlignment1: ['left','left','center','center'],
        panelGridValue1: [
          ['0','OTC', 'checkbox','checkbox'],
          ['1','Brand','checkbox','checkbox'],
          ['2','Excluded Drug Only Tier','checkbox','checkbox']
        ]  
    }
    render(){
        return (
            <div className="bordered">
                <PanelHeader 
                    title="Full Gap Coverage"
                    tooltip="Full Gap Coverage" />
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