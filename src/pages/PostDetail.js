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
import { actionCreators as postActions } from "../redux/modules/post";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import FooterMenu from "../shared/FooterMenu";
import GoBack from "../elements/GoBack";

const PostDetail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const userId = useSelector((state) => state.user.userInfo.userId);
  const update = useSelector((state) => state.room.list)
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [isOpen3, setIsOpen3] = React.useState(false);
  const [isOpen4, setIsOpen4] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [post, setPost] = React.useState(null);
  const token = localStorage.getItem("token");
  const params = useParams();
  const postOwner = post?.userId;
  const isMe = userId === postOwner ? true : false;

  //강퇴당한유저 킥 데이터가 이상하게 배열로 2겹임 ..
  const banUser = post?.banUserList?.filter((u) => u.includes(userId));
  const postId = params.postId //게시물 번호(룸 아이디)



  const [state, setState] = React.useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

    //게시물 삭제
    const deleteone = (e) => {
      dispatch(mypageActions.deletePostDB(postId));
      history.push("/main");
    };
  const joinRoom = () => {
    dispatch(roomActions.joinRoomDB(post.roomId, postId));

  };

  const roomDone = () => {
    dispatch(roomActions.roomDoneDB(postId));
  };
  const joinCancle = () => {
    dispatch(roomActions.joinCancleDB(post.roomId, postId));

  };

  React.useEffect(() => {
    if (navigator.geolocation) {
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
     
  }, [state.isLoading]);

  React.useEffect(()=>{
    axios({
      method: "get",
      url: `https://seuchidabackend.shop/api/postDetail/${params.postId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setPost(response.data.newPost);
    });

    dispatch(userActions.isLoginDB());
  },[update])

  if (banUser?.length===1) {
    window.alert("강퇴당함 ");
    history.push("/main");
  }

  if (!post) return;
  const userCheck = post?.nowMember?.filter((u) =>
    u.memberId?.includes(user.userId)
  );

  return (
    <>
      <Header>
        <GoBack gback _onClick={() => history.goBack()} />

        {/*  삭제버튼  */}

        {isMe ? (
          <>
            <Btnbox>
              {post.status === true && (
                <EndBtn onClick={roomDone}>모집완료</EndBtn>
              )}
              <DelBtn
                onClick={() => {
                  setIsOpen3(true);
                }}
              >
                삭제
              </DelBtn>
            </Btnbox>
          </>
        ) : (
          ""
        )}

        {/* <h2>여기여기 붙어라</h2> */}
      </Header>
      <Container>
        <ProfileBox>
          {!isMe && userCheck.length === 1 && (
            <button onClick={joinCancle}> 참여취소</button>
          )}
          <Image
            margin="0px 15px 0px 0px"
            shape="circle"
            src={post.userImg}
            size={60}
            _onClick={() => {
              setIsOpen(true);
            }}
          />
          {/* 작성자 프로필 모달 */}
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
        <LiveBox>
          <div style={{ fontWeight: "700 bold" }}>
            참여중인 운동 메이트 {post?.nowMember?.length}/{post?.maxMember}
          </div>
          <div className="otherProfile">
            {post?.nowMember?.map((m, i) => {
              return (
                <div key={m + i}>
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
                  {/* 참여자 프로필 모달 */}
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
        {/* && userCheck[0]===false &&post.nowMember.length<=post.maxMember  */}

        {isMe === true || userCheck.length === 1 ? (
          <ButtonBox>
            <FooterMenu
              next
              text={"채팅하기"}
              path={{
                pathname: `/chatex/${post.roomId}`,
                state: { ...post },
              }}
            ></FooterMenu>
          </ButtonBox>
        ) : // 방장이고 참여자일때 채팅하기 버튼

        post.status === false || post.nowMember.length === post.maxMember ? (
          <ButtonBox>
            <FooterMenu is_check text={"참여불가"}></FooterMenu>
          </ButtonBox>
        ) : (
          // 모집이 완료되었거나 참여자가 최대인원과 같으면 참여불가 버튼

          //참여중이 아니거나 모집중일경우 참여하기 버튼
          userCheck.length === 0 &&
          post.status === true && (
            <ButtonBox onClick={() => setIsOpen4(true)}>
              <FooterMenu next text={"참여하기"}></FooterMenu>
            </ButtonBox>
          )
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
      <Modal open={isOpen4}>
        <ModalData
          Check
          text="모임에 참여하시겠어요?"
          onClose={() => setIsOpen4(false)}
          join={() => joinRoom()}
        />
      </Modal>
    </>
  );
};

export default PostDetail;

const Container = styled.div`
  padding-top: 70px;
`;

const Btnbox = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 25vw;
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
  padding: 24px 24px 0px 24px;
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
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

const DelBtn = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin: 5px 0px 0px 12px;
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

const EndBtn = styled.div`
  background-color: #0ed88b;
  display: flex;
  align-items: center;
  color: white;
  padding: 4px 12px;
  margin: 0px;
  border-radius: 5px;
  height: 22px;
`;
