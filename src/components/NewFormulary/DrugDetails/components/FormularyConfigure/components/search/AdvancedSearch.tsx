import React from "react";
import FrxDialogPopup from "../../../../../../shared/FrxDialogPopup/FrxDialogPopup";
import Grid from "@material-ui/core/Grid";
import { Button, Input, Box } from "@material-ui/core";
import { Select } from "antd";
import "./AdvancedSearch.scss";
import { getSearchMock } from "../../../../../../../mocks/formulary/searchMock";
import CategoryForm from './CategoryForm'
import SearchCategory from './SearchCategory';


const { Option } = Select;

interface MemberNotesPopupProps {
    openPopup: boolean;
    onClose: () => void;
    category: string;
}

interface CategoryData {
    id: number;
    category: string;
}

interface MemberNotesPopupState {
    categoriesData: Array<CategoryData>;
    activeCategoryIndex: number;
    activeCategoryTitle: string;
    formArray: any;
    formCount:number;
}

class MemberNotesPopup extends React.Component<
    MemberNotesPopupProps,
    MemberNotesPopupState
    > {
    state: MemberNotesPopupState = {
        categoriesData: getSearchMock(),
        activeCategoryIndex: 0,
        activeCategoryTitle: '',
        formCount:0,
        formArray: []
    };

    /**
     *@function onClose
     *
     * Close the member notes popup
     *
     * @memberof MemberNotesPopup
     */

    onClose = () => {
        this.props.onClose();
    };

    /**
     * Action method if any action is required for dialog popup
     *
     * @memberof MemberNotesPopup
     */
    action = () => {
        console.log("no action to perform");
    };

    /**
     *Fetch notes details for all categories and filter specific category notes
     *
     * @param {string} type
     * @param {number} index
     * @param {*} [item]
     * @memberof MemberNotesPopup
     */
    handleListItemClick = (e, index: any) => {
        debugger;
        const title = index.category
        this.setState({
            formArray: [...this.state.formArray,{type:title}],
            activeCategoryIndex:index.id
        })
    };



    deleteFormHandler = (getIndex: number) => {
        let updatedForms = [...this.state.formArray];
        updatedForms.splice(getIndex,1);
        this.setState({
            formArray: updatedForms
        });
    }


    clearSelected = () => {
        this.setState({
            formArray: []
        })
    }

    render() {
        let formContent = <div className="noForms">Drag the file type(s) from the list on the left to create a filter.</div>;
        if(this.state.formArray.length > 0){
            formContent = this.state.formArray.map((a,index:number)=><CategoryForm title={a.type} index={index} deleteField={this.deleteFormHandler}/>)
        }
        
        return (
            <div>
                <React.Fragment>
                    <FrxDialogPopup
                        positiveActionText=""
                        negativeActionText="Close"
                        title="Advance Search"
                        handleClose={this.onClose}
                        handleAction={this.action}
                        open={this.props.openPopup}
                        showActions={false}
                        className="drug-grid-advance-search member-notes-popup-root"
                        height="80%"
                        width="90%"
                    >
                        <Grid
                            container
                            spacing={0}
                            className="drug-grid-popup-root__dialog"
                        >
                            <Grid
                                xs={3}
                                className="member-notes-popup-root__dialog__categories"
                                alignContent="flex-start"
                                key={0}
                                item
                            >
                                <SearchCategory handleListItemClick={this.handleListItemClick}
                                    categoriesData={this.state.categoriesData}
                                    activeCategoryIndex={this.state.activeCategoryIndex}
                                />
                            </Grid>
                            <Grid className="form-wrapper-root member-notes-popup-root__dialog__category-notes" item xs={9}>
                                <Box className="right-content">
                                    <div className="formWrappers">
                                        {formContent}
                                    </div>

                                    <Box display="flex" justifyContent="flex-end" className="button-wrapper">
                                        <Button className="Button advanced-grid-search__btn-clear" onClick={this.clearSelected}>
                                            <svg className="advanced-grid-search__btn-clear--clearicon" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C13.1944 17 17 13.1945 17 8.5C17 3.80554 13.1944 0 8.5 0C3.8056 0 0 3.80554 0 8.5C0 13.1945 3.8056 17 8.5 17ZM8.5 16C12.6422 16 16 12.6421 16 8.5C16 4.35791 12.6422 1 8.5 1C4.35785 1 1 4.35791 1 8.5C1 12.6421 4.35785 16 8.5 16Z" fill="#666666" />
                                                <path d="M5.31803 5.31802C5.12277 5.51328 5.12277 5.82986 5.31803 6.02513L7.7929 8.5L5.31803 10.9749C5.12277 11.1701 5.12277 11.4867 5.31803 11.682C5.51329 11.8772 5.82987 11.8772 6.02514 11.682L8.50001 9.20711L10.9749 11.682C11.1701 11.8772 11.4867 11.8772 11.682 11.682C11.8773 11.4867 11.8773 11.1701 11.682 10.9749L9.20712 8.5L11.682 6.02513C11.8773 5.82986 11.8773 5.51328 11.682 5.31802C11.4867 5.12276 11.1701 5.12276 10.9749 5.31802L8.50001 7.79289L6.02513 5.31802C5.82987 5.12276 5.51329 5.12276 5.31803 5.31802Z" fill="#666666" />
                                            </svg>
                                            <span>Clear</span>
                                        </Button>
                                        <button className="Button member-notes-popup-root__dialog__category-notes_form__submit-btn">
                                            Apply Search
                                        </button>
                                    </Box>
                                </Box>
                            </Grid>

                        </Grid>
                        
                    </FrxDialogPopup>
                </React.Fragment>
            </div>
        );
    }
}

export default MemberNotesPopup;
