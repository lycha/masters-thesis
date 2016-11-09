import React from 'react';

class CampaignsSelect extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CampaignsSelect';
    }
    handleChange(e) {
        this.props.setCampaign(e.target.value);
    }
    render() {
        return (
        	<select required ref="utm_campaign" className="form-control" id="campaign" name="campaign" onChange={(e) => this.handleChange(e)}>
        		<option value="">- choose campaign -</option>
        		{this.props.campaigns.map((campaign, index)=>{
	              return (
						<option value={campaign.slug} key={index}>{campaign.name}</option>
	              )
	            })} 
        	</select>
        	);
    }
}

export default CampaignsSelect;
