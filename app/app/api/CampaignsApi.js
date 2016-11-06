import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
import {deleteSession} from '../utils/SessionManager'
import { getCampaignsSuccess, deleteCampaignSuccess, addCampaignSuccess, updateCampaignSuccess } from '../actions/CampaignActions';

export function getCampaigns() {
	window.showLoadingSpinner();
  	return axios.get(Config.serverUrl+'campaigns',{
		headers: {
	    	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
	    }})
	    .then(response => {
			window.hideLoadingSpinner();
			store.dispatch(getCampaignsSuccess(response.data));
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

export function deleteCampaign(campaignId) {
	window.showLoadingSpinner();
	return axios.delete(Config.serverUrl+'campaigns/'+campaignId,{
		headers: {
        	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
        }})
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(deleteCampaignSuccess(campaignId));
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

export function updateCampaign(campaign) {
	window.showLoadingSpinner();
	var config = {
	  headers: {
	  	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        'Content-Type': 'application/json'
      }
	};
	axios.put(Config.serverUrl+'campaigns/'+campaign.id, {
	    name: campaign.name,
	    description: campaign.description,
	    slug: campaign.slug,
	    expires_on: campaign.expires_on
	}, config)
	.then((response) => {
		window.hideLoadingSpinner();
		store.dispatch(updateCampaignSuccess(response.data));
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

export function addCampaign(campaign) {
	window.showLoadingSpinner();
	var config = {
		  headers: {
		  	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
        }
		};
    return axios.post(Config.serverUrl+'campaigns', {
		    name: campaign.name,
		    description: campaign.description,
		    slug: campaign.slug,
		    expires_on: campaign.expires_on
		}, config)
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(addCampaignSuccess(response.data));
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