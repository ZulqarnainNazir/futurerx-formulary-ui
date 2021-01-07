import React, { Component } from 'react'
import Button from '../../../../../../shared/Frx-components/button/Button';
import DialogPopup from '../../../../../../shared/FrxDialogPopup/FrxDialogPopup';
import Choice from './components/Choice';
import './UploadFiles.scss';

export interface UploadFilesProps {
  
}

export interface UploadFilesState {
  modalStatus?: boolean;
  loadingFileType?: string;
  choiceType?: string;
  step?: number;
}

const initialState = {
  step: 1,
  modalStatus: false,
  loadingFileType: "",
  choiceType: ""
}

/**
 * Handling the state for all the step of upload files here in the UploadFiles component
 */

class UploadFiles extends Component<UploadFilesProps, UploadFilesState> {
  state = {
    step: 1,
    modalStatus: false,
    loadingFileType: "",
    choiceType: ""
  }
  
  handleCloseModal = () => {
    this.setState({...JSON.parse(JSON.stringify({...initialState}))});
  }
  
  handleOpenModal = () => {
    this.setState({
      modalStatus: true
    })
  }
  
  handleChoice = (key, value) => {
    this.setState({
      [key] : value
    });
  }
  
  handleContinueAction = () => {
    const { step, loadingFileType } = this.state
    
    if(step === 1) {
      if(loadingFileType) {
        this.setState({
          step: 2
        })
      }
    }
    
    /**Todo: Handle the modal step logic here, When user clicks on continue for step 2, Set the step to 3 */
  }
  
  render() { 
    const { modalStatus, choiceType, loadingFileType, step } = this.state;
    return ( 
      <div>
        <Button
            label="Upload Files"
            htmlFor="upload-file"
            className="upload-button"
            onClick={this.handleOpenModal}
        />
        
        {
          modalStatus &&   
          <DialogPopup
              showCloseIcon={true}
              positiveActionText="Continue"
              negativeActionText="Cancel"
              title={"SELECT FILE FOR UPLOAD"}
              handleClose={this.handleCloseModal}
              handleAction={this.handleContinueAction}
              showActions={true}
              open={modalStatus}
              popupMaxWidth={"lg"}
              className="root-add-new-tag-popup"
            >
              {
                (step === 1 || step === 2 ) &&
                <Choice onChange={this.handleChoice} choiceType={choiceType} loadingFileType={loadingFileType} step={step}/>
              }
              
              {
                /**Todo: Add step 3 view here: The Table Grid 
                 *  Suggestion: Create a new component in /UploadFiles/components/{Your Component } */
              }
            </DialogPopup>
        }
      </div>
    );
  }
}

export default UploadFiles;