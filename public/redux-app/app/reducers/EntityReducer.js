import * as types from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
  entities: []
};

const EntityReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_ENTITIES_SUCCESS:
      return Object.assign({}, state, { entities: action.entities });

    case types.DELETE_ENTITY_SUCCESS:
      const newData = _.filter(state.entities, entity => entity.id != action.entityId);
      return Object.assign({}, state, { entities: newData });

    case types.ADD_ENTITY_SUCCESS:
      var newEntity = state.entities.concat([action.entity]);
      return Object.assign({}, state, { entities: newEntity });

    case types.UPDATE_ENTITY_SUCCESS:
      return Object.assign({}, state, { entities: action.entities });
  }

  return state;
}

export default EntityReducer;
