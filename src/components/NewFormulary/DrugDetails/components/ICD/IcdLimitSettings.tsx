import Button from "../../../../shared/Frx-components/button/Button";
import React from "react";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import StatusContentFormPanel from "../common/StatusContentFormPanel/StatusContentFormPanel";
import Tags from "../Tags";
import "./ICD.scss";

class IcdLimitSettings extends React.Component<any, any> {
  handleReplaceSrch = (val) => {
    this.props.handleReplaceSrch(val);
  };

  handleInput = (event) => {
    this.props.handleLookBackDays(event.target.value);
  };
  render() {
    const { showGridHandler, handleStatus, icdSettingsStatus } = this.props;
    return (
      <div className="icd-limit-settings bordered mb-10 white-bg">
        <PanelHeader title="ICD Limit Settings" tooltip="ICD Limit Settings" />

        <div className="inner-container">
          <StatusContentFormPanel
            title="ICD"
            type={icdSettingsStatus.type}
            handleStatus={handleStatus}
            showDelete={false}
          >
            <div className="icd-limit-settings__form">
              <div className="input-field-group">
                <div className="input-field-group__label">ICD:</div>

                <div className="input-field-group__dropdown-field">
                  <Tags
                    options={this.props.options}
                    handleReplaceSrch={this.handleReplaceSrch}
                    disabled={this.props.isDisabled}
                  />
                </div>
              </div>

              <div className="input-field-group">
                <div className="input-field-group__label">Lookback Days:</div>
                <div className="input-field-group__text-field">
                  <input
                    type="number"
                    className="setup-input-fields"
                    onChange={this.handleInput}
                    disabled={this.props.isDisabled}
                  />
                </div>
              </div>
            </div>
          </StatusContentFormPanel>
        </div>
        <Button
          label="Apply"
          onClick={showGridHandler}
          disabled={this.props.isDisabled}
        />
      </div>
    );
  }
}

export default IcdLimitSettings;
