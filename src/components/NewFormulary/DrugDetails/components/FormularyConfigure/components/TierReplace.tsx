import React from "react";
import { connect } from 'react-redux'
import { Grid } from "@material-ui/core";
import "./Tier.scss";

import DropDown from "../../../../../shared/Frx-components/dropdown/DropDown";
import Button from "../../../../../shared/Frx-components/button/Button";
import Box from "@material-ui/core/Box";
import FrxDrugGridContainer from "../../../../../shared/FrxGrid/FrxDrugGridContainer";
import { tierColumns } from "../../../../../../utils/grid/columns";
import { TierMockData } from "../../../../../../mocks/TierMock";
import AdvancedSearch from './search/AdvancedSearch';

interface tabsState {
  tierGridContainer: boolean;
  isSearchOpen: boolean;
  fileTypes: any[];
  tierValues: any[];
  selectedTier: any;
  selectedFileKey: any;
}

const mapStateToProps = (state) => {
  return {
    configureSwitch: state.switchReducer.configureSwitch
  }
}

class TierReplace extends React.Component<any, tabsState> {
  state = {
    tierGridContainer: false,
    isSearchOpen: false,
    tierValues: Array(),
    fileValues: Array(),
    selectedTier: -1,
    selectedFileKey: null,
    fileTypes: [
      { 'type': 'FRF', 'key': 'FRF' },
      { 'type': 'ORF/ERF', 'key': 'OTC' },
      { 'type': 'Non FRF Products', 'key': 'NONFRF' },
      { 'type': 'FRF Change Report', 'key': 'FRFCR' },
      { 'type': 'Full Formulary', 'key': 'MCR' }
    ]
  };

  constructor(props) {
    super(props);

    var tierOptions = Array();
    if (this.props.tierOptions) {
      this.props.tierOptions.map(tier => {
        tierOptions.push(tier.tier_value);
      });
    }
    let fileTypesModified: any[] = [];

    this.state.fileTypes.map(fileType => {
      if (fileType.type === 'Full Formulary') {
        fileType.key = this.props.lobCode;
      }
      fileTypesModified.push(fileType);
    });
    this.state.fileTypes = fileTypesModified;
    this.state.tierValues = tierOptions;
  }

  tierDropDownSelectHandler = (value, event) => {
    let tierIndex = event.key;
    let tierValue = event.value;

    if (this.props.tierOptions && tierIndex < this.props.tierOptions.length) {
      let tierObject = this.props.tierOptions[tierIndex]
      if (tierObject.tier_label && tierObject.tier_label === 'OTC') {
        this.state.fileValues.push('ORF/ERF');
        this.state.fileValues.push('Full Formulary');
      } else {
        this.state.fileTypes.map(fileType => {
          this.state.fileValues.push(fileType.type);
        });
      }
    }
    this.setState({ selectedTier: tierValue });
  }

  fileTypeDropDownSelectHandler = (value, event) => {
    let fileType = event.value.toString().trim();
    let fileKey = this.props.lobCode;

    if (fileType) {
      let filtered = this.state.fileTypes.filter(fileObject => fileObject.type.toString().trim() === fileType);
      if (filtered && filtered.length > 0) {
        fileKey = filtered[0].key;
      }
    }
    console.log("Selected file key is:" + fileKey);
    this.setState({ selectedFileKey: fileKey });
  }

  openTierGridContainer = () => {
    this.setState({ tierGridContainer: true });
  };
  advanceSearchClickHandler = (event) => {
    event.stopPropagation();
    this.setState({ isSearchOpen: !this.state.isSearchOpen })
  }
  advanceSearchClosekHandler = () => {
    this.setState({ isSearchOpen: !this.state.isSearchOpen })
  }
  render() {
    return (
      <>
        <div className="group tier-dropdown white-bg">
          <Grid container>
            <Grid item xs={4}>
              <label>
                TIER <span className="astrict">*</span>
              </label>
              <DropDown options={this.state.tierValues} disabled={this.props.configureSwitch} onSelect={this.tierDropDownSelectHandler} />
            </Grid>
            <Grid item xs={1}>
              <Box display="flex" justifyContent="flex-end">
                <Button label="Apply" onClick={this.openTierGridContainer} disabled={this.props.configureSwitch} />
              </Box>
            </Grid>
          </Grid>
        </div>
        {this.state.tierGridContainer && (
          <div className="select-drug-from-table">
            <div className="bordered white-bg">
              <div className="header space-between pr-10">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ marginRight: 10 }}>Select Drugs From</span>
                  <DropDown options={this.state.fileValues} disabled={this.props.configureSwitch} onSelect={this.fileTypeDropDownSelectHandler} />
                </div>
                <div className="button-wrapper">
                  <Button className="Button normal" label="Advance Search" onClick={this.advanceSearchClickHandler}/>
                  <Button label="Save" disabled />
                </div>
              </div>

              <div className="tier-grid-container">
                <FrxDrugGridContainer
                  isPinningEnabled={false}
                  enableSearch={false}
                  enableColumnDrag
                  onSearch={() => { }}
                  fixedColumnKeys={[]}
                  pagintionPosition="topRight"
                  gridName="TIER"
                  enableSettings={false}
                  columns={tierColumns()}
                  scroll={{ x: 2000, y: 377 }}
                  isFetchingData={false}
                  enableResizingOfColumns
                  data={TierMockData()}
                  rowSelection={{
                    columnWidth: 50,
                    fixed: true,
                    type: "checkbox",
                  }}
                />
              </div>
            </div>
            {this.state.isSearchOpen ? (
              <AdvancedSearch
                category="Grievances"
                openPopup={this.state.isSearchOpen}
                onClose={this.advanceSearchClosekHandler} />
            ) : (
                null
              )}
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(TierReplace);
