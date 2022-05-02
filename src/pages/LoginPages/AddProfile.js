import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../../redux/configStore';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

const AddProfile = (props) => {
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

  const address = props.location.state?.address;

  const [preview, setPreview] = useState();
  const [profile, setProfile] = useState();
  const [nickName, setNickName] = useState();
  const [gender, setGender] = useState();
  const [birthday, setBirthday] = useState();
  const [content, setContent] = useState();

  // const selectOptions = (e) => {
  //   setNickName(e.target.value);
  //   setGender(e.target.value);
  //   setContent(e.target.value);
  //   console.log(e.target.value);
  // };

  const selectImage = (e) => {
    setPreview(window.webkitURL.createObjectURL(e.target.files[0]));
    setProfile(window.webkitURL.createObjectURL(e.target.files[0]));
  };

  const selectNickName = (e) => {
    setNickName(e.target.value);
  };
  const selectGender = (e) => {
    setGender(e.target.value);
  };
  const selectContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <TotBox>
      <h3>프로필 작성</h3>
      <img
        alt='profile'
        src={preview ? preview : 'https://ifh.cc/g/SCJaxK.png'}
      ></img>
      <div className='fileupload'>
        <label htmlFor='image'>+</label>
        <input
          type='file'
          id='image'
          onChange={(e) => {
            selectImage(e);
          }}
        />
      </div>
      <input type='text' placeholder='닉네임' onChange={selectNickName} />
      <div className='Second'>
        <select onChange={selectGender} placeholder='성별'>
          <option value='남성'>남성</option>
          <option value='여성'>여성</option>
        </select>
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
            selected={birthday}
            dateFormat={'yyyy-MM-dd'}
            locale={ko}
            placeholderText='생일을 입력해 주세요!'
            onChange={(date) => setBirthday(date)}
          />
        </div>
      </div>

      <Content
        type='text'
        placeholder='당신에 대해 조심 더 알려주세요!'
        onChange={selectContent}
      />
      <Link
        to={{
          pathname: '/category',
          state: { profile, nickName, gender, birthday, content, address },
        }}
      >
        <Next
          onClick={() => {
            history.push('/category');
          }}
        >
          다음
        </Next>
      </Link>
    </TotBox>
  );
};

const TotBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .fileupload label {
    display: inline-block;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    font-weight: normal;
    background: #ddd;
    color: white;
    cursor: pointer;
    border-radius: 50%;
  }
  .fileupload input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .Second {
    width: 357px;
    align-items: row;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .Second select {
    width: 100px;
  }
`;

const Content = styled.input`
  width: 350px;
  height: 150px;
`;

const Next = styled.button`
  width: 350px;
  height: 45px;
  margin-top: 10%;
  border: none;
  background: gray;
`;
export default AddProfile;
