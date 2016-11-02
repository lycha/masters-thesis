import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import store from '../../../store';
import moment from 'moment';
import { expirationDateSelected } from '../../../actions/ApiKeyActions';

class AddApiKey extends React.Component {
  
  getQuery(e) {
    e.preventDefault();
    let key = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      expiration_date: this.props.expirationDate.format('YYYY-MM-DD')
    };
    this.refs.name.value = "";
    this.refs.description.value = "";

    this.props.addNew(key);
  }
  
  handleChange(date) {  
    store.dispatch(expirationDateSelected(date));
  }

  render() {
      return (
      	<div>
      		<h4 className="mb"><i className="fa fa-angle-right"></i> Add Api Key</h4>
      		<form onSubmit={(e) => this.getQuery(e)} acceptCharset="UTF-8" className="form-inline" id="add-key">
            <label htmlFor="name"> Name </label>
            <input className="form-inline" name="name" type="text" id="name"
                      ref="name"/>
            <label htmlFor="name"> Description </label>
            <input className="form-inline" name="name" type="text" id="description"
                      ref="description"/>
            <label htmlFor="expiration_date"> Expiration Date </label>
            <DatePicker
              dateFormat='YYYY-MM-DD'
              selected={this.props.expirationDate}
              onChange={this.handleChange} />
            <button className="btn btn-theme" >Add</button>
	    		</form>
      	</div>
      );
  }
}

export default AddApiKey;
