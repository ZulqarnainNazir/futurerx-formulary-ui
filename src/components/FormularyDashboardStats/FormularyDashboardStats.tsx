import React from 'react';
import Paper from '@material-ui/core/Paper';
import FormularyDashboardStatsCard from './FormularyDashboardStatsCard/FormularyDashboardStatsCard';
import FormularyDashboardStatsChart from './FormularyDashboardStatsChart/FormularyDashboardStatsChart';

import './FormularyDashboardStats.scss';

const FormularyDashboardStats = () => {
  return (
    <div className="formulary-dashboard-stats-outer-container">
      <Paper elevation={0}>
        <div className="title">FORMULARY DASHBOARD</div>
        <div className="inner-container">
          <FormularyDashboardStatsChart/>
          
          <div className="stats-card-container">  
            <FormularyDashboardStatsCard variant="1"/>
            <FormularyDashboardStatsCard variant="2"/>
            <FormularyDashboardStatsCard variant="3"/>
            <FormularyDashboardStatsCard variant="4"/>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default FormularyDashboardStats
