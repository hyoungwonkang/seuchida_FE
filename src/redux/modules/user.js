
import { createAction, handleActions } from "redux-actions";
//액션, 리듀서 편하게 만들어줌
import { produce } from "immer"; //불변성관리

//Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

//Action Creators

const logIn = createAction(LOG_IN, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));


//initialState (default props 같은 것, 기본값)

const initialState = {
    user : null,
    is_login : false,
}

//reducer
export default handleActions({
    [LOG_IN]: (state,action) => produce(state, (draft)=>{     
    }),
    [LOG_OUT]: (state,action) => produce(state, (draft)=>{       
    }),
    [GET_USER]: (state,action) => produce(state, (draft)=>{       
    }),
},initialState)


// action creator export 
const actionCreators = {
    logIn,
    logOut,
    getUser,

};

export { actionCreators }