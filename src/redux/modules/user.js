import { createAction, handleActions } from "redux-actions";
//액션, 리듀서 편하게 만들어줌
import { produce } from "immer"; //불변성관리
import axios from "axios";

//Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

//Action Creators

const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

//initialState (default props 같은 것, 기본값)

const initialState = {
  user: null,
  is_login: false,
};

//Middleware

//addProfile
const signupDB = (
  profile,
  nickName,
  gender,
  birthday,
  content,
  address,
  userInterest
) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "",
      data: JSON.stringify({
        nickName: nickName,
        birthday: birthday,
        gender: gender,
        userContent: content,
        userProfile: profile,
        userInterest: userInterest,
        address: address,
      }),
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("회원가입 실패", error);
      });
  };
};

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) => produce(state, (draft) => {}),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {}),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  logIn,
  logOut,
  getUser,
  signupDB,
};

export { actionCreators };
