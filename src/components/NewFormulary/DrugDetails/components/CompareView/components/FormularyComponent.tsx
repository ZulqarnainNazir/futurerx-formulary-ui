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
              <div>
                <Accordion
                defaultExpanded
                //   expanded={expanded === "panel1"}
                //   onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <table>
                     <tr>
                        <th className="tb-tier">TIER</th>
                        <th>11</th>
                      </tr>
                    </table>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>TIER 2</td>
                        <td>25</td>
                      </tr>
                      <tr>
                      <td>TIER 3</td>
                        <td>44</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                        <td>23</td>
                      </tr>
                    </table>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                defaultExpanded
                //   expanded={expanded === "panel2"}
                //   onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <table>
                     <tr>
                        <th className="tb-category">CATEGORY/VIEW</th>
                        <th></th>
                      </tr>
                    </table>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>TX CATEGORY</td>
                        <td>25</td>
                      </tr>
                      <tr>
                      <td>TX CLASS</td>
                        <td>23</td>
                      </tr>
                    </table>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                defaultExpanded
                //   expanded={expanded === "panel2"}
                //   onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <table>
                     <tr>
                        <th className="tb-pa">PRIOR AUTHORIZATION (PA)</th>
                        <th>77</th>
                      </tr>
                    </table>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>PA TYPE 1</td>
                        <td>32</td>
                      </tr>
                      <tr>
                      <td>PA TYPE 2</td>
                        <td>32</td>
                      </tr>
                      <tr>
                      <td>PA TYPE 3</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>PA GROUP DESCRIPTION</td>
                        <td>11</td>
                      </tr>
                    </table>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                defaultExpanded
                //   expanded={expanded === "panel2"}
                //   onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <table>
                     <tr>
                        <th className="tb-st">STEP THERAPY (ST)</th>
                        <th>31</th>
                      </tr>
                    </table>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>ST TYPE 1</td>
                        <td>19</td>
                      </tr>
                      <tr>
                      <td>ST TYPE 2</td>
                        <td>31</td>
                      </tr>
                      <tr>
                      <td>ST TYPE 3</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>ST TYPE 4</td>
                        <td>17</td>
                      </tr>
                    </table>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                defaultExpanded
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <table>
                     <tr>
                        <th className="tb-ql">QUANTITY LIMITS (QL)</th>
                        <th>94</th>
                      </tr>
                    </table>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>QL TYPE  1</td>
                        <td>94</td>
                      </tr>
                      <tr>
                      <td>QL TYPE 2</td>
                        <td>64</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                    </table>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                //   expanded={expanded === "panel2"}
                //   onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <table>
                     <tr>
                        <th className="tb-add">ADDITIONAL DEMONSTRATION DRUG (ADD)</th>
                        <th>94</th>
                      </tr>
                    </table>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>MMP QL</td>
                        <td>94</td>
                      </tr>
                      <tr>
                      <td>MMP CAPPED BENEFIT</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>MMP PA</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>MMP</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>MMP</td>
                        <td>11</td>
                      </tr>
                    </table>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                //   expanded={expanded === "panel2"}
                //   onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <table>
                     <tr>
                        <th className="tb-dd">DRUG DETAILS</th>
                        <th></th>
                      </tr>
                    </table>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                    </table>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <table>
                     <tr>
                        <th className="tb-otc">OVER THE COUNTER (OTC)</th>
                        <th>11</th>
                      </tr>
                    </table>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>OTC GERNERAL 1</td>
                        <td>94</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                    </table>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                //   expanded={expanded === "panel2"}
                //   onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <table>
                     <tr>
                        <th className="tb-ed">EXCLUDED DRUG</th>
                        <th></th>
                      </tr>
                    </table>
                  </AccordionSummary>
                  <AccordionDetails>
                    <table className="top-table1">
                      <tr>
                        <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                      <tr>
                      <td>TIER 1</td>
                        <td>11</td>
                      </tr>
                    </table>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
