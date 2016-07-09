import React from 'react';
import Header from './Header'
import SideMenu from './SideMenu/SideMenu'
import Dashboard from './Dashboard'
import axios from 'axios';
import store from '../store';
import { connect } from 'react-redux';
import { getAuthenticatedUser } from '../api/UserApi'
import {deleteSession} from '../utils/SessionManager';
import {getEntities} from '../api/EntitiesApi';
import {getProducts} from '../api/ProductsApi';

class Main extends React.Component {
	constructor(props) {
        super(props);
		this.logout = this.logout.bind(this);
	}

    componentWillMount(){
		if (!localStorage.getItem('trackingToolAuthToken') || 
				localStorage.getItem('trackingToolAuthToken') == 'undefined') {
			this.props.history.pushState(null, 'auth/login'); 
		}
   	    getAuthenticatedUser();
   	    getEntities()
   	    	.then(response => {
        		window.startAccordion();
		});
   	    getProducts(); 
	}
	logout() {
		deleteSession();
		this.props.history.pushState(null, 'auth/login');
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
