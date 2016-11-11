import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import store from '../../../store';
import moment from 'moment';
import { expirationDateSelected } from '../../../actions/ApiKeyActions';

class AddApiKey extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isChecked: false};
  }

  
  getQuery(e) {
    e.preventDefault();
    let key = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      read_permissions: this.state.isChecked,
      expiration_date: this.props.expirationDate.format('YYYY-MM-DD'),
    };
    this.refs.name.value = "";
    this.refs.description.value = "";
    this.props.addNew(key);
  }

  onChange(e) {
    this.setState({isChecked: !this.state.isChecked});
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
            <label htmlFor="read_permissions"> Add read permissions? </label>
            <input type="checkbox" 
              name="read_permissions" 
              ref="read_permissions" 
              checked={this.state.isChecked}
              onChange={(e) => this.onChange(e)}
              value="read_permissions" />
            <button className="btn btn-theme" >Add</button>
	    		</form>
      	</div>
      );
  }
}

export default AddApiKey;
