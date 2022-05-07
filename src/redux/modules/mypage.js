//REDUX-ACTION & IMMER
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//Axios
import axios from "axios";

//Actions
const MY_EXERCISE = "MY_EXERCISE";
const MY_POST = "MY_POST";
const MY_REVIEW = "MY_REVIEW";
const ADD_REVIEW = "ADD_REVIEW";
const DELETE_POST = "DELETE_POST";

//Action Creators

const myExList = createAction(MY_EXERCISE, (myExercise) => ({
  myExercise,
}));
const myPostList = createAction(MY_POST, (myPost) => ({ myPost }));
const myReviewList = createAction(MY_REVIEW, (myReview) => ({
  myReview,
}));
const addReview = createAction(ADD_REVIEW, (review) => ({
  review,
}));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));

//initialState (default props 같은 것, 기본값)
const initialState = {
  myExercise: "",
  myPost: "",
  myReview: "",
};

//Middleware

//myexercise
const myExerciseDB = () => {
  return (dispatch, getState, { history }) => {
    axios({
      method: "get",
      url: "https://seuchidabackend.shop/api/myPage/myExercise",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        console.log(res);
        const myExercise = res.data;
        dispatch(myExList(myExercise));
      })
      .catch((err) => {
        console.log("myExercise를 가져오지 못했습니다.", err);
      });
  };
};

//mypost
const myPostDB = () => {
  return (dispatch, getState, { history }) => {
    axios({
      method: "get",
      url: "https://seuchidabackend.shop/api/myPage/post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        console.log(res);
        const myPost = res.data.myPost;
        console.log(myPost);
        dispatch(myPostList(myPost));
      })
      .catch((err) => {
        console.log("myPost를 가져오지 못했습니다.", err);
      });
  };
};

//myreview
const myReviewDB = () => {
  return (dispatch, getState, { history }) => {
    axios({
      method: "get",
      url: "https://seuchidabackend.shop/api/myPage/myReview",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        console.log(res);
        const myReview = res.data.myPost;
        dispatch(myReviewList(myReview));
      })
      .catch((err) => {
        console.log("myReviewList를 가져오지 못했습니다.", err);
      });
  };
};

//addreview
const addReviewDB = (formData, postId) => {
  //reviewImg. content
  return (dispatch, getState, { history }) => {
    axios({
      method: "post",
      url: `https://seuchidabackend.shop/api/review/${postId}`,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data;`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res);
        const review = res.data;
        dispatch(addReview(review));
      })
      .catch((err) => {
        console.log("addReview에 실패했습니다.", err);
      });
  };
};

//deletePost
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
        history.replace("/mypage");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//reducer
export default handleActions(
  {
    [MY_EXERCISE]: (state, action) =>
      produce(state, (draft) => {
        draft.myExercise = action.payload.myExercise;
        // console.log(action.payload.userInfo);
      }),
    [MY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.myPost = action.payload.myPost;
        // console.log(action.payload.userInfo);
      }),
    [MY_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.myReview = action.payload.myReview;
        // console.log(action.payload.userInfo);
      }),
    [ADD_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.myPost.push(action.payload.review);
        // console.log(action.payload.userInfo);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter(
          (p) => p.postId !== action.payload.postId
        );
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  myExerciseDB,
  myPostDB,
  myReviewDB,
  addReviewDB,
  deletePostDB,
};
export { actionCreators };
