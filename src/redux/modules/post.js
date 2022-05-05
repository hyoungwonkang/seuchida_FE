import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const token = localStorage.getItem('token');

//Action
const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';
const SET_MAP = 'SET_MAP';
const SET_CONTENTS = 'SET_CONTENTS';
const DELETE_POST = 'DELETE_POST';

//Action Creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const setMap = createAction(SET_MAP, (map) => ({ map }));
const setContents = createAction(SET_CONTENTS, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));

//initialState
const initialState = {
  list: {
    allReviews: [],
    caPost: [],
    nearPost: [],
    nearPosts: [],
  },

  post_map: {
    address: '',
    spot: '',
    latitude: '',
    longitude: '',
  },

  post_contents: {
    memberAge: '',
    memberGender: '',
    maxMember: '',
    postCategory: '',
    postTitle: '',
    postDesc: '',
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
      method: 'post',
      url: 'https://seuchidabackend.shop/api/postWrite',
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
        'Content-Type': `application/json`,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log(res);

        dispatch(addPost());
        console.log('게시물 등록 성공');
        history.replace('/postdone');
      })
      .catch((err) => {
        window.alert('뭔가 이상해요');
        console.log('게시물작성실패', err);
      });
  };
};

const getPostDB = (postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: 'get',
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
const getnearPostDB = (postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: 'get',
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

const postMap = (address, spot, latitude, longitude) => {
  return function (dispatch, getState, { history }) {
    const _post = {
      ...initialState,
      post_map: {
        address: address,
        spot: spot,
        latitude: latitude,
        longitude: longitude,
      },
    };
    dispatch(setMap(_post));
  };
};

const postContents = (
  memberAge,
  memberGender,
  maxMember,
  postCategory,
  postTitle,
  postDesc
) => {
  return function (dispatch, getState, { history }) {
    const _post = {
      ...initialState,
      post_contents: {
        memberAge: memberAge,
        memberGender: memberGender,
        maxMember: maxMember,
        postCategory: postCategory,
        postTitle: postTitle,
        postDesc: postDesc,
      },
    };
    dispatch(setContents(_post));
    history.push('/postwrite3');
  };
};

const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: 'delete',
      url: `https://seuchidabackend.shop/api/postDelete/:${postId}`,
      headers: {
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(deletePost(postId));
        history.replace('/');
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
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
      }),
    [SET_MAP]: (state, action) =>
      produce(state, (draft) => {
        draft.post_map = action.payload.map;
      }),
    [SET_CONTENTS]: (state, action) =>
      produce(state, (draft) => {
        draft.post_contents = action.payload.post;
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
  getPostDB,
  getnearPostDB,
  addPost,
  addPostDB,
  setMap,
  postMap,
  deletePost,
  deletePostDB,
  postContents,
  setContents,
};

export { actionCreators };
