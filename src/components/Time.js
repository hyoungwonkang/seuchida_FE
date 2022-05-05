import React, { Component } from 'react';
import Picker from 'react-mobile-picker-scroll';
import { Link } from 'react-router-dom';

const Time = () => {
  // const range = (start, end) => {
  //   return Array(end - start + 1)
  //     .fill()
  //     .map((_, idx) => start + idx);
  // };
  // const getNumberOfperiod = () => {
  //   const today = new Date();
  //   const firstDayOfYear = new Date(today.getFullYear(), 0, 1); //=> 시간으로 바꿔
  //   const pastDaysOfYear = (today - firstDayOfYear) / 86400000; //=> 10~50 분으로 바꿔
  //   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  // };
  const [optionGroups] = React.useState({
    AmPm: ['오전', '오후'],
    Hour: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    Minute: ['00', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
  });
  const [valueGroups, setvalueGroups] = React.useState({
    AmPm: '오전',
    Hour: '12',
    Minute: '00',
  });

  const handleChange = (name, value) => {
    setvalueGroups({ ...valueGroups, [name]: value });
  };

  return (
    <div className='Test'>
      <input
        value={`${valueGroups?.AmPm} ${valueGroups?.Hour}:${valueGroups?.Minute}`}
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
