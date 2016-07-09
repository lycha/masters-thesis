import React from 'react';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UsersList';
    }

    render() {
        return (
			<tbody>
		      {this.props.users.map(user => {
		        return (
		          <tr key={user.id}>
			          <td id="id">{user.id}</td>
			          <td id="name">{user.name} </td>
			          <td id="email"> {user.email} </td>
			          <td>
			            <button onClick={this.props.deleteuser.bind(null, user.id)}
			            	className="btn btn-danger btn-xs delete-user" 
			            	id={"delete-user-"+user.id}>
			            	<i className="fa fa-trash-o "></i>
			            </button>
			          </td>
				    </tr>
		        );
		      })}

			</tbody>
		  );
    }
}

export default UsersList;