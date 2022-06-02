//REDUX-ACTION & IMMER
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//Axios
import axios from "axios";

//Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const ADD_USER = "ADD_USER";
const ADD_PHOTO = "ADD_PHOTO";
const EDIT_USER = "EDIT_USER";
const EDIT_PHOTO = "EDIT_PHOTO";
const GET_USER = "GET_USER";

//Action Creators

const logIn = createAction(LOG_IN, (token, user) => ({ token, user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const addUser = createAction(ADD_USER, (formData) => ({
  formData,
}));
const addPhoto = createAction(ADD_PHOTO, (userImg) => ({
  userImg,
}));
const editUser = createAction(EDIT_USER, (formData) => ({
  formData,
}));
const editPhoto = createAction(EDIT_PHOTO, (userImg) => ({
  userImg,
}));
const getUser = createAction(GET_USER, (userInfo) => ({ userInfo }));

//initialState (default props 같은 것, 기본값)
const initialState = {
  user: "",
  is_login: false,
  userInfo: { userImg: "" },
  photo: "",
  token: "",
};

const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`https://https://seuchidaback.link/oauth/callback/kakao?code=${code}`)
      .then((res) => {
        const token = res.data.user.token;
        const userInfo = res.data.user.userInfo;
        // decode the logged in user
        function parseJwt(token) {
          if (!token) {
            return;
          }
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace("-", "+").replace("_", "/");
          return JSON.parse(window.atob(base64));
        }

        // loggedin user
        const decode_token = parseJwt(token);

        localStorage.setItem("token", token); //token을 local에 저장합니다

        dispatch(logIn(decode_token, userInfo));
        if (!userInfo.userInterest[0]) {
          history.replace("/signupdone");
        } else {
          history.replace("/main"); //토큰 받았고 로그인됬으니 메인으로 전환합니다
        }
      })
      .catch((err) => {
        console.log("카카오로그인 에러", err);
        window.alert("로그인에 실패했습니다");
        history.replace("/"); //로그인 실패 시 로그인 화면으로 돌아갑니다
      });
  };
};

const googleLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`https://https://seuchidaback.link/oauth/callback/google/?code=${code}`) //승인된 자바스크립트 원본?
      .then((res) => {
        const token = res.data.user.token;
        const userInfo = res.data.user.userInfo;
        // // decode the logged in user
        function parseJwt(token) {
          if (!token) {
            return;
          }
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace("-", "+").replace("_", "/");
          return JSON.parse(window.atob(base64));
        }

        // // loggedin user
        const decode_token = parseJwt(token);

        localStorage.setItem("token", token); //token을 local에 저장합니다

        dispatch(logIn(decode_token, userInfo));
        if (!userInfo.userInterest[0]) {
          history.replace("/signupdone");
        } else {
          history.replace("/main"); //토큰 받았고 로그인됬으니 메인으로 전환합니다
        }
      })
      .catch((err) => {
        console.log("구글로그인 에러", err);
        window.alert("로그인에 실패했습니다");
        history.replace("/"); //로그인 실패 시 로그인 화면으로 돌아갑니다
      });
  };
};

//getuser
const isLoginDB = () => {
  return (dispatch, getState, { history }) => {
    axios({
      method: "get",
      url: "https://https://seuchidaback.link/api/myPage",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        const userInfo = res.data.myPage[0];
        dispatch(getUser(userInfo));
      })
      .catch((err) => {
        console.log("isLogin에러", err);
      });
  };
};

//addProfile
const addUserDB = (nickName, gender, age, content, address, userInterest) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "https://https://seuchidaback.link/oauth/signup",
      data: JSON.stringify({
        nickName: nickName,
        userGender: gender,
        userAge: age,
        userContent: content,
        address: address,
        userInterest: userInterest,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        history.replace("/done");
      })
      .catch((error) => {
        console.log("회원가입 실패", error);
      });
  };
};

//addPhoto
const addPhotoDB = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "https://https://seuchidaback.link/oauth/signUpImg",
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `multipart/form-data;`,
      },
    })
      .then((res) => {
        dispatch(addPhoto(res.data.userImg));
      })
      .catch((error) => {
        console.log("사진 추가 실패", error);
      });
  };
};

//editProfile
const editUserDB = (nickName, gender, age, content, address, userInterest) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: "post",
      url: "https://https://seuchidaback.link/api/myPage/update", //주소확인필요
      data: JSON.stringify({
        nickName: nickName,
        userGender: gender,
        userAge: age,
        userContent: content,
        address: address,
        userInterest: userInterest,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        history.replace("/editdone");
      })
      .catch((error) => {
        console.log("프로필 사진 수정 실패", error);
      });
  };
};

//editPhoto
const editPhotoDB = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "https://https://seuchidaback.link/api/myPage/updateImg",
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `multipart/form-data;`,
      },
    })
      .then((res) => {
        dispatch(editPhoto(res.data.newUserImg));
      })
      .catch((error) => {
        console.log("사진편집 실패", error);
      });
  };
};

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.token = action.payload.token;
        draft.userInfo = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {}),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = true;
        draft.userInfo = action.payload.userInfo;
      }),
    [ADD_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo.push(action.payload);
      }),
    [ADD_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo.userImg = action.payload.userImg;
      }),
    [EDIT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = { ...draft.userInfo, ...action.payload.userInfo };
      }),
    [EDIT_PHOTO]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo.userImg = action.payload.userImg;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  logIn,
  kakaoLogin,
  googleLogin,
  logOut,
  getUser,
  addUserDB,
  addPhotoDB,
  editUserDB,
  editPhotoDB,
  isLoginDB,
};

export { actionCreators };
