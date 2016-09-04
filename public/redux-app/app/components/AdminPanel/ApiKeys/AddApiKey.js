import React from 'react';
import axios from 'axios';

class AddApiKey extends React.Component {
  
  getQuery(e) {
    e.preventDefault();
    let key = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      expiration_date: this.refs.expiration_date.value
    };
    this.refs.name.value = "";
    this.refs.description.value = "";
    this.refs.expiration_date.value = "";

    this.props.addNew(key);
  }
  render() {
      return (
      	<div>
      		<h4 className="mb"><i className="fa fa-angle-right"></i> Add Product</h4>
      		<form onSubmit={(e) => this.getQuery(e)} accept-charset="UTF-8" className="form-inline" id="add-key">
            <label for="name"> Name </label>
            <input className="form-inline" name="name" type="text" id="name"
                      ref="name"/>
            <label for="name"> Description </label>
            <input className="form-inline" name="name" type="text" id="description"
                      ref="description"/>
            <label for="expiration_date"> Expiration Date </label>
            <input className="form-inline" name="expiration_date" type="text" id="expiration_date"
			            		ref="expiration_date"/>
            <button className="btn btn-theme" >Add</button>
	    		</form>
      	</div>
      );
  }
}

export default AddApiKey;
