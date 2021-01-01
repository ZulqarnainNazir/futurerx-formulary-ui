import { Box, Grid } from "@material-ui/core";
import { version } from "moment";
import React from "react";
import Button from "../../../../../../shared/Frx-components/button/Button";
import "../CommercialPopup.scss";
import { archiveFormularies } from "../../../../../../../redux/slices/formulary/setup/setupService";
import showMessage from "../../../../../Utils/Toast";

export default class ArchivePopup extends React.Component<any, any> {
  onCancelClicked = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  initFormularyArchive = async (full: boolean = false, versions) => {
    console.log(" ARC : " + full, versions);
    let formularyIDs: number[] = [];
    if (full) {
      if (versions && versions.length > 0) {
        let id_list: number[] = [];
        versions.forEach((v: any) => {
          id_list.push(v.id_formulary);
        });
        formularyIDs = id_list;
      }
    } else {
      formularyIDs.push(this.props?.currentFormulary?.id_formulary);
    }

    console.log(" formularyIDs :: " + formularyIDs);

    try {
      let response = await archiveFormularies(formularyIDs);
      if (response && response.status && response.status === 200) {
        if (formularyIDs && formularyIDs.length > 0) {
          showMessage("Formulary Archived", "success");
        } else {
          showMessage("Full Formulary Archived", "success");
        }
        // TODO
        // this.refreshApp();
      } else {
        showMessage("CODE-1 Failed to archive formulary", "error");
      }
    } catch (error) {
      console.log(error);
      showMessage("Error while archiving formulary ", "error");
    }
  };

  render() {
    const { versionList } = this.props;

    return (
      <div className="popup-container">
        <Grid container>
          <Grid item xs={12}>
            <p>
              Do you want to archive the version or the full formulary:{" "}
              <span>
                {this.props?.currentFormulary?.formulary_info?.formulary_name
                  ? this.props?.currentFormulary?.formulary_info?.formulary_name
                  : ""}
              </span>
            </p>
          </Grid>
          <Grid item xs={12}>
            <div className="action-btn">
              <Button
                label="Cancel"
                htmlFor="upload-file"
                className="upload-button cancel-btn"
                onClick={this.onCancelClicked}
              />
              <Button
                label="Archive Version"
                htmlFor="upload-file"
                className="upload-button save-btn"
                onClick={() => this.initFormularyArchive(false, versionList)}
              />
              <Button
                label="Archive Full Formulary"
                htmlFor="upload-file"
                className="upload-button save-btn"
                onClick={() => this.initFormularyArchive(true, versionList)}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
