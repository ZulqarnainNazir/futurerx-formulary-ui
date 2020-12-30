import React, { Component } from "react";
import FormularyAssemblyComponentListItem from "../FormularyAssemblyComponentListItem";
import FormularyAssemblyComponentExpandableListitem from './../FormularyAssemblyComponentExpandableListitem';

interface FormularyAssemblyProps {
  data?: any
}

interface FormularyAssemblyState {

}
class FormularyAssembly extends Component<FormularyAssemblyProps, FormularyAssemblyState> {
  render() {
    return (
      <div className="formulary-assembly">
        <div className="formulary-assembly__container">
          <div className="formulary-assembly__container-header">
            <div className="formulary-assembly__container-header-title">Formulary Assembly</div>
          </div>
          
          <div className="formulary-assembly__container-body">
            <FormularyAssemblyComponentExpandableListitem>
              {this.props.data.map((currentComponent, key) => <FormularyAssemblyComponentListItem key={key} {...currentComponent} />)}
            </FormularyAssemblyComponentExpandableListitem>
            <FormularyAssemblyComponentExpandableListitem>
              {this.props.data.map((currentComponent, key) => <FormularyAssemblyComponentListItem key={key} {...currentComponent} />)}
            </FormularyAssemblyComponentExpandableListitem>
            <FormularyAssemblyComponentExpandableListitem>
              {this.props.data.map((currentComponent, key) => <FormularyAssemblyComponentListItem key={key} {...currentComponent} />)}
            </FormularyAssemblyComponentExpandableListitem>
            <FormularyAssemblyComponentExpandableListitem>
              {this.props.data.map((currentComponent, key) => <FormularyAssemblyComponentListItem key={key} {...currentComponent} />)}
            </FormularyAssemblyComponentExpandableListitem>
          </div>
        </div>
      </div>
    );
  }
}

export default FormularyAssembly;
