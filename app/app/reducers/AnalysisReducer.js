import * as types from '../actions/ActionTypes';
import _ from 'lodash';
import moment from 'moment';

const initialState = {
  leadsStatistics: [],
  registrationsStatistics: [],
  analysisParams: {},
  startDate: moment().subtract(14, 'days'),
  endDate: moment(),
  analysisCampaign: {},
  analysisEntity: {},
  analysisProduct: {},
  leadsCount: 0,
  registrationsCount: 0,
};

const AnalysisReducer = function(state = initialState, action) {
	switch(action.type) {
	    case types.ANALYSIS_ENTITY_SELECTED:
	      return Object.assign({}, state, { analysisEntity: action.analysisEntity });

	    case types.ANALYSIS_PRODUCT_SELECTED:
	      return Object.assign({}, state, { analysisProduct: action.analysisProduct });

	    case types.START_DATE_SELECTED:
	      return Object.assign({}, state, { startDate: action.startDate });

	    case types.END_DATE_SELECTED:
	    	return Object.assign({}, state, { endDate: action.endDate });
	    	
	    case types.CAMPAIGN_SELECTED:
	    	return Object.assign({}, state, { analysisCampaign: action.campaign });

	    case types.GET_LEADS_STATISTICS_SUCCESS:
	    	return Object.assign({}, state, { leadsStatistics: action.leadsStatistics });
	    	
	    case types.GET_REGISTRATIONS_STATISTICS_SUCCESS:
	    	return Object.assign({}, state, { registrationsStatistics: action.registrationsStatistics });

	    case types.GET_LEADS_COUNT_SUCCESS:
	    	return Object.assign({}, state, { leadsCount: action.leadsCount[0] });
	    	
	    case types.GET_REGISTRATIONS_COUNT_SUCCESS:
	    	return Object.assign({}, state, { registrationsCount: action.registrationsCount[0] });
	}

  return state;
}

export default AnalysisReducer;
