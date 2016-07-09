import axios from 'axios';
import store from '../store';
import Config from 'Config';
import _ from 'underscore';
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
		.catch((response) => { //todo ogarnąć errory
	    	debugger;
			{data: null}
			if (response.data.error.code && response.data.error.title) {
				if (response.data.error.code == 401) {
					//todo co się dzieje jeśli 401
				}
				window.showError(response.status + " " + response.data.error.code, response.data.error.title); //method from common-scripts.js
			} else {
				window.showError(response.status + " " + response.data.error, ""); //method from common-scripts.js
			}

			window.hideLoadingSpinner();
			deleteSession();
			window.location.reload();
		});
}