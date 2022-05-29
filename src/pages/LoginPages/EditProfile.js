import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Grid, Image, Input, Text, GoBack } from "../../elements/Index";
import { actionCreators as userActions } from "../../redux/modules/user";
import { useHistory } from "react-router-dom";
import FooterMenu from "../../shared/FooterMenu";
import Modal from "../../components/Modal/Modal"; //모달 창
import ModalData from "../../components/Modal/ModalData";
import { AiFillPlusCircle } from "react-icons/ai";
import { Redirect } from "react-router-dom";

const EditProfile = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //유저 정보
  React.useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);

  const userInfo = useSelector((state) => state.user.userInfo);

  //로컬 값 불러오기(4)
  const localNickname = localStorage.getItem("nickName");
  const localGender = localStorage.getItem("gender");
  const localAge = localStorage.getItem("age");
  const localContent = localStorage.getItem("content");

  //수정 페이지 기본 정보 불러오기
  React.useEffect(() => {
    setProfile(userInfo?.userImg);
    setNickName(localNickname ? localNickname : userInfo?.nickName);
    setGender(localGender ? localGender : userInfo?.userGender);
    setAge(localAge ? localAge : userInfo?.userAge);
    setContent(localContent ? localContent : userInfo?.userContent);
  }, [userInfo]);

  //모달 오픈 state
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [isOpen3, setIsOpen3] = React.useState(false);

  //입력값 state
  const [preview, setPreview] = useState("");
  const [profile, setProfile] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [content, setContent] = useState("");

  //로컬 값 저장(4)
  localStorage.setItem("nickName", nickName);
  localStorage.setItem("gender", gender);
  localStorage.setItem("age", age);
  localStorage.setItem("content", content);

  //특수 문자 제한
  const notNum = /[^ㄱ-ㅎ가-힣a-z0-9]/gi;
  const notSpecial = /[^/!/~/./,\sㄱ-ㅎ가-힣a-z0-9]/gi;

  //입력값 가져오기
  const selectPreview = (e) => {
    setPreview(window.webkitURL.createObjectURL(e.target.files[0]));
  };

  const selectImage = (e) => {
    setProfile(e.target.files[0]);
  };

  const selectNickName = (e) => {
    if (e.target.value.length >= 8) {
      e.target.value = e.target.value.substr(0, 8);
    }
    setNickName(e.target.value.replace(notNum, ""));
  };

  const selectGender = (e) => {
    setGender(e.target.value);
  };
  const selectAge = (e) => {
    setAge(e.target.value);
  };
  const selectContent = (e) => {
    if (e.target.value.length >= 100) {
      e.target.value = e.target.value.substr(0, 100);
    }
    setContent(e.target.value.replace(notSpecial, ""));
  };

  //빈값 유효성 검사
  const alert = (e) => {
    if (
      profile === "" ||
      nickName === "" ||
      gender === "" ||
      age === "" ||
      content === ""
    ) {
      setIsOpen(true);
    } else {
      //사진 수정
      const formData = new FormData();
      formData.append("newUserImg", profile);
      dispatch(userActions.editPhotoDB(formData));
      history.push("/category");
    }
  };

  //글자수 100글자 제한
  useEffect(() => {
    if (nickName?.length >= 8) {
      setIsOpen3(true);
    }
    if (content?.length >= 100) {
      setIsOpen2(true);
    }
  }, [content, nickName]);

  //앱에서 페이지 새로고침 막기
  document.body.style.overscrollBehavior = "none";

  //새로고침 시 작성 첫 번째 페이지로 이동
  if (document.readyState === "interactive") {
    //로컬 값 날림
    localStorage.removeItem("address");
    localStorage.removeItem("nickName");
    localStorage.removeItem("gender");
    localStorage.removeItem("age");
    localStorage.removeItem("content");
    //새로고침 경고
    window.onbeforeunload = function () {
      return "새로고침 경고";
    };
    return <Redirect to="/signuploca" />;
  }

  return (
    <>
      <Container>
        <Grid bg="white">
          <GoBack text="프로필 수정" path="/signuploca" />

          <Grid column height="650px">
            <Grid height="auto" column margin="30px 0px">
              {/* 프로필 이미지 */}
              <ImgBox>
                <Image
                  size={80}
                  alt="profile"
                  src={preview ? preview : userInfo.userImg}
                />
                <FileUpload>
                  <label htmlFor="image">
                    <AiFillPlusCircle
                      cursor={"pointer"}
                      size={32}
                      color="#5796F7"
                    />
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => {
                      selectPreview(e);
                      selectImage(e);
                    }}
                  />
                </FileUpload>
              </ImgBox>

              {/* 닉네임 */}
              <Input
                margin="50px 0px 0px 0px"
                height="56px"
                type="text"
                placeholder="닉네임"
                _onChange={selectNickName}
                value={nickName || ""}
              />

              {/* 성별 */}
              <Option>
                <select onChange={selectGender} defaultValue="default">
                  <option className="title" value="default" disabled>
                    {userInfo.userGender ? userInfo.userGender : "성별"}
                  </option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </select>

                {/* 나이 */}
                <div>
                  <Age
                    type="number"
                    placeholder="나이"
                    onChange={selectAge}
                    pattern="/[^ㄱ-ㅎ가-힣]/g"
                    value={age || ""}
                    min="0"
                  />
                </div>
              </Option>

              {/* 자기소개 한 줄 */}
              <Input
                bg="#F1F1F5"
                multiLine
                height="160px"
                margin="0px 0px 100px 100px"
                type="text"
                placeholder="당신에 대해 조금 더 알려주세요!"
                _onChange={selectContent}
                value={content || ""}
              />
              <Text size="16px" color="#787878" margin="0px 0px 0px 300px">
                {content?.length}/100
              </Text>

              {/* 푸터 */}
              <FooterMenu next text="다음" state={alert} />

              {/* 경고창 모달 */}
              <Modal open={isOpen}>
                <ModalData
                  Alert
                  onClose={() => setIsOpen(false)}
                  text="내용을 모두 입력해 주세요!"
                />
              </Modal>

              {/* 글자수 모달(내용) */}
              <Modal open={isOpen2}>
                <ModalData
                  Alert
                  onClose={() => setIsOpen2(false)}
                  text="100글자 이하로 작성해주세요!"
                />
              </Modal>
              {/* 글자수 모달(닉네임) */}
              <Modal open={isOpen3}>
                <ModalData
                  Alert
                  onClose={() => setIsOpen3(false)}
                  text="8글자 이하로 작성해주세요!"
                />
              </Modal>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default EditProfile;

const ImgBox = styled.div`
  position: "relative";
`;

const FileUpload = styled.div`
  label {
    position: absolute;
    top: 150px;
    right: 150px;
  }
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 342px;
  height: 56px;
  margin: 10px 0px;

  select {
    width: 122px;
    height: 56px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  .age {
    width: 213px;
    height: 56px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  .title[value="default"][disabled] {
    display: none;
  }
`;

const Container = styled.div`
  padding-top: 0px;
`;

const Age = styled.input`
  width: 213px;
  height: 56px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 12px 10px;
`;
