import React, { Component } from "react";
import { getAssemblyComponentList } from "../../../../../../../../mocks/FormularyAssemblyComponentMock";

import FormularyAssembly from './components/FormularyAssembly';
import FormularyComponents from './components/FormularyComponents';


import './FormularyAssemblyComponents.scss';

const FormularyAssemblySections = [
  { id: 1, text: "Tier" },
  { id: 2, text: "QL" },
  { id: 3, text: "ST" },
  { id: 4, text: "PA" },
  { id: 5, text: "Drug Details" },
]

interface AssemblyList {
  id?: any;
  title?: string;
  tag?: string;
  description?: string;
}


interface FormularyAssemblyComponentsProps {
  id?: any;
  title?: string;
  tag?: string;
  description?: string;
}

interface FormularyAssemblyComponentsState {
  componentList?: any
  assemblyList?: any
}


class FormularyAssemblyComponents extends Component<FormularyAssemblyComponentsProps, FormularyAssemblyComponentsState> {
  state = {
    componentList: [...getAssemblyComponentList()],
    assemblyList: Array()
  }
  
  handleOnComponentAdd = (index: number) => {
    const { assemblyList, componentList } = this.state;
    let newList = [...assemblyList, componentList[index]]
    
    this.setState({
      assemblyList: JSON.parse(JSON.stringify(newList))
    });
  }
  
  handleOnComponentRemoveFromAssembly = (id: number) => {
    const { assemblyList } = this.state;
    let removeItemIndex = assemblyList.map(item=>item.id).indexOf(id); 
    let newList = [...assemblyList];
    newList.splice(removeItemIndex, 1);
    
    this.setState({
      assemblyList: JSON.parse(JSON.stringify(newList))
    });
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
            <FormularyComponents data={this.state.componentList} onComponentAdd={this.handleOnComponentAdd}/>
            <FormularyAssembly data={this.state.assemblyList} sections={FormularyAssemblySections} onComponentRemove={this.handleOnComponentRemoveFromAssembly}/>
          </div>
        </div>
      </div>
    );
  }
}

export default FormularyAssemblyComponents;
