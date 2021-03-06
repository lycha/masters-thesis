import React from 'react';
import axios from 'axios';

class AddEntity extends React.Component {
  
  getQuery(e) {
    e.preventDefault();
    let entity = {
      expa_id: this.refs.expa_id.value,
      expa_name: this.refs.expa_name.value,
      name: this.refs.name.value,
      slug: this.refs.slug.value
    };
    this.refs.expa_id.value = "";
    this.refs.expa_name.value = "";
    this.refs.name.value = "";
    this.refs.slug.value = "";

    this.props.addNew(entity);
  }
  render() {
      return (
      	<div>
      		<h4 className="mb"><i className="fa fa-angle-right"></i> Add Entity</h4>
      		<form onSubmit={(e) => this.getQuery(e)} acceptCharset="UTF-8" className="form-inline" id="add-lc">
		        <label htmlFor="expa_id"> EXPA ID </label>
		        <input className="form-inline" name="expa_id" type="number" id="expa_id" 
			            		ref="expa_id"/>
            <label htmlFor="expa_name"> EXPA Name </label>
            <input className="form-inline" name="expa_name" type="text" id="expa_name"
			            		ref="expa_name"/>
            <label htmlFor="slug"> URL Name </label>
            <input className="form-inline" name="slug" type="text" id="slug"
                      pattern="[a-z0-9\\-]+"
                      title="Accepted only small letters, numbers and -"
			            		ref="slug"/>
            <label htmlFor="name"> Full Name </label>
            <input className="form-inline" name="name" type="text" id="name"
			            		ref="name"/>
            <button className="btn btn-theme" >Add</button>
	    		</form>
      	</div>
      );
  }
}

export default AddEntity;
