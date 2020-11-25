import { Button, Card } from '@material-ui/core'
import React, { Component } from 'react'
import FormularySearch from '../formulary/Components/FormularySearch/FormularySearch'
import DropDown from '../shared/Frx-components/dropdown/DropDown'
import TextBox from '../shared/Frx-components/text-box/TextBox'
import FormularyBody from './FormularyBody'
import FormularyHeading from './FormularyHeading'



 
export default class SetupFormularyGrid extends Component {
    render() {
        return (
            <div>
                <div>
                    <FormularyHeading/>
                </div>
                <div className="formularyBody">
                   <FormularyBody />
                </div>
            </div>
        ) 
    }
}
