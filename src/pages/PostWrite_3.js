import React, { useState } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { getYear, getMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";
import FooterMenu from "../shared/FooterMenu";
import Picker from "react-mobile-picker-scroll";
import { Button, Grid, Text, Input, GoBack } from "../elements/Index";

import { BsFillCalendarFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

registerLocale("ko", ko);
const PostWrite_3 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const memberAge = props?.location?.state?.memberAge;
  const memberGender = props?.location?.state?.memberGender;
  const maxMember = props?.location?.state?.maxMember;
  const postCategory = props?.location?.state?.postCategory;
  const postTitle = props?.location?.state?.postTitle;
  const postDesc = props?.location?.state?.postDesc;

  const address = props.location?.state?.address;
  const spot = props.location?.state?.spot;
  const latitude = props.location?.state?.latitude;
  const longitude = props.location?.state?.longitude;

  // 날짜
  const [mateday, setMateday] = useState(new Date());
  const _ = require("lodash");
  const years = _.range(1950, getYear(new Date()) + 1, 1);
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  //시간

  const [optionGroups] = useState({
    AmPm: ["오전", "오후"],
    Hour: [
      "12",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
    ],
    Minute: ["00", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"],
  });
  const [valueGroups, setvalueGroups] = useState({
    AmPm: "오전",
    Hour: "12",
    Minute: "00",
  });

  const handleChange = (name, value) => {
    setvalueGroups({ ...valueGroups, [name]: value });
  };

  //날짜 시간 합성

  const days = new Date(+mateday + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");
  const finalday = days.split("-");
  const _year = finalday[0];
  const _month = finalday[1];
  const _day = finalday[2].split(" ")[0];
  const realfinal = `${_month}월${_day}일`;

  let b = JSON.stringify(valueGroups)?.substring(9, 11);
  let c = JSON.stringify(valueGroups)?.substring(21, 23);
  let d = JSON.stringify(valueGroups)?.substring(35, 37);
  let datemate = realfinal + ", " + c + ":" + d + " " + b;

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

  //프로그레스바
  let count = 2;
  if (spot) {
    count++;
  }

  return (
    <Grid>
      <GoBack text="모임 만들기" path="/postwrite2" />
      <ProgressBar>
        <HighLight width={(count / 3) * 100 + "%"} />
      </ProgressBar>
      <LineBox>
        <Grid
          row
          margin="12px 0px"
          height="auto"
          padding="0px 24px 4px 0px"
          justify="space-between"
        >
          <Grid row margin="0px 0px 0px 24px">
            <FaMapMarkerAlt />
            <Text margin="0px 12px" size="16px">
              장소
            </Text>
          </Grid>
          {spot ? (
            <div
              onClick={() => {
                history.push("/postwrite4");
              }}
            >
              {spot}
            </div>
          ) : (
            <Link
              to={{
                pathname: "/postwrite4",
                state: {
                  maxMember,
                  memberAge,
                  memberGender,
                  postCategory,
                  postDesc,
                  postTitle,
                },
              }}
            >
              <div
                onClick={() => {
                  history.push("/postwrite4");
                }}
              >
                장소입력
              </div>
            </Link>
          )}
        </Grid>
      </LineBox>
      <LineBox>
        <Grid
          row
          height="auto"
          padding="12px 24px 12px 0px"
          justify="space-between"
        >
          <Grid row margin="0px 0px 0px 24px">
            <BsFillCalendarFill />
            <Text margin="0px 12px" size="16px">
              날짜
            </Text>
          </Grid>
          <div>
            <DatePicker //달력
              className="calendar"
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
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
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
                    {">"}
                  </button>
                </div>
              )}
              selected={mateday}
              dateFormat={"yyyy-MM-dd"}
              locale={ko}
              placeholderText="날짜를 입력해 주세요!"
              onChange={(date) => setMateday(date)}
            />
          </div>
        </Grid>
      </LineBox>
      <Grid
        row
        height="auto"
        padding="12px 24px 12px 0px"
        justify="space-between"
      >
        <Grid row margin="0px 0px 0px 24px">
          <AiFillClockCircle />
          <Text margin="0px 12px" size="16px" _onClick={() => setShow(!show)}>
            시간
          </Text>
        </Grid>
        <div className="Test">
          <input
            value={
              `${valueGroups?.AmPm} ${valueGroups?.Hour}:${valueGroups?.Minute}` ||
              ""
            }
            style={{ border: "0px", margin: "0px 0xp 0px 200px" }}
          />
        </div>
      </Grid>
      <div className="App">
        {show ? (
          <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            onChange={handleChange}
          />
        ) : null}
      </div>

      <FooterMenu next event={addPost} text="다음" />
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
  background: black;
  transition: 1s;
  width: ${(props) => props.width};
  height: 4.5px;
`;

export default PostWrite_3;
