import React from "react";
import StatusContentFormPanel from "../../../DrugDetails/components/common/StatusContentFormPanel/StatusContentFormPanel";
import "./ICDCriteria.scss";
import { Select } from "antd";

const { Option } = Select;

const ICDCriteria = (props) => {
  const {
    handleStatus,
    icdSettingsServies: { icdSettings, icdSettingsStatus, icdResults },
    isAdditionalCriteria,
    handleICDChange,
    handleICDSearch,
    handleICDOnChange,
    deleteIconHandler,
  } = props;

  const options = icdResults.data.map((obj) => (
    <Option key={obj.key} value={obj.key}>
      {obj.text}
    </Option>
  ));

  return (
    <div className="root-icd-limit-settings mb-10">
      <div className="inner-container">
        <StatusContentFormPanel
          title="ICD"
          type={icdSettingsStatus.type}
          handleStatus={handleStatus}
          isAdditionalCriteria={isAdditionalCriteria}
          deleteIconHandler={deleteIconHandler}
        >
          <div className="root-icd-limit-settings__form">
            <div className="input-field-group">
              <div className="input-field-group__label">ICD:</div>

              <div className="input-field-group__dropdown-field">
                <Select
                  showSearch
                  mode="multiple"
                  value={icdResults.value}
                  // value={icdSettings.icds}
                  placeholder={"dropdown label"}
                  // style={{ width: "100%" }}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handleICDSearch}
                  onChange={handleICDChange}
                  notFoundContent={null}
                  className="select-icds"
                >
                  {options}
                </Select>
              </div>
            </div>

            <div className="input-field-group">
              <div className="input-field-group__label">Lookback Days:</div>
              <div className="input-field-group__text-field">
                <input
                  type="number"
                  className="setup-input-fields"
                  onChange={handleICDOnChange}
                  name="look_back_days"
                  value={icdSettings.look_back_days}
                />
              </div>
            </div>
          </div>
        </StatusContentFormPanel>
      </div>
    </div>
  );
};

export default ICDCriteria;
