import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const SparklineChart = ({ chart }) => {
  return (
    <Sparklines data={chart}>
      <SparklinesLine color="blue" />
    </Sparklines>
  );
};

export default SparklineChart;
