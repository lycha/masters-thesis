import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
import {deleteSession} from '../utils/SessionManager'
import { getProductsSuccess, deleteProductSuccess, updateProductSuccess, addProductSuccess } from '../actions/ProductActions';

export function getProducts() {
	window.showLoadingSpinner();
	return axios.get(Config.serverUrl+'products/',{
		headers: {
	    	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')
	    }})
	    .then(response => {
			window.hideLoadingSpinner();
			store.dispatch(getProductsSuccess(response.data));
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