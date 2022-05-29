import React from "react";
import styled from "styled-components";
import { Card, LCslider, RCslider } from "../components/index";
import FooterMenu from "../shared/FooterMenu";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configStore";
import { RiMessage3Fill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalData from "../components/Modal/ModalData";

const Main = () => {
  const catepost = useSelector((state) => state.post.list.caPost);
  const post_list = useSelector((state) => state.post.list.nearPost);
  const review = useSelector((state) => state.post.list.filterRe);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const [mainalert, setMainalert] = React.useState([])
  //모달
  const [isOpen, setIsOpen] = React.useState(false);
  const HAS_VISITED_BEFORE = localStorage.getItem("hasVisitedBefore");
  const [state, setState] = React.useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  //홍보 배너 띄우기
  React.useEffect(() => {
    if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
      return;
    }
    if (!HAS_VISITED_BEFORE) setIsOpen(true);
  }, []);
  //오늘 하루 보지 않기
  const nottoday = () => {
    let expires = new Date();
    expires = expires.setHours(expires.getHours() + 24);
    localStorage.setItem("hasVisitedBefore", expires);
  };

  React.useEffect(() => {
    dispatch(userActions.isLoginDB());
  }, []);
  React.useEffect(() => {
    dispatch(postActions.getMainDB());
  }, []);

  React.useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, [state.isLoading === true]);

  //설문조사 페이지 이동
  const handleClick = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSeLKcVwZ_TWWJ6hM22CjiAnrih9mjNboEFVN_RW1nLzIQMWNg/viewform?usp=sf_link"
    );
  };

  return (
    <>
      <Container>
        {/* 라이브 카드  */}
        <TopLive>
          <LCslider
            catepost={catepost}
            center={state.center}
            user={user.userInfo.nickName}
          />
        </TopLive>

        {/* 스친 운동 한줄평 */}
        <ReviewBox>
          <TitleBox
            onClick={() => {
              history.push("/reviewlist/1");
            }}
          >
            <Title>함께한 스친들의 후기</Title>
            <Title>
              <IoIosArrowForward size={30} />
            </Title>
          </TitleBox>

          <RCslider review={review} />
        </ReviewBox>

        {/* 여기여기 붙어라 */}
        <TitleBox
          onClick={() => {
            history.push("/postlist");
          }}
        >
          <Title>여기여기 붙어라</Title>
          <Title>
            <IoIosArrowForward size={30} />
          </Title>
        </TitleBox>
        <ListBox>
          <CardBox>
            {post_list?.map((p, l) => {
              return (
                <Card
                  MainCard
                  {...p}
                  key={p.id}
                  center={state.center}
                  _onClick={() => {
                    history.push(`/postdetail/${p._id}`);
                  }}
                />
              );
            })}
          </CardBox>
        </ListBox>

        {/* 설문조사 작성 */}
        <Survey>
          <RiMessage3Fill
            size={40}
            color="#FDE333"
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </Survey>

        <Modal open={isOpen}>
          <ModalData
            Survey
            onClose={() => setIsOpen(false)}
            onCheck={() => handleClick()}
            nottoday={() => nottoday()}
          />
        </Modal>

        {/* 프로필 작성 */}
        <Float
          onClick={() => {
            localStorage.setItem("address", "");
            localStorage.setItem("spot", "");
            localStorage.setItem("latitude", "");
            localStorage.setItem("longitude", "");
            localStorage.setItem("datemate", "");
            localStorage.setItem("memberAge", "");
            localStorage.setItem("memberGender", "");
            localStorage.setItem("maxMember", 2);
            localStorage.setItem("postCategory", "");
            localStorage.setItem("postTitle", "");
            localStorage.setItem("postDesc", "");
            localStorage.setItem("showOptions", "");
            localStorage.setItem("showDate", "");
            localStorage.setItem("showTime", "");
            history.push("/postcategory");
          }}
        >
          <img alt="plus" src="./img/addpost.png" width={64} />
        </Float>
      </Container>
      {/* 푸터 */}
      <FooterMenu />
    </>
  );
};

export default Main;

const Container = styled.section`
  background-color: #e9e9e9;
  /* padding: 0px 20px; */
`;

//라이브 카드
const TopLive = styled.section`
  max-height: 60vh;
  min-height: 450px;
  background-color: #f8f8fa;
`;

// 여기여기 붙어라
const ListBox = styled.section`
  background-color: white;
  padding-bottom: 80px;
`;

const CardBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  background-color: white;
  z-index: 20;
  margin-bottom: -9px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding: 25px 25px 20px 25px;
  cursor: pointer;
`;
//-- 여기여기 붙어라

// 스친 운동 한줄평

const ReviewBox = styled.section`
  background-color: white;
`;

const Survey = styled.button`
  position: absolute;
  bottom: 170px;
  right: 23px;
  background: transparent;
  border: none;
  z-index: 1000;
  cursor: pointer;
`;

const Float = styled.button`
  position: absolute;
  bottom: 100px;
  right: 10px;
  background: transparent;
  border: none;
  z-index: 1000;
  cursor: pointer;
`;
