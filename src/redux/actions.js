import actionTypes from './actionTypes';

export const loginNewUser = user => ({
    type: actionTypes.LOGIN_NEW_USER,
    payload: user
})

export const dataTableAssignment = data => ({
    type: actionTypes.FETCH_TABLE_ASSIGNMENT,
    payload: data
})

export const updateTableAssignment = data => ({
    type: actionTypes.UPDATE_TABLE_ASSIGNMENT,
    payload: data
})