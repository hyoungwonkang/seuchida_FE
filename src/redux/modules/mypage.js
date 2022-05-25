//REDUX-ACTION & IMMER
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//Axios
import axios from "axios";

//Actions
const MY_EXERCISE = "MY_EXERCISE";
const MY_POST = "MY_POST";
const MY_REVIEW = "MY_REVIEW";
const MY_POSTONE = "MY_POSTONE";
const ADD_REVIEW = "ADD_REVIEW";
const REVIEW_PHOTO = "REVIEW_PHOTO";

//Action Creators

const myExList = createAction(MY_EXERCISE, (myExercise) => ({
  myExercise,
}));
const myPostList = createAction(MY_POST, (myPost) => ({ myPost }));
const myReviewList = createAction(MY_REVIEW, (myReview) => ({
  myReview,
}));
const myPostOne = createAction(MY_POSTONE, (postOne) => ({
  postOne,
}));
const addReview = createAction(ADD_REVIEW, (addreview) => ({
  addreview,
}));
const addPhoto = createAction(REVIEW_PHOTO, (image) => ({
  image,
}));

//initialState (default props 같은 것, 기본값)
const initialState = {
  myExercise: "",
  myPost: "",
  myPostOne: "",
  myReview: "",
  reviewImg: "",
};

//Middleware

//내가 참여한 운동 목록
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

//내 포스트 리스트
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

//내 후기 리스트
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

//게시물 한 개
const myPostOneDB = (postId) => {
  return async (dispatch, getState, { history }) => {
    await axios({
      method: "get",
      url: `https://seuchidabackend.shop/api/reviewPost/${postId}`,
      headers: {
        "Content-Type": `multipart/form-data;`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res.data.post);
        const postOne = res.data.post;
        dispatch(myPostOne(postOne));
      })
      .catch((err) => {
        console.log("mypostone에 실패했습니다.", err);
      });
  };
};

//후기 작성
const addReviewDB = (review, reviewImg, otherId, evalue, postId) => {
  return async (dispatch, getState, { history }) => {
    await axios({
      method: "post",
      url: `https://seuchidabackend.shop/api/review/${postId}`,
      data: JSON.stringify({
        content: review,
        image: reviewImg,
        otherId: otherId,
        evalues: evalue,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        const addreview = res.data.reviewList;
        dispatch(addReview(addreview));
        console.log("addReview에 성공했습니다.", res);
      })
      .catch((err) => {
        console.log("addReview에 실패했습니다.", err);
      });
  };
};

//사진 추가
const addPhotoDB = (formData) => {
  return async (dispatch, getState, { history }) => {
    await axios({
      method: "post",
      url: `https://seuchidabackend.shop/api/reviewImg `,
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `multipart/form-data;`,
      },
    })
      .then((res) => {
        const image = res.data.image;
        dispatch(addPhoto(image));
        console.log("사진추가에 성공했습니다.", res);
      })
      .catch((err) => {
        console.log("사진추가에 실패했습니다.", err);
      });
  };
};

const addReportDB = (rUserId, report) => {
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
        console.log("addReport에 성공했습니다.", res);
      })
      .catch((err) => {
        console.log("addReport에 실패했습니다.", err);
      });
  };
};

//포스트 삭제
const deletePostDB = (roomId) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: "delete",
      url: `https://seuchidabackend.shop/api/postDelete/${roomId}`,
      data: { roomId },
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

//회원 탈퇴
const signDownDB = () => {
  return async (dispatch, getState, { history }) => {
    await axios({
      method: "delete",
      url: `https://seuchidabackend.shop/oauth/signDown`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        console.log("signDown에 성공했습니다.", res);
      })
      .catch((err) => {
        console.log("signDown에 실패했습니다.", err);
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
    [MY_POSTONE]: (state, action) =>
      produce(state, (draft) => {
        draft.myPostOne = action.payload.postOne;
      }),
    [MY_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.myReview = action.payload.myReview;
      }),
    [REVIEW_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewImg = action.payload.image;
      }),
    [ADD_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.myExercise = draft.myExercise.filter(
          (p) => p.postId !== action.payload.addreview.postId
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
  myPostOneDB,
  addReviewDB,
  addPhotoDB,
  addReportDB,
  deletePostDB,
  signDownDB,
};
export { actionCreators };
