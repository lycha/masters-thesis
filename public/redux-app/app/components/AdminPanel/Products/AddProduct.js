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
      		<form onSubmit={(e) => this.getQuery(e)} accept-charset="UTF-8" className="form-inline" id="add-lc">
            <label for="name"> Name </label>
            <input className="form-inline" name="name" type="text" id="name"
                      ref="name"/>
            <label for="name"> Description </label>
            <input className="form-inline" name="name" type="text" id="description"
                      ref="description"/>
            <label for="slug"> URL Name </label>
            <input className="form-inline" name="slug" type="text" id="slug"
			            		ref="slug"/>
            <button className="btn btn-theme" >Add</button>
	    		</form>
      	</div>
      );
  }
}

export default AddProduct;
