import { createAction, handleActions } from "redux-actions";
//액션, 리듀서 편하게 만들어줌
import { produce } from "immer"; //불변성관리
import axios from "axios";

const token = localStorage.getItem("token");
//Actions
const SET_CHAT = "SET_CHAT";

//Action Creators

const chatRoom = createAction(SET_CHAT, (chat_list) => ({ chat_list }));

//initialState (default props 같은 것, 기본값)

const initialState = {
  list:{
  }
};

//middleware

const joinRoomDB = (postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "post",
        url: `https://seuchidabackend.shop/api/postPush/${postId}`,
        data: JSON.stringify({
          postId: postId,
        }),
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response);
        window.location.href = `/postdetail/${postId}`;
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
        dispatch(chatRoom(response.data))


      });
    } catch (err) {
      console.log(err);
    }
  };
};




//reducer
export default handleActions(
 { 
   [SET_CHAT] : (state, action) => produce(state, (draft) => {
    draft.list = action.payload.chat_list;
  })
},
  initialState
);

// action creator export
const actionCreators = {
  joinRoomDB,
  getchatRoomDB,
  chatRoom,
};

export { actionCreators };
