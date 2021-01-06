import React, { useContext } from "react";
import { connect } from "react-redux";
import "./FormularyDetailsTop.scss";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

const mapStateToProps = (state) => {
  return {
    uniqueID: state?.messaging?.uuid,
    type: state?.messaging?.type,
    message: state?.messaging?.message,
  };
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

class FormularyMessaging extends React.Component<any, any> {
  state = {
    showMsg: false,
    vertical: "top",
    horizontal: "center",
    UUID: this.props?.uniqueID,
  };

  handleClose = () => {
    this.setState({ showMsg: false });
  };

  componentDidUpdate(prevProps) {
    console.log("MSG : " + this.props.uniqueID);
    console.log(prevProps.message + " > " + this.props.message);
    if (prevProps.uniqueID !== this.props.uniqueID) {
      console.log("->");
      this.setState({ showMsg: true });
    }
  }

  render() {
    let dropDown: any;
    return (
      <div className="drug-detail-top">
        <Snackbar
          open={this.state.showMsg}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.handleClose}
        >
          <div>
            {this.props?.type === "success" && (
              <Alert onClose={this.handleClose} severity="success">
                {this.props.message}
              </Alert>
            )}
            {this.props?.type === "info" && (
              <Alert onClose={this.handleClose} severity="info">
                {this.props.message}
              </Alert>
            )}
            {this.props?.type === "warning" && (
              <Alert onClose={this.handleClose} severity="warning">
                {this.props.message}
              </Alert>
            )}
            {this.props?.type === "error" && (
              <Alert onClose={this.handleClose} severity="error">
                {this.props.message}
              </Alert>
            )}
          </div>
        </Snackbar>
      </div>
    );
  }
}
export default connect(mapStateToProps)(FormularyMessaging);
