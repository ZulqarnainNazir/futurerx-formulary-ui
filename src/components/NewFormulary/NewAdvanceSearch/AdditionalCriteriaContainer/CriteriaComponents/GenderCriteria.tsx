import React from "react";
import PanelHeader from "../../../../shared/Frx-components/panel-header/PanelHeader";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import { Checkbox } from "antd";
import Button from "../../../../shared/Frx-components/button/Button";

import "./GenderCriteria.scss";

const GenderCriteria = (props) => {
  const {
    serviceSettingsChecked,
    glSettingsServies: { glSettings, glSettingsStatus },
    handleStatus,

    isAdditionalCriteria,
    deleteIconHandler,
    nodeId,
  } = props;

  return (
    <div className="root-gender-limit-settings bordered mb-10">
      <div className="inner-container">
        <StatusContentFormPanel
          title="Gender"
          type={glSettingsStatus.type}
          handleStatus={handleStatus}
          isAdditionalCriteria={isAdditionalCriteria}
          deleteIconHandler={deleteIconHandler}
        >
          <div className="input-field-group">
            <div className="input-field-group__label">Select Gender:</div>

            <div className="input-field-group__radio-field-group">
              {glSettings.map((gl) => (
                <div className="input-field-group__radio-field" key={gl.id}>
                  <Checkbox
                    id={gl.id + "" + nodeId}
                    name={gl.id}
                    onChange={serviceSettingsChecked}
                    checked={gl.isChecked}
                  ></Checkbox>
                  <label
                    htmlFor={gl.id + "" + nodeId}
                    className="checkbox-label"
                  >
                    {`${gl.gl_type_name}`}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </StatusContentFormPanel>
      </div>
    </div>
  );
};

export default GenderCriteria;
