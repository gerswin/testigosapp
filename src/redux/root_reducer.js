import actionTypes from './actionTypes';

let INITIAL_STATE = {
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
                dataTableAssignment: action.payload
            })
        case actionTypes.UPDATE_TABLE_ASSIGNMENT:
            const index = state.dataTableAssignment.findIndex(obj => obj.name === action.payload.name)
            if (index !== -1 ) {
                state.dataTableAssignment[index].value = action.payload.value
                return {
                    dataTableAssignment: [
                        ...state.dataTableAssignment,
                    ]
                }
            }
        default:
            return state
    }
}

export default rootReducer;