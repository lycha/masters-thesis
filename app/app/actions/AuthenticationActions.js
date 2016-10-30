import * as types from '../actions/ActionTypes';

export function loginSuccess(token) {
	return {
	    type: types.LOGIN_SUCCESS,
	    token
  };
}

export function getAuthenticatedUserSuccess(user) {
	return {
	    type: types.GET_AUTHENTICATED_USER_SUCCESS,
	    user
  };
}