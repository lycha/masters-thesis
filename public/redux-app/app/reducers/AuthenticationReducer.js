import * as types from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
  token: {},
  userRole: {}
};

const AuthenticationReducer = function(state = initialState, action) {
	switch(action.type) {

    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, { token: action.token });
  }

  return state;
}

export default AuthenticationReducer;
