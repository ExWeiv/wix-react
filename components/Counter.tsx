import React, { useState, useEffect } from "react";
import SparklineChart from "./SparklineChart";

const Counter = ({ clickCount, customElement }) => {
  // Declare state variable 'count' with initial value 0
  const [count, setCount] = useState(0);
  const [chart, setChart] = useState([count]);

  useEffect(() => {
    setCount(clickCount);
    setChart(chart.concat([count - count * Math.random()]));
  }, [clickCount]);

  const handleClick = async () => {
    customElement.dispatchEvent(new CustomEvent("onButtonClick", { detail: { count } }));
    // Update state using the 'setCount' function
    setCount(count + 1);
  };

  return (
    <div className="counter-box">
      <div className="chart">
        <SparklineChart chart={chart} />
      </div>
      <div className="example">
        <p className="countText">You clicked {count} times</p>
        <button className="incButton" onClick={handleClick}>
          Multiply by 2X
        </button>
      </div>
    </div>
  );
};

export default Counter;
