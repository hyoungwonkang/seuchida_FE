import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

//Action
const SET_POST = "SET_POST";
const SET_REVIEW = "SET_REVIEW";
const ADD_POST = "ADD_POST";

//Action Creators

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//initialState
const initialState = {
  list: {
    filterRe: [],
    caPost: [],
    nearPost: [],
    nearPosts: [],
    post: [],
  },
  review: [],
};

const addPostDB = (
  address,
  datemate,
  latitude,
  longitude,
  maxMember,
  memberAge,
  memberGender,
  postCategory,
  postDesc,
  postTitle,
  spot
) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: "post",
      url: "https://seuchidaback.link/api/postWrite",
      data: JSON.stringify({
        address: address,
        datemate: datemate,
        latitude: latitude,
        longitude: longitude,
        maxMember: maxMember,
        memberAge: memberAge,
        memberGender: memberGender,
        postCategory: postCategory,
        postDesc: postDesc,
        postTitle: postTitle,
        spot: spot,
      }),
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        dispatch(addPost());
        history.push("/postdone");
      })
      .catch((err) => {
        window.location.href = "/main";
        console.log("게시물 등록 실패", err);
      });
  };
};

const getMainDB = () => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidaback.link/api/postList`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
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
        url: `https://seuchidaback.link/api/nearPostList`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
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
        draft.list = action.payload.post_list;
      }),
    [SET_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.review = action.payload.review_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
      }),
  },

  initialState
);

const actionCreators = {
  setPost,
  getMainDB,
  getPostlistDB,
  addPost,
  addPostDB,
};

export { actionCreators };
