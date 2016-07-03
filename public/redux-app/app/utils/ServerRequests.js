var axios = require('axios');
import {Router} from 'react-router';
import deleteSession from './SessionManager'
import createSession from './SessionManager'

export function	updateEntity(id, name, slug, expa_id, expa_name) {
	window.showLoadingSpinner();
	var config = {
	  headers: {'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')}
	};
	axios.put('../../api/v1/entities/'+id, {
	    name: name,
	    slug: slug,
	    expa_id: expa_id,
	    expa_name: expa_name
	}, config)
	.then((response) => {
		window.hideLoadingSpinner();
	    return response.data;
	})
	.catch((response) => {
		window.showError(response.status + " " + response.data.error.code, response.data.error.title); //method from common-scripts.js
	    console.log(response);
		window.hideLoadingSpinner();
	});
}

export function getEntities() {
	window.showLoadingSpinner();
	return axios.get('../../api/v1/entities/',{
		headers: {
	    	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')
	    }})
		.then((response) => (
			{data: response.data}
		))
		.catch((response) => { 
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

export function addEntity(expa_name, expa_id, slug, name) {
	window.showLoadingSpinner();
	var config = {
		  headers: {'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')}
		};
    return axios.post('../../api/v1/entities', {
		    name: name,
		    slug: slug,
		    expa_id: expa_id,
		    expa_name: expa_name
		}, config)
		.then((response) => (
			{data: response.data}
		))
		.catch((response) => {
			if (response.data.error.code && response.data.error.title) {
				window.showError(response.status + " " + response.data.error.code, response.data.error.title); //method from common-scripts.js
			} else {
				window.showError(response.status + " " + response.data.error, ""); //method from common-scripts.js
			}
			window.hideLoadingSpinner();
		});
}

export function deleteEntity(id) {
	window.showLoadingSpinner();
	return axios.delete('../../api/v1/entities/'+id,{
		headers: {
        	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')
        }})
		.then((response) => {
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

export function login(email, password) {
	window.showLoadingSpinner();
	return axios.post('../../api/v1/authenticate', {
		    email: email,
		    password: password
		})
		.then((response) => (
			{token: response.data.token}
		))
		.catch((response) => {
			if (response.data.error.code && response.data.error.title) {
				window.showError(response.status + " " + response.data.error.code, response.data.error.title); //method from common-scripts.js
			} else {
				window.showError(response.status + " " + response.data.error, ""); //method from common-scripts.js
			}
			window.hideLoadingSpinner();
		});
}

