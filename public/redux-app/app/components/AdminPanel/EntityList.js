import React from 'react';
import EditEntity from './EditEntity'

class EntityList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EntityList';
    }

    render() {
        return (
			<tbody>
		      {this.props.entities.map(entity => {
		        return (
		          <tr key={entity.id}>
			          <td id="id">{entity.id}</td>
			          <td id="expa-id">{entity.expa_id}</td>
			          <td id="expa-name"> {entity.expa_name} </td>
			          <td id="slug">{entity.slug} </td>
			          <td id="name">{entity.name} </td>
			          <td>
			          	<button 
			          		data-toggle="modal" data-target={"#editEntityModal-"+entity.id}
			          		className="btn btn-primary btn-xs edit-entity" 
			          		id={"edit-entity-"+entity.id}>
			          		<i className="fa fa-pencil"></i>
			          	</button>
			            <button onClick={this.props.deleteEntity.bind(null, entity.id)}
			            	className="btn btn-danger btn-xs delete-entity" 
			            	id={"delete-entity-"+entity.id}>
			            	<i className="fa fa-trash-o "></i>
			            </button>

			          <EditEntity updateEntity={this.props.updateEntity}
	          			entity={entity} />
			          </td>
				    </tr>

	          		
		        );
		      })}

			</tbody>
		  );
    }
}

export default EntityList;