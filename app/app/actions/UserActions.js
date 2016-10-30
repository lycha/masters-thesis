import * as types from '../actions/ActionTypes';

export function getUsersSuccess(users) {
  return {
    type: types.GET_USERS_SUCCESS,
    users
  };
}

export function deleteUserSuccess(userId) {
  return {
    type: types.DELETE_USER_SUCCESS,
    userId
  };
}

export function updateUserSuccess(user) {
  return {
    type: types.ADD_USER_SUCCESS,
    user
  };
}

export function addUserSuccess(user) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user
  };
}