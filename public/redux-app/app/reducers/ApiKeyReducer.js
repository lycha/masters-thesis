import * as types from '../actions/ActionTypes';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from 'react-datepicker';


const initialState = {
  apiKeys: [],
  expirationDate: moment()
};

const ApiKeyReducer = function(state = initialState, action) {

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

    case types.API_EXPIRATION_DATE_SELECTED:
      return Object.assign({}, state, { expirationDate: action.expirationDate });
  }

  return state;
}

export default ApiKeyReducer;
