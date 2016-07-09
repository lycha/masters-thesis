import React from 'react';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EditUser';
    }
    getQuery(e) {
	    e.preventDefault();
	    let user = {
	      id: this.refs.id.value,
	      name: this.refs.name.value,
	      email: this.refs.email.value,
	      password: this.refs.password.value
	    };
	    $("#editUserModal-"+user.id).modal('toggle');
	    this.props.updateUser(user);
	  }
    render() {
        return (
			<div className="modal fade" 
				id={"EditUserModal-"+this.props.user.id} 
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
			        <h4 className="modal-title" id="myModalLabel">Edit User</h4>
			      </div>
			      <div className="modal-body">
			        <form onSubmit={(e) => this.getQuery(e)} 
			        		accept-charset="UTF-8" 
			        		className="form-horizontal style-form" id="edit-user">
				        <div>
					        <label for="id"> ID </label>
					        <input className="form-inline" name="id" type="number" id="id" 
						            		ref="id" disabled defaultValue={this.props.user.id}/>
					    </div>
				        <div>
				            <label for="name"> Name </label>
				            <input className="form-inline" name="name" type="text" id="name"
							            		ref="name" defaultValue={this.props.user.name}/>
						</div>
				        <div> 
				            <label for="email"> Email </label>
				            <input className="form-inline" name="email" type="text" id="email"
							            		ref="email" defaultValue={this.props.user.email}/>
				        </div>
				        <div> 
				            <label for="password"> Password </label>
				            <input className="form-inline" name="password" type="text" id="password"
							            		ref="password" defaultValue={this.props.user.password}/>
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

export default EditUser;
