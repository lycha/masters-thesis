import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
import {deleteSession} from '../utils/SessionManager'
import { getApiKeysSuccess, deleteApiKeySuccess, addApiKeySuccess } from '../actions/ApiKeyActions';

export function getApiKeys() {
	window.showLoadingSpinner();
	return axios.get(Config.serverUrl+'api-keys',{
		headers: {
	    	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
	    }})
	    .then(response => {
			window.hideLoadingSpinner();
			store.dispatch(getApiKeysSuccess(response.data));
			return response;
		})
		.catch((response) => {
			try {
				window.showError(response.status + " " +response.data.error.code, response.data.error); //method from common-scripts.js
			} catch (e) {
				window.hideLoadingSpinner();
				window.showError(response.status, response.statusText); //method from common-scripts.js
			}
			if (response.data.error.code == 401) {
				deleteSession();
				window.location.reload();
			}
			window.hideLoadingSpinner();
		});
}

export function deleteApiKey(keyId) {
	window.showLoadingSpinner();
	return axios.delete(Config.serverUrl+'api-keys/'+keyId,{
		headers: {
        	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
        }})
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(deleteApiKeySuccess(keyId));
			return response;
		})
		.catch((response) => {
			try {
				window.showError(response.status + " " +response.data.error.code, response.data.error); //method from common-scripts.js
			} catch (e) {
				window.hideLoadingSpinner();
				window.showError(response.status, response.statusText); //method from common-scripts.js
			}
			if (response.data.error.code == 401) {
				deleteSession();
				window.location.reload();
			}
			window.hideLoadingSpinner();
		});
}

export function addApiKey(apiKey) {
	window.showLoadingSpinner();
	var config = {
		  headers: {
		  	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
        }
		};
    return axios.post(Config.serverUrl+'api-keys', {
		    name: apiKey.name,
		    description: apiKey.description,
		    expiration_date: apiKey.expiration_date
		}, config)
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(addApiKeySuccess(response.data));
			return response;
		})
		.catch((response) => {
			try {
				window.showError(response.status + " " +response.data.error.code, response.data.error); //method from common-scripts.js
			} catch (e) {
				window.hideLoadingSpinner();
				window.showError(response.status, response.statusText); //method from common-scripts.js
			}
			if (response.data.error.code == 401) {
				deleteSession();
				window.location.reload();
			}
			window.hideLoadingSpinner();
		});
}