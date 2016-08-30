import * as types from '../actions/ActionTypes';

export function setAnalysisEntity(analysisEntity) {
	return {
	    type: types.ANALYSIS_ENTITY_SELECTED,
	    analysisEntity
  };
}

export function setAnalysisProduct(analysisProduct) {
	return {
	    type: types.ANALYSIS_PRODUCT_SELECTED,
	    analysisProduct
  };
}

export function setStartDate(startDate) {
	return {
	    type: types.START_DATE_SELECTED,
	    startDate
  };
}

export function setEndDate(endDate) {
	return {
	    type: types.END_DATE_SELECTED,
	    endDate
  };
}

export function getLeadsStatsSuccess(leadsStatistics) {
	return {
	    type: types.GET_LEADS_STATISTICS_SUCCESS,
	    leadsStatistics
  };
}

export function getRegistrationsStatsSuccess(registrationsStatistics) {
	return {
	    type: types.GET_REGISTRATIONS_STATISTICS_SUCCESS,
	    registrationsStatistics
  };
}

export function getLeadsCountSuccess(leadsCount) {
	return {
	    type: types.GET_LEADS_COUNT_SUCCESS,
	    leadsCount
  };
}

export function getRegistrationsCountSuccess(registrationsCount) {
	return {
	    type: types.GET_REGISTRATIONS_COUNT_SUCCESS,
	    registrationsCount
  };
}