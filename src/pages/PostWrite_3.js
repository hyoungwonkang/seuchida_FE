import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useHistory } from 'react-router-dom';
import { actionCreators as postActions } from '../redux/modules/post';
import { useDispatch } from 'react-redux';
import FooterMenu from '../shared/FooterMenu';
import Picker from 'react-mobile-picker-scroll';
import { Grid, Text, GoBack } from '../elements/Index';

import { IconContext } from 'react-icons';
import { BsFillCalendarFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PostWrite_3 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //localStorage에 있는 데이터를 불러옵니다.
  const address = localStorage.getItem('address');
  const spot = localStorage.getItem('spot');
  const latitude = localStorage.getItem('latitude');
  const longitude = localStorage.getItem('longitude');
  const memberAge = localStorage.getItem('memberAge');
  const memberGender = localStorage.getItem('memberGender');
  const maxMember = localStorage.getItem('maxMember');
  const postCategory = localStorage.getItem('postCategory');
  const postTitle = localStorage.getItem('postTitle');
  const postDesc = localStorage.getItem('postDesc');

  //localStorage에서 가져온 데이터를 새로고침 시 사용합니다.
  // let [loca, setLoca] = useState();
  let [dayDate, setDayDate] = useState();
  let [pageTime, setPageTime] = useState();

  // 날짜
  const [value, setValue] = useState(new Date());

  const newdays = new Date(+value + 3240 * 10000)
    .toISOString()
    .replace('T', ' ')
    .replace(/\..*/, '');
  const newfinalday = newdays.split('-');
  const new_month = newfinalday[1];
  const new_day = newfinalday[2].split(' ')[0];
  const new_realfinal = `${new_month}월${new_day}일`;

  // 요일을 가져옵니다.
  function getDay() {
    const date = new Date(+value + 3240 * 10000);
    let day = date.getDay();
    switch (day) {
      case 0:
        day = '일';
        break;
      case 1:
        day = '월';
        break;
      case 2:
        day = '화';
        break;
      case 3:
        day = '수';
        break;
      case 4:
        day = '목';
        break;
      case 5:
        day = '금';
        break;
      case 6:
        day = '토';
        break;
      default:
        day = '';
    }
    return '(' + day + ')';
  }

  //요일을 포함하는 변수를 만듭니다.
  dayDate = new_realfinal + ' ' + getDay();

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

  let b = JSON.stringify(valueGroups)?.substring(9, 11);
  let c = JSON.stringify(valueGroups)?.substring(21, 23);
  let d = JSON.stringify(valueGroups)?.substring(35, 37);

  pageTime = b + ` ` + c + `:` + d;

  //날짜와 시간을 datemate로 합성합니다.
  let datemate = new_realfinal + ', ' + c + ':' + d + ' ' + b;

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

  //토글
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  let [showDate, setShowDate] = useState('');
  let [showTime, setShowTime] = useState('');

  //프로그레스바
  let count = 2;
  if (spot) {
    count++;
  }

  //토글 열 때 datemate 저장
  if (show || show2) {
    localStorage.setItem('datemate', datemate);
  }

  // 새로고침시 데이터를 유지합니다.
  // useEffect(() => {
  //   setDayDate(window.localStorage.getItem('dayDate'));
  //   setPageTime(window.localStorage.getItem('pageTime'));
  //   setShowDate(window.localStorage.getItem('showDate'));
  //   setShowTime(window.localStorage.getItem('showTime'));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('dayDate', dayDate);
  // }, [dayDate]);
  // useEffect(() => {
  //   window.localStorage.setItem('pageTime', pageTime);
  // }, [pageTime]);
  useEffect(() => {
    window.localStorage.setItem('spot', spot);
  }, [spot]);

  return (
    <Grid>
      <GoBack text='모임 만들기' path='/postwrite2' />
      <Grid margin='24px 0px 40px 0px'>
        <ProgressBar>
          <HighLight width={(count / 3) * 100 + '%'} />
        </ProgressBar>
      </Grid>
      <LineBox>
        <Grid
          row
          margin='12px 0px'
          height='auto'
          padding='0px 24px 4px 0px'
          justify='space-between'
        >
          <Grid row margin='6px 0px 0px 24px'>
            <IconContext.Provider value={{ color: '#787878', size: '16px' }}>
              <FaMapMarkerAlt />
            </IconContext.Provider>
            <Text margin='0px 13px' size='16px'>
              장소
            </Text>
          </Grid>
          <Grid isFlex_end>
            {spot === 'null' ? (
              <div
                onClick={() => {
                  history.push('/postwrite4');
                }}
                style={{
                  color: '#C4C4C4',
                }}
              >
                조건 선택
              </div>
            ) : (
              <div
                onClick={() => {
                  history.push('/postwrite4');
                }}
                style={{
                  color: 'black',
                }}
              >
                {spot}
              </div>
            )}
          </Grid>
        </Grid>
      </LineBox>
      <LineBox>
        <Grid
          row
          margin='12px 0px'
          height='auto'
          padding='0px 24px 4px 0px'
          justify='space-between'
        >
          <Grid>
            <Grid row margin='0px 26px' padding='0px 26px 0px 0px'>
              <IconContext.Provider value={{ color: '#787878', size: '16px' }}>
                <BsFillCalendarFill />
              </IconContext.Provider>
              <Text width='80px' margin='0px 0px 0px 14px' size='16px'>
                날짜
              </Text>
              <Grid isFlex_end>
                <div onClick={() => setShow(!show)}>
                  {show ? (
                    <div
                      onClick={() => setShowDate(dayDate)}
                      style={{
                        fontSize: '16px',
                      }}
                    >
                      확인
                    </div>
                  ) : showDate ? (
                    dayDate
                  ) : (
                    <div style={{ color: '#C4C4C4' }}>조건 선택</div>
                  )}
                </div>
              </Grid>
            </Grid>
            <Grid row margin='0px 12px' padding='0px 8px'>
              {show ? <Calendar onChange={setValue} value={value} /> : null}
            </Grid>
          </Grid>
        </Grid>
      </LineBox>
      <Grid
        row
        height='auto'
        padding='12px 24px 12px 0px'
        justify='space-between'
      >
        <Grid row margin='0px 0px 0px 24px'>
          <IconContext.Provider value={{ color: '#787878', size: '16px' }}>
            <AiFillClockCircle />
          </IconContext.Provider>
          <Text width='32px' margin='0px 12px'>
            시간
          </Text>
        </Grid>
        <Grid isFlex_end>
          <div className='Test' onClick={() => setShow2(!show2)}>
            {show2 ? (
              <div
                onClick={() => setShowTime(pageTime)}
                style={{
                  fontSize: '16px',
                }}
              >
                확인
              </div>
            ) : showTime ? (
              pageTime
            ) : (
              <div style={{ color: '#C4C4C4' }}>조건 선택</div>
            )}
          </div>
        </Grid>
      </Grid>
      {show2 ? (
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={handleChange}
        />
      ) : null}

      <FooterMenu next event={addPost} text='다음' />
    </Grid>
  );
};

const LineBox = styled.div`
  border-bottom: 1px solid #e9e9e9;
`;

const ProgressBar = styled.div`
  background: #eee;
  width: 85%;
  height: 4.5px;
  margin-left: 28px;
  margin-bottom: 28px;
`;

const HighLight = styled.div`
  background: #0ed88b;
  transition: 1s;
  width: ${(props) => props.width};
  height: 4.5px;
`;

export default PostWrite_3;
