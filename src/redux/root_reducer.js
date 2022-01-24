import actionTypes from './actionTypes';

const INITIAL_STATE = {
    loginNewUser: {}
}

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_NEW_USER:
            return {
                ...state,
                loginNewUser: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;