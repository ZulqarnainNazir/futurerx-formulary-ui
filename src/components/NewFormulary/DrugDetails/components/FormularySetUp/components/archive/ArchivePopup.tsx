import { Box, Grid } from "@material-ui/core";
import React from "react";
import Button from "../../../../../../shared/Frx-components/button/Button";
import "../CommercialPopup.scss";
export default class ArchivePopup extends React.Component<any, any> {
  onCancelClicked = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  archiveFoumulary = (full: boolean = false, versions) => {
    console.log(" ARC : " + full, versions);
    let formularyIDs: number[] = [];
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
                onClick={()=>this.archiveFoumulary(false, [])}
              />
              <Button
                label="Archive Full Formulary"
                htmlFor="upload-file"
                className="upload-button save-btn"
                onClick={()=>this.archiveFoumulary(true, [versionList])}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
