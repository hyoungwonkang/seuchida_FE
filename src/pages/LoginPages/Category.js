import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { Grid, Text, GoBack } from "../../elements/Index";
import FooterMenu from "../../shared/FooterMenu";
import { useHistory } from "react-router-dom";
import Modal from "../../components/Modal/Modal"; //모달 창
import ModalData from "../../components/Modal/ModalData";
import { Redirect } from "react-router-dom";

const Category = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //AddProfile에서 받은 값
  const address = localStorage.getItem("address");
  const nickName = localStorage.getItem("nickName");
  const gender = localStorage.getItem("gender");
  const age = localStorage.getItem("age");
  const content = localStorage.getItem("content");
  console.log(address, nickName, gender, age, content);

  //카테고리 리스트
  const CategoryList = [
    { id: 0, data: "자전거" },
    { id: 1, data: "배드민턴" },
    { id: 2, data: "볼링" },
    { id: 3, data: "골프" },
    { id: 4, data: "테니스/스쿼시" },
    { id: 5, data: "스키/보드" },
    { id: 6, data: "탁구" },
    { id: 7, data: "다이어트" },
    { id: 8, data: "헬스/크로스핏" },
    { id: 9, data: "복싱" },
    { id: 10, data: "요가/필라테스" },
    { id: 11, data: "당구/포켓볼" },
    { id: 12, data: "축구/풋살" },
    { id: 13, data: "러닝/마라톤" },
    { id: 14, data: "수영/스쿠버다이빙" },
    { id: 15, data: "서핑/웨이크보드/요트" },
    { id: 16, data: "농구" },
    { id: 17, data: "야구" },
    { id: 18, data: "배구" },
    { id: 19, data: "족구" },
    { id: 20, data: "검도" },
    { id: 21, data: "태권도/유도" },
    { id: 22, data: "클라이밍" },
    { id: 23, data: "크루즈보드" },
    { id: 24, data: "스케이트/인라인" },
    { id: 25, data: "기타" },
  ];

  //작성 || 수정 구분
  const userInfo = useSelector((state) => state.user.userInfo);
  const edit = useSelector((state) => state.user?.userInfo.address);
  const is_edit = edit ? true : false;

  //유저 정보
  React.useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);

  //로컬 값 가져오기
  localStorage.setItem("profile", userInfo?.userImg);
  const localUserInterest = JSON.parse(localStorage.getItem("userInterest"));

  //수정시, 유저의 이전 관심 태그 보여주기
  React.useEffect(() => {
    setUserInterest(
      localUserInterest ? localUserInterest : userInfo?.userInterest
    );
  }, [userInfo]);

  //모달 오픈 state
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);

  //유저의 관심 태그 값
  const [userInterest, setUserInterest] = useState([]);

  //선택된 카테고리 배열화
  const _userInterest = (checked, item) => {
    if (checked) {
      if (userInterest?.length < 3) {
        setUserInterest([...userInterest, item]);
      } else {
        setIsOpen(true);
      }
    } else if (!checked) {
      setUserInterest(userInterest?.filter((el) => el !== item));
    }
  };

  //프로필 추가
  const addProfile = () => {
    if (userInterest?.length === 0) {
      setIsOpen2(true);
    } else {
      dispatch(
        userActions.addUserDB(
          nickName,
          gender,
          age,
          content,
          address,
          userInterest
        )
      );
    }
  };

  //프로필 수정
  const editProfile = () => {
    if (userInterest.length === 0) {
      setIsOpen2(true);
    } else {
      dispatch(
        userActions.editUserDB(
          nickName,
          gender,
          age,
          content,
          address,
          userInterest
        )
      );
    }
  };

  const remove = () => {
    //뒤로가기 시 로컬 값 저장
    localStorage.setItem("userInterest", JSON.stringify(userInterest));
  };

  //앱에서 페이지 새로고침 막기
  document.body.style.overscrollBehavior = "none";

  //새로고침 시 작성 첫 번째 페이지로 이동
  if (document.readyState === "interactive") {
    //로컬 값 날림
    localStorage.removeItem("profile");
    localStorage.removeItem("address");
    localStorage.removeItem("nickName");
    localStorage.removeItem("gender");
    localStorage.removeItem("age");
    localStorage.removeItem("content");
    localStorage.removeItem("userInterest");
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
          {is_edit ? (
            <GoBack
              text="상세 관심사 선택"
              path="/editprofile"
              remove={remove}
            />
          ) : (
            <GoBack
              text="상세 관심사 선택"
              path="/addprofile"
              remove={remove}
            />
          )}
          <Grid padding="0px 25px" margin="0px">
            <Text size="24px" bold margin="0px">
              관심있는 <br />
              운동을 알려주세요
            </Text>
            <Text size="16px" color="gray">
              내 관심사에 딱 맞는 맞춤형 모임을 추천해 드려요
            </Text>
          </Grid>

          {/* 관심사 선택 */}
          <Grid height="auto" column margin="auto">
            {/* 카테고리 */}
            <CateBox>
              {CategoryList.map((item) => {
                return (
                  <div key={item.id}>
                    <input
                      id={item.id}
                      type="checkbox"
                      value={item.data}
                      onChange={(e) => {
                        _userInterest(e.target.checked, e.target.value);
                      }}
                      //배열에 data가 있으면 true, 없으면 false
                      checked={userInterest?.includes(item.data) ? true : false}
                    />
                    <label htmlFor={item.id}>
                      <Cate click={userInterest?.includes(item.data)}>
                        {item.data}
                      </Cate>
                    </label>
                  </div>
                );
              })}

              {/* 푸터 */}
              {is_edit ? (
                <FooterMenu next text="수정" event={editProfile} />
              ) : (
                <FooterMenu next text="다음" event={addProfile} />
              )}

              {/* 경고창 모달 */}
              <Modal open={isOpen}>
                <ModalData
                  Alert
                  onClose={() => setIsOpen(false)}
                  text="최대 3개까지 선택 가능합니다."
                />
              </Modal>

              {/* 최소 선택 모달 */}
              <Modal open={isOpen2}>
                <ModalData
                  Alert
                  onClose={() => setIsOpen2(false)}
                  text="최소 1개를 선택해 주세요."
                />
              </Modal>
            </CateBox>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Category;

const Container = styled.div`
  padding-top: 0px;
`;

//카테고리 css
const CateBox = styled.div`
  width: 90%;
  height: 100%;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  label {
    display: inline-block;
  }
  input {
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
`;

//카테고리 한 개 css
const Cate = styled.div`
  width: auto;
  height: auto;
  box-sizing: border-box;
  margin: 5px 3px;
  padding: 8px 13px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  background: ${(props) => (props.click ? "#0ED88B" : "white")};
  color: ${(props) => (props.click ? "white" : "black")};
  cursor: pointer;
`;
