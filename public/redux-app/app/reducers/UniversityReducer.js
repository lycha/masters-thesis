import * as types from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
  universities: [] 
};

const UniversityReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_UNIVERSITIES_SUCCESS:
      var universities = _.sortBy(action.universities, 'entity_slug');
      return Object.assign({}, state, { universities: universities });

    case types.DELETE_UNIVERSITY_SUCCESS:
      var newData = _.filter(state.universities, university => university.id != action.universityId);
      var universities = _.sortBy(newData, 'entity_slug');
      return Object.assign({}, state, { universities: universities });

    case types.UPDATE_UNIVERSITY_SUCCESS:
      var newData = _.filter(state.universities, university => university.id != action.university.id);
      var newUniversities = newData.concat([action.university]);
      var universities = _.sortBy(newUniversities, 'entity_slug');
      return Object.assign({}, state, { universities: universities });

    case types.ADD_UNIVERSITY_SUCCESS:
      var newUniversity = state.universities.concat([action.university]);
      var universities = _.sortBy(newUniversity, 'entity_slug');
      return Object.assign({}, state, { universities: universities });
  }

  return state;
}

export default UniversityReducer;
