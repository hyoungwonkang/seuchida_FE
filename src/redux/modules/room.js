import { createAction, handleActions } from "redux-actions";
//액션, 리듀서 편하게 만들어줌
import { produce } from "immer"; //불변성관리
import axios from "axios";


const token = localStorage.getItem("token");
//Actions

const SET_CHAT = "SET_CHAT";
const SET_MEMBER = "SET_MEMBER";


//Action Creators

const chatRoom = createAction(SET_CHAT, (chat_list) => ({ chat_list }));
const chatMember = createAction(SET_MEMBER, (member) => ({ member}));

//initialState (default props 같은 것, 기본값)

const initialState = {
  list: {
    chatUserList: [],
    chattingRoom: [],
    lastChatting: [],
    nowMember:[],
    unreadChat:[],
  },
};

//middleware

const joinRoomDB = (roomId, postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidabackend.shop/api/postPush/${roomId}`,

        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response);
        dispatch(chatMember(response.data.postInfo))
      });
    } catch (err) {
      console.log(err);
    }
  };
};
const joinCancleDB = (roomId, postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidabackend.shop/api/postPushCancle/${roomId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response.data.postInfo);
        dispatch(chatMember(response.data.postInfo))
      });
    } catch (err) {
      console.log(err);
    }
  };
};


const getchatRoomDB = () => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidabackend.shop/api/chatting`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response);     
        dispatch(chatRoom(response.data));     
      });
    } catch (err) {
      console.log(err);
    }
  };
};
const getchatMemberDB = (roomId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidabackend.shop/api/chatUserList/${roomId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response.data);
        dispatch(chatRoom(response.data));
      });
    } catch (err) {
      console.log(err);
    }
  };
};

const roomDoneDB = (postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidabackend.shop/api/complete/${postId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response.data);
        dispatch(chatMember(response.data.postInfo))
      });
    } catch (err) {
      console.log(err);
    }
  };
};

const getunreadChatDB = () =>{
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidabackend.shop/api/unreadChat`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };


}



//reducer
export default handleActions(
  {
    [SET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.chat_list;
      }),
    [SET_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.member;
      }),

    
  },
  initialState
);

// action creator export
const actionCreators = {
  joinRoomDB,
  getchatRoomDB,
  chatRoom,
  chatMember,
  getchatMemberDB,
  roomDoneDB,
  joinCancleDB,
  getunreadChatDB

};

export { actionCreators };
