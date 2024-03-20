import React from "react";
import Menu from "./export-menu";
import Filter from "./FilterSidebar";
import Questions from "./FilterQuestions"
import StackedBarChart from "./StackedBarGraph"

const DataAnalytics = () => {
  return (
    <div className="w-full h-full flex flex-wrap flex-col bg-off-white justify-start gap-6 p-8 pb-4">
      <div className="text-[32px] font-semibold font-montserrat">Client Data</div>
      <div className="text-2xl font-semibold font-montserrat">Question Type</div>
      <Questions />
      <StackedBarChart />
      <Filter />
      <Menu />
    </div>
  );
};

export default DataAnalytics;