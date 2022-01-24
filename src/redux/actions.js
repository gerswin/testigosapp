import actionTypes from './actionTypes';

export const loginNewUser = user => ({
    type: actionTypes.LOGIN_NEW_USER,
    payload: user
})