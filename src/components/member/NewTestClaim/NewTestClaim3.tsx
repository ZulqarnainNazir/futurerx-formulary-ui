import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Input } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import CustomSelect from "../../shared/Frx-components/dropdown/DropDown";
import CustomDatepicker from "../../shared/Frx-components/date-picker/CustomDatePicker";


import MultiIngredientField from './multiIngredientField';

import PayerAmountField from './payerAmountField';
import PayerRejectField from './payerRejectField';
import BenefitStageField from './benefitStageField';
import SubmissionForm from './SubmissionForm';
import CostForm from './CostForm';
import AuthPrescriberForm from  './AuthrizationPrescriberForms';
import DiagnosisDURForms from './diagnosisDURForms';
import CoordinationBenefits from './CoordinationBenefits';
import MultiIngredientCompound from './MultiIngredientCompound';
import NxTransaction from './NxTransaction';

export class NewTestClaim3 extends React.Component<any,any> {
  state = {
    submissionType: 'Multi-IngredientCompound'
  }
  render() {
    const submissionType = this.state.submissionType;
    return (
      <React.Fragment>
        {
          submissionType === 'D.O Standard' || 
          submissionType === 'Multi-IngredientCompound' ||
          submissionType === 'Coordination of Benefits' ||
          submissionType === 'FIR Transaction' ? (
            <SubmissionForm />
          ) : null
        }
        {
          submissionType === 'D.O Standard' || 
          submissionType === 'Multi-IngredientCompound' ||
          submissionType === 'Coordination of Benefits' ? (
            <>
              <CostForm />
              <AuthPrescriberForm />
              <DiagnosisDURForms />
            </>
          ): null
        }
        { submissionType === 'Multi-IngredientCompound' ? (
            <MultiIngredientCompound />
          ) : null
        }
        { submissionType === 'Coordination of Benefits' ? (
            <CoordinationBenefits />
          ) : null
        }
        { submissionType === 'Nx Transaction' ? (
            <NxTransaction />
          ) : null
        }
        </React.Fragment>
    );
  }
}
