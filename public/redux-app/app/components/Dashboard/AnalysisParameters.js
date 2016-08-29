import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CampaignsSelector from './CampaignsSelector';
import store from '../../store';
import { setStartDate, setEndDate, setCampaign } from '../../actions/AnalysisActions';


class AnalysisParameters extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AnalysisParameters';
    }
    setCampaign(campaign) {
    	store.dispatch(setCampaign(campaign));
    }
    handleStartDate(date) {  
    	store.dispatch(setStartDate(date));
	}
    handleEndDate(date) { 
		store.dispatch(setEndDate(date));
	}
	getQuery(e){
		e.preventDefault();
		this.props.showAnalysis();
	}
    render() {
        return (
	      	<div>
	      		<h4 className="mb"><i className="fa fa-angle-right"></i> Select parameters of analysis</h4>
	      		<form onSubmit={(e) => this.getQuery(e)} accept-charset="UTF-8" className="form-inline" id="add-campaign">
	            <label for="name"> Campaign </label>
	            <CampaignsSelector campaigns={this.props.campaigns} setCampaign={this.setCampaign} />
    			<label> Start date </label>
    			<DatePicker
    				dateFormat='YYYY-MM-DD 00:00:00'
				    selected={this.props.startDate}
				    startDate={this.props.startDate}
				    endDate={this.props.endDate}
				    onChange={(e) => this.handleStartDate(e)} />
				<label> End date </label>
				<DatePicker
					dateFormat='YYYY-MM-DD 00:00:00'
				    selected={this.props.endDate}
				    startDate={this.props.startDate}
				    endDate={this.props.endDate}
				    maxDate={moment()}
				    onChange={(e) => this.handleEndDate(e)} />
	            <button className="btn btn-theme">Show</button>
		    		</form>
	      	</div>
        );
    }
}

export default AnalysisParameters;
