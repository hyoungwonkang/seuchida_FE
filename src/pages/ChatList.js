import React from "react";
import FooterMenu from "../shared/FooterMenu";
import { useSelector, useDispatch } from "react-redux";
import room, { actionCreators as roomCreators } from "../redux/modules/room";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { Image, Grid, Text } from "../elements/Index";
import moment from "moment";
import "moment/locale/ko";

const ChatList = ({ socket }) => {
  const dispatch = useDispatch();

  const room_list = useSelector((state) => state.room?.list?.chattingRoom);
  const last_chat = useSelector((state) => state.room?.list?.lastChatting);
  // const unreadChatlist = useSelector(
  //   (state) => state.room?.list?.unreadChatlist
  // );  
  // 나중에 추가해야될 부분 ( 이전 채팅 기록 )
  const alarm = useSelector((state) => state.room.chatarr);
 

  React.useEffect(() => {
    dispatch(roomCreators.getchatRoomDB());
  }, []);


  return (
    <>
      <Header>채팅 리스트</Header>
      {room_list?.length === 0 ? (
        <Grid padding="0px 0px 80px 0px" column height="auto">
          <img
            src="./img/seuchin.png"
            style={{ margin: "220px 0px 0px 0px" }}
            alt="hi"
          />
          <Text bold margin="0px" color="#C4C4C4">
            아직 채팅방이 없어요!
          </Text>
          <Text bold margin="0px" color="#C4C4C4">
            모임에 참여후 채팅으로 이야기해요!
          </Text>
        </Grid>
      ) : (
        <Body>
          {room_list?.map((room, index) => {
            //이걸 왜 생각못했지?
            const roomchat = (alarm.filter((r) => r?.room === room?.roomId))
       
            return (
              <ChatBox
                key={`${room.roomId}+${index}`}
                onClick={() => {
                  dispatch(roomCreators.deleteNewChat(room.roomId))
                  history.push({
                    pathname: `/chatex/${room.roomId}`,
                    state: { ...room },
                  });
                }}
              >
                <ContentBox>
                  <ChatTitleBox>
                    <Image src={room?.ownerImg} size={50} />
                    <div style={{ marginLeft: "10px" }}>
                      <div style={{ marginBottom: "5px",display:"flex", }}>
                        <ChatTitle>{room?.postTitle}  </ChatTitle>
                        <UserCount> {room?.nowMember?.length}</UserCount>
                      </div>
                       
                      {/* 최신메세지 갱신  */}
                      <LastMsg>
                      {roomchat[roomchat.length - 1]?.msg ||
                          last_chat[index]?.msg}
                      </LastMsg>
                    </div>
                  </ChatTitleBox>

                  <div>
                    <div style={{fontSize:"13px"}}>
                      {/* 최신메세지 시간 갱신 */}
                      {moment(
                        roomchat[roomchat.length - 1]?.createdAt ||
                          last_chat[index]?.createdAt
                      ).fromNow()}
                    </div>
              {/* 이전 채팅기록과 갱신되는 채팅수가 없을때만 null */}
                {  
                roomchat?.length !==0 &&
                    <NewMsg>
                      {/* unreadChatlist[index].length + */}
                      {  roomchat?.length}     
                      </NewMsg> }
                    
                  </div>
                </ContentBox>
              </ChatBox>
            );
          })}
        </Body>
      )}

      <FooterMenu />
    </>
  );
};

export default ChatList;

const Header = styled.div`
  height: 68px;
  top: 0;
  position: fixed;
  font-weight: bold;
  font-size: 20px;
  padding: 28px 28px 0px 24px;
  background-color: white;
  width: 100%;
`;

const Body = styled.div`
  margin: 76px 0px;
  cursor: pointer;
`;

const ChatBox = styled.div`
  height: 90px;
  width: 100%;
  border-top: 1px solid #e6e6e6;
  
`;

const ChatTitle = styled.span`
  font-weight: bold;
  margin-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.3em;
  height: 1.3em;
  width: 200px;
  
`;

const UserCount = styled.span`
  color: #c4c4c4;
  font-weight: bold;
  font-style: 12px;
`;
const ChatTitleBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const LastMsg = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.3em;
  height: 1.3em;
  width: 200px;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 20px 24px;
`;

const NewMsg = styled.div`
  background-color: #ff6a52;
  padding: 0px 6px 0px 4px;
  font-size: 12px;
  align-items: center;
  text-align: center;
  border-radius: 30px;
  color: white;
  float: right;
  margin-top: 5px;
`;
