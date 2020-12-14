import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { SUCCESS_MSG, ERROR_MSG } from './PopupAlerts/Constents'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

interface Props {
  error?: any;
  success?: any;
  delay: any;
}

function mapStateToProps(state) {
  return {
    success: state.saveGdm.success,
    error: state.saveGdm.error
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    mb10: {
      marginBottom: '10px'
    }
  }),
);

function AlertMessages(props: Props) {
  const classes = useStyles();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, props.delay);
  }, [props]);

  return (
    <div className={classes.root}>
      {props.error && props.error.length > 0 && props.error.map(err => {
        return <Alert severity="error">{err.message}</Alert>
      })}
      {props.error && props.error.status != 200 && visible && <Alert severity="error">{props.error.data?props.error.data.message:ERROR_MSG}</Alert>}
      {props.success && visible && <Alert severity="success">{SUCCESS_MSG}</Alert>}
      {/* <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert> */}
      {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
    </div>
  );
}

export default connect(mapStateToProps)(AlertMessages)
