// import React, { useCallback, useEffect, useState } from "react";
// // import "../shared/Chat.css";
// import io from "socket.io-client"; //1) 소켓 생성
// import { useSelector, useDispatch } from "react-redux";
// import styled from "styled-components";
// import { actionCreators as userActions } from "../redux/modules/user";
// import { useParams, useHistory } from "react-router-dom";

// const socket = io.connect("https://seuchidabackend.shop"); //2) 백엔드(서버)측 연결 요청

// socket.emit("init", { name: "mandu" }); //3) 연결 성공시 데이터 전송(초기값)

// // room/name/message
// const ChatTest = (props) => {
//   const dispatch = useDispatch();
//   const user_id = useSelector((state) => state.user.userInfo.nickName);

//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState({ name: user_id, message: "" });

//   //게시물 번호
//   const postId = props.match.params.postId;
//   console.log(postId);

//   // 로컬에 저장된 토큰 조회
//   // const is_login = localStorage.getItem("access_token") ? true : false;

//   // const makeRoom = [
//   //   props.match.params.postId,
//   //   props.match.params.otherId,
//   //   props.match.params.myId,
//   // ].sort();

//   // // 방
//   //   const room = makeRoom[0] + "-" + makeRoom[1] + "-" + makeRoom[2];

//   // // 대화 상대 이름
//   // const targetName = props.match.params.otherName;

//   // // 상품 id
//   // const productId = props.match.params.productId;

//   // // 다름사람 id
//   // const otherId = props.match.params.otherId;

//   // // 내 id
//   // const myId = props.match.params.myId;

//   // // 내 이름
//   // const username = useSelector((state) => state.user.user);

//   // useEffect(() => {
//   //   dispatch(headerActions.setFooter(false));
//   //   // 웹소켓 연결
//   //   chatActions.socket.connect();
//   //   return () => {
//   //     // 채팅 페이지 나가면 웹소켓 연결 해제
//   //     chatActions.socket.disconnect();
//   //   };
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   // useEffect(() => {
//   //   return () => {
//   //     // 채팅 방 나가기
//   //     chatActions.socket.emit("leave", { room: room });
//   //   };
//   // }, [room]);

//   // //   웹소켓 연결이 성공하면 채팅 방 생성
//   // if (chatActions.socket) {
//   //   chatActions.socket.emit("join", Info);
//   // }

//   useEffect(() => {
//     return () => {
//       socket.close(); //4) 모든 처리 완료 후 소켓 close
//     };
//   }, []);

//   useEffect(() => {
//     //방 생성
//     socket.emit(
//       "join",
//       {
//         room: postId,
//         nickname: "만두",
//         userId: "carrot31",
//       },
//       (error) => {
//         // emit name/room데이터 전송 (자동으로 새로운 room 생성)
//         if (error) {
//           alert(error); //에러 헨들링(백엔과 연결이 제대로 안될 경우 경고창 뜸)
//         }
//       }
//     );

//     //채팅 목록 받아오기
//     socket.on("chatlist", (message) => {
//       console.log(message);
//       setMessages((messages) => messages.concat(message)); //이미 있는 메세지에 새로운 메세지 추가
//     });

//     //보낸 메세지 받아오기
//     socket.on("broadcast", (message) => {
//       console.log(message);
//       setMessages((messages) => messages.concat(message)); //이미 있는 메세지에 새로운 메세지 추가
//     });

//     dispatch(userActions.isLoginDB());
//   }, []);

//   const buttonHandler = useCallback(() => {
//     //emit: 이벤트 발생(데이터 입력)
//     console.log(message);
//     socket.emit("chat", {
//       room: postId,
//       // nickname: "만두",
//       // userId: "carrot31",
//       // msg: message.message,
//       // room: "627a7092b888561587a2cde8",
//       name: user_id,
//       msg: message.message,
//     });
//     //버튼을 클릭했을 때 chat이벤트 발생
//   }, [message]);

//   const buttonleave = useCallback(() => {
//     //emit: 이벤트 발생(데이터 입력)
//     socket.emit("leave", {
//       room: postId,
//       // nickname: "만두",
//       // userId: "carrot31",
//       // room: "627a7092b888561587a2cde8",
//       name: user_id,
//       msg: message.message,
//     });
//     //버튼을 클릭했을 때 chat이벤트 발생
//   }, [message]);

//   //바뀌는 메세지값
//   const changeMessage = useCallback(
//     //메세지 값 입력
//     (e) => {
//       setMessage({ message: e.target.value });
//     },
//     [message]
//   );

//   //Enter 칠 경우 메세지 전송
//   useEffect(() => {
//     const press = (e) => {
//       if (e.key === "Enter") {
//         socket.emit("chat", {
//           room: postId,
//           // room: "627a7092b888561587a2cde8",
//           name: user_id,
//           msg: message.message,
//         });
//       }
//     };
//     window.addEventListener("keydown", press);

//     return () => window.removeEventListener("keydown", press);
//   }, [message]); //빈배열은 첫 렌더링 완료 후에만 실행한다!

//   return (
//     <div className="App">
//       <ChatWrap>
//         <Box className="ChatBox">
//           {messages.map((ele) => {
//             return (
//               <div className="Chat" key={ele.id}>
//                 <div className="ChatId">{ele.name}</div>
//                 <div className="ChatMsg">{ele.msg}</div>
//               </div>
//             );
//           })}
//         </Box>
//         <Put className="InputBox">
//           <Input
//             placeholder=" 내용을 입력해 주세요."
//             onChange={changeMessage}
//           />
//           <Button onClick={buttonHandler}>전송</Button>
//           <Button onClick={buttonleave}>나가기</Button>
//         </Put>
//       </ChatWrap>
//     </div>
//   );
// };

// export default ChatTest;

// const ChatWrap = styled.div`
//   height: 90vh;
// `;
// const Box = styled.div`
//   width: 60vw;
//   height: 70vh;
//   border: none;
//   background: #ef8549;
//   padding: 0 20px;
//   border-radius: 10px;
//   margin: auto;
//   margin-top: 30px;
//   overflow: auto;
//   .Chat {
//     width: auto;
//     margin: 20px 10px;
//   }
//   .ChatId {
//     margin-bottom: 8px;
//     font-size: 14px;
//     font-weight: 400;
//     color: white;
//   }
//   .ChatMsg {
//     display: inline;
//     padding: 0px 10px;
//     font-size: 18px;
//     border: 1px solid #ef8549;
//     width: auto;
//     border-radius: 10px;
//     background: white;
//   }
// `;
// const Put = styled.div`
//   width: 60vw;
//   height: 5vh;
//   margin: auto;
//   margin-top: 20px;
//   display: flex;
//   justify-content: space-between;
// `;
// const Input = styled.input`
//   width: 75%;
//   height: 40px;
//   border: 2px solid #ef8549;
//   border-radius: 10px;
// `;
// const Button = styled.button`
//   width: 20%;
//   height: 40px;
//   font-size: 20px;
//   color: white;
//   background: #ef8549;
//   border: none;
//   border-radius: 10px;
// `;
