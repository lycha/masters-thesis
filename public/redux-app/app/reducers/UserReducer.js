import * as types from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
  users: [] 
};

const UserReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_USERS_SUCCESS:
      var users = _.sortBy(action.users, 'name');
      return Object.assign({}, state, { users: users });

    case types.DELETE_USER_SUCCESS:
      var newData = _.filter(state.users, user => user.id != action.userId);
      var users = _.sortBy(newData, 'name');
      return Object.assign({}, state, { users: users });

    case types.ADD_USER_SUCCESS:
      var newUser = state.users.concat([action.user]);
      var users = _.sortBy(newUser, 'name');
      return Object.assign({}, state, { users: users });

    case types.UPDATE_USER_SUCCESS:
      var newData = _.filter(state.users, user => user.id != action.user.id);
      var newUsers = newData.concat([action.user]);
      var users = _.sortBy(newUsers, 'name');
      return Object.assign({}, state, { users: users });
  }

  return state;
}

export default UserReducer;
