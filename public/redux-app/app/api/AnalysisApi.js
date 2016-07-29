import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
import {deleteSession} from '../utils/SessionManager'
import { getLeadsStatsSuccess } from '../actions/AnalysisActions';

export function getLeadsStatistics(startDate, endDate, productId, campaignId, entityId) {
	window.showLoadingSpinner();
	let body = {
	    date_from: startDate,
	    date_to: endDate,
	    product: productId
	};
	if (typeof entityId != 'undefined') { body['entity'] = entityId; };
	if (typeof campaignId != 'undefined') { body['utm_campaign'] = campaignId; };

	var config = {
		  headers: {'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')}
		};
    return axios.post(Config.serverUrl+'leads/leads-statistics/', body, config)
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(getLeadsStatsSuccess(response.data));
			return response;
		})
		.catch((response) => {
			window.showError(response.status + " " +response.data.error.code, response.data.error); //method from common-scripts.js
			if (response.data.error.code == 401) {
				deleteSession();
				window.location.reload();
			}
			window.hideLoadingSpinner();
		});
}