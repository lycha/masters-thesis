import React from 'react';

class CampaignsSelector extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CampaignsSelector';
    }
    handleChange(e) {
    	let id = e.target.value;
    	let campaign = this.props.campaigns.filter(function( campaign ) {
		  return campaign.id == id;
		});
		this.props.setCampaign(campaign[0]);
    }

    render() {
        return (
        	<select 
		        onChange={(e) => this.handleChange(e)} >
				<option value="0">-Select campaign-</option>
		        {this.props.campaigns.map(campaign => {
		        	return (
				    	<option value={campaign.id} key={campaign.id}>{campaign.name}</option>
		        	);
		      	})}
		    </select>
        );
    }
}

export default CampaignsSelector;
