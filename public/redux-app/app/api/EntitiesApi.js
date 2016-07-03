import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
import { getEntitiesSuccess, deleteEntitySuccess, addEntitySuccess } from '../actions/EntityActions';

export function getEntities() {
  	return axios.get(Config.serverUrl+'entities/',{
		headers: {
	    	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')
	    }})
	    .then(response => {
			window.hideLoadingSpinner();
			let sortedEntities = _.sortBy(response.data, 'name');
			store.dispatch(getEntitiesSuccess(sortedEntities));
			return response;
		})
		.catch((response) => { //todo ogarnąć errory
			{data: null}
			if (response.data.error.code && response.data.error.title) {
				window.showError(response.status + " " + response.data.error.code, response.data.error.title); //method from common-scripts.js
			} else {
				window.showError(response.status + " " + response.data.error, ""); //method from common-scripts.js
			}
			window.hideLoadingSpinner();
			deleteSession();
			window.location.reload();
		});
}

export function deleteEntity(entityId) {
	window.showLoadingSpinner();
	return axios.delete(Config.serverUrl+'entities/'+entityId,{
		headers: {
        	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')
        }})
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(deleteEntitySuccess(entityId));
			return response;
		})
		.catch((response) => { 
			window.hideLoadingSpinner();
			if (response.data.error.code && response.data.error.title) {
				window.showError(response.status + " " + response.data.error.code, response.data.error.title); //method from common-scripts.js
			} else {
				window.showError(response.status + " " + response.data.error, ""); //method from common-scripts.js
			}
		});
}

export function updateEntity(entity) {
	window.showLoadingSpinner();
	var config = {
	  headers: {'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')}
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
		debugger;
		window.showError(response.status + " " + response.data.error.code, response.data.error.title); //method from common-scripts.js
	    console.log(response);
		window.hideLoadingSpinner();
	});
}

export function addEntity(entity) {
	window.showLoadingSpinner();
	var config = {
		  headers: {'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')}
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
			if (response.data.error.code && response.data.error.title) {
				window.showError(response.status + " " + response.data.error.code, response.data.error.title); //method from common-scripts.js
			} else {
				window.showError(response.status + " " + response.data.error, ""); //method from common-scripts.js
			}
			window.hideLoadingSpinner();
		});
}