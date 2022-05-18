import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useHistory, Link } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";
import FooterMenu from "../shared/FooterMenu";
import Picker from "react-mobile-picker-scroll";
import { Grid, Text, GoBack } from "../elements/Index";
import Modal from "../components/Modal/Modal";
import ModalData from "../components/Modal/ModalData";

import { IconContext } from "react-icons";
import { BsFillCalendarFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

const PostWrite_3 = (props) => {
  document.body.style.overscrollBehavior = "none";
  const history = useHistory();
  const dispatch = useDispatch();

  if (history.action === "POP") {
    history.replace("/main");
  }

  //모달 오픈 state
  const [isOpen, setIsOpen] = React.useState(false);

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
  const [value, setValue] = useState(new Date());

  const newdays = new Date(+value + 3240 * 10000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");
  const newfinalday = newdays.split("-");
  const new_month = newfinalday[1];
  const new_day = newfinalday[2].split(" ")[0];
  const new_realfinal = `${new_month}월${new_day}일`;

  // 요일을 가져옵니다.
  function getDay() {
    const date = new Date(+value + 3240 * 10000);
    let day = date.getDay();
    switch (day) {
      case 0:
        day = "일";
        break;
      case 1:
        day = "월";
        break;
      case 2:
        day = "화";
        break;
      case 3:
        day = "수";
        break;
      case 4:
        day = "목";
        break;
      case 5:
        day = "금";
        break;
      case 6:
        day = "토";
        break;
      default:
        day = "";
    }
    return "(" + day + ")";
  }

  //요일을 포함하는 변수를 만듭니다.
  let dayDate = new_realfinal + " " + getDay();

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

  let b = JSON.stringify(valueGroups)?.substring(9, 11);
  let c = JSON.stringify(valueGroups)?.substring(21, 23);
  let d = JSON.stringify(valueGroups)?.substring(35, 37);

  // 오후 12:00 형식의 변수를 만듭니다.
  let pageTime = b + ` ` + c + `:` + d;

  //날짜와 시간을 datemate로 합성합니다.
  let datemate = new_realfinal + ", " + c + ":" + d + " " + b;

  //토글
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  let [showDate, setShowDate] = useState("");
  let [showTime, setShowTime] = useState("");

  //프로그레스바
  let count = 2;
  if (spot) {
    count++;
  }

  if (!show) {
    datemate = null;
    if (showDate && showTime) {
      datemate = new_realfinal + ", " + c + ":" + d + " " + b;
    }
  }

  const addPost = () => {
    if (!address || !datemate) {
      setIsOpen(true);
    } else {
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
    }
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
      <GoBack text="모임 만들기" path="/postcategory" />
      <Grid margin="24px 0px 40px 0px">
        <ProgressBar>
          <HighLight width={(count / 3) * 100 + "%"} />
        </ProgressBar>
      </Grid>
      <LineBox>
        <Grid
          row
          margin="12px 0px"
          height="auto"
          padding="0px 24px 4px 0px"
          justify="space-between"
        >
          <Grid row margin="6px 0px 0px 24px">
            <IconContext.Provider value={{ color: "#787878", size: "16px" }}>
              <FaMapMarkerAlt />
            </IconContext.Provider>
            <Text bold margin="0px 13px" size="16px">
              장소
            </Text>
          </Grid>
          <Grid isFlex_end>
            {!spot ? (
              <Link
                to={{
                  // pathname: '/postwrite4',
                  state: {
                    maxMember,
                    memberAge,
                    memberGender,
                    postCategory,
                    postDesc,
                    postTitle,
                  },
                }}
                style={{ textDecorationLine: "none" }}
              >
                <div
                  onClick={() => {
                    history.push("/postwrite4");
                  }}
                  style={{
                    color: "#C4C4C4",
                  }}
                >
                  조건 선택
                </div>
              </Link>
            ) : (
              <div
                onClick={() => {
                  history.push("/postwrite4");
                }}
                style={{
                  color: "black",
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
          margin="12px 0px"
          height="auto"
          padding="0px 24px 4px 0px"
          justify="space-between"
        >
          <Grid>
            <Grid row padding="0px 0px 0px 26px">
              <IconContext.Provider value={{ color: "#787878", size: "16px" }}>
                <BsFillCalendarFill />
              </IconContext.Provider>
              <Text bold width="80px" margin="0px 0px 0px 14px" size="16px">
                날짜
              </Text>
              <Grid isFlex_end>
                <div onClick={() => setShow(!show)}>
                  {show ? (
                    <div
                      onClick={() => setShowDate(dayDate)}
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      확인
                    </div>
                  ) : showDate ? (
                    dayDate
                  ) : (
                    <div style={{ color: "#C4C4C4" }}>조건 선택</div>
                  )}
                </div>
              </Grid>
            </Grid>
            <Grid row margin="0px 12px" padding="0px 8px">
              {show ? (
                <CalendarContainer>
                  <Calendar
                    onChange={setValue}
                    calendarType="US"
                    locale="EN"
                    value={value}
                  />
                </CalendarContainer>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </LineBox>
      <Grid
        row
        height="auto"
        padding="12px 24px 12px 0px"
        justify="space-between"
      >
        <Grid row margin="0px 0px 0px 24px">
          <IconContext.Provider value={{ color: "#787878", size: "16px" }}>
            <AiFillClockCircle />
          </IconContext.Provider>
          <Text bold width="32px" margin="0px 12px">
            시간
          </Text>
        </Grid>
        <Grid isFlex_end>
          <div className="Test" onClick={() => setShow2(!show2)}>
            {show2 ? (
              <div
                onClick={() => setShowTime(pageTime)}
                style={{
                  fontSize: "16px",
                }}
              >
                확인
              </div>
            ) : showTime ? (
              pageTime
            ) : (
              <div style={{ color: "#C4C4C4" }}>조건 선택</div>
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
      <FooterMenu next event={addPost} text="다음" />
      {/* 경고창 모달 */}
      <Modal open={isOpen}>
        <ModalData
          Alert
          text="내용을 모두 입력해주세요"
          onClose={() => setIsOpen(false)}
        />
      </Modal>
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

const CalendarContainer = styled.div`
  margin-right: 24px;
  margin-top: 24px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  .react-calendar {
    border: 0 !important;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }
`;

export default PostWrite_3;
