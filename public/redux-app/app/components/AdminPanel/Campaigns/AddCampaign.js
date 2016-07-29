import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import store from '../../../store';
import { expirationDateSelected } from '../../../actions/CampaignActions';

class AddCampaign extends React.Component {
  getQuery(e) {
    e.preventDefault();
    let campaign = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      slug: this.refs.slug.value,
      expires_on: this.props.expirationDate.format('YYYY-MM-DD 00:00:00')
    };

    this.refs.name.value = "";
    this.refs.description.value = "";
    this.refs.slug.value = "";

    this.props.addNew(campaign);
  }

  handleChange(date) {  
    store.dispatch(expirationDateSelected(date));
  }

  render() {
      return (
      	<div>
      		<h4 className="mb"><i className="fa fa-angle-right"></i> Add Campaign</h4>
      		<form onSubmit={(e) => this.getQuery(e)} accept-charset="UTF-8" className="form-inline" id="add-campaign">
            <label for="name"> Name </label>
            <input className="form-inline" name="name" type="text" id="name"
                      ref="name"/>
		        <label for="description"> Description </label>
		        <input className="form-inline" name="description" type="text" id="description" 
			            		ref="description"/>
            <label for="slug"> URL Name </label>
            <input className="form-inline" name="slug" type="text" id="slug"
                      ref="slug"/>
            <label for="expiration_date"> Expiration Date  </label>
            <DatePicker
              dateFormat='YYYY-MM-DD 00:00:00'
              selected={this.props.expirationDate}
              onChange={this.handleChange} />
            <button className="btn btn-theme" >Add</button>
	    		</form>
      	</div>
      );
  }
}

export default AddCampaign;
