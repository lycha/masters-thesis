import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
import { loginSuccess } from '../actions/AuthenticationActions';
import {createSession} from '../utils/SessionManager';

export function login(email, password) {
	window.showLoadingSpinner();
	return axios.post('../../api/v1/authenticate', {
		    email: email,
		    password: password
		})
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(loginSuccess(response.data));
			createSession(response.data.token);
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

export function getAuthenticatedUser() {
	axios.get('../../api/v1/authenticate/user',{
		headers: {
        	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')
        }})
		.then((response) => {
		    
		})
		.catch((response) => { 
		    console.log(response);
		});
}