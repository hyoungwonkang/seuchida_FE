import React, { Component } from 'react';
import Picker from 'react-mobile-picker-scroll';
import { Link } from 'react-router-dom';

const Time = () => {
  const [optionGroups] = React.useState({
    AmPm: ["오전", "오후"],
    Hour: ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    Minute: ["00", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"],
  });
  const [valueGroups, setvalueGroups] = React.useState({
    AmPm: "오전",
    Hour: "12",
    Minute: "00",
  });

  const handleChange = (name, value) => {
    setvalueGroups({ ...valueGroups, [name]: value });
  };

  return (
    <div className="Test">
      <input
        value={
          `${valueGroups?.AmPm} ${valueGroups?.Hour}:${valueGroups?.Minute}` ||
          ""
        }
      />
      <Link
        to={{
          pathname: '/postwrite4',
          state: { valueGroups },
        }}
      >
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={handleChange}
        />
      </Link>
    </div>
  );
};

export default Time;
