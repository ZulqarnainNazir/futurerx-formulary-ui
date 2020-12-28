import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import "./CompareView.scss";
import vector from "../../../../../../assets/img/Vector.png";
import "../../../../../shared/FrxGrid/FrxGridContainer.scss";
import { ReactComponent as EditIcon } from "../../../../../../assets/icons/EditIcon.svg";
import "./CompareView.scss";
import CloneFormularyPopup from "../../FormularySetUp/components/CloneFormularyPopup";

enum PopUpTypes {
  TYPE1 = "SELECTFORMULARY",
  TYPE2 = "VIEWFULLFORMULARY",
}
interface Props {
  onClose: any;
  openPopup: boolean;
  className?: string;
  mode?: "single" | "multi";
  selectedItem?: any;
  type: string;
}

interface State {
  selectFormulary: boolean;
  show: boolean;
}

class CompareFormularies extends React.Component<any, any> {
  state = {
    selectFormulary: false,
    show: false,
    PopUpType: PopUpTypes.TYPE2,
    hidden: false,
    currentPopupType: 0,
    baseFormulary: {},
    referenceFormulary: {},
  };
  POPUP_TYPE_BASE = 0;
  POPUP_TYPE_REFERENCE = 1;
  onClose = () => {
    console.log("close");
    this.setState({ selectFormulary: false });
    return true;
  };
  handleIconClick = (popupType) => {
    this.setState({ selectFormulary: true, currentPopupType: popupType });
  };

  selectFormularyClick = (dataRow) => {
    console.log(dataRow);
    if(dataRow){
      if(this.state.currentPopupType === this.POPUP_TYPE_BASE){
        this.state.baseFormulary = dataRow;
      }else if(this.state.currentPopupType === this.POPUP_TYPE_REFERENCE){
        this.state.referenceFormulary = dataRow;
      }
    }
    this.setState({ selectFormulary: false });
  };

  formularyToggle = () => {
    const type =
      this.state.PopUpType === PopUpTypes.TYPE1
        ? PopUpTypes.TYPE2
        : PopUpTypes.TYPE1;
    this.setState({
      PopUpType: type,
    });
  };
  render() {
    return (
      <div className="compare-formularies-container">
        <h6>Select formularies for comparison</h6>
        <div className="formulary-form formulay-label">
          <Grid container>
            <Grid item xs={4}>
              <div className="group select-formulary-name">
                <label>
                  Base <span className="astrict">*</span>
                </label>
                <div className="input-element">
                  <div className="bordered pointer bg-green">
                    <span onClick={(e) => this.handleIconClick(this.POPUP_TYPE_BASE)}
                          className="inner-font">
                       {this.state.baseFormulary['formulary_name'] ? this.state.baseFormulary['formulary_name'] : 'Select Formulary'}
                    </span>
                    <EditIcon
                      onClick={(e) => this.handleIconClick(this.POPUP_TYPE_BASE)}
                      className={this.state.hidden ? "hide-edit-icon" : ""}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className="compare-vector-wrapper">
                <div className="group">
                  <img src={vector} className="vector-icon" alt="vector" />
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="group select-formulary-name">
                <div className="formulary-relative">
                  <label>
                    Reference <span className="astrict">*</span>
                  </label>
                </div>

                <div className="input-element">
                  <div className="bordered pointer bg-green">
                    <span
                      onClick={(e) => this.handleIconClick(this.POPUP_TYPE_REFERENCE)}
                      className="inner-font"
                    >
                      {this.state.referenceFormulary['formulary_name'] ? this.state.referenceFormulary['formulary_name'] : 'Select Formulary'}
                    </span>
                    <EditIcon
                      onClick={(e) => this.handleIconClick(this.POPUP_TYPE_REFERENCE)}
                      className={this.state.hidden ? "hide-edit-icon" : ""}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
              <Box
                display="flex"
                justifyContent="flex-end"
                className="compare-btn"
              >
                <Button label="Compare" onClick={(event) => this.props.handleCompareBtn(this.state.baseFormulary,this.state.referenceFormulary)} />
              </Box>
            </Grid>
          </Grid>
        </div>
        {this.state.selectFormulary ? (
          <DialogPopup
            positiveActionText=""
            negativeActionText="Close"
            title={
              "Select Formulary"
            }
            handleClose={() => {
              this.setState({
                selectFormulary: !this.state.selectFormulary,
              });
            }}
            handleAction={() => {}}
            open={this.state.selectFormulary}
            showActions={false}
            className=""
            height="80%"
            width="90%"
          >
            {/* <SelectFormularyPopUp formularyToggle={this.formularyToggle} /> */}
            {/* <CloneFormularyPopup type="medicare" /> */}
            <CloneFormularyPopup
              type="commercial" // type will be dynamic based on the LOB
              selectFormularyClick={this.selectFormularyClick}
            />
          </DialogPopup>
        ) : null}
      </div>
    );
  }
}
export default CompareFormularies;
