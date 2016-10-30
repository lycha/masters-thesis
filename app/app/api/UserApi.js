import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
import { loginSuccess, getAuthenticatedUserSuccess } from '../actions/AuthenticationActions';
import { getUsersSuccess, deleteUserSuccess, addUserSuccess } from '../actions/UserActions';
import {createSession, deleteSession} from '../utils/SessionManager';

export function login(email, password) {
	window.showLoadingSpinner();
	return axios.post(Config.serverUrl+'authenticate', {
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
			window.showError(response.status + " " +response.data.error.code, response.data.error); //method from common-scripts.js
			if (response.data.error.code == 401) {
				deleteSession();
				window.location.reload();
			}
			window.hideLoadingSpinner();
		});
}

export function getAuthenticatedUser() {
	window.showLoadingSpinner();
	axios.get(Config.serverUrl+'authenticate/user',{
		headers: {
        	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
        }})
		.then((response) => {
			window.hideLoadingSpinner();
		    store.dispatch(getAuthenticatedUserSuccess(response.data.user));
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

export function getUsers(){
	window.showLoadingSpinner();
  	return axios.get(Config.serverUrl+'users/',{
		headers: {
	    	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
	    }})
	    .then(response => {
			window.hideLoadingSpinner();
			store.dispatch(getUsersSuccess(response.data));
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

export function deleteUser(userId){
	window.showLoadingSpinner();
	return axios.delete(Config.serverUrl+'users/'+userId, {
		headers: {
        	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
        }})
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(deleteUserSuccess(userId));
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

export function addUser(user){
	window.showLoadingSpinner();
	var config = {
		  headers: {
		  	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken'),
        	'Content-Type': 'application/json'
          }
		};
    return axios.post(Config.serverUrl+'users', {
		    name: user.name,
		    email: user.email,
		    password: user.password
		}, config)
		.then((response) => {
			window.hideLoadingSpinner();
			store.dispatch(addUserSuccess(response.data));
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

export function updateUser(){

}

