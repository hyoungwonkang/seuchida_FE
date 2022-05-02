import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configStore';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useHistory } from 'react-router-dom';

const PostWrite_3 = (props) => {
  const history = useHistory();
  const memberAge = props.location.state.memberAge;
  const memberGender = props.location.state.memberGender;
  const maxMember = props.location.state.maxMember;
  const postCategory = props.location.state.postCategory;
  const postTitle = props.location.state.postTitle;
  const postDesc = props.location.state.postDesc;
  const state = props.location.state;
  console.log(state);

  const _ = require('lodash');
  const years = _.range(1950, getYear(new Date()) + 1, 1);
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const [datemate, setDatemate] = useState();
  console.log(datemate);
  return (
    <Container>
      날짜
      <div className='calendarBox'>
        <DatePicker
          className='calendar'
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {'<'}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {'>'}
              </button>
            </div>
          )}
          selected={datemate}
          dateFormat={'yyyy-MM-dd'}
          locale={ko}
          onChange={(date) => setDatemate(date)}
        />
      </div>
      시간
    </Container>
  );
};

const Container = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0px 0px 0px 0px;
`;

export default PostWrite_3;
