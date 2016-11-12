import React from 'react';
import axios from 'axios';
import EntitySelector from './EntitySelector';

class AddUniversity extends React.Component {
  
  getQuery(e) {
    e.preventDefault();
    let university = {
      name: this.refs.name.value,
      slug: this.refs.slug.value,
      entity_slug: this.refs.entity_slug.value
    };
    this.refs.name.value = "";
    this.refs.slug.value = "";
    this.refs.entity_slug.value = "";

    this.props.addNew(university);
  }

  setEntity(entity) {
    this.refs.entity_slug.value = entity.slug;
  }
  
  render() {
      return (
      	<div>
      		<h4 className="mb"><i className="fa fa-angle-right"></i> Add University</h4>
      		<form onSubmit={(e) => this.getQuery(e)} acceptCharset="UTF-8" className="form-inline" id="add-lc">
		        <label htmlFor="name"> Name </label>
		        <input className="form-inline" name="name" type="text" id="name" 
			            		ref="name"/>
            <label htmlFor="slug"> URL Name </label>
            <input className="form-inline" name="slug" type="text" id="slug"
                      pattern="[a-z0-9\\-]+"
                      title="Accepted only small letters, numbers and -"
			            		ref="slug"/>
            <label htmlFor="entity"> Entity </label>
            <EntitySelector entities={this.props.entities} setEntity={(entity) => this.setEntity(entity)} />
            <input className="form-inline" name="entity_slug" type="hidden" id="entity_slug"
                      ref="entity_slug"/>
            <button className="btn btn-theme" >Add</button>
	    		</form>
      	</div>
      );
  }
}

export default AddUniversity;
