import React from "react";
import styled from "styled-components";
import { Card, KakaoMap } from "../components/index";
import Modal from "../components/Modal/Modal"; //모달 창
import ModalData from "../components/Modal/ModalData";
import { Image, Button } from "../elements/Index";
import { actionCreators as mypageActions } from "../redux/modules/mypage";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";
import { actionCreators as userActions } from "../redux/modules/user";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import FooterMenu from "../shared/FooterMenu";
import GoBack from "../elements/GoBack";

const PostDetail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [isOpen3, setIsOpen3] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [post, setPost] = React.useState(null);
  const token = localStorage.getItem("token");
  const params = useParams();

  const userId = useSelector((state) => state.user.userInfo.userId);
  const postOwner = post?.userId;

  const isMe = userId === postOwner ? true : false;
  const postId = params.postId; //게시물 번호

  //게시물 삭제
  const deleteone = (e) => {
    dispatch(mypageActions.deletePostDB(postId));
    history.push("/main");
  };

  //채팅방 이동
  const movechat = (e) => {
    history.push("/chatex");
  };

  const [state, setState] = React.useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  function joinRoom() {
    dispatch(roomActions.joinRoomDB(params.postId));
  }

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
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
    axios({
      method: "get",
      url: `https://seuchidabackend.shop/api/postDetail/${params.postId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setPost(response.data.post);
    });

    dispatch(userActions.isLoginDB());
  }, []);

  if (!post) return;
  const userCheck = post?.nowMember?.filter((u) =>
    u.memberId.includes(user.userId)
  );

  return (
    <>
      <Header>
        <GoBack gback _onClick={() => history.goBack()} />

        {/* 본인에게만 삭제버튼  */}
        {isMe ? (
          <Button
            is_delete
            _onClick={() => {
              setIsOpen3(true);
            }}
          >
            삭제
          </Button>
        ) : (
          ""
        )}

        {/* <h2>여기여기 붙어라</h2> */}
      </Header>
      <Container>
        <ProfileBox>
          <Image
            margin="0px 15px 0px 0px"
            shape="circle"
            src={post.userImg}
            size={60}
            _onClick={() => {
              setIsOpen(true);
            }}
          />
          <Modal open={isOpen}>
            <ModalData post={post.nowMember} onClose={() => setIsOpen(false)} />
          </Modal>

          <User>
            <Master>{post.nickName}</Master>
            <div style={{ color: "rgba(120, 120, 120, 1)" }}>
              {post.userGender}/{post.userAge}세
            </div>
          </User>
        </ProfileBox>

        <Card
          DetailCard
          center={state.center}
          {...post}
          isMe={isMe}
          deleteone={deleteone}
        />
        <button
          onClick={() => {
            history.push({
              pathname: `/chatex/${post.roomId}`,
              state: {...post},
            });
          }}
        >
          채팅하기
        </button>
        <LiveBox>
          <div style={{ fontWeight: "700 bold" }}>
            참여중인 운동 메이트 {post?.nowMember?.length}/{post?.maxMember}
          </div>
          <div className="otherProfile">
            {post?.nowMember?.map((m, i) => {
              return (
                <div key={m._id}>
                  <Image
                    shape="circle"
                    src={m.memberImg}
                    size={40}
                    margin="3px"
                    _onClick={() => {
                      setModalData(m);
                      setIsOpen2(true);
                    }}
                  />
                  <Modal open={isOpen2}>
                    <ModalData
                      Members
                      post={modalData}
                      onClose={() => setIsOpen2(false)}
                    />
                  </Modal>
                </div>
              );
            })}
          </div>
        </LiveBox>

        <KakaoMap {...post} />
        {/* && userCheck[0]===false &&post.nowMember.length<=post.maxMember */}

        {post.status ===true &&
        userCheck[0] === undefined &&
        post.nowMember.length <= post.maxMember ? (
          <ButtonBox>
            <FooterMenu next text={"참여하기"} event={joinRoom}></FooterMenu>
          </ButtonBox>
        ) : (
          <ButtonBox>
            <FooterMenu is_check text={"참여불가"}></FooterMenu>
          </ButtonBox>
        )}
      </Container>

      {/* 모달 삭제 확인 창 */}
      <Modal open={isOpen3}>
        <ModalData
          Check
          text="정말 삭제하시겠습니까?"
          onClose={() => setIsOpen3(false)}
          onCheck={() => deleteone()}
        />
      </Modal>

      {/* 채팅방 이동 확인 창(채팅하기 버튼에 모달 적용 전) */}
      <Modal open={isOpen3}>
        <ModalData
          Check
          text="모임에 참여하시겠어요?"
          onClose={() => setIsOpen3(false)}
          onCheck={() => movechat()}
        />
      </Modal>
    </>
  );
};

export default PostDetail;

const Container = styled.div`
  padding-top: 70px;
`;

const ProfileBox = styled.div`
  padding: 24px 24px 24px 24px;
  display: flex;
  flex-direction: row;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Master = styled.div`
  font-weight: bold;
`;

const Header = styled.div`
  top: 0;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 40px;
  padding: 24px 0px 0px 24px;
  display: flex;
  flex-direction: row;
`;

const ButtonBox = styled.div`
  height: 91px;
  border-top: 2px solid E3E3E3;
  align-items: center;
  display: flex;
  justify-content: center;
  bottom: 0;
  position: fixed;
  z-index: 3;
  background-color: white;
  width: 100%;
`;
const ChatButton = styled.button`
  width: 342px;
  height: 54px;
  background-color: #b0b0b0;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
`;

const LiveBox = styled.div`
  padding: 24px;

  .otherProfile {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
  }
`;
const DetailMap = styled.div`
  padding: 0px 24px 130px 24px;
`;
