import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import ValidationStartsCard from "../FormularyDashboardStats/FormularyDashboardStatsChart/FormularyDashboardStatsChart";
import Comment from "./Comment/Comment";
import Card from "./Card/Card";
import "./Validation.css";
import { dateFormat } from "../../utils/common";
import { getValidationList } from "../../redux/slices/formulary/validation/validationActionCreation";

function mapStateToProps(state) {
  return {
    current_formulary: state.application.formulary_id,
    validationData: state.validationReducer.validationData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getValidationList: (formularyId) =>
      dispatch(getValidationList(formularyId)),
  };
}

function Validation(props) {
  useEffect(() => {
    props.getValidationList(props.current_formulary);
  }, props.current_formulary);

  let total1,
    passed1,
    failed1,
    warning1,
    comment = "";
  let validationItems;
  if (Object.keys(props.validationData).length > 0) {
    total1 =
      props.validationData.validation_summary &&
      props.validationData.validation_summary.total;
    failed1 =
      props.validationData.validation_summary &&
      props.validationData.validation_summary.failed;
    passed1 =
      props.validationData.validation_summary &&
      props.validationData.validation_summary.passed;
    warning1 =
      props.validationData.validation_summary &&
      props.validationData.validation_summary.warning;

    // validationItems = getValidationItems(props.validationData.validations);

    // comment = props.validationData.validations.map((element) => {
    //   let users, usersList, failed, warning, passed;
    //   if (element.users && element.users.length > 0) {
    //     usersList = element.users.filter((x) => x.name != null);
    //     usersList.length > 0 &&
    //       usersList.map((user) => {
    //         users = [
    //           {
    //             ...user,
    //             logo_path: user.logo_path, //environment.awsFileURL + user.logo_path
    //           },
    //         ];
    //       });
    //   }
    //   const display_date =
    //     element.latest_note_added_time != null
    //       ? dateFormat.dateFormat(element.latest_note_added_time)
    //       : "No notes";
    //   if (element.children && element.children.length > 0) {
    //     element.children.map((childElement) => {
    //       switch (childElement.validation_status) {
    //         case "F":
    //           failed = {
    //             ...element,
    //             failed: element.failed + 1,
    //           };
    //           break;
    //         case "W":
    //           warning = {
    //             ...element,
    //             warning: element.warning + 1,
    //           };
    //           break;
    //         case "P":
    //           passed = {
    //             ...element,
    //             passed: element.passed + 1,
    //           };
    //           break;
    //       }
    //     });
    //     if (element.failed > 0) {
    //       element.prefered_count = element.failed;
    //       element.validation_status = "F";
    //     } else if (element.warning > 0) {
    //       element.prefered_count = element.warning;
    //       element.validation_status = "W";
    //     } else if (element.passed > 0) {
    //       element.prefered_count = element.passed;
    //       element.validation_status = "P";
    //     }
    //   }
    //   const list = {
    //     ...element,
    //     prefered_count: 0,
    //     failed: 0,
    //     warning: 0,
    //     passed: 0,
    //     notesFormgroup: "",
    //     notes: [],
    //     users: users,
    //     notesControlObj: {
    //       display_label: "",
    //       maxlength: 500,
    //       label: "",
    //       type: "text",
    //       is_required: false,
    //       formcontrol: "",
    //     },
    //     display_date: display_date,
    //   };
    //   return <Comment element={list} />;
    // });

    comment = props.validationData.validations.map((element) => {
      console.log(element);
      let prefered_count = 0;
      let failed = 0;
      let warning = 0;
      let passed = 0;
      let status: string = "";
      const display_date =
        element.latest_note_added_time != null
          ? dateFormat.dateFormat(element.latest_note_added_time)
          : "No notes";
      if (element.children && element.children.length > 0) {
        element.children.forEach((childElement) => {
          switch (childElement.validation_status) {
            case "F":
              failed = failed + 1;
              break;
            case "W":
              warning = warning + 1;
              break;
            case "P":
              passed = passed + 1;
              break;
          }
        });
        if (failed > 0) {
          prefered_count = failed;
          status = "F";
        } else if (warning > 0) {
          prefered_count = warning;
          status = "W";
        } else if (passed > 0) {
          prefered_count = passed;
          status = "P";
        }
      }
      let users: any[] = [];
      let  awsFileURL="https://frx-document-delivery.s3.amazonaws.com/";
      if (element.users && element.users.length > 0) {
        let usersList: any[] = element.users.filter((x) => x.name !== null);
        console.log(usersList);
        usersList.forEach((u) => {
          users.push({ 
            name: u.name,
            logo_path: (u.logo_path===null)  ? "empty-avatar" : awsFileURL + u.logo_path
             });
        });
      }
      // user.logo_path = environment.awsFileURL + user.logo_path
      console.log("U : ",users);
      const item = {
        ...element,
        status: status,
        prefered_count: prefered_count,
        display_date: display_date,
        users: users,
      };

      return <Comment element={item} />;
    });
  }

  return (
    <div className="formulary-root validation">
      <Paper elevation={0} style={{ marginBottom: "3rem" }}>
        <div className="title">Summary of Checks and Validations</div>
        <div className="container">
          <ValidationStartsCard total={total1} />
          <Card label="Failed" value={failed1} color="rgba(252,120,120,0.75)" />
          <Card
            label="Warning"
            value={warning1}
            color="rgba(245,195,140,0.75)"
          />
          <Card label="Passed" value={passed1} color="rgba(176,223,165,0.75)" />
        </div>
      </Paper>
      {comment}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Validation);
