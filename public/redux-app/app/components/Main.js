import React from 'react';
import Header from './Header'
import SideMenu from './SideMenu/SideMenu'
import Dashboard from './Dashboard'
import axios from 'axios';
import store from '../store';
import { connect } from 'react-redux';
import { getAuthenticatedUser } from '../api/UserApi'
import {deleteSession} from '../utils/SessionManager';

class Main extends React.Component {
	constructor(props) {
        super(props);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
   	    getAuthenticatedUser();
    }

    componentWillMount(){
		if (!localStorage.getItem('trackingToolAuthToken') || 
				localStorage.getItem('trackingToolAuthToken') == 'undefined') {
			this.props.history.pushState(null, 'auth/login'); 
		}
	}
	logout() {
		deleteSession();
		this.props.history.pushState(null, 'auth/login');
	}
    render() {
        return (
			<section id="container">
	        	<Header logout={this.logout}/>
	        	<SideMenu userRole={this.userRole}/>
          {this.props.children}
	        </section>
	        
        );
    }
}

const mapStateToProps = function(store) {
  return {
    userRole: store.authenticationState.userRole
  };
};

export default connect(mapStateToProps)(Main);
