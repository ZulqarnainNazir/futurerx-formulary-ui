import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "../../../../../shared/Frx-components/button/Button";
import PanelHeader from "../../FormularyConfigure/components/PanelHeader";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./formularycomponent.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="compare-formularies-container-component">
      <div className="compare-formulary">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="limited-access">
              <PanelHeader title="SUMMARY OF RXCUI COUNT" />
              
            
              <Grid container>
                <Grid item xs={3}>
                <div className="main-container-formulary border-right">
                   <Grid container>
                    
                      <Grid item xs={6}>
                        <span className="checkbox-text"><i className="fa fa-eye" aria-hidden="true"></i>Show Checkboxes</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span  className="checkbox-text">Collapse All</span>
                      </Grid>
                   </Grid>
                   </div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <table>
                     <tr>
                        <th className="tb-tier">TIER</th>
                      </tr>
                    </table>
                    </AccordionSummary>
                    <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>TIER 1</td>
                      </tr>
                      <tr>
                      <td>TIER 2</td>
                      </tr>
                      <tr>
                      <td>TIER 3</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                      </tr>
                    </table>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                     
                   >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <table>
                     <tr>
                     <th className="tb-category">CATEGORY/VIEW</th>
                      </tr>
                    </table>
                    </AccordionSummary>
                    <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                      <td>TX CATEGORY</td>
                      </tr>
                      <tr>
                      <td>TX CLASS</td>
                      </tr>
                    </table>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <table>
                     <tr>
                     <th className="tb-pa">PRIOR AUTHORIZATION (PA)</th>
                      </tr>
                    </table>
                    </AccordionSummary>
                    <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                      <td>PA TYPE 1</td>
                      </tr>
                      <tr>
                      <td>PA TYPE 2</td>
                      </tr>
                      <tr>
                      <td>PA TYPE 3</td>
                      </tr>
                      <tr>
                      <td>PA TYPE 4</td>
                      </tr>
                    </table>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <table>
                     <tr>
                     <th className="tb-st">STEP THERAPY (ST)</th>
                      </tr>
                    </table>
                    </AccordionSummary>
                    <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                      <td>ST TYPE 1</td>
                      </tr>
                      <tr>
                      <td>ST TYPE 2</td>
                      </tr>
                      <tr>
                      <td>ST TYPE 3</td>
                      </tr>
                      <tr>
                      <td>ST TYPE 4</td>
                      </tr>
                    </table>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <table>
                     <tr>
                     <th className="tb-ql">QUANTITY LIMITS (QL)</th>
                      </tr>
                    </table>
                    </AccordionSummary>
                    <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                      <td>QL TYPE 1</td>
                      </tr>
                      <tr>
                      <td>QL TYPE 1</td>
                      </tr>
                    
                    </table>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <table>
                     <tr>
                     <th className="tb-add">ADDITIONAL DEMONSTRATION DRUG (ADD)</th>
                      </tr>
                    </table>
                    </AccordionSummary>
                    <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                     <td>MMP QL</td>
                      </tr>
                      <tr>
                      <td>MMP CAPPED BENEFITS</td>
                      </tr>
                      <tr>
                      <td>MMPA</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                      </tr>
                    </table>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <table>
                     <tr>
                     <th className="tb-dd">DRUG DETAILS</th>
                      </tr>
                    </table>
                    </AccordionSummary>
                    <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>TIER 1</td>
                      </tr>
                      <tr>
                      <td>TIER 2</td>
                      </tr>
                      <tr>
                      <td>TIER 3</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                      </tr>
                    </table>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                  defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <table>
                     <tr>
                     <th className="tb-otc">OVER THE COUNTER (OTC)</th>
                      </tr>
                    </table>
                    </AccordionSummary>
                    <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>TIER 1</td>
                      </tr>
                      <tr>
                      <td>TIER 2</td>
                      </tr>
                      <tr>
                      <td>TIER 3</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                      </tr>
                    </table>
                    </AccordionDetails>
                  </Accordion>


                </Grid>

                <Grid item xs={9}>

                  <Grid container>
                    <div className="main-container-formulary bg-formulary">
                    <Grid item xs={12}>
                      <p className="base-formulary">BASE FORMULARY</p>
                    </Grid>
                    </div>

                  </Grid>

                  <div>
                <table className="custom-table">
                      <tr>  
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>140</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>46</td>
                      </tr>
                    </table>
                  </div>

                  <div>
                <table className="custom-table">
                      <tr>  
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>23</td>
                      </tr>
                    </table>
                  </div>

                  <div>
                <table className="custom-table">
                      <tr>  
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>23</td>
                      </tr>

                      <tr>  
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>94</td>
                      </tr>
                      <tr>
                        <td>32</td>
                      </tr>
                      <tr>
                        <td>32</td>
                      </tr>

                      <tr>  
                        <td>22</td>
                      </tr>
                      <tr>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>23</td>
                      </tr>

                      <tr>  
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>23</td>
                      </tr>

                      <tr>  
                        <td>11</td>
                      </tr>
                      <tr>
                        <td>25</td>
                      </tr>
                      <tr>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>23</td>
                      </tr>
                    </table>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
