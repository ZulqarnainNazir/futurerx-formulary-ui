import React, { Component } from "react";
import { getAssemblyComponentList } from "../../../../../../../../mocks/FormularyAssemblyComponentMock";

import FormularyAssembly from './components/FormularyAssembly';
import FormularyComponents from './components/FormularyComponents';


import './FormularyAssemblyComponents.scss';


class FormularyAssemblyComponents extends Component {
  state = {
    data: [...getAssemblyComponentList()]
  }
  render() {
    return (
      <div className="formulary-assembly-components">
        <div className="formulary-assembly-components__container">
          <div className="formulary-assembly-components__container-header">
            <h4 className="formulary-assembly-components__container-header-title">formulary component assembly</h4>
            <div className="formulary-assembly-components__container-header-actions">
              <div className="action">Buy from Bazaar</div>  
            </div>
          </div>
          
          <div className="formulary-assembly-components__container-body">
            <FormularyComponents data={this.state.data}/>
            <FormularyAssembly data={this.state.data}/>
          </div>
        </div>
      </div>
    );
  }
}

export default FormularyAssemblyComponents;
