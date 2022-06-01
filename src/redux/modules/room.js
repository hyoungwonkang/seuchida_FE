import { createAction, handleActions } from "redux-actions";
//액션, 리듀서 편하게 만들어줌
import { produce } from "immer"; //불변성관리
import axios from "axios";

// const token = localStorage.getItem("token");
//Actions

const SET_CHAT = "SET_CHAT";
const SET_MEMBER = "SET_MEMBER";
const SK_LOGIN = "SK_LOGIN";
const JOIN_ARR = "JOIN_ARR";
const MAIN_ARR = "MAIN_ARR";
const DEL_ARR = "DEL_ARR";
const CHAT_ARR = "CHAT_ARR";
const DEL_NEWCHAT = "DEL_NEWCHAT";
const CLEAR_COUNT = "CLEAR_COUNT";
//Action Creators

const chatRoom = createAction(SET_CHAT, (chat_list) => ({ chat_list }));
const chatMember = createAction(SET_MEMBER, (member) => ({ member }));
const socketLogin = createAction(SK_LOGIN, (socket) => ({ socket }));
const joinArlam = createAction(JOIN_ARR, (join) => ({ join }));
const mainArlam = createAction(MAIN_ARR, (main) => ({ main }));
const deleteArr = createAction(DEL_ARR, (delete_arr) => ({ delete_arr }));
const chattingArr = createAction(CHAT_ARR, (chatting) => ({ chatting }));
const deleteNewChat = createAction(DEL_NEWCHAT, (delete_newchat) => ({
  delete_newchat,
}));
const clearcount = createAction(CLEAR_COUNT, (clear) => ({ clear }));

//initialState (default props 같은 것, 기본값)

const initialState = {
  list: {
    chatUserList: [],
    chattingRoom: [],
    lastChatting: [],
    nowMember: [],
    unreadChatlist: [],
  },
  joinArr: [],
  chatarr: [],
  mainarr: false,
  arrcount: 0,
};

//middleware

const joinRoomDB = (roomId, postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidaback.link/api/postPush/${roomId}`,

        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        dispatch(chatMember(response.data.postInfo));
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
        url: `https://seuchidaback.link/api/postPushCancle/${roomId}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        dispatch(chatMember(response.data.postInfo));
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
        url: `https://seuchidaback.link/api/chatting`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
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
        url: `https://seuchidaback.link/api/chatUserList/${roomId}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
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

const roomDoneDB = (postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidaback.link/api/complete/${postId}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        dispatch(chatMember(response.data.postInfo));
      });
    } catch (err) {
      console.log(err);
    }
  };
};

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
    [MAIN_ARR]: (state, action) =>
      produce(state, (draft) => {
        draft.mainarr = action.payload.main;
      }),
    [CLEAR_COUNT]: (state, action) =>
      produce(state, (draft) => {
        draft.arrcount = action.payload.clear;
      }),

    [JOIN_ARR]: (state, action) =>
      produce(state, (draft) => {
        draft.joinArr.push(action.payload.join);
      }),
    [CHAT_ARR]: (state, action) =>
      produce(state, (draft) => {
        draft.chatarr.push(action.payload.chatting);
        draft.arrcount = draft.arrcount + 1;
      }),
    [DEL_ARR]: (state, action) =>
      produce(state, (draft) => {
        draft.joinArr = draft.joinArr.filter(
          (msg) => msg.msgId !== action.payload.delete_arr
        );
      }),
    [DEL_NEWCHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.chatarr = draft.chatarr.filter(
          (msg) => msg.room !== action.payload.delete_newchat
        );
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
  socketLogin,
  joinArlam,
  mainArlam,
  deleteArr,
  chattingArr,
  deleteNewChat,
  clearcount,
};

export { actionCreators };
