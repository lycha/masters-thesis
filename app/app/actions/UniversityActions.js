import * as types from '../actions/ActionTypes';

export function getUniversitiesSuccess(universities) {
  return {
    type: types.GET_UNIVERSITIES_SUCCESS,
    universities
  };
}

export function deleteUniversitySuccess(universityId) {
  return {
    type: types.DELETE_UNIVERSITY_SUCCESS,
    universityId
  };
}

export function updateUniversitySuccess(university) {
  return {
    type: types.UPDATE_UNIVERSITY_SUCCESS,
    university
  };
}

export function addUniversitySuccess(university) {
  return {
    type: types.ADD_UNIVERSITY_SUCCESS,
    university
  };
}