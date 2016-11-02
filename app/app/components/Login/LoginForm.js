import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'LoginForm';
    }
    getQuery(e) {
	    e.preventDefault();
	    let username = this.refs.username.value;
	    let password = this.refs.password.value;
	    
	    this.refs.password.value = "";
	    this.refs.username.value = "";

	    this.props.login(username, password);
	  }
    render() {
        return (
        	<form onSubmit={(e) => this.getQuery(e)} className="form-login">
	        	<h2 className="form-login-heading">sign in now</h2>
	        	<div className="login-wrap">
	            	<input type="text" className="form-control" name="name" placeholder="email" 
	            	 ref="username" />
	            	<br />
	            	<input type="password" className="form-control" name="password" placeholder="Password" 
	            	ref="password" />
	            	<br />
	            	<button className="btn btn-theme btn-block"><i className="fa fa-lock"></i> SIGN IN</button>
	            	<hr />
				</div>
	      	</form>
        );
    }
}

export default LoginForm;
