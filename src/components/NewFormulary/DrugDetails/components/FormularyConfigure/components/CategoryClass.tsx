import React from "react";
import { connect } from "react-redux";
import { Grid, Input } from "@material-ui/core";
import "./Tier.scss";
import DialogPopup from "../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../../mocks/formulary/mock-data";
import PanelHeader from "./PanelHeader";
import PanelGrid from "./panelGrid";
import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import {
  categoryCommercialClassColumns,
  categoryClassColumns,
} from "../../../../../../utils/grid/columns";
import {
  categoryClassMock,
  categoryCommercialClassMock,
} from "../../../../../../mocks/categoryClassMock";
import STPopup from "./STPopup/STpopup";
import FormularyDetailsContext from "../../../../FormularyDetailsContext";
import FrxGridContainer from "../../../../../shared/FrxGrid/FrxGridContainer";
import { OverridePopup } from "./OverridePopup/OverridePopup";
import { getTier } from "../../../../../../redux/slices/formulary/tier/tierActionCreation";
import { getClassificationSystems, postDrugsCategory } from "../../../../../../redux/slices/formulary/categoryClass/categoryClassActionCreation";
import * as tierConstants from "../../../../../../api/http-tier";
import * as commonConstants from "../../../../../../api/http-commons";
import * as categoryConstants from "../../../../../../api/http-category-class";
import getLobCode from "../../../../Utils/LobUtils";

function mapDispatchToProps(dispatch) {
  return {
    getTier: (a) => dispatch(getTier(a)),
    getClassificationSystems: (a) => dispatch(getClassificationSystems(a)),
    postDrugsCategory: (a) => dispatch(postDrugsCategory(a)),
  };
}

const mapStateToProps = (state) => {
  return {
    formulary_id: state?.application?.formulary_id,
    formulary: state?.application?.formulary,
    formulary_lob_id: state?.application?.formulary_lob_id,
    formulary_type_id: state?.application?.formulary_type_id
  };
};

interface State {
  activeMiniTabIndex: number;
  miniTabs: any;
  tabs: any;
  materialPopupInd: any;
  show: any;
  isSearchOpen: false;
  columns: any;
  data: any;
  filteredData: any;
  tierOption: any[];
  classificationSystems: any[];
  lobCode: any;
  filter: any[];
}

class CategoryClass extends React.Component<any, any> {
  state = {
    miniTabs: getMiniTabs(),
    isFetchingData: false,
    activeMiniTabIndex: 0,
    activeTabIndex: 0,
    tabs: getTapList(),
    materialPopupInd: false,
    show: false,
    isSearchOpen: false,
    popupName: "",
    title: "",
    columns: [] as any,
    data: [] as any,
    filteredData: Array(),
    tierOption: Array(),
    classificationSystems: Array(),
    showActionsInd: false,
    lobCode: 'MCR',
    filter: Array(),
  };
  static contextType = FormularyDetailsContext;

  populateTierDetails = () => {
    let apiDetails = {};
    apiDetails['apiPart'] = tierConstants.FORMULARY_TIERS;
    apiDetails['pathParams'] = this.props?.formulary_id;
    apiDetails['keyVals'] = [{ key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }];
    const thisRef = this;

    const TierDefinationData = this.props.getTier(apiDetails).then((json => {
      let tmpData = json.payload.data;
      tmpData.map(function (el) {
        var element = Object.assign({}, el);
        thisRef.state.tierOption.push(element);
      })
    }))
  }

  populateClassificationDetails = () => {
    let apiDetails = {};
    apiDetails['apiPart'] = categoryConstants.CLASSIFICATION_SYSTEMS;
    apiDetails['pathParams'] = this.props?.formulary_type_id + "/" + this.props?.formulary_id;
    const thisRef = this;

    const data = this.props.getClassificationSystems(apiDetails).then((json => {
      let tmpData = json.payload.data;
      tmpData.map(function (el) {
        var element = Object.assign({}, el);
        thisRef.state.classificationSystems.push(element);
      })
    }))
  }

  populateGridData = (searchBody = null) => {
    console.log('Populate grid data is called');
    let apiDetails = {};
    apiDetails['apiPart'] = categoryConstants.DRUGS_CATEGORY;
    /*apiDetails['pathParams'] = this.props?.formulary_id + "/" + this.state.lobCode;
    apiDetails['keyVals'] = [{ key: commonConstants.KEY_ENTITY_ID, value: this.props?.formulary_id }, { key: commonConstants.KEY_INDEX, value: 0 }, { key: commonConstants.KEY_LIMIT, value: 10 }];
    apiDetails['messageBody'] = { filter: this.state.filter };

    if (searchBody) {
      apiDetails['messageBody'] = Object.assign(apiDetails['messageBody'], searchBody);
    }*/
    const thisRef = this;

    const drugGridData = this.props.postDrugsCategory(apiDetails).then((json => {
      //debugger;
      if (json.payload && json.payload.result) {
        let tmpData = json.payload.result;
        var data: any[] = [];
        let count = 1;
        var gridData = tmpData.map(function (el) {
          var element = Object.assign({}, el);
          data.push(element)
          let gridItem = {};
          gridItem['id'] = count;
          gridItem['key'] = count;
          gridItem['fileType'] = element.file_type ? "" + element.file_type : "";
          gridItem['labelName'] = element.drug_label_name ? "" + element.drug_label_name : "";
          gridItem['ndc'] = "";
          if (thisRef.props.formulary_lob_id == 1) {
            gridItem['rxcui'] = element.rxcui ? "" + element.rxcui : "";
          } else {
            gridItem['ddid'] = element.drug_descriptor_identifier ? "" + element.drug_descriptor_identifier : "";
          }
          gridItem['gpi'] = element.generic_product_identifier ? "" + element.generic_product_identifier : "";
          gridItem['databaseCategory'] = element.database_category ? "" + element.database_category : "";
          gridItem['databaseClass'] = element.database_class ? "" + element.database_class : "";
          gridItem['overrideCategory'] = element.database_category ? "" + element.database_category : "";
          gridItem['overRideClass'] = element.database_class ? "" + element.database_class : "";
          count++;
          return gridItem;
        })
        const columns = this.getColumns();
        this.setState({
          columns: columns,
          data: data,
          filteredData: gridData,
        });
      }
    }))
  }



  onInputValueChanged = (event) => {
    if (event.target.value) {
      this.state.filter = [];
      if (this.props.formulary_lob_id == 1) {
        this.state.filter.push({ prop: "drug_descriptor_identifier", operator: "is_like", values: [event.target.value] });
      } else {
        this.state.filter.push({ prop: "rxcui", operator: "is_like", values: [event.target.value] });
      }
      this.state.filter.push({ prop: "ndc", operator: "is_like", values: [event.target.value] });
      this.state.filter.push({ prop: "generic_product_identifier", operator: "is_like", values: [event.target.value] });
      this.state.filter.push({ prop: "drug_label_name", operator: "is_like", values: [event.target.value] });
      this.state.filter.push({ prop: "database_class", operator: "is_like", values: [event.target.value] });
      this.state.filter.push({ prop: "database_category", operator: "is_like", values: [event.target.value] });
    }
  }

  componentDidMount() {
    this.populateTierDetails();
    this.populateClassificationDetails();

    this.state.lobCode = getLobCode(this.props.formulary_lob_id);

    this.populateGridData();
  }

  getColumns = () => {
    switch (this.props.formulary_lob_id) {
      case 4:
        return categoryCommercialClassColumns();
        break;
      case 1:
        return categoryClassColumns();
        break;
      default:
        break;
    }
  };

  getColumnsData = () => {
    switch (this.props.formulary_lob_id) {
      case 4:
        return categoryCommercialClassMock();
        break;
      case 1:
        return categoryClassMock();
        break;
      default:
        break;
    }
  };

  onClickMiniTab = (num: number) => {
    this.setState({
      activeMiniTabIndex: num,
    });
  };

  onClose = () => {
    console.log("close");
    this.setState({ materialPopupInd: false });
    return true;
  };
  handleAddFileClick = () => { };

  handlePopupButtonClick = (popupName, title) => {
    this.setState({
      materialPopupInd: true,
      popupName: popupName,
      title: title,
    });
    if (popupName === "override") {
      this.setState({
        showActionsInd: true,
      });
    }
    else {
      this.setState({
        showActionsInd: false,
      });
    }

  };
  processCloseActions = () => {
    this.setState({ show: true });
  };
  handleSearch = (searchObject) => {
    console.log("search");
  };
  rowSelectionChange = (record) => {
    console.log(record);
  };
  render() {
    return (
      <div className='drug-detail-LA-root'>
        <div className='drug-detail-la-container'>
          <div className='drug-detail-la-inner'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className='mb-10'>
                  <div className='limited-access'>
                    <PanelHeader
                      title='Category/Class View And ASSIGNMENT'
                      tooltip='This section allows for Addition or Removal of product only. To define coverage for all Medicare covered and/or Supplemental products, go to Drug Details'
                    />
                  </div>
                </div>
                <div className='bordered'>
                  <div className='header space-between pr-10'>
                    <div className='button-wrapper'>
                      {!this.props.isReadOnly &&
                        this.props.formulary_lob_id === 4 && (
                          <div className="float-left">
                            <div
                              className='add-file-button'
                              onClick={(e) => this.handlePopupButtonClick("override", "CATEGORY AND CLASS ASSIGNMENT")}
                            >
                              Override
                          </div>
                            <Input
                              className='member-search__input'
                              placeholder='Search'
                              type='text'
                              disableUnderline={true}
                              startAdornment={
                                <svg
                                  className='member-search__icon'
                                  width='11'
                                  height='11'
                                  viewBox='0 0 11 11'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z'
                                    fill='#999999'
                                  />
                                </svg>
                              }
                              onChange={this.onInputValueChanged}
                            />
                          </div>
                        )}
                      {!this.props.isReadOnly &&
                        this.props.formulary_lob_id === 1 && (
                          <div className="float-left">
                            <Input
                              className='member-search__input'
                              placeholder='Search'
                              type='text'
                              disableUnderline={true}
                              startAdornment={
                                <svg
                                  className='member-search__icon'
                                  width='11'
                                  height='11'
                                  viewBox='0 0 11 11'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M10.8504 9.5102L8.70825 7.36842C8.61157 7.27175 8.4805 7.21805 8.34299 7.21805H7.99277C8.58578 6.45972 8.93815 5.50591 8.93815 4.46831C8.93815 2 6.93781 0 4.46908 0C2.00034 0 0 2 0 4.46831C0 6.93663 2.00034 8.93663 4.46908 8.93663C5.50685 8.93663 6.46082 8.58432 7.21928 7.99141V8.34157C7.21928 8.47905 7.27299 8.6101 7.36968 8.70677L9.51183 10.8485C9.7138 11.0505 10.0404 11.0505 10.2402 10.8485L10.8483 10.2406C11.0502 10.0387 11.0502 9.71214 10.8504 9.5102ZM4.46908 7.21805C2.95002 7.21805 1.71888 5.98926 1.71888 4.46831C1.71888 2.94952 2.94787 1.71858 4.46908 1.71858C5.98813 1.71858 7.21928 2.94737 7.21928 4.46831C7.21928 5.98711 5.99028 7.21805 4.46908 7.21805Z'
                                    fill='#999999'
                                  />
                                </svg>
                              }
                              onChange={this.onInputValueChanged}
                            />
                            <div
                              className='add-file-button margin-right'
                              onClick={(e) => this.handlePopupButtonClick("override", "CATEGORY AND CLASS ASSIGNMENT")}
                            >
                              Override
                          </div>
                          </div>
                        )}
                      {!this.props.isReadOnly ? (
                        <div
                          className='advance-search-button'
                          onClick={(e) => this.handlePopupButtonClick("advancesearch", "Advanced Search")}
                        >
                          Advanced Search
                        </div>
                      ) : null}
                      {!this.props.isReadOnly ? (
                        <Button label='Save' className='Button' disabled />
                      ) : null}
                    </div>
                  </div>
                  <FrxGridContainer
                    enableSearch={false}
                    enableColumnDrag={false}
                    onSearch={this.handleSearch}
                    fixedColumnKeys={[]}
                    pagintionPosition='topRight'
                    gridName=''
                    enableSettings={false}
                    isFetchingData={this.state.isFetchingData}
                    columns={this.state.columns}
                    isPinningEnabled={false}
                    scroll={{ x: 0, y: 377 }}
                    enableResizingOfColumns={false}
                    data={this.state.filteredData}
                    isCustomCheckboxEnabled={true}
                    handleCustomRowSelectionChange={this.rowSelectionChange}
                    settingsTriDotClick={() => {
                      console.log("object");
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <DialogPopup
          className='frx-override-result-root'
          showCloseIcon={this.state.showActionsInd}
          positiveActionText="Assign"
          negativeActionText="Cancel"
          title={this.state.title}
          handleClose={() => {
            this.onClose();
          }}
          handleAction={() => {
            this.processCloseActions();
          }}
          showActions={this.state.showActionsInd}
          open={this.state.materialPopupInd}
        >
          {this.state.popupName === "advancesearch" ?
            <STPopup />
            : this.state.popupName === "override" ?
              <OverridePopup />
              : ""
          }
        </DialogPopup>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryClass);