import produce from "immer"
import actionTypes from './actionTypes';

const INITIAL_STATE = {
    loginNewUser: {},
    dataTableAssignment: [],
    updateTableAssignment: []
}

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_NEW_USER:
            return {
                ...state,
                loginNewUser: action.payload
            }
        case actionTypes.FETCH_TABLE_ASSIGNMENT:
            return Object.assign({}, state, {
                dataTableAssignment: state.dataTableAssignment.concat(action.payload)
            })
        case actionTypes.UPDATE_TABLE_ASSIGNMENT:
            return Object.assign({}, state, {
                updateTableAssignment: state.dataTableAssignment.concat(action.payload)
            })
        default:
            return state
    }
}

export default rootReducer;