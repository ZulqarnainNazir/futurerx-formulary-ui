import React from 'react';
import "./GrivencesDashboard.scss";
// material ui
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Card, Container, Grid, AccordionSummary, AccordionDetails, Accordion } from "@material-ui/core";

import { TabInfo } from "../../models/tab.model";
import FrxGrievenceChart from "../shared/FrxChart/FrxGrievenceChart";
import { getGrivencesBarChartData } from "../../mocks/GrivencesChartMock";
import GrivencesDashboardGrid from "./Components/GrivencesDashboardGrid/GrivencesDashboardGrid";


interface State {
    summaryType: "open" | "closed" | "withdrawn" | "total";
}
interface Props{
    selectedItem: string;
    loading: boolean;
}

class GrivencesDashboard extends React.Component {
    state: State = {
        summaryType: "total"
    };


    onSelectStatItem = (statType: string) => {
        console.log("stat type ", statType);
        this.setState({ summaryType: statType });
    };

    render() {
        return(
            <div className="grievance-content">
                 <FrxGrievenceChart
                    onSelectStatItem={this.onSelectStatItem}
                    data={getGrivencesBarChartData()}
                />
                <div className="claims-accordion">
                <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className="claims-accordion-summary">
                    <div className="claims-accordion-summary-heading">Grievances</div>
                    <div className="claims-accordion-summary-button">
                        <Button> + New Grievance</Button>
                    </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="claims-grid-container">
                    <GrivencesDashboardGrid
                        isPaid={this.state.summaryType.toLowerCase() === "open"}
                    />
                    </div>
                </AccordionDetails>
                </Accordion>
            </div>
            </div>
        );
    }
}

export default GrivencesDashboard;