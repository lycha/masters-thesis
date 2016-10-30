import * as types from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
  entities: [] 
};

const EntityReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_ENTITIES_SUCCESS:
      var entities = _.sortBy(action.entities, 'name');
      return Object.assign({}, state, { entities: entities });

    case types.DELETE_ENTITY_SUCCESS:
      var newData = _.filter(state.entities, entity => entity.id != action.entityId);
      var entities = _.sortBy(newData, 'name');
      return Object.assign({}, state, { entities: entities });

    case types.ADD_ENTITY_SUCCESS:
      var newEntity = state.entities.concat([action.entity]);
      var entities = _.sortBy(newEntity, 'name');
      return Object.assign({}, state, { entities: entities });

    case types.UPDATE_ENTITY_SUCCESS:
      var newData = _.filter(state.entities, entity => entity.id != action.entity.id);
      var newEntities = newData.concat([action.entity]);
      var entities = _.sortBy(newEntities, 'name');
      return Object.assign({}, state, { entities: entities });
  }

  return state;
}

export default EntityReducer;
