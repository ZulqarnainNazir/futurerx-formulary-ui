import React, { useState } from "react";
import PanelHeader from "../PanelHeader";
import PanelGrid from "../panelGrid";
import CustomizedSwitches from ".././tt";
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

import "../Tier.scss";
import "./PA.scss";

const panelGridTitle = [
  "TYPE",
  "NUMBER OF GROUPS",
  "ADDED GROUPS",
  "REMOVED GROUPS",
  "NUMER OF DRUGS",
  "ADDED DRUGS",
  "REMOVED DRUGS",
];

const panelGridValue = [
  ["PA Type 1", "1", "2", "3", "4", "5", "6"],
  ["PA Type 2", "1", "2", "3", "4", "5", "6"],
  ["PA Type 3", "1", "2", "3", "4", "5", "6"],
];

function PA() {
  const [miniTabs, setMiniTabs] = useState(getMiniTabs());
  const [activeMiniTabIndex, setAMTI] = useState(0);

  const handleMiniTabClick = (number) => {
    setAMTI(number);
  };

  return (
    <>
      <div className="drug-detail-LA-root">
        <div className="drug-detail-la-container">
          <div className="drug-detail-la-inner">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="mb-10">
                  <div className="limited-access">
                    <PanelHeader title="Prior Authorization - DRUG SELECTION" />
                    <div className="inner-container">
                      <PanelGrid
                        panelGridTitle={panelGridTitle}
                        panelGridValue={panelGridValue}
                      />
                    </div>
                  </div>
                </div>
                <div className="limited-access">
                  <PanelHeader title="Tier Definition Settings" />
                  <div className="modify-wrapper white-bg">
                    <div className="modify-panel">
                      <div className="icon">
                        <span>R</span>
                      </div>
                      <div className="switch-box">
                        <CustomizedSwitches
                          leftTitle="Modify"
                          rightTitle="view all"
                        />
                      </div>
                      <div className="mini-tabs">
                        <FrxMiniTabs
                          tabList={miniTabs}
                          activeTabIndex={activeMiniTabIndex}
                          onClickTab={handleMiniTabClick}
                        />
                      </div>
                      <div>
                        <div className="PA-list">
                          <span>LIST</span>
                          <DropDown options={[1, 2, 3]} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group tier-dropdown white-bg">
                    <Row gutter={[{ xs: 0, lg: 128 }, 32]}>
                      <Col xs={24} lg={8}>
                        <label>
                          PA GROUP DESCRIPTION{" "}
                          <span className="astrict">*</span>
                        </label>
                        <DropDown options={[1, 2, 3]} />
                      </Col>
                      <Col xs={24} lg={8}>
                        <label>
                          PA GROUP DESCRIPTION{" "}
                          <span className="astrict">*</span>
                        </label>
                        <DropDown options={[1, 2, 3]} />
                      </Col>
                    </Row>
                    <Row gutter={[{ xs: 0, lg: 128 }, 32]}>
                      <Col xs={24} lg={8}>
                        <label>
                          Do you want to view existing PA configurations in
                          another formulary? <span className="astrict">*</span>
                        </label>
                        <Space size="large">
                          <RadioButton label="Yes" />
                          <RadioButton label="No" />
                        </Space>
                      </Col>
                      <Col xs={24} lg={8}>
                        <label>
                          Select Related Formulary to View Existing
                          configuration? <span className="astrict">*</span>
                        </label>
                        <DropDown options={[1, 2, 3]} />
                      </Col>
                    </Row>
                    <Row gutter={[{ xs: 0, lg: 128 }, 32]}>
                      <Col xs={24} lg={8}>
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
                    <Row gutter={[{ xs: 0, lg: 128 }, 32]} justify="end">
                      <Col>
                        <Button label="Apply"></Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default PA;
