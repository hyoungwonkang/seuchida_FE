import { createAction, handleActions } from "redux-actions";
//액션, 리듀서 편하게 만들어줌
import { produce } from "immer"; //불변성관리

//Actions
const CHECK_IN = "CHECK_IN";


//Action Creators

const logIn = createAction(CHECK_IN, (user) => ({user}));



//initialState (default props 같은 것, 기본값)

const initialState = {
    user : null,
    is_login : false,
}

//reducer
export default handleActions({
    [CHECK_IN]: (state,action) => produce(state, (draft)=>{
        draft.user = action.payload.user; //createAction 을 이용하면 payload를 통해 접근
        draft.is_login = true;
    }),
},initialState)


// action creator export 
const actionCreators = {
    logIn,


};

export { actionCreators }