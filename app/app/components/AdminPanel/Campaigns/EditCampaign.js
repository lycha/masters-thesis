import React from 'react';
import bootstrap from 'bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import store from '../../../store';
import { expirationDateSelected } from '../../../actions/CampaignActions';

class EditCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EditCampaign';
    }
    getQuery(e) {
	    e.preventDefault();
	    let campaign = {
	      id: this.refs.id.value,
	      name: this.refs.name.value,
	      description: this.refs.description.value,
	      slug: this.refs.slug.value,
	      expires_on: this.props.expirationDate.format('YYYY-MM-DD 00:00:00')
	    };
	    $("#editCampaignModal-"+campaign.id).modal('toggle');
	    this.props.updateCampaign(campaign);
	  }
	handleChange(date) {  
	    store.dispatch(expirationDateSelected(date));
	}
    render() {
        return (
			<div className="modal fade" 
				id={"editCampaignModal-"+this.props.campaign.id} 
				tabindex="-1" 
				role="dialog" 
				aria-labelledby="myModalLabel" 
				aria-hidden="false">
			  <div className="modal-dialog">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" 
			        	className="close" 
			        	data-dismiss="modal" 
			        	aria-hidden="true">&times;</button>
			        <h4 className="modal-title" id="myModalLabel">Edit Local Committee</h4>
			      </div>
			      <div className="modal-body">
			        <form onSubmit={(e) => this.getQuery(e)} 
			        		acceptCharset="UTF-8" 
			        		className="form-horizontal style-form" id="edit-campaign">
			        	<div>
					        <label htmlFor="id"> ID </label>
					        <input className="form-inline" name="id" type="number" id="id" 
						            		ref="id" disabled defaultValue={this.props.campaign.id}/>
					    </div>
				        <div>
					        <label htmlFor="name"> Name </label>
            				<input className="form-inline" name="name" type="text" id="name"
                     			ref="name" defaultValue={this.props.campaign.name}/>
					    </div>
				        <div>
					        <label htmlFor="description"> Description </label>
					        <input className="form-inline" name="description" type="text" id="description" 
						            		ref="description" defaultValue={this.props.campaign.description}/>
					    </div>
					    <div>
				            <label htmlFor="slug"> URL Name </label>
				            <input className="form-inline" name="slug" type="text" id="slug"
				                      ref="slug" defaultValue={this.props.campaign.slug}/>
				        </div>
				        <div>
				            <label htmlFor="name"> Expiration Date </label>
				            <DatePicker
				              dateFormat='YYYY-MM-DD 00:00:00'
				              selected={this.props.expirationDate}
				              onChange={this.handleChange} />
						</div>
			            <button className="btn btn-theme">Update</button>
			    	</form>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
			      </div>
			    </div>
			  </div>
			</div>  
        );
    }
}

export default EditCampaign;
