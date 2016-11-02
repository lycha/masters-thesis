import React from 'react';
import store from '../../store';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { login } from '../../api/UserApi'
import LoginForm from './LoginForm'
import backstretch from 'jquery.backstretch';
import jwtDecode from 'jwt-decode';

class LoginContainer extends React.Component {
	constructor(props) {
        super(props);
		this.login = this.login.bind(this);
	}
    componentDidMount(){
		jQuery.backstretch("assets/img/login-bg.jpg", {transitionDuration: 500});
	}

	login(username, password) {
		login(username, password).then(function(response){
			hashHistory.push('/');
		}.bind(this));
	}

	componentWillUnmount() {
		jQuery.backstretch('destroy');
	}

    render() {
        return (
        	<div id="login-page">
		  		<div className="container">
		  			<LoginForm login={this.login}/>
		  		</div>
		  	</div>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    token: store.authenticationState.token
  };
};

export default connect(mapStateToProps)(LoginContainer);