import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const token = localStorage.getItem("token");

//Action
const SET_POST = "SET_POST";

//Action Creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));

//initialState

const initialState = {
  list: {
    allReviews: [],
    caPost: [],
    nearPost: [],
    nearPosts: [],
    post:[],
  },
};

const getMainDB = () => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidaback2.shop/api/postList`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response);
        dispatch(setPost(response.data));
      });
    } catch (err) {
      console.log(err);
    }
  };
};
const getPostlistDB = () => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidaback2.shop/api/nearPostList`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response);
        dispatch(setPost(response.data));
      });
    } catch (err) {
      console.log(err);
    }
  };
};


const getOnePostDB = (postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidaback2.shop/api/postDetail/${postId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response);
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
        draft.list = action.payload.post_list;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  getMainDB,
  getPostlistDB,
  getOnePostDB,
};

export { actionCreators };
