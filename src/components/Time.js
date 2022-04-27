import React, { Component } from "react";
import Picker from "react-mobile-picker-scroll";

const Time = () => {
  const range = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  };
  const getNumberOfperiod = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  const [optionGroups] = React.useState({
    Year: range(1990, 2100),
    Periode: range(1, 53),
  });
  const [valueGroups, setvalueGroups] = React.useState({
    Year: new Date().getFullYear(),
    Periode: getNumberOfperiod(),
  });
  const handleChange = (name, value) => {
    console.log("name", name, "value", value);
    setvalueGroups({ ...valueGroups, [name]: value });
  };

  return (
    <div className="Test">
      {console.log("valuegroup", valueGroups)}
      <h1>
        You have chossen <br />
        Year: {valueGroups?.Year} and Periode: {valueGroups?.Periode}
      </h1>
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={handleChange}
      />
    </div>
  );
};

export default Time;
