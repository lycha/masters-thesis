import React from 'react';
import store from '../../../store';
import { connect } from 'react-redux';
import {getUniversities, deleteUniversity, updateUniversity, addUniversity} from '../../../api/UniversitiesApi';
import UniversityList from './UniversityList'
import AddUniversity from './AddUniversity'

class UniversitiesContainer extends React.Component {
    componentDidMount() {
   	    getUniversities();
    }

    addNew(university) {
    	addUniversity(university);
    }

    render() {
        return (
        	<section id="main-content">
	          <section className="wrapper">
	        	<div className="row mt">
					<div className="col-lg-12">
						<div className="form-panel">
		  	  				<AddUniversity addNew={this.addNew} entities={this.props.entities} ref="child"/>
						</div>
					</div>
				</div>
				<div className="row mt">
					<div className="col-lg-12">
	      				<div className="content-panel">
	      				<h4><i className="fa fa-angle-right"></i> Universities</h4>
					  	<hr />
					      <table className="table table-striped table-advance table-hover">
					          <thead>
					          <tr>
				                <th><i className="fa fa-bookmark"></i> id</th>
					              <th><i className="fa fa-question-circle"></i> Name</th>
				                <th><i className="fa fa-question-circle"></i> Entity</th>
					              <th></th>
					          </tr>
					          </thead>
					          	<UniversityList universities={this.props.universities} 
					          		deleteUniversity={deleteUniversity} 
					          		updateUniversity={updateUniversity} 
					          		entities={this.props.entities} />
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
    universities: store.universityState.universities,
    entities: store.entityState.entities
  };
};

export default connect(mapStateToProps)(UniversitiesContainer);
