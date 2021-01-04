import React, { Component } from "react";
import FormularyAssemblyComponentListItem from "../FormularyAssemblyComponentListItem";
import FormularyAssemblyComponentExpandableListitem from './../FormularyAssemblyComponentExpandableListitem';

interface FormularyAssemblyProps {
  data?: any;
  sections?: any;
  onComponentRemove?: any
}

interface FormularyAssemblyState {

}
class FormularyAssembly extends Component<FormularyAssemblyProps, FormularyAssemblyState> {
  render() {
    const {data, sections} = this.props;
    
    return (
      <div className="formulary-assembly">
        <div className="formulary-assembly__container">
          <div className="formulary-assembly__container-header">
            <div className="formulary-assembly__container-header-title">Formulary Assembly</div>
          </div>
          
          <div className="formulary-assembly__container-body">
            {
              sections.map((section, key)=>(
                <FormularyAssemblyComponentExpandableListitem key={key} title={section.text}>
                  
                  {
                    (data && data.length > 0) ? data.filter(item => item.tag === section.text).map((currentComponent, key) => <FormularyAssemblyComponentListItem type="assembly" key={key} {...currentComponent} onRemove={this.props.onComponentRemove}/>) : ""
                  }
                </FormularyAssemblyComponentExpandableListitem>
                
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default FormularyAssembly;
