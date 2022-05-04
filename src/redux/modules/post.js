import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const token = localStorage.getItem("token");

//Action
const SET_POST = "SET_POST";
const SET_REVIEW = "SET_REVIEW";



//Action Creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const setReview = createAction(SET_REVIEW, (review_list) => ({ review_list }));


//initialState

const initialState = {
  list: {
    filterRe:[],
    caPost: [],
    nearPost: [],
    nearPosts: [],
    post:[],
  },
  review:[]
};

const getMainDB = () => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidabackend.shop/api/postList`,
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
        url: `https://seuchidabackend.shop/api/nearPostList`,
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

const getReviewlistDB = () => {
  return async function (dispatch, getState) {

    try {
      await axios({
        method: "get",
        url: `https://seuchidabackend.shop/api/review`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response);
        dispatch(setReview(response.data));
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
    [SET_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.review = action.payload.review_list;
      }),
  },

  initialState
);

const actionCreators = {
  setPost,
  getMainDB,
  getPostlistDB,
  getReviewlistDB,

};

export { actionCreators };
