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
const ADD_REPORT = "ADD_REPORT";

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
const addReport = createAction(ADD_REPORT, (report) => ({
  report,
}));

//initialState (default props 같은 것, 기본값)
const initialState = {
  myExercise: "",
  myPost: "",
  myReview: "",
  myReport: "",
};

//Middleware

//myexercise
const myExerciseDB = () => {
  return async (dispatch, getState, { history }) => {
    await axios({
      method: "get",
      url: "https://seuchidabackend.shop/api/myPage/myExercise",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        const myExercise = res.data.myEx;
        dispatch(myExList(myExercise));
      })
      .catch((err) => {
        console.log("myExercise를 가져오지 못했습니다.", err);
      });
  };
};

//mypost
const myPostDB = () => {
  return async (dispatch, getState, { history }) => {
    await axios({
      method: "get",
      url: "https://seuchidabackend.shop/api/myPage/post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        const myPost = res.data.myPost;
        dispatch(myPostList(myPost));
      })
      .catch((err) => {
        console.log("myPost를 가져오지 못했습니다.", err);
      });
  };
};

//myreview
const myReviewDB = () => {
  return async (dispatch, getState, { history }) => {
    await axios({
      method: "get",
      url: "https://seuchidabackend.shop/api/myPage/myReview",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
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
  console.log(postId);
  return async (dispatch, getState, { history }) => {
    await axios({
      method: "post",
      url: `https://seuchidabackend.shop/api/review/${postId}`,
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `multipart/form-data;`,
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
  console.log(postId);
  return async function (dispatch, getState, { history }) {
    await axios({
      method: "delete",
      url: `https://seuchidabackend.shop/api/postDelete/${postId}`,
      data: { postId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `multipart/form-data;`,
      },
    })
      .then((res) => {
        console.log("삭제 성공", res);
        history.replace("/main");
      })
      .catch((err) => {
        console.log("에러발생", err);
      });
  };
};

//addreview
const addReportDB = (rUserId, report) => {
  console.log(rUserId, report);
  return async (dispatch, getState, { history }) => {
    await axios({
      method: "post",
      url: `https://seuchidabackend.shop/api/report`,
      data: JSON.stringify({
        userId: rUserId,
        content: report,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        console.log(res);
        const report = res.data;
        dispatch(addReport(report));
      })
      .catch((err) => {
        console.log("addReport에 실패했습니다.", err);
      });
  };
};

//reducer
export default handleActions(
  {
    [MY_EXERCISE]: (state, action) =>
      produce(state, (draft) => {
        draft.myExercise = action.payload.myExercise;
      }),
    [MY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.myPost = action.payload.myPost;
      }),
    [MY_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.myReview = action.payload.myReview;
      }),
    [ADD_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.myPost.push(action.payload.review);
        // console.log(action.payload.userInfo);
      }),
    [ADD_REPORT]: (state, action) =>
      produce(state, (draft) => {
        draft.myReport.push(action.payload.report);
        // console.log(action.payload.userInfo);
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
  addReportDB,
};
export { actionCreators };
