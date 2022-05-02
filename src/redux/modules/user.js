//REDUX-ACTION & IMMER
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//Axios
import axios from "axios";
import { CALL_HISTORY_METHOD } from "connected-react-router";

//Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const EDIT_USER = "EDIT_USER";

//Action Creators

const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const editUser = createAction(EDIT_USER, (userInfo, userInterest) => ({
  userInfo,
  userInterest,
}));

//initialState (default props 같은 것, 기본값)
const initialState = {
  user: "",
  is_login: false,
  userInfo: "",
};

const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`https://seuchidaback2.shop/oauth/callback/kakao?code=${code}`)
      .then((res) => {
        console.log(res); //토큰 넘어오는 것 확인합니다

        const token = res.data.user.token;

        localStorage.setItem("token", token); //token을 local에 저장합니다

        dispatch(logIn(token));
        console.log("로그인 확인");
        history.replace("/signupdone"); //토큰을 받았고 로그인됬으니 메인으로 전환합니다
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
const signupDB = (
  profile,
  nickName,
  gender,
  age,
  content,
  address,
  userInterest
) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "https://seuchidaback2.shop/oauth/signup",
      data: JSON.stringify({
        nickName: nickName,
        userAge: age,
        userGender: gender,
        userContent: content,
        userImg: profile,
        userInterest: userInterest,
        address: address,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": `application/json`,
      },
    })
      .then((res) => {
        console.log(res);
        console.log("회원가입 성공");
        history.push("/main");
      })
      .catch((error) => {
        console.log("회원가입 실패", error);
      });
  };
};

// const signupDB = (
//   userInfo,
//   userInterest
// ) => {
//   return function (dispatch, getState, { history }) {
//     axios({
//       method: "post",
//       url: "https://seuchidaback2.shop/oauth/signup",
//       data: JSON.stringify({
//         nickName: userInfo.nickName,
//         userAge: userInfo.age,
//         userGender: userInfo.gender,
//         userContent: userInfo.content,
//         userImage: userInfo.profile,
//         address: userInfo.address,
//         userInterest: userInterest,
//       }),
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": `application/json`,
//       },
//     })
//       .then((res) => {
//         console.log(res);
//         console.log("회원가입 성공");
//         history.push("/main");
//       })
//       .catch((error) => {
//         console.log("회원가입 실패", error);
//       });
//   };
// };

// //editProfile
// const editUserDB = (userInfo, userInterest) => {
//   return function (dispatch, getState, { history }) {
//     axios({
//       method: "post",
//       url: "https://seuchidaback2.shop/oauth/signup",
//       data: JSON.stringify({
//         nickName: userInfo.nickName,
//         userAge: userInfo.age,
//         userGender: userInfo.gender,
//         userContent: userInfo.content,
//         userImg: userInfo.profile,
//         address: userInfo.address,
//         userInterest: userInterest,
//       }),
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": `application/json`,
//       },
//     })
//       .then((res) => {
//         console.log(res);
//         dispatch(editUser(userInfo, userInterest))
//         console.log("유저 정보 수정 성공");
//         history.replace("/mypage");
//       })
//       .catch((error) => {
//         console.log("유저 정보 실패", error);
//       });
//   };
// };

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.token = action.payload.user; // action.payload.user.token은 안 되어서 .user로 draft.token 함.
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {}),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    // [EDIT_USER]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.userInfo = { ...draft.userInfo, ...action.payload.userInfo }; //갈아끼워줘라
    //   }),
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
  // editUserDB,
};

export { actionCreators };
