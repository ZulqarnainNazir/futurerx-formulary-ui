import React from "react";
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import CustomSelect from "../shared/Frx-components/dropdown/DropDown";
import CustomDatepicker from "../shared/Frx-components/date-picker/CustomDatePicker";
import Button from '@material-ui/core/Button';

import { API } from '../../api/httptemp-helper';
import { Input, InputAdornment} from "@material-ui/core";
import { Box, Tooltip,Checkbox } from "@material-ui/core";
import FrxGrid from '../shared/FrxGrid/FrxGrid';
import FrxLoader from '../shared/FrxLoader/FrxLoader';


import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";

import Container from '@material-ui/core/Container';
import {TopSection} from './NewTestClaim/TopSection'
import {NewTestClaim3} from './NewTestClaim/NewTestClaim3';


interface NewTestClaim5Props {
  isOpen: boolean;
  onClose: () => void;
  panelName: string;
  title?: string;
  classes?: any;
}

interface NewTestClaim5State {
  isTestClaimDialogOpen:boolean;
}

class NewTestClaim extends React.Component<
NewTestClaim5Props,
NewTestClaim5State
> {
  state = {
    isTestClaimDialogOpen:this.props.isOpen,
  };

  handleNewTestClaimEditDialogAction = (action: string) => {
    this.setState({ isTestClaimDialogOpen: false });
    this.props.onClose();
  };

  handleNewTestClaimEditDialogClose = () => {
    console.log("dialog close ");
    this.setState({ isTestClaimDialogOpen: false });
    this.props.onClose();
  };

  render() {
    const { isTestClaimDialogOpen} = this.state;
    return (
      <React.Fragment>
        <DialogPopup
          positiveActionText="Edit"
          negativeActionText="Cancel"
          title="New Test Claim"
          handleClose={this.handleNewTestClaimEditDialogClose}
          handleAction={this.handleNewTestClaimEditDialogAction}
          open={isTestClaimDialogOpen}
          showActions={false}
          className="new-test-claim-popup-root"
          componentTitle = {true}
        >

          <Container className="new-test-claim-components-container">
       
            <TopSection/>
            <NewTestClaim3/>
          </Container>
        </DialogPopup>
      </React.Fragment>
    );
  }
}

export default NewTestClaim;
