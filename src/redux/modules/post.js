import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

const token = localStorage.getItem("token");

//Action
const SET_POST = "SET_POST";
const SET_REVIEW = "SET_REVIEW";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";

//Action Creators
const setReview = createAction(SET_REVIEW, (review_list) => ({ review_list }));
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));

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

  post_map: {
    address: "",
    spot: "",
    latitude: "",
    longitude: "",
  },

  post_contents: {
    memberAge: "",
    memberGender: "",
    maxMember: "",
    postCategory: "",
    postTitle: "",
    postDesc: "",
  },
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
      url: "https://seuchidabackend.shop/api/postWrite",
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
        console.log(res);

        dispatch(addPost());
        console.log("게시물 등록 성공");
        history.replace("/postdone");
      })
      .catch((err) => {
        window.alert("뭔가 이상해요");
        console.log("게시물작성실패", err);
      });
  };
};

const getMainDB = () => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: "get",
        url: `https://seuchidabackend.shop/api/postList`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
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

const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: "delete",
      url: `https://seuchidabackend.shop/api/postDelete/:${postId}`,
      headers: {
        Authorization: `Bearer${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(deletePost(postId));
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let list = draft.list.posts.filter(
          (p) => p.postId !== action.payload.post
        );
        draft.list = [...list];
      }),
  },

  initialState
);

const actionCreators = {
  setPost,
  getMainDB,
  getPostlistDB,
  getReviewlistDB,

  addPost,
  addPostDB,
  deletePost,
  deletePostDB,
};

export { actionCreators };
