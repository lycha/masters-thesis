import * as types from '../actions/ActionTypes';
import _ from 'lodash';
import moment from 'moment';

const initialState = {
  leadsStatistics: [],
  analysisParams: {},
  startDate: moment().subtract(14, 'days'),
  endDate: moment()
};

const AnalysisReducer = function(state = initialState, action) {
	switch(action.type) {
	    case types.START_DATE_SELECTED:
	      return Object.assign({}, state, { startDate: action.startDate });

	    case types.END_DATE_SELECTED:
	    	return Object.assign({}, state, { endDate: action.endDate });

	    case types.GET_LEADS_STATISTICS_SUCCESS:
	    	return Object.assign({}, state, { leadsStatistics: action.leadsStatistics });
	}

  return state;
}

export default AnalysisReducer;
