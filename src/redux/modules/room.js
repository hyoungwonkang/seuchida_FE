import { createAction, handleActions } from "redux-actions";
//액션, 리듀서 편하게 만들어줌
import { produce } from "immer"; //불변성관리
import axios from "axios";

const token = localStorage.getItem("token");
//Actions
const CHECK_IN = "CHECK_IN";

//Action Creators

const checkIn = createAction(CHECK_IN, (user) => ({ user }));

//initialState (default props 같은 것, 기본값)

const initialState = {};

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
        // dispatch(setPost(response.data));
        window.location.href = `/chattest/${postId}`;
      });
    } catch (err) {
      console.log(err);
    }
  };
};



//reducer
export default handleActions(
  {
    [CHECK_IN]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  checkIn,
  joinRoomDB,
};

export { actionCreators };
