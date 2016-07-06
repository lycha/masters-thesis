import * as types from '../actions/ActionTypes';

export function loginSuccess(token) {
	return {
    type: types.LOGIN_SUCCESS,
    token
  };
}