import React from 'react';
import axios from 'axios';

class AddProduct extends React.Component {
  
  getQuery(e) {
    e.preventDefault();
    let product = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      slug: this.refs.slug.value
    };
    this.refs.name.value = "";
    this.refs.description.value = "";
    this.refs.slug.value = "";

    this.props.addNew(product);
  }
  render() {
      return (
      	<div>
      		<h4 className="mb"><i className="fa fa-angle-right"></i> Add Product</h4>
      		<form onSubmit={(e) => this.getQuery(e)} acceptCharset="UTF-8" className="form-inline" id="add-lc">
            <label htmlFor="name"> Name </label>
            <input className="form-inline" name="name" type="text" id="name"
                      ref="name"/>
            <label htmlFor="name"> Description </label>
            <input className="form-inline" name="name" type="text" id="description"
                      ref="description"/>
            <label htmlFor="slug"> URL Name </label>
            <input className="form-inline" name="slug" type="text" id="slug"
                      pattern="[a-z0-9\\-]+"
                      title="Accepted only small letters, numbers and -"
			            		ref="slug"/>
            <button className="btn btn-theme" >Add</button>
	    		</form>
      	</div>
      );
  }
}

export default AddProduct;
