//REDUX-ACTION & IMMER
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//Axios
import axios from "axios";

//Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const EDIT_USER = "EDIT_USER";
const GET_USER = "GET_USER";

//Action Creators

const logIn = createAction(LOG_IN, (token, user) => ({ token, user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const editUser = createAction(EDIT_USER, (formData) => ({
  formData,
}));
const getUser = createAction(GET_USER, (userInfo) => ({ userInfo }));

//initialState (default props 같은 것, 기본값)
const initialState = {
  user: "",
  is_login: false,
  userInfo: "",
};

const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`https://seuchidabackend.shop/oauth/callback/kakao?code=${code}`)
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
        console.log("로그인 확인");
        if (!userInfo.userInterest[0]) {
          history.replace("/signupdone");
        } else {
          history.replace("/main"); //토큰 받았고 로그인됬으니 메인으로 전환합니다
        }
      })
      .catch((err) => {
        console.log("카카오로그인 에러", err);
        window.alert("로그인에 실패했습니다");
        history.replace("/login"); //로그인 실패 시 로그인 화면으로 돌아갑니다
      });
  };
};
//Middleware

//addProfile
const signupDB = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "https://seuchidabackend.shop/oauth/signup",
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data;`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log("회원가입 성공");
        history.replace("/done");
      })
      .catch((error) => {
        console.log("회원가입 실패", error);
      });
  };
};

const isLoginDB = () => {
  return (dispatch, getState, { history }) => {
    axios({
      method: "get",
      url: "https://seuchidabackend.shop/api/myPage",
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

//editProfile
const editUserDB = (formData) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: "post",
      url: "https://seuchidabackend.shop/api/myPage/update", //주소확인필요
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data;`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        dispatch(editUser(formData));
        console.log("프로필 수정 성공");
        history.replace("/editdone");
      })
      .catch((error) => {
        console.log("프로필 수정 실패", error);
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
    [EDIT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = { ...draft.userInfo, ...action.payload.userInfo };
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  logIn,
  kakaoLogin,
  logOut,
  getUser,
  signupDB,
  editUserDB,
  isLoginDB,
};

export { actionCreators };
