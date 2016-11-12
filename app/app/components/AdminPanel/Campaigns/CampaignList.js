import React from 'react';
import EditCampaign from './EditCampaign'
import moment from 'moment';

class CampaignList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CampaignList';
    }

    render() {
        return (
			<tbody>
		      {this.props.campaigns.map(campaign => {
		      	let trClass = "";
		      	if (campaign.expires_on < moment().format('YYYY-MM-DD 00:00:00')) {
		      		trClass = "danger";
		      	}
		        return (
		          <tr key={campaign.id} className={trClass}>
			          <td id="id">{campaign.id}</td>
			          <td id="name">{campaign.name} </td>
			          <td id="description">{campaign.description} </td>
			          <td id="slug">{campaign.slug} </td>
			          <td id="expirationDate">{campaign.expires_on} </td>
			          <td>
			          	<button 
			          		data-toggle="modal" data-target={"#editCampaignModal-"+campaign.id}
			          		className="btn btn-primary btn-xs edit-campaign" 
			          		id={"edit-campaign-"+campaign.id}>
			          		<i className="fa fa-pencil"></i>
			          	</button>
			            <button onClick={this.props.deleteCampaign.bind(null, campaign.id)}
			            	className="btn btn-danger btn-xs delete-campaign" 
			            	id={"delete-campaign-"+campaign.id}>
			            	<i className="fa fa-trash-o "></i>
			            </button>

			          <EditCampaign updateCampaign={this.props.updateCampaign}
	          			campaign={campaign} 
	          			expirationDate={this.props.expirationDate} />
			          </td>
				    </tr>
		        );
		      })}

			</tbody>
		  );
    }
}

export default CampaignList;