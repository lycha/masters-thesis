import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
import {deleteSession} from '../utils/SessionManager'
import { getLeadsStatsSuccess, getRegistrationsStatsSuccess } from '../actions/AnalysisActions';

export function getLeadsStatistics(startDate, endDate, productId, entityId, campaignId) {
if (!_.isEmpty(productId)) {}
debugger;
	window.showLoadingSpinner();
	let body = {
	    date_from: startDate.format('YYYY-MM-DD'),
	    date_to: endDate.format('YYYY-MM-DD'),
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

export function getRegistrationsStatistics(startDate, endDate, productId, campaignId, entityId) {
	window.showLoadingSpinner();
	let body = {
	    date_from: startDate.format('YYYY-MM-DD'),
	    date_to: endDate.format('YYYY-MM-DD'),
	    product: productId
	};
	if (typeof entityId != 'undefined') { body['entity'] = entityId; };
	if (typeof campaignId != 'undefined') { body['utm_campaign'] = campaignId; };

	var config = {
		  headers: {'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')}
		};
    return axios.post(Config.serverUrl+'customers/customers-statistics/', body, config)
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(getRegistrationsStatsSuccess(response.data));
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