import React from 'react';

class ApiKeysList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ApiKeysList';
    }

    render() {
        return (
			<tbody>
		      {this.props.apiKeys.map(apiKey => {
		        return (
		          <tr key={apiKey.id}>
			          <td id="id">{apiKey.id}</td>
			          <td id="name">{apiKey.name} </td>
			          <td id="description"> {apiKey.description} </td>
			          <td id="expiration_date">{apiKey.expiration_date} </td>
			          <td className="text-wrap" id="key">{apiKey.key} </td>
			          <td>
			            <button onClick={this.props.deleteApiKey.bind(null, apiKey.id)}
			            	className="btn btn-danger btn-xs delete-key" 
			            	id={"delete-key-"+apiKey.id}>
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

export default ApiKeysList;