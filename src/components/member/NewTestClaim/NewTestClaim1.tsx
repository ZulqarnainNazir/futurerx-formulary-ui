import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import BasicList from "../../shared/FrxBasicList/FrxBasicList";
import CustomDatepicker from "../../shared/Frx-components/date-picker/CustomDatePicker";
import "./NewTestClaim1.scss";
import DiagnosisField from './diagnosisField';
import DurppsField from './durppsField';


interface NewTestClaimState {
  startDate?: any;
  dignosisFieldsCount?: any;
  purppsField?:any
  searchDiagnosis?:string
}

export class NewTestClaim1 extends React.Component<NewTestClaimState> {
  state = {
    startDate: undefined,
    diagnosisFieldsCount: 3,
    purppsFieldCount:3,
    searchDiagnosis:''
  };

  handleStartDate = date => {
    this.setState({ startDate: date });
  };

  handleSearch = (e) =>{
    console.log("from diagnoisis search ",e.target.value);
    this.setState({searchDiagnosis:e.target.value})
    
  }

  addDiagnosisFieldHandler = () => {
    let totalDiagnosis = this.state.diagnosisFieldsCount;
    totalDiagnosis += 1;
    this.setState({diagnosisFieldsCount: totalDiagnosis});
  }
  deleteDiagnosisFieldHandler = () => {
    let totalDiagnosis = this.state.diagnosisFieldsCount;
    totalDiagnosis -= 1;
    this.setState({diagnosisFieldsCount: totalDiagnosis});
  }

  addDurppsFieldHandler = () => {
    let totalDurpps = this.state.purppsFieldCount;
    totalDurpps += 1;
    this.setState({purppsFieldCount: totalDurpps});
  }
  deleteDurppsFieldHandler = () => {
    let totalDurpps = this.state.purppsFieldCount;
    totalDurpps -= 1;
    this.setState({purppsFieldCount: totalDurpps});
  }
  render() {
    return (
      <React.Fragment>
        <Grid item xs={12} className="submission">
          <div className="submission-container">
            <div className="submission-header">
              <span>Submission Fields</span>
            </div>
            <div className="submission-field">
              <div className="column-1">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">BIN#</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">PCN<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Cust<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Client<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Amount<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Member ID<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className="higlighted-value"
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='8133381165'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Person Code<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Relationship Code<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient Zip Code<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='33601-1234'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient First Name<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='Machenzie'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient Last Name<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className="higlighted-value"
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='Johnson-Robertson lll'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Date of Birth<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <CustomDatepicker
                      className="claims-search__input claims-search__input--date"
                      onChange={this.handleStartDate}
                      value={this.state.startDate}
                      placeholder="6/1/1984"
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient Gender<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value='Female'
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Rx#</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Service Provider ID<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
              </div>
              <div className="column-2">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Service Provider ID Qualifier<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Place of Service</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Patient Residence</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Days Supply<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Quantity Dispensed<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Product Service ID<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Product Service ID Qualifier<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Compound Code<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">DAW<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Date of Service<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <CustomDatepicker
                      className="claims-search__input claims-search__input--date"
                      onChange={this.handleStartDate}
                      value={this.state.startDate}
                      placeholder=""
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Date Rx Written<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <CustomDatepicker
                      className="claims-search__input claims-search__input--date"
                      onChange={this.handleStartDate}
                      value={this.state.startDate}
                      placeholder=""
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Fill Number<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Quantity Prescribed</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Refills Authorized<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Rx Origin Code</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
              </div>
              <div className="column-3">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Level of Service</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Pharmacy Service Type</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Other Coverage Code</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Special Packaging Indicator</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Unit of Measure</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Delay Reason Code</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Other Coverage Code</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Special Packaging Indicator</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Quantity Intended To Be Dispensed</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Days Supply Intended To Be Dispensed<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Submission Clarification Code Count</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">SCC1</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">SCC2</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">SCC3</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} className="cost">
          <div className="cost-container">
            <div className="submission-header">
              <span>Cost Fields</span>
            </div>
            <div className="cost-field">
              <div className="column-1">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Ingredient Cost<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Dispense Fee<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Incentive Amount</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Flat Sales Tax</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
              </div>
              <div className="column-2">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Percentage Sales Tax Amount</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Percentage Sales Tax Rate</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Percentage Sales Tax Basis</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">U&C Amount</span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
              </div>
              <div className="column-3">
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Gross Amount Due<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <div className="label">
                    <span className="">Basic of Cost Determination<span className="astrict">&#42;</span></span>
                  </div>
                  <div className="input">
                    <Input
                      className=""
                      placeholder=""
                      type="text"
                      name="claimId"
                      value=''
                    />
                  </div>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} className="authrization-prescriber">
          <Grid container>
            <Grid item xs={6}>
              <div className="authrization-container">
                <div className="authrization-header">
                  <span>Authorization Fields</span>
                </div>
                <div className="authrization-field">
                  <div className="column-1">
                    <Grid container justify="space-between" alignItems="center">
                      <div className="label">
                        <span className="">Prior Authorization Type Code</span>
                      </div>
                      <div className="input">
                        <Input
                          className=""
                          placeholder=""
                          type="text"
                          name="claimId"
                          value=''
                        />
                      </div>
                    </Grid>
                    <Grid container justify="space-between" alignItems="center">
                      <div className="label">
                        <span className="">Prior Authorization Number</span>
                      </div>
                      <div className="input">
                        <Input
                          className=""
                          placeholder=""
                          type="text"
                          name="claimId"
                          value=''
                        />
                      </div>
                    </Grid>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="prescriber-container">
                <div className="prescriber-header">
                  <span>Prescriber Fields</span>
                </div>
                <div className="prescriber-field">
                  <div className="column-1">
                    <Grid container justify="space-between" alignItems="center">
                      <div className="label">
                        <span className="">Prescriber ID</span>
                      </div>
                      <div className="input">
                        <Input
                          className=""
                          placeholder=""
                          type="text"
                          name="claimId"
                          value=''
                        />
                      </div>
                    </Grid>
                    <Grid container justify="space-between" alignItems="center">
                      <div className="label">
                        <span className="">Prescriber ID Qualifier</span>
                      </div>
                      <div className="input">
                        <Input
                          className=""
                          placeholder=""
                          type="text"
                          name="claimId"
                          value=''
                        />
                      </div>
                    </Grid>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="diagnosis-durpps">
          <Grid item xs={5}>
            <div className="bg-white">
              <div className="member-notification-root">
                <div className="member-notification-header">
                  <label className="new-test-claim-root__header-text">Diagnosis Fields</label>
                </div>

                <div className="claims-search claims-history-search">
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                      Diagnosis Code Count 3
                          </div>
                  </Grid>
                </div>
                <div className="claims-search claims-history-search">
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                      Qualifier<span className="astrict">&#42;</span>
                    </div>
                  </Grid>
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                      Diagnosis Code<span className="astrict">&#42;</span>
                    </div>
                  </Grid>
                </div>
                  {Array.from(Array(this.state.diagnosisFieldsCount), (e,i) => 
                    <DiagnosisField deleteField={this.deleteDiagnosisFieldHandler} searchDiagnosis={this.handleSearch}/>
                  )}

                <div className="diagnosis-search-results-container">
                    <BasicList
                      rows={[{ title: "F90.2", description: "Attention-deficit hyperactive disorder, combine type", date: "05/12/2020" },
                              { title: "S72.8X1A", description: "Nondisplaced segmental fracture of shaft of right femur, initial encounter for closed fracture", date: "05/12/2019" },
                              { title: "M87.28", description: "Osteonecrosis due to previous trauma, other site", date: "07/09/2018" },
                              { title: "F90.2", description: "Attention-deficit hyperactive disorder, combine type", date: "07/09/2018" },
                              { title: "S72.8X1A", description: "Nondisplaced segmental fracture of shaft of right femur, initial encounter for closed fracture", date: "05/12/2019" },
                              { title: "M87.28", description: "Osteonecrosis due to previous trauma, other site", date: "07/09/2018" },
                            ]}
                      isShowDescription={true}
                      
                      queryString={this.state.searchDiagnosis !== '' ? this.state.searchDiagnosis : ''}
                    />
                  </div>
                
                { this.state.diagnosisFieldsCount < 9 ? (
                  <div className="claims-search claims-history-search">
                    <Grid container>
                      <div className="input">
                        <Button className="addForm" onClick={this.addDiagnosisFieldHandler}>
                          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                            <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                          </svg>
                          <span className="add-diagnosis">Add Diagnosis Code <span className="limit"><span className="astrict">&#42;</span>limit 9</span></span>
                        </Button>
                      </div>
                    </Grid>
                  </div>) : null }
                </div>
            </div>
          </Grid>
          <Grid item xs={7} className="saparator">
            <div className="bg-white">
              <div className="member-notification-root">
                <div className="member-notification-header">
                  <label className="new-test-claim-root__header-text">DUR/PPS Fields</label>
                </div>

                <div className="claims-search claims-history-search">
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                      DUR/PPS Code Counter 5
                          </div>
                  </Grid>
                </div>
                <div className="claims-search claims-history-search">
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                      Reason of Service Code<span className="astrict">&#42;</span>
                    </div>
                  </Grid>
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                      Professional Service Code<span className="astrict">&#42;</span>
                    </div>
                  </Grid>
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                      Result of Service Code<span className="astrict">&#42;</span>
                    </div>
                  </Grid>
                </div>
                {Array.from(Array(this.state.purppsFieldCount), (e,i) => 
                    <DurppsField deleteField={this.deleteDurppsFieldHandler}/>
                  )}
                { this.state.purppsFieldCount < 9 ? (
                <div className="claims-search claims-history-search">
                  <Grid container justify="space-between" alignItems="center">
                    <div className="input">
                      <Button className="addForm" onClick={this.addDurppsFieldHandler}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5107 14.5104C17.8302 11.191 17.8302 5.80908 14.5107 2.48959C11.1912 -0.829891 5.80934 -0.829847 2.4899 2.48959C-0.82954 5.80903 -0.829583 11.1909 2.4899 14.5104C5.80938 17.8299 11.1913 17.8298 14.5107 14.5104ZM13.8036 13.8033C16.7326 10.8744 16.7325 6.1256 13.8036 3.1967C10.8747 0.267799 6.12595 0.267756 3.19701 3.1967C0.268064 6.12564 0.268107 10.8744 3.19701 13.8033C6.12591 16.7322 10.8747 16.7322 13.8036 13.8033Z" fill="#666666" />
                          <path d="M4.00031 8.49999C4.00031 8.77614 4.22417 8.99999 4.50031 8.99999H8.00031V12.5C8.00031 12.7761 8.22417 13 8.50031 13C8.77646 13 9.00031 12.7761 9.00031 12.5V8.99999L12.5003 8.99999C12.7765 8.99999 13.0003 8.77614 13.0003 8.49999C13.0003 8.22385 12.7765 7.99999 12.5003 7.99999H9.00031L9.00031 4.49999C9.00031 4.22385 8.77646 3.99999 8.50031 3.99999C8.22417 3.99999 8.00031 4.22385 8.00031 4.49999V7.99999H4.50031C4.22417 7.99999 4.00031 8.22385 4.00031 8.49999Z" fill="#666666" />
                        </svg>
                        <span className="add-service">Add Service Code <span className="limit"><span className="astrict">&#42;</span>limit 9</span></span>
                      </Button>
                    </div>
                  </Grid>
                  </div>) : null }
              </div>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
