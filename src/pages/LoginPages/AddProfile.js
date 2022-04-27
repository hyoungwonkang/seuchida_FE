import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as imageActions } from "../../redux/modules/image";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { getYear, getMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const AddProfile = () => {
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
  const fileInput = React.useRef();
  const dispatch = useDispatch();

  const preview = useSelector((state) => state.image.preview);

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

  const selectNickName = (e) => {
    setNickName(e.target.value);
    console.log(e.target.value);
  };
  const selectGender = (e) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };
  const selectContent = (e) => {
    setContent(e.target.value);
  };

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const addProfile = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요!");
      return;
    }
    const file = fileInput.current.files[0];
    console.log(file);

    const formData = new FormData();

    formData.append("userProfile", file);
    formData.append("nickName", nickName);
    formData.append("gender", gender);
    formData.append("birthday", birthday);
    formData.append("content", content);
    console.log("formData", formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    dispatch(userActions.signupDB(formData));
    history.push("/category");
  };

  return (
    <TotBox>
      <h3>프로필 작성</h3>
      <img
        alt="profile"
        src={preview ? preview : "https://ifh.cc/g/SCJaxK.png"}
      ></img>
      <div className="fileupload">
        <label htmlFor="image">+</label>
        <input type="file" id="image" ref={fileInput} onChange={selectFile} />
      </div>
      <input type="text" placeholder="닉네임" onChange={selectNickName} />
      <div className="Second">
        <select onChange={selectGender} placeholder="성별">
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
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
            selected={birthday}
            dateFormat={"yyyy-MM-dd"}
            locale={ko}
            placeholderText="생일을 입력해 주세요!"
            onChange={(date) => setBirthday(date)}
          />
        </div>
      </div>

      <Content
        type="text"
        placeholder="당신에 대해 조심 더 알려주세요!"
        onChange={selectContent}
      />
      <Next onClick={addProfile}>다음</Next>
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
  calendar {
    width: 220px;
    margin-left: 30px;
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
