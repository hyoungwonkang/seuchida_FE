//REDUX-ACTION & IMMER
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

//Axios
import axios from 'axios';

//Actions
const LOG_IN = 'LOG_IN';

//Action Creators
const logIn = createAction(LOG_IN, (user) => ({ user }));

//initialState (default props 같은 것, 기본값)
const initialState = {
  user: '',
  is_login: false,
};

const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`http://3.35.16.227/oauth/callback/kakao?code=${code}`)
      .then((res) => {
        console.log(res); //토큰 넘어오는 것 확인합니다

        const token = res.data.user.token;

        localStorage.setItem('token', token); //token을 local에 저장합니다

        dispatch(logIn());
        console.log('로그인 확인');
        history.replace('/signupdone'); //토큰을 받았고 로그인됬으니 메인으로 전환합니다
      })
      .catch((err) => {
        console.log('카카오로그인 에러', err);
        window.alert('로그인에 실패했습니다');
        history.replace('/login'); //로그인 실패 시 로그인 화면으로 돌아갑니다
      });
  };
};

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        console.log(state);
        draft.user = action;
        draft.is_login = true;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  logIn,
  kakaoLogin,
};

export { actionCreators };
