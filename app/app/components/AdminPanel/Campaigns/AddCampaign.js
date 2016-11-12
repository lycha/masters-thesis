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
      		<form onSubmit={(e) => this.getQuery(e)} acceptCharset="UTF-8" className="form-inline" id="add-campaign">
            <label htmlFor="name"> Name </label>
            <input className="form-inline" name="name" type="text" id="name"
                      ref="name"/>
		        <label htmlFor="description"> Description </label>
		        <input className="form-inline" name="description" type="text" id="description" 
			            		ref="description"/>
            <label htmlFor="slug"> URL Name </label>
            <input className="form-inline" name="slug" type="text" id="slug"
                      pattern="[a-z0-9\\-]+"
                      title="Accepted only small letters, numbers and -"
                      ref="slug"/>
            <label htmlFor="expiration_date"> Expiration Date  </label>
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
