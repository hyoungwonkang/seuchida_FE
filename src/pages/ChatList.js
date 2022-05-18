import React from "react";
import FooterMenu from "../shared/FooterMenu";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/room";
import styled from "styled-components";
import { history } from "../redux/configStore";
import Image from "../elements/Image";
import moment from "moment";
import "moment/locale/ko";

const ChatList = () => {
  const dispatch = useDispatch();
  const room_list = useSelector((state) => state.room.list.chattingRoom);
  const last_chat = useSelector((state) => state.room.list.lastChatting);
  console.log(room_list);

  React.useEffect(() => {
    dispatch(roomCreators.getchatRoomDB());
  }, []);

  return (
    <>
      <Header>채팅</Header>
      <Body>
        {room_list?.map((room, index) => {
          return (
            <ChatBox
              key={`${room.roomId}+${index}`}
              onClick={() => {
                history.push({
                  pathname: `/chatex/${room.roomId}`,
                  state: { ...room },
                });
              }}
            >
              <ContentBox>
                <ChatTitleBox>
                  <Image src={room.ownerImg} size={50} />
                  <div style={{ marginLeft: "10px" }}>
                    <div style={{ marginBottom: "5px" }}>
                      <ChatTitle>{room.postTitle} </ChatTitle>
                      <UserCount> {room.userList.length}</UserCount>
                    </div>
                    <LastMsg>{last_chat[index]?.msg}</LastMsg>
                  </div>
                </ChatTitleBox>
                <div>{moment(last_chat[index]?.createdAt).fromNow()}</div>
              </ContentBox>
            </ChatBox>
          );
        })}
      </Body>
      <FooterMenu />
    </>
  );
};

export default ChatList;

const Header = styled.div`
  height: 77px;
  top: 0;
  position: fixed;
  font-weight: bold;
  font-size: 20px;
  margin: 24px 0px;
  padding: 0px 24px;
  background-color: white;
  width: 100%;
`;

const Body = styled.div`
  margin: 76px 0px;
`;

const ChatBox = styled.div`
  height: 90px;
  width: 100%;
  border-top: 1px solid #e6e6e6;
`;

const ChatTitle = styled.span`
  font-weight: bold;
  margin-right: 5px;
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
