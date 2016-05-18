import React from 'react';
import axios from 'axios';
import {addEntity} from '../../utils/ServerRequests';

class AddEntity extends React.Component {
  constructor(props) {
      super(props);
      this.displayName = 'AddEntity';
      this.state = {
        	expa_id: '', 
        	expa_name: '',
        	name: '',
        	slug: ''
        };

      this.handleExpaIdChange = this.handleExpaIdChange.bind(this);
      this.handleExpaNameChange = this.handleExpaNameChange.bind(this);
      this.handleSlugChange = this.handleSlugChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleExpaIdChange(e) {
    this.setState({expa_id: e.target.value});
  }

  handleExpaNameChange(e) {
    this.setState({expa_name: e.target.value});
  }

  handleSlugChange(e) {
    this.setState({slug: e.target.value});
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

	handleSubmit(e) {
	  e.preventDefault();
		var expa_name = this.state.expa_name.trim();
		var expa_id = this.state.expa_id.trim();
		var slug = this.state.slug.trim();
		var name = this.state.name.trim();

		if (!expa_name || !expa_id || !slug || !name) {
          return;
    }

    addEntity(expa_name, expa_id, slug, name)
      .then(function(response){
          window.hideLoadingSpinner();
            debugger
          if (response) {
            console.log(response);
            this.props.addEntity(response.data);
          }
        }.bind(this))

    return;
	}
  render() {
      return (
      	<div>
      		<h4 className="mb"><i className="fa fa-angle-right"></i> Add Entity</h4>
      		<form method="GET" accept-charset="UTF-8" className="form-inline" id="add-lc">
		        <label for="expa_id"> EXPA ID </label>
		        <input className="form-inline" name="expa_id" type="number" id="expa_id" 
			            		onChange={this.handleExpaIdChange}/>
            <label for="expa_name"> EXPA Name </label>
            <input className="form-inline" name="expa_name" type="text" id="expa_name"
			            		onChange={this.handleExpaNameChange}/>
            <label for="slug"> URL Name </label>
            <input className="form-inline" name="slug" type="text" id="slug"
			            		onChange={this.handleSlugChange}/>
            <label for="name"> Full Name </label>
            <input className="form-inline" name="name" type="text" id="name"
			            		onChange={this.handleNameChange}/>
            <button className="btn btn-theme" type="button" onClick={this.handleSubmit}>Add</button>
	    		</form>
      	</div>
      );
  }
}

AddEntity.PropTypes = {
  addEntity: React.PropTypes.func.isRequired
}

export default AddEntity;
