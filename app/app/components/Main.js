import React from 'react';
import Header from './Header'
import SideMenu from './SideMenu/SideMenu'
import axios from 'axios';
import { hashHistory } from 'react-router'
import store from '../store';
import { connect } from 'react-redux';
import { getAuthenticatedUser } from '../api/UserApi'
import {deleteSession} from '../utils/SessionManager';
import {getEntities} from '../api/EntitiesApi';
import {getProducts} from '../api/ProductsApi';
import jwtDecode from 'jwt-decode';

class Main extends React.Component {
	constructor(props) {
        super(props);
		this.logout = this.logout.bind(this);
	}

    componentDidMount(){
    	let currentEpoch = Math.floor(Date.now() / 1000);
    	
		if (localStorage.getItem('trackingToolAuthToken') != null) { 
			let decodedJwt = jwtDecode(localStorage.getItem('trackingToolAuthToken'));
			if (decodedJwt.exp > currentEpoch) {
				getAuthenticatedUser();
				getProducts(); 
		   	    getEntities()
		   	    	.then(response => {
		        		window.startAccordion();
    					window.commonScript();
				});
	   		} else {
				hashHistory.push('auth/login');
			} 
		} else {
				hashHistory.push('auth/login');
		}   
	}

	logout() {
		deleteSession();
				hashHistory.push('auth/login');
	}
    
    render() {
        return (
			<section id="container">
	        	<Header logout={this.logout}/>
	        	<SideMenu user={this.props.user} entities={this.props.entities} products={this.props.products} />
          {this.props.children}
	        </section>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    user: store.authenticationState.user,
    entities: store.entityState.entities,
    products: store.productState.products
  };
};
export default connect(mapStateToProps)(Main);
