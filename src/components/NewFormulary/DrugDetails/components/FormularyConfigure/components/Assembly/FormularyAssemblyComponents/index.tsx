import React, { Component } from "react";

import FormularyAssembly from './components/FormularyAssembly';
import FormularyComponents from './components/FormularyComponents';

import './FormularyAssemblyComponents.scss';


class FormularyAssemblyComponents extends Component {
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
            <FormularyComponents/>
            <FormularyAssembly/>
          </div>
        </div>
      </div>
    );
  }
}

export default FormularyAssemblyComponents;
