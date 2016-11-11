import React from 'react';
import store from '../../../store';
import { connect } from 'react-redux';
import {getApiKeys, deleteApiKey, addApiKey} from '../../../api/ApiKeysApi';
import ApiKeysList from './ApiKeysList'
import AddApiKey from './AddApiKey'

class ApiKeysContainer extends React.Component {
    componentDidMount() {
   	    getApiKeys();
    }

    addNew(apiKey) {
    	addApiKey(apiKey);
    }

    render() {
        return (
        	<section id="main-content">
	          <section className="wrapper">
	        	<div className="row mt">
					<div className="col-lg-12">
						<div className="form-panel">
		  	  				<AddApiKey addNew={this.addNew} 
					          		expirationDate={this.props.expirationDate}
					          		ref="child"/>
						</div>
					</div>
				</div>
				<div className="row mt">
					<div className="col-lg-12">
	      				<div className="content-panel">
	      				<h4><i className="fa fa-angle-right"></i> API Keys</h4>
					  	<hr />
					      <table className="table table-striped table-advance table-hover">
					          <thead>
					          <tr>
				                <th><i className="fa fa-bookmark"></i> id</th>
					            <th><i className="fa fa-question-circle"></i> Name</th>
					            <th><i className="fa fa-bookmark"></i> Description</th>
				                <th><i className="fa fa-question-circle"></i> Expiration date</th>
				                <th><i className="fa fa-question-circle"></i> Key</th>
					            <th></th>
					          </tr>
					          </thead>
					          	<ApiKeysList apiKeys={this.props.apiKeys} 
					          		deleteApiKey={deleteApiKey} />
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
    apiKeys: store.apiKeysState.apiKeys,
    expirationDate: store.apiKeysState.expirationDate
  };
};

export default connect(mapStateToProps)(ApiKeysContainer);
