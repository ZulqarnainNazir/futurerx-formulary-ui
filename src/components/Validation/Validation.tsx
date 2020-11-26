import React from 'react';
import { Paper } from '@material-ui/core';
import ValidationStartsCard from "../FormularyDashboardStats/FormularyDashboardStatsChart/FormularyDashboardStatsChart";
import Comment from "./Comment/Comment";
import Card from "./Card/Card";
import "./Validation.css";

function Validation() {
  return (
    <div className="formulary-root validation">
      <Paper elevation={0} style={{marginBottom:"3rem"}}>
        <div className="title">Summary of Checks and Validations</div>
        <div className="container">
          <ValidationStartsCard />
          <Card label="Failed" value={1} color="rgba(252,120,120,0.75)"/>
          <Card label="Warning" value={1} color="rgba(245,195,140,0.75)"/>
          <Card label="Passed" value={35} color="rgba(176,223,165,0.75)"/>
        </div>
      </Paper>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
}

export default Validation
