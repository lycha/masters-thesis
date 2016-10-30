import React from 'react';
import store from '../../../store';
import { connect } from 'react-redux';
import {getCampaigns, deleteCampaign, updateCampaign, addCampaign} from '../../../api/CampaignsApi';
import CampaignList from './CampaignList'
import AddCampaign from './AddCampaign'

class CampaignsContainer extends React.Component {
    componentDidMount() {
   	    getCampaigns();
    }

    addNew(campaign) {
    	addCampaign(campaign);
    }

    render() {
        return (
        	<section id="main-content">
	          <section className="wrapper">
	        	<div className="row mt">
					<div className="col-lg-12">
						<div className="form-panel">
		  	  				<AddCampaign addNew={this.addNew} expirationDate={this.props.expirationDate} ref="child"/>
						</div>
					</div>
				</div>
				<div className="row mt">
					<div className="col-lg-12">
	      				<div className="content-panel">
	      				<h4><i className="fa fa-angle-right"></i> Campaigns</h4>
					  	<hr />
					      <table className="table table-striped table-advance table-hover">
					          <thead>
					          <tr>
				                <th><i className="fa fa-bookmark"></i> id</th>
					              	<th><i className="fa fa-question-circle"></i> Name</th>
					              	<th><i className="fa fa-bookmark"></i> Description</th>
				                  	<th><i className="fa fa-question-circle"></i> URL Name</th>
				                  	<th><i className="fa fa-question-circle"></i> Expiration Date</th>
					              <th></th>
					          </tr>
					          </thead>
					          	<CampaignList campaigns={this.props.campaigns} 
					          		deleteCampaign={deleteCampaign} 
					          		updateCampaign={updateCampaign} 
					          		expirationDate={this.props.expirationDate} />
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
    campaigns: store.campaignState.campaigns,
    expirationDate: store.campaignState.expirationDate
  };
};

export default connect(mapStateToProps)(CampaignsContainer);
