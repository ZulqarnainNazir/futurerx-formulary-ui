import React, { ReactElement } from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      //   fontSize: theme.typography.pxToRem(15),
      //   fontWeight: theme.typography.fontWeightRegular,
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "30px",

      color: "#1D54B4",
    },
    accordionSummary: {
      background: "#FFFFFF",
      border: "1px solid #E5E5E5",
      boxSizing: "border-box",
      borderRadius: "5px 5px 0px 0px",
    },
    accordionDetails: {
      background: "#FFFFFF",
      border: "1px solid #E5E5E5",
      boxSizing: "border-box",
      borderRadius: "0 0 5px 5px",
    },
  })
);

interface Props {
  children: any;
  name: string;
}

export default function CustomAccordion({
  children,
  name,
}: Props): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{name}</Typography>
        </AccordionSummary>
        {/* <hr/> */}
        {/* {children.map((chilElement: any, index: number) => ( */}
        {/* <React.Fragment key={index}> */}
        <AccordionDetails className={classes.accordionDetails}>
          {children}
        </AccordionDetails>
        {/* </React.Fragment> */}
        {/* ))} */}
      </Accordion>
    </div>
  );
}
