import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import FooterMenu from '../shared/FooterMenu';
import Picker from 'react-mobile-picker-scroll';
import { Button, Grid, Text, Input } from '../elements/Index';
import GoBack from '../components/GoBack';
import { BsFillCalendarFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PostWrite_3 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const getPostContents = useSelector((state) => state?.post?.post_contents);
  const getMap = useSelector((state) => state?.post?.post_map);

  const memberAge = getPostContents?.post_contents?.memberAge;
  const memberGender = getPostContents?.post_contents?.memberGender;
  const maxMember = getPostContents?.post_contents?.maxMember;
  const postCategory = getPostContents?.post_contents?.postCategory;
  const postTitle = getPostContents?.post_contents?.postTitle;
  const postDesc = getPostContents?.post_contents?.postDesc;

  const address = getMap?.post_map?.address;
  const spot = getMap?.post_map?.spot;
  const latitude = getMap?.post_map?.latitude;
  const longitude = getMap?.post_map?.longitude;

  // const [datemate, setDatemate] = useState(new Date());

  // 날짜
  const [mateday, setMateday] = useState();

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

  //시간

  const [optionGroups] = useState({
    AmPm: ['오전', '오후'],
    Hour: [
      '12',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
    ],
    Minute: ['00', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
  });
  const [valueGroups, setvalueGroups] = useState({
    AmPm: '오전',
    Hour: '12',
    Minute: '00',
  });

  const handleChange = (name, value) => {
    setvalueGroups({ ...valueGroups, [name]: value });
  };

  console.log(JSON.stringify(mateday)?.substring(6, 8));
  let month = JSON.stringify(mateday)?.substring(6, 8);
  console.log(JSON.stringify(mateday)?.substring(9, 11));
  let day = JSON.stringify(mateday)?.substring(9, 11);
  let calendar_date = month + '월' + day + '일';

  let b = JSON.stringify(valueGroups)?.substring(9, 11);
  let c = JSON.stringify(valueGroups)?.substring(21, 23);
  let d = JSON.stringify(valueGroups)?.substring(35, 37);
  let datemate = calendar_date + ', ' + c + ':' + d + ' ' + b;
  console.log(typeof datemate);

  const addPost = () => {
    dispatch(
      postActions.addPostDB(
        address,
        datemate,
        latitude,
        longitude,
        maxMember,
        memberAge,
        memberGender,
        postCategory,
        postDesc,
        postTitle,
        spot
      )
    );
  };

  // console.log(address);
  // console.log(datemate);
  // console.log(latitude);
  // console.log(longitude);
  // console.log(maxMember);
  // console.log(memberAge);
  // console.log(memberGender);
  // console.log(postCategory);
  // console.log(postDesc);
  // console.log(postTitle);
  // console.log(spot);

  return (
    <Grid>
      <GoBack text='모임 만들기' path='/postcategory' />
      <LineBox>
        <Grid
          row
          height='auto'
          padding='0px 24px 12px 0px'
          justify='space-between'
        >
          <Grid row margin='0px 0px 0px 24px'>
            <BsFillCalendarFill />
            <Text margin='0px 12px' size='16px'>
              날짜
            </Text>
          </Grid>
          <div>
            <DatePicker //달력
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
              selected={mateday}
              dateFormat={'yyyy-MM-dd'}
              locale={ko}
              placeholderText='날짜를 입력해 주세요!'
              onChange={(date) => setMateday(date)}
            />
          </div>
        </Grid>
      </LineBox>
      <LineBox>
        <Grid
          row
          height='auto'
          padding='12px 24px 12px 0px'
          justify='space-between'
        >
          <Grid row margin='0px 0px 0px 24px'>
            <AiFillClockCircle />
            <Text margin='0px 12px' size='16px'>
              시간
            </Text>
          </Grid>
          <div className='Test'>
            <input
              value={
                `${valueGroups?.AmPm} ${valueGroups?.Hour}:${valueGroups?.Minute}` ||
                ''
              }
            />
          </div>
        </Grid>
      </LineBox>
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={handleChange}
      />
      <Grid
        row
        height='auto'
        padding='12px 24px 12px 0px'
        justify='space-between'
      >
        <Grid row margin='0px 0px 0px 24px'>
          <FaMapMarkerAlt />
          <Text margin='0px 12px' size='16px'>
            장소
          </Text>
        </Grid>
        <div>{spot}</div>
      </Grid>
      {spot ? (
        <FooterMenu next _onClick={addPost} text='확인' />
      ) : (
        <FooterMenu next path='/postwrite4' text='다음' />
      )}
    </Grid>
  );
};

const LineBox = styled.div`
  border-bottom: 1px solid #e9e9e9;
`;

export default PostWrite_3;
