import * as types from '../actions/ActionTypes';

export function getApiKeysSuccess(apiKeys) {
  return {
    type: types.GET_API_KEYS_SUCCESS,
    apiKeys
  };
}

export function deleteApiKeySuccess(apiKeyId) {
  return {
    type: types.DELETE_API_KEYS_SUCCESS,
    apiKeyId
  };
}

export function addApiKeySuccess(apiKey) {
  return {
    type: types.ADD_API_KEYS_SUCCESS,
    apiKey
  };
}

