import React from 'react';
import bootstrap from 'bootstrap';
import {updateEntity} from '../../utils/ServerRequests';

class Entity extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Entity';
      	this.deleteEntity = this.deleteEntity.bind(this);
      	this.updateEntity = this.updateEntity.bind(this);
      	this.handleExpaIdChange = this.handleExpaIdChange.bind(this);
      	this.handleExpaNameChange = this.handleExpaNameChange.bind(this);
      	this.handleSlugChange = this.handleSlugChange.bind(this);
      	this.handleNameChange = this.handleNameChange.bind(this);
      	this.state = {
        	expa_id: '', 
        	expa_name: '',
        	name: '',
        	slug: ''
        }
    }
    componentDidMount() {
    	this.setState({
    		expa_id: this.props.entity.expa_id,
			expa_name: this.props.entity.expa_name,
			name: this.props.entity.name,
			slug: this.props.entity.slug
    	});
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
	deleteEntity(e) {
		this.props.deleteEntity(this.props.entity.id);
	}
	updateEntity(e) {
		updateEntity(this.props.entity.id, this.state.name, this.state.slug, this.state.expa_id, this.state.expa_name);
	}
    render() {
        return (
        	<tr key={this.props.index}>
	          <td id="id">{this.props.entity.id}</td>
	          <td id="expa-id"><input defaultValue={this.props.entity.expa_id} onChange={this.handleExpaIdChange}/></td>
	          <td id="expa-name"><input defaultValue={this.props.entity.expa_name} onChange={this.handleExpaNameChange}/></td>
	          <td id="url-name"><input defaultValue={this.props.entity.slug} onChange={this.handleSlugChange}/></td>
	          <td id="full-name"><input defaultValue={this.props.entity.name} onChange={this.handleNameChange}/></td>
	          <td>
	          	<button onClick={this.updateEntity} className="btn btn-primary btn-xs edit-entity" id={"edit-entity-"+this.props.entity.id}><i className="fa fa-pencil"></i></button>
	            <button onClick={this.deleteEntity} className="btn btn-danger btn-xs delete-entity" id={"delete-entity-"+this.props.entity.id}><i className="fa fa-trash-o "></i></button>
	          </td>
		    </tr>
        );
    }
}

Entity.PropTypes = {
  entity: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  deleteEntity: React.PropTypes.func.isRequired
}

export default Entity;
