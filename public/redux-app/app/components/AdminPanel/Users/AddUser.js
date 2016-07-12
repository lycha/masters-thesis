import React from 'react';
import axios from 'axios';

class AddUser extends React.Component {
  
  getQuery(e) {
    e.preventDefault();
    let user = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    this.refs.name.value = "";
    this.refs.email.value = "";
    this.refs.password.value = "";

    this.props.addNew(user);
  }
  
  generatePassword(e) {
    e.preventDefault();
    this.refs.password.value = Math.random().toString(36).substr(2, 10);
  }

  render() {
      return (
      	<div>
      		<h4 className="mb"><i className="fa fa-angle-right"></i> Add User</h4>
      		<form onSubmit={(e) => this.getQuery(e)} accept-charset="UTF-8" className="form-inline" id="add-lc">
            <label for="name"> Name </label>
            <input className="form-inline" name="name" type="text" id="name"
			            		ref="name"/>
            <label for="email"> Email </label>
            <input className="form-inline" name="email" type="text" id="email"
			            		ref="email"/>
            <label for="password"> Password </label>
            <input className="form-inline" name="password" type="text" id="password"
			            		ref="password"/>
            <button className="btn btn-theme" >Add</button>
	    		</form>

            <button className="btn btn-theme" onClick={(e) => this.generatePassword(e)} >Generate password</button>
      	</div>
      );
  }
}

export default AddUser;
