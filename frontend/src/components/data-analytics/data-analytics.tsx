import React, { ChangeEvent, use, useEffect, useState } from 'react';
import Menu from "./export-menu";
import Filter from "./FilterSidebar";
import Questions from "./FilterQuestions"
import StackedBarChart from "./StackedBarGraph"
import { Grid, Box } from "@mui/material"
import PatientList from "./PatientList";
import { getGlobalQuestionType } from './global';

const DataAnalytics = () => {
  // left is the state and right is a setter to change that variables
  const [globalQuestionType, setGlobalQuestionType] = useState<string>();

  return (
    <div className="w-full h-full flex flex-wrap flex-col bg-off-white justify-start gap-6 p-8 pb-4">
      <div className="text-[32px] font-semibold font-montserrat">Client Data</div>
      <div className="text-2xl font-semibold font-montserrat">Question Type</div>
      <Questions setGlobalQuestionType={setGlobalQuestionType} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} >
          <Box display="flex" justifyContent="flex-end" marginRight="5%">
            <StackedBarChart questionType={globalQuestionType} />
          </Box>
          <Box display="flex" justifyContent="flex-end" marginRight="6%">
            <Menu />
            <PatientList results={[]} />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Filter />
        </Grid>
      </Grid>
    </div>
  );
};

export default DataAnalytics;