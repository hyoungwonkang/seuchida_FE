import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const token = localStorage.getItem('token');

//Action
const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';

//Action Creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//initialState

const initialState = {
  list: {
    allReviews: [],
    caPost: [],
    nearPost: [],
    nearPosts: [],
  },
};

const addPostDB = (formData) => {
  return async function (dispatch, getState, { history }) {
    let _post = {
      formData,
    };
    await axios({
      method: 'post',
      url: 'https://seuchidaback2.shop/api/postWrite',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log(res);

        dispatch(addPost(_post));
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
const getnearPostDB = (postId) => {
  return async function (dispatch, getState) {
    try {
      await axios({
        method: 'get',
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

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state);
        draft.list = action.payload.post;
        console.log(draft.list, action.payload.post);
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
};

export { actionCreators };
