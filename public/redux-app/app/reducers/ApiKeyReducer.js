import * as types from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
  apiKeys: [] 
};

const ProductReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_API_KEYS_SUCCESS:
      var apiKeys = _.sortBy(action.apiKeys, 'name');
      return Object.assign({}, state, { apiKeys: apiKeys });

    case types.DELETE_API_KEYS_SUCCESS:
      var newData = _.filter(state.apiKeys, apiKey => apiKey.id != action.apiKeyId);
      var apiKeys = _.sortBy(newData, 'name');
      return Object.assign({}, state, { apiKeys: apiKeys });

    case types.ADD_API_KEYS_SUCCESS:
      var newApiKey = state.apiKeys.concat([action.apiKey]);
      var apiKeys = _.sortBy(newApiKey, 'name');
      return Object.assign({}, state, { apiKeys: apiKeys });
  }

  return state;
}

export default ProductReducer;
