import * as types from '../actions/ActionTypes';

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