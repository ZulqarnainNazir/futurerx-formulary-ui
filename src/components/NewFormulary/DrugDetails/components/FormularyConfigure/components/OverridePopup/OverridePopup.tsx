import { Grid, Input } from "@material-ui/core";
import React from "react";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import RadioButton from "../../../../../../shared/Frx-components/radio-button/RadioButton";
import './OverridePopup.scss';


export class OverridePopup extends React.Component<any, any> {
    state ={
        isNewCatSeelcted: true
    }
    handleCategoryClick = () => {
        this.setState({
            isNewCatSeelcted: !this.state.isNewCatSeelcted,
          });
    }
render(){
    return(
        <div className="override-container">
            {this.state.isNewCatSeelcted ? (
           <Grid className="override-wrapper" container spacing={1}>
                <Grid item sm={4}>
                <div className="version-grid-date-wrapper">                    
                    <div className="form">
                        <label>
                            SEARCH
                        </label>
                        <Input
                            className='override-search__input'
                            placeholder='Search Category, Class, or Drug'
                            type='text'
                            disableUnderline={true}                            
                          />  
                          <div>
                        <label className="label-wrapper">
                            or  
                        </label>
                        <div className="formulary-info-field__value">
                        <a className="input-link"  onClick={(e) => this.handleCategoryClick()}>
                          Create New Category/Class
                        </a>
                    </div>
                    </div>                       
                          
                    </div>
                    
                </div>
                </Grid>
           
                <Grid className="set-treeview-magin" item sm={7}>
                    <div className="version-grid-date-wrapper">
                    <label>
                        Category And Class Selection
                    </label>
                    </div>
                    <div className="treeview-container">
                        
                    </div>
                </Grid>
                
            </Grid>
            ):                
           
             <Grid container spacing={1}>                 
               <Grid item sm={12}>
               <div className="back-arrow">
                    &lt;
                </div>  
               <div className="formulary-info-field__value">
                <a className="input-link"  onClick={(e) => this.handleCategoryClick()}>                             
                Existing Classes
                </a>
                </div>
            </Grid>
            <Grid item sm={12}>
            <div className="version-grid-date-wrapper"> 
            <div className="form set-margin">
                <label className="set-label-margin">
                    Will this new class be assigned to an existing category?
                </label>
                <br/>
                <div className="set-radio-dimension">                
                <RadioButton label="Yes" name="override-radio" checked />
                </div>
                <div className="set-radio-dimension">
                <RadioButton label="No" name="override-radio"  />  
                </div>
            </div>
            </div>
            </Grid>
            <br/>
            <Grid item sm={12}>
            <div className="version-grid-date-wrapper set-top-margin">
                <div className="form">
                    <label>
                        Category
                    </label>
                    <DropDown className="version-grid-dropdown set-input-control-dimenion" placeholder="Select Existing Category" options={["Category 1","Category 2","Category 3"]}/>
                </div>
                <div className="form">
                    <label>
                        Class Name
                    </label>
                    <Input
                        className='override-search__input set-input-control-dimenion'
                        placeholder='Custom Class Name'
                        type='text'
                        disableUnderline={true}                            
                      />  
                </div>
            </div> 
            </Grid>
       
        </Grid>          


            }            
        </div>
    );
}
}