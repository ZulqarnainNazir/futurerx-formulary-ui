import { Card } from '@material-ui/core'
import { ArrowDownward, ArrowDropDown, ExpandLess } from '@material-ui/icons'
import React, { Component } from 'react'
import Table from '../../shared/Frx-components/table/Table'

export default class HmpsSubmissionTable extends Component {
    render() {
        return (
            <div className="hmpsSubmissionTable">
                <Card style={{border:"1px solid grey",}} className="header">
                    <div style={{padding:"10px",}}>
                    HMPS SUBMISSION AND SUPPLEMENTAL OR ALTERNATIVE MODAL FORMULARY FILES 
                    </div>
               
                <hr/>

                <Card style={{border:"1px solid grey", padding:"0px", margin:"10px",}}>
                      <div style={{display:"flex", }}>
                          <div style={{display:"flex", flexDirection:"column",  }}>
                              <div style={{ padding:"5px",}}>
                                 settings
                                 
                              </div>
                              <hr/>
                              <div  style={{ padding:"5px",}}>
                                  dots
                                  
                              </div>
                              <hr />
                              <div  style={{ padding:"5px",}}>
                                  dots
                                  
                              </div>
                              <hr />
                              <div  style={{ padding:"5px",}}>
                                  dots
                                  
                              </div>
                              <hr />
                              <div  style={{ padding:"5px",}}>
                                  dots
                                  
                              </div>
                              <hr />
                              <div  style={{ padding:"5px",}}>
                                  dots
                                  
                              </div>
                              {/* <hr /> */}
                          </div>

                             <div style={{ borderLeft: "1px solid grey", height: "auto"}} className="vl"></div>
                                           

                          <div style={{display:"flex", flexDirection:"column",  }}>
                          <div style={{ padding:"5px",}}>
                                 checkbox
                                 
                              </div>
                              <hr/>
                              <div  style={{ padding:"5px",}}>
                              checkbox
                                  
                              </div>
                              <hr />
                              <div  style={{ padding:"5px",}}>
                              checkbox
                                  
                              </div>
                              <hr />
                              <div  style={{ padding:"5px",}}>
                              checkbox
                                  
                              </div>
                              <hr />
                              <div  style={{ padding:"5px",}}>
                              checkbox
                                  
                              </div>
                              <hr />
                              <div  style={{ padding:"5px",}}>
                              checkbox
                                  
                              </div>
                          </div>
                         
                          <div style={{ borderLeft: "1px solid grey", height: "auto"}} className="vl"></div>


                          <div style={{display:"flex",width:"727px" ,justifyContent:"space-between", }} className="extendedRow">
                             <div style={{display:"flex", flexDirection:"column"}}>
                              <div style={{display:"flex", alignItems:"center", padding:"5px"}}>
                                  <span>
                                      Files
                                  </span>
                                  <ArrowDropDown fontSize="small" />
                                  
                              </div>
                              <hr style={{width:"670px"}} />
                              <div  style={{ padding:"5px",}}> 
                              {/* borderBottom:"1px solid black"  */}
                              Excluded Drug
                                  
                              </div>
                              <hr style={{width:"100%"}} />
                              <div  style={{ padding:"5px",}}>
                              Free First Fill
                                  
                              </div>
                              <hr style={{width:"100%"}} />
                              <div  style={{ padding:"5px",}}>
                              Home Infusion
                                  
                              </div>
                              <hr style={{width:"100%"}} />
                              <div  style={{ padding:"5px",}}>
                              HPMS Delta Formulary File
                                  
                              </div>
                              <hr style={{width:"100%"}} />
                              <div  style={{ padding:"5px",}}>
                              HPMS Full Formulary File
                                  
                              </div>
                              
                             </div>

                             <div style={{ display:"flex", flexDirection:"column",  marginRight:"3px"}}>
                            <div style={{ padding:"5px",}} >
                               filterImg
                             </div>
                             <hr/>
                             {/* <div style={{borderBottom:"1px solid grey", marginTop:"45px" }}></div> */}
                             <hr style={{marginTop:"38.5px", width:"63.81"}}/>
                             <hr style={{marginTop:"39px", width:"63.81"}}/>
                             <hr style={{marginTop:"38.5px", width:"63.81"}}/>
                             <hr style={{marginTop:"38.5px", width:"63.81"}}/>
                             
                            
                          </div>
                          </div>
                          
                          {/* <div style={{ borderLeft: "2px solid white", height: "auto"}} className="vl"></div> */}

                          <div style={{display:"flex",width:"405px", justifyContent:"space-between" }} className="extendedRow">
                             <div style={{display:"flex", flexDirection:"column"}}>
                              <div style={{display:"flex", alignItems:"center", padding:"5px"}}>
                                  <span>
                                      Last Generated
                                  </span>
                                  <ArrowDropDown fontSize="small" />
                              </div>
                              <hr style={{width:"405px"}} />
                              <div  style={{ padding:"5px",}}>
                              Label
                                  
                              </div>
                              <hr style={{width:"405px"}} />
                              <div  style={{ padding:"5px",}}>
                             Label
                                  
                              </div>
                              <hr style={{width:"100%"}} />
                              <div  style={{ padding:"5px",}}>
                              Label
                                  
                              </div>
                              <hr style={{width:"100%"}} />
                              <div  style={{ padding:"5px",}}>
                              Label
                                  
                              </div>
                              <hr style={{width:"100%"}} />
                              <div  style={{ padding:"5px",}}>
                              Label
                                  
                              </div>
                              
                             </div>

                            <div style={{display:"flex", flexDirection:"column"}}>
                            <div style={{ padding:"5px",}} >
                               filterImg
                             </div>
                             <hr style={{width:"100%"}} />
                          </div>
                            </div>
                          
                      </div>
                </Card>
                </Card>

            </div>
        )
    }
}
