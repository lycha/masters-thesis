import * as types from '../actions/ActionTypes';

export function getEntitiesSuccess(entities) {
  return {
    type: types.GET_ENTITIES_SUCCESS,
    entities
  };
}

export function deleteEntitySuccess(entityId) {
  return {
    type: types.DELETE_ENTITY_SUCCESS,
    entityId
  };
}

export function updateEntitySuccess(entity) {
  return {
    type: types.UPDATE_ENTITY_SUCCESS,
    entity
  };
}

export function addEntitySuccess(entity) {
  return {
    type: types.ADD_ENTITY_SUCCESS,
    entity
  };
}