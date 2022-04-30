import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

//Action
const SET_POST = "SET_POST";

//Action Creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));

//initialState

const initialState = {
  list: [],
};

const getPostDB = (postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `http://52.78.211.107/api/postDetail/${postId}`,
        headers: {
          // authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        dispatch(setPost(response.data));
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.comment_list;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  getPostDB,
};

export { actionCreators };
