import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import FooterMenu from "../shared/FooterMenu";
import { ECslider } from "../components";
import { Grid, Image, Text, Button } from "../elements/Index";
import { BsFillBellFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { history } from "../redux/configStore";
import { RiBarChartFill } from "react-icons/ri";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalData from "../components/Modal/ModalData";


const NameCard = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.isLoginDB());
    dispatch(mypageActions.myExerciseDB());
  }, []);


  const userInfo = useSelector((state) => state.user.userInfo);
  const level = [
    { id: 1, level: 1, image: <Image src="./img/badge/red.png" /> },
    { id: 2, level: 2, image: <Image src="./img/badge/orange.png" /> },
    { id: 3, level: 3, image: <Image src="./img/badge/yellow.png" /> },
    { id: 4, level: 4, image: <Image src="./img/badge/green.png" /> },
    { id: 5, level: 5, image: <Image src="./img/badge/skyblue.png" /> },
    { id: 6, level: 6, image: <Image src="./img/badge/blue.png" /> },
    { id: 7, level: 7, image: <Image src="./img/badge/purple.png" /> },
  ];

  return (

    <Grid column height="auto" margin="0px" bg="white">
      {/* 프로필 수정, 알람 */}
      <Grid row height="auto" margin="20px 0px 0px 0px" justify="right">
        <BsFillBellFill size={24} style={{ marginRight: 8 }} />
        <AiFillSetting
          size={24}
          style={{ marginRight: 15 }}
          onClick={() => history.push("/signuploca")}
        />
      </Grid>

      {/* 프로필이미지 */}
      <Image
        shape="circle"
        size={60}
        src={userInfo.userImg}
        margin="19px 0px 8px 0px"
      />

      {/* 유저 레벨 & 닉네임 */}
      <Grid row justify="center">
        {level.map((v, i) => {
          if (v.level == userInfo.level)
            return <div key={v + i}>{v.image}</div>;
          if (v.level === "7") {
            return <div key={v + i}>{v[6].image}</div>;
          }
        })}
        <Text size="24px" margin="0px" color="#323232" bold>
          {userInfo.nickName}
        </Text>
      </Grid>

      {/* 유저 관심사 */}
      <Grid row height="auto" margin="8px 0px 16px 0px" justify="center">
        {userInfo.userInterest?.map((v, i) => {
          return <Cate key={v + i}>{v}</Cate>;
        })}
      </Grid>

      {/* 유저 소개글 */}
      <Text width="302px" color="#505050" margin="0px 0px 45px 0px">
        {userInfo.userContent}
      </Text>
    </Grid>
  );
};

const MyPage = () => {
  const dispatch = useDispatch();
  const myExercise = useSelector((state) => state.mypage.myExercise);
  const userInfo = useSelector((state) => state.user.userInfo);
  const point = JSON.stringify(userInfo?.userEvalue);

  //모달창 state
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);

  //로그아웃
  const signout = () => {
    localStorage.clear();
    history.push("/");
  };

  const level = [
    { id: 0, level: 0, color: "red" },
    { id: 1, level: 1, color: "orange" },
    { id: 2, level: 2, color: "yellow" },
    { id: 3, level: 3, color: "green" },
    { id: 4, level: 4, color: "skyblue" },
    { id: 5, level: 5, color: "blue" },
    { id: 6, level: 6, color: "purple" },
  ];

  return (
    <Grid height="auto">
      <NameCard />

      {/* 프로그래스바 */}
      <Grid
        height="117px"
        column
        justify="center"
        padding="30px 0px 0px 0px"
        bg="#0ED88B"
      >
        <ProgressBar>
          {point >= 70 ? (
            <Highlight width={0 + "%"} />
          ) : (
            <Highlight
              width={(point?.charAt(point.length - 1) / 10) * 100 + "%"}
            />
          )}
          <Seuchin src="./img/seuchin.png" />
        </ProgressBar>
        {userInfo.level === "7" ? (
          <Text size="16px" width="342px" color="#FFFFFF" bold margin="5px">
            최고 레벨 달성!
          </Text>
        ) : (
          <Text size="16px" width="342px" color="#FFFFFF" bold margin="5px">
            {level.map((v, i) => {
              if (v.level == userInfo.level) {
                return v.color;
              }
            })}
             레벨까지
             {10 - point?.charAt(point.length - 1)}
            포인트
          </Text>
        )}
      </Grid>

      {/* 후기 남기기 */}
      <Grid
        padding="10px 24px"
        margin="0px 10px 0px 0px"
        bg="white"
        height="300px"
      >
        <Grid row height="70px">
          <RiBarChartFill color="#FF6B52" />
          <Text size="16px" bold>
            운동 후기 남기고 스친 레벨 올리자!
          </Text>
        </Grid>

        {myExercise.length !== 0 ? (
          <ECslider myExercise={myExercise} />
        ) : (
          <img src="./img/noreview.png" alt="review" />
        )}
      </Grid>

      {/* 내가 만든 목록 */}
      <Grid
        row
        bg="white"
        height="62px"
        margin="0px"
        padding="0px 20px"
        border="1px solid #ddd"
        justify="space-between"
        _onClick={() => {
          history.push("/mypost");
        }}
      >
        <Text size="16px" bold>
          내가 만든 모임
        </Text>
        <IoIosArrowForward size={30} />
      </Grid>
      <Grid
        row
        bg="white"
        height="62px"
        padding="0px 20px"
        border="1px solid #ddd"
        justify="space-between"
        _onClick={() => {
          history.push("/myreview");
        }}
      >
        <Text size="16px" bold>
          내가 쓴 후기
        </Text>
        <IoIosArrowForward size={30} />
      </Grid>

      <Grid
        padding="100px 20px 120px 20px"
        row
        justify="space-between"
        bg="white"
      >
        <Button
          wd="342px"
          bg="#fff"
          br="1px solid #C4C4C4"
          color=" #C4C4C4"
          _onClick={() => {
            setIsOpen2(true);
          }}
        >
          로그아웃
        </Button>
      </Grid>

      {/* 로그아웃 경고창 모달 */}
      <Modal open={isOpen2}>
        <ModalData
          Check
          onCheck={() => {
            signout();
          }}
          onClose={() => setIsOpen2(false)}
          text="로그아웃 하시겠습니까?"
        />
      </Modal>

      <FooterMenu />
    </Grid>
  );
};

export default MyPage;
const ProgressBar = styled.div`
  background: #ffffff;
  width: 342px;
  height: 12px;
  display: flex;
  border-radius: 12px;
`;
const Seuchin = styled.img`
  width: 79px;
  height: 93px;
  margin: -95px 0px 0px -30px;
`;
const Highlight = styled.div`
  background: #ffe926;
  transition: 1s width;
  width: ${(props) => props.width};
  height: 12px;
  border-radius: 12px;
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
`;
