import React, { useState } from "react";
import PanelHeader from "../PanelHeader";
import PanelGrid from "../panelGrid";
import CustomizedSwitches from "../CustomizedSwitches";
import FrxMiniTabs from "../../../../../../shared/FrxMiniTabs/FrxMiniTabs";
import {
  getTapList,
  getMiniTabs,
} from "../../../../../../../mocks/formulary/mock-data";
import DropDown from "../../../../../../shared/Frx-components/dropdown/DropDown";
import { Grid } from "@material-ui/core";
import { Row, Col, Space } from "antd";
import RadioButton from "../../../../../../shared/Frx-components/radio-button/RadioButton";
import Button from "../../../../../../shared/Frx-components/button/Button";
import { TabInfo } from "../../../../../../../models/tab.model";

import "../Tier.scss";
import "./PA.scss";

class PaReplace extends React.Component {
  render() {
    return (
      <>
        <div className="group tier-dropdown white-bg">
          <Row>
            <Col lg={8}>
              <label>
                PA GROUP DESCRIPTION <span className="astrict">*</span>
              </label>
              <DropDown options={[1, 2, 3]} />
            </Col>
            <Col lg={4}></Col>
            <Col lg={8}>
              <label>
                PA GROUP DESCRIPTION <span className="astrict">*</span>
              </label>
              <DropDown options={[1, 2, 3]} />
            </Col>
            <Col lg={8}>
              <label>
                Do you want to view existing PA configurations in another
                formulary? <span className="astrict">*</span>
              </label>
              <Space size="large">
                <RadioButton label="Yes" />
                <RadioButton label="No" />
              </Space>
            </Col>
            <Col lg={4}></Col>
            <Col lg={8}>
              <label>
                Select Related Formulary to View Existing configuration?{" "}
                <span className="astrict">*</span>
              </label>
              <DropDown options={[1, 2, 3]} />
            </Col>
            <Col lg={4}></Col>
            <Col lg={8}>
              <label>
                do you want to add additional criteria?{" "}
                <span className="astrict">*</span>
              </label>
              <Space size="large">
                <RadioButton label="Yes" />
                <RadioButton label="No" />
              </Space>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default PaReplace;
