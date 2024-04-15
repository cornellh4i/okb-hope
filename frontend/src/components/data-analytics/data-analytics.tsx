import React, { useState } from 'react';
import Menu from "./export-menu";
import Filter from "./FilterSidebar";
import Questions from "./FilterQuestions"
import StackedBarChart from "./StackedBarGraph"
import { Grid, Box } from "@mui/material"
import PatientList from "./PatientList";

const DataAnalytics = () => {
  const [globalQuestionType, setGlobalQuestionType] = useState<string>("");
  const [globalAgeRanges, setGlobalAgeRanges] = useState<string[]>([]);
  const [globalGenders, setGlobalGenders] = useState<number[]>([]);
  const [globalLanguages, setGlobalLanguages] = useState<string[]>([]);
  const [globalMen, setGlobalMen] = useState<number[]>([]);
  const [globalWomen, setGlobalWomen] = useState<number[]>([]);
  const [globalOther, setGlobalOther] = useState<number[]>([]);  

  return (
    <div className="w-full h-full flex flex-wrap flex-col bg-off-white justify-start gap-6 p-8 pb-4">
      <div className="text-[32px] font-semibold font-montserrat">Client Data</div>
      <div className="text-2xl font-semibold font-montserrat">Question Type</div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
        <Questions setGlobalQuestionType={setGlobalQuestionType} />
        <PatientList questionType={globalQuestionType} ageRanges={globalAgeRanges} genders={globalGenders} languages={globalLanguages}
              setGlobalMen={setGlobalMen} setGlobalWomen={setGlobalWomen} setGlobalOther={setGlobalOther} />
            <StackedBarChart questionType={globalQuestionType} men={globalMen} women={globalWomen} other={globalOther} />
          <Box display="flex" justifyContent="flex-end" marginRight="6%" marginLeft="6%">
            <Menu questionType={globalQuestionType} men={globalMen.map(String)} women={globalWomen.map(String)} other={globalOther.map(String)}/>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Filter setGlobalAgeRanges={setGlobalAgeRanges} setGlobalGenders={setGlobalGenders} setGlobalLanguages={setGlobalLanguages} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DataAnalytics;