
import React from 'react';
import backstretch from 'jquery.backstretch';
import axios from 'axios';
import {Router, browserHistory} from 'react-router';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	username: '', 
        	password: '',
        	message: ''
        };
        this.displayName = 'Login';
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectOnSuccess = this.redirectOnSuccess.bind(this);
    }

    redirectOnSuccess() {
    	this.props.history.pushState(null, '/');
    }

    componentDidMount(){
    	if (localStorage.getItem('trackingToolAuthToken')) {
			localStorage.removeItem('trackingToolAuthToken');
		}
		jQuery.backstretch("assets/img/login-bg.jpg", {transitionDuration: 500});
	}

	componentWillUnmount() {
		jQuery.backstretch('destroy');
	}

  	handleEmailChange(e) {
    	this.setState({email: e.target.value});
  	}
  	handlePasswordChange(e) {
    	this.setState({password: e.target.value});
  	}

	handleSubmit(e){
	    e.preventDefault();
		var email = this.state.email.trim();
        var password = this.state.password.trim();

        if (!email || !password) {
          return;
        }
        this.setState({
	      name: '',
	      email: '',
	      message: 'Authentication...'
	    });

        axios.post('../../api/v1/authenticate', {
		    email: email,
		    password: password
		})
		.then((response) => {
			localStorage.setItem('trackingToolAuthToken', response.data.token);
		    this.redirectOnSuccess();
		})
		.catch((response) => {
			this.setState({
		      message: 'Whoops There is problem with authentication. Please check your credentials and try again.'
		    });
		    console.log(response);
		});

        return;
	}

    render() {
        return(
	    	<div id="login-page">
		  		<div className="container">
		  			<form className="form-login" onSubmit={this.handleSubmit}>
			        	<h2 className="form-login-heading">sign in now</h2>
			        	<div className="login-wrap">
			            	<input type="text" className="form-control" name="name" placeholder="email" 
			            		autofocus 
			            		onChange={this.handleEmailChange} />
			            	<br />
			            	<input type="password" className="form-control" name="password" placeholder="Password" 
			            		onChange={this.handlePasswordChange}/>
			            	<br />
			            	<button type='submit' className="btn btn-theme btn-block"><i className="fa fa-lock"></i> SIGN IN</button>
			            	<hr />
			            	<div class="alert alert-danger registration">
								  { this.state.message }
							</div>
						</div>
			      	</form>	  	
		  		</div>
		  	</div>
	    ) 
    }
}


Login.PropTypes = {
  history: React.PropTypes.object.isRequired
}

export default Login;