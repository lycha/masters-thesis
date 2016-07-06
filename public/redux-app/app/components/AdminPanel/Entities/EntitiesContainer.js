import React from 'react';
import store from '../../../store';
import { connect } from 'react-redux';
import {getEntities, deleteEntity, updateEntity, addEntity} from '../../../api/EntitiesApi';
import EntityList from './EntityList'
import AddEntity from './AddEntity'

class EntitiesContainer extends React.Component {
    componentDidMount() {
   	    getEntities();
    }

    addNew(entity) {
    	addEntity(entity);
    }

    render() {
        return (
        	<section id="main-content">
	          <section className="wrapper">
	        	<div className="row mt">
					<div className="col-lg-12">
						<div className="form-panel">
		  	  				<AddEntity addNew={this.addNew} ref="child"/>
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
					              <th><i className="fa fa-question-circle"></i> Full Name</th>
					              <th><i className="fa fa-bookmark"></i> EXPA id</th>
				                <th><i className="fa fa-question-circle"></i> EXPA Name</th>
				                <th><i className="fa fa-question-circle"></i> URL Name</th>
					              <th></th>
					          </tr>
					          </thead>
					          	<EntityList entities={this.props.entities} 
					          		deleteEntity={deleteEntity} 
					          		updateEntity={updateEntity} />
					      </table>
						</div>
	    			</div>  
				</div>
	          </section>
          	</section>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    entities: store.entityState.entities
  };
};

export default connect(mapStateToProps)(EntitiesContainer);
