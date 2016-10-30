var axios = require('axios');
import {Router} from 'react-router';
import deleteSession from './SessionManager'
import createSession from './SessionManager'

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

