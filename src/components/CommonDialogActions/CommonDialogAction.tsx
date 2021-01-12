import React from "react";
import Grid from "@material-ui/core/Grid";
import DialogPopup from "../shared/FrxDialogPopup/FrxDialogPopup";
import "./CommonDialogAction.scss";
import { ReactComponent as WorkFlowIcon } from "../../assets/icons/workflowicon.svg";
import { ReactComponent as AuditIcon } from "../../assets/icons/auditicon.svg";
import { ReactComponent as NotificationiconIcon } from "../../assets/icons/notificationicon.svg";
import { ReactComponent as NoteIcon } from "../../assets/icons/noteicon.svg";
import { ReactComponent as HelpIcon } from "../../assets/icons/helpicon.svg";
import { ReactComponent as QAiconcon } from "../../assets/icons/Q&Aicon.svg";
import { ReactComponent as ImportIcon } from "../../assets/icons/importicon.svg";
import { ReactComponent as ExportIcon } from "../../assets/icons/exporticon.svg";
import { ReactComponent as BazariconIcon } from "../../assets/icons/bazaricon.svg";
import { ReactComponent as SearchcIcon } from "../../assets/icons/searchicon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profileicon.svg";
import WorkFlowDialog from "./components/Workflow-Dialog/WorkFlow-Dialog";
import Audit from "./components/Audit";
import Notification from "./components/Notification";
import Note from "./components/Note";
import Help from "./components/Help";
import QA from "./components/QA";
import Import from "./components/Import";
import Export from "./components/Export";
import Bazar from "./components/Bazar";
import Search from "./components/Search";
import Profile from "./components/Profile";

export default class CommonDialogAction extends React.Component<any, any> {
    state = {
        show:false,
        popUpName:"",
        title:"",
        popUpInd:false,
        postiveBtn:"",
        negativeBtn:"",
        dialogClassName:"common-dialog-action",
        isHandleActions:false
    }

  processCloseActions = () => {
    this.setState({ show: true });
  };

  onClose = () => {
    this.setState({ popUpInd: false });
    return true;
  };

  handleIconClick = (dialogIdentifier, title) => {
    this.setState({
      popUpInd: true,
      title: title,
      popUpName: dialogIdentifier,
    });
    if (
      dialogIdentifier === "help" ||
      dialogIdentifier === "import" ||
      dialogIdentifier === "export" ||
      dialogIdentifier === "bazar"
    ) {
      this.setState({
        isHandleActions: true,
        postiveBtn: "Save",
        negativeBtn: "Cancel",
        dialogClassName:"common-dialog-action"
      });
    } else if (dialogIdentifier === "qa") {
      this.setState({
        isHandleActions: true,
        postiveBtn: "Ask a Question",
        negativeBtn: "",
        dialogClassName:"common-dialog-action"
      });
    } else if (dialogIdentifier === "search") {
      this.setState({
        isHandleActions: true,
        postiveBtn: "Search",
        negativeBtn: "",
        dialogClassName:"common-dialog-action"
      });
    } 
    else if(dialogIdentifier === "workflow"){
      this.setState({
        isHandleActions:false, 
        postiveBtn:"", 
        negativeBtn:"", 
        dialogClassName:"common-workflow-dialog-action"})            
    }
    else {
      this.setState({
        isHandleActions: false,
        postiveBtn: "",
        negativeBtn: "",
        dialogClassName:"common-dialog-action"
      });
    }
  };
  render() {
    return (
      <Grid container>
        <Grid item xs={7}></Grid>
        <Grid item xs={5}>
          <div className="icon-list-wrapper">
            <div className="icons-list">
              <WorkFlowIcon
                className="marginRight"
                onClick={(e) => this.handleIconClick("workflow","Task Name")}
              />
              <AuditIcon
                className="marginRight"
                onClick={(e) => this.handleIconClick("audit", "MEMBER AUDITS")}
              />
              <NotificationiconIcon
                className="marginRight"
                onClick={(e) =>
                  this.handleIconClick("notification", "MEMBER ALERTS")
                }
              />
              <NoteIcon
                className="marginRight"
                onClick={(e) => this.handleIconClick("note", "MEMBER NOTES")}
              />
              <HelpIcon
                className="marginRight"
                onClick={(e) => this.handleIconClick("help", "HELP")}
              />
              <QAiconcon
                className="marginRight"
                onClick={(e) =>
                  this.handleIconClick("qa", "QUSTIONS AND ANSWERS")
                }
              />
              <ImportIcon
                className="marginRight"
                onClick={(e) => this.handleIconClick("import", "IMPORT")}
              />
              <ExportIcon
                className="marginRight"
                onClick={(e) => this.handleIconClick("export", "EXPORT")}
              />
              <BazariconIcon
                className="marginRight"
                onClick={(e) =>
                  this.handleIconClick("bazar", "BUY FROM THE BAZAAR")
                }
              />
              <SearchcIcon
                className="marginRight"
                onClick={(e) =>
                  this.handleIconClick("search", "Advance Search")
                }
              />
              <ProfileIcon
                className="marginRight"
                onClick={(e) => this.handleIconClick("profile", "")}
              />
            </div>
          </div>
          <DialogPopup
            className={this.state.dialogClassName}
            showCloseIcon={true}
            positiveActionText={this.state.postiveBtn}
            negativeActionText={this.state.negativeBtn}
            title={this.state.title}
            handleClose={() => {
              this.onClose();
            }}
            handleAction={() => {
              this.processCloseActions();
            }}
            showActions={this.state.isHandleActions}
            open={this.state.popUpInd}
            popupMaxWidth={"lg"}
          >
            {this.state.popUpName === "workflow" ? (
              <WorkFlowDialog />
            ) : this.state.popUpName === "audit" ? (
              <Audit />
            ) : this.state.popUpName === "notification" ? (
              <Notification />
            ) : this.state.popUpName === "note" ? (
              <Note />
            ) : this.state.popUpName === "help" ? (
              <Help />
            ) : this.state.popUpName === "qa" ? (
              <QA />
            ) : this.state.popUpName === "import" ? (
              <Import />
            ) : this.state.popUpName === "export" ? (
              <Export />
            ) : this.state.popUpName === "bazar" ? (
              <Bazar />
            ) : this.state.popUpName === "search" ? (
              <Search />
            ) : this.state.popUpName === "profile" ? (
              <Profile />
            ) : null}
          </DialogPopup>
        </Grid>
      </Grid>
    );
  }
}
