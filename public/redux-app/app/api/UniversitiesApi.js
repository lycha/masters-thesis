import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
import {deleteSession} from '../utils/SessionManager'
import { getUniversitiesSuccess, deleteUniversitySuccess, updateUniversitySuccess, addUniversitySuccess } from '../actions/UniversityActions';

export function getUniversities() {
	window.showLoadingSpinner();
  	return axios.get(Config.serverUrl+'universities/',{
		headers: {
	    	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'text/plain'
	    }})
	    .then(response => {
			window.hideLoadingSpinner();
			store.dispatch(getUniversitiesSuccess(response.data));
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

export function deleteUniversity(universityId) {
	window.showLoadingSpinner();
	return axios.delete(Config.serverUrl+'universities/'+universityId,{
		headers: {
        	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'text/plain'
        }})
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(deleteUniversitySuccess(universityId));
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

export function updateUniversity(university) {
	window.showLoadingSpinner();
	var config = {
	  headers: {
	  	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        'Content-Type': 'text/plain'
	  }
	};
	axios.put(Config.serverUrl+'universities/'+university.id, {
	    name: university.name,
	    slug: university.slug,
	    entity_slug: university.entity_slug
	}, config)
	.then((response) => {
		window.hideLoadingSpinner();
		store.dispatch(updateUniversitySuccess(response.data));
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

export function addUniversity(university) {
	window.showLoadingSpinner();
	var config = {
		  headers: {
		  	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'text/plain'
		  }
		};
    return axios.post(Config.serverUrl+'universities/', {
		    name: university.name,
		    slug: university.slug,
		    entity_slug: university.entity_slug
		}, config)
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(addUniversitySuccess(response.data));
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