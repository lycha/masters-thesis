import React from 'react';
import store from '../../../store';
import { connect } from 'react-redux';
import {getUsers, deleteUser, addUser} from '../../../api/UserApi';
import UsersList from './UsersList'
import AddUser from './AddUser'

class UsersContainer extends React.Component {
    componentDidMount() {
   	    getUsers();
    }

    addNew(user) {
    	addUser(user);
    }

    render() {
        return (
        	<section id="main-content">
	          <section className="wrapper">
	        	<div className="row mt">
					<div className="col-lg-12">
						<div className="form-panel">
		  	  				<AddUser addNew={this.addNew} ref="child"/>
						</div>
					</div>
				</div>
				<div className="row mt">
					<div className="col-lg-12">
	      				<div className="content-panel">
	      				<h4><i className="fa fa-angle-right"></i> Users</h4>
					  	<hr />
					      <table className="table table-striped table-advance table-hover">
					          <thead>
					          <tr>
				                <th><i className="fa fa-bookmark"></i> id</th>
					              <th><i className="fa fa-question-circle"></i> Name</th>
					              <th><i className="fa fa-bookmark"></i> Email</th>
					              <th></th>
					          </tr>
					          </thead>
					          	<UsersList users={this.props.users} 
					          		deleteUser={deleteUser} />
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
    users: store.userState.users
  };
};

export default connect(mapStateToProps)(UsersContainer);
