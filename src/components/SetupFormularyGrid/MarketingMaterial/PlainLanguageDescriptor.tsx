import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../shared/Frx-components/dropdown/DropDown";
import Box from '@material-ui/core/Box';
import Button from "../../shared/Frx-components/button/Button";
import './PlainLanguageDescriptor.scss';
import { Collapse } from 'antd';
import './CostShareDetails.scss';

export default class PlainLanguageDescriptor extends React.Component<any, any> {
  render() {
    const { Panel } = Collapse;
    return (
      <div className="plain-language-container">
          <div className="list-wrapper">
            <Grid container>
                <Grid item xs={6}>
                    <div className="list-name-wrapper">
                        <Grid item xs={8}>
                        <div className="group">
                            <label>List Names</label>
                            <input type="text" className="base-input" />
                        </div>
                        </Grid>
                        <Grid item xs={3}>
                            <Box display="flex" justifyContent="flex-end" className="create-list-btn">
                                <Button label="Create List" />
                            </Box>
                        </Grid>
                        
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="list-name-wrapper">
                        <Grid item xs={8}>
                            <div className="group">
                                <label>
                                SELECTED LIST
                                </label>
                                <DropDown
                                className="list-dropdown"
                                options={[2018, 2019, 2020]}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <Box display="flex" justifyContent="flex-end" className="apply-btn">
                                <Button label="Apply" />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box display="flex" justifyContent="flex-end" className="apply-btn">
                                <Button label="Clone" />
                            </Box>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="plain-language-grid-container">
                        <div className="cost-share-details_content">
                                <div className="headings plain-language-headings">
                                    <div className="item category">category</div>
                                    <div className="item category-desc">category descriptor</div>
                                    <div className="item class-item">class</div>
                                    <div className="item class-desc">class descriptor</div>
                                </div>
                                <div className="body">    
                                    <div className="row">
                                        <div className="item category plain-item category-item">Override Category</div>
                                        <div className="item category-desc plain-item plain-lang-input"><input type="text" /></div>
                                        <div className="item class-item plain-item">hd</div>
                                        <div className="item class-desc plain-item class-descriptor-item plain-lang-input">
                                            <span className="prefix percent">%</span>
                                            {/* <DropDown options={['Copay','Co-Insurance']} value={e.costVal/> */}
                                        </div>
                                    </div>   
                                </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
          </div>
      </div>
    );
  }
}
