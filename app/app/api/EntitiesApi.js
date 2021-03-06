import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
import {deleteSession} from '../utils/SessionManager'
import { getEntitiesSuccess, deleteEntitySuccess, addEntitySuccess, updateEntitySuccess } from '../actions/EntityActions';

export function getEntities() {
	window.showLoadingSpinner();
  	return axios.get(Config.serverUrl+'entities',{
		headers: {
	    	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
	    }})
	    .then(response => {
			window.hideLoadingSpinner();
			store.dispatch(getEntitiesSuccess(response.data));
			return response;
		})
		.catch((response) => {
			try {
				window.showError(response.status + " " +response.data.error.code, response.data.error.title); //method from common-scripts.js
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

export function deleteEntity(entityId) {
	window.showLoadingSpinner();
	return axios.delete(Config.serverUrl+'entities/'+entityId,{
		headers: {
        	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
        }})
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(deleteEntitySuccess(entityId));
			return response;
		})
		.catch((response) => {
			try {
				window.showError(response.status + " " +response.data.error.code, response.data.error.title); //method from common-scripts.js
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

export function updateEntity(entity) {
	window.showLoadingSpinner();
	var config = {
	  headers: {
	  	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        'Content-Type': 'application/json'
      }
	};
	axios.put(Config.serverUrl+'entities/'+entity.id, {
	    name: entity.name,
	    slug: entity.slug,
	    expa_id: entity.expa_id,
	    expa_name: entity.expa_name
	}, config)
	.then((response) => {
		window.hideLoadingSpinner();
		store.dispatch(updateEntitySuccess(response.data));
		return response;
	})
	.catch((response) => {
		try {
			window.showError(response.status + " " +response.data.error.code, response.data.error.title); //method from common-scripts.js
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

export function addEntity(entity) {
	window.showLoadingSpinner();
	var config = {
		  headers: {
		  	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
		  }
		};
    return axios.post(Config.serverUrl+'entities', {
		    name: entity.name,
		    slug: entity.slug,
		    expa_id: entity.expa_id,
		    expa_name: entity.expa_name
		}, config)
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(addEntitySuccess(response.data));
			return response;
		})
		.catch((response) => {
			try {
				window.showError(response.status + " " +response.data.error.code, response.data.error.title); //method from common-scripts.js
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