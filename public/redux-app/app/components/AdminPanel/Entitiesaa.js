import React from 'react';
import AddEntity from './AddEntity'
import Entity from './Entity'
import _ from 'underscore';
import {getEntities} from '../../utils/ServerRequests';
import {deleteEntity} from '../../utils/ServerRequests';

class Entitiesaa extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Entities';
        this.state = {
        	entities: [], 
        	updateEntityId: -1,
        	expa_id: '', 
        	expa_name: '',
        	name: '',
        	slug: '',
        	myEntity: {}
        }
      	this.addEntity = this.addEntity.bind(this);
      	this.deleteEntity = this.deleteEntity.bind(this);
    }
    componentWillMount(){
		if (!localStorage.getItem('trackingToolAuthToken')) {
			this.props.history.pushState(null, 'auth/login');
		}
		getEntities()
			.then(function(response){
				window.hideLoadingSpinner();
				if (response) {
					this.setState({
				      entities: response.data
				    })
				}
			}.bind(this))

	}
	addEntity(entity) {
		this.setState({entities: this.state.entities.concat([entity])});
	}
	deleteEntity(id) {
		deleteEntity(id)
			.then(function(response){
				debugger
				window.hideLoadingSpinner();
				var newData = this.state.entities.slice(); //copy array
				newData = _.reject(newData, function(el) { return el.id === id; });
				this.setState({entities: newData});
				this.forceUpdate();
			}.bind(this));
	}

    render() {
    	var entities = this.state.entities.sort(function(a, b) {
		    return a.id - b.id;
		});
    	entities = entities.map((entity, index)=>{
				debugger
			return (
				<Entity entity={entity} key={index} deleteEntity={this.deleteEntity} showModal={this.showModal}/>
			)
		})

        return (
        	<section id="main-content">
          <section className="wrapper">
        	<div className="row mt">
						<div className="col-lg-12">
							<div className="form-panel">
			  	  				<AddEntity addEntity={this.addEntity}/>
							</div>
						</div>
					</div>
					<div className="row mt">
						<div className="col-lg-12">
		      				<div className="content-panel">
		      				<h4><i className="fa fa-angle-right"></i> Entities</h4>
						  	  	  <hr />
						      <table className="table table-striped table-advance table-hover">
						  	  	  
						          <thead>
						          <tr>
					                <th><i className="fa fa-bookmark"></i> id</th>
						              <th><i className="fa fa-bookmark"></i> EXPA id</th>
					                <th><i className="fa fa-question-circle"></i> EXPA Name</th>
					                <th><i className="fa fa-question-circle"></i> URL Name</th>
						              <th><i className="fa fa-question-circle"></i> Full Name</th>
						              <th></th>
						          </tr>
						          </thead>

						          <tbody>
						              {entities}
						          </tbody>
						      </table>
							</div>
		    			</div>  
					</div>
          </section>
          </section>
        );
    }
}

export default Entities;
