import * as types from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
  token: {},
  user: {}
};

const AuthenticationReducer = function(state = initialState, action) {
	switch(action.type) {

	    case types.LOGIN_SUCCESS:
	      return Object.assign({}, state, { token: action.token });

	    case types.GET_AUTHENTICATED_USER_SUCCESS:
	    	return Object.assign({}, state, { user: action.user });
	}

  return state;
}

export default AuthenticationReducer;
