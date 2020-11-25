import { Button, Card } from '@material-ui/core'
import { Dropdown } from 'antd';
import React, { Component } from 'react'
import DropDown from '../shared/Frx-components/dropdown/DropDown';
import "./FormularyHeading.scss";

export default class FormularyHeading extends Component {
    render() {
        return (
            <div className="formularyHeading">
                <div className="fh-content">
                   <div className="row-one">
                   <div   className="rowLeft">
                   <h4>
                   Formulary grid <span style={{marginLeft:"5px", marginRight:"5px"}}>{">"}</span>
                   </h4>
                    
                   <div>
                      <h3> 2021Care926-1</h3>
                   </div>

                   </div>

                    <div className="rowRight">
                  version 1
                    </div>
                   </div>


                   <div className="row-two">
                    <Button style={{backgroundColor:"#684999", color:"white", borderRadius:"50px",fontSize:"10px"}}> Medicare</Button>
                    <div className="date"><span style={{fontSize:"14px"}}>Effective Date:</span> <span style={{marginLeft:"5px", fontSize:"14px"}}>09/22/2019</span></div>
                   </div>
                </div>
            </div>
        )
    }
}
