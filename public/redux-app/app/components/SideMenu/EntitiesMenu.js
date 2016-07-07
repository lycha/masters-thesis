import React from 'react';
import {Link} from 'react-router';

class EntitiesMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EntitiesMenu';
    }
    render() {
/*    	var entities = this.props.entities.sort(function(a, b) {
		    return a.name - b.name;
		});
    	entities = entities.map((entity, index)=>{
			return (
				<li className="sub-menu" key={index}>
		              
					<Link to={entity.slug}>
						<i className="fa fa-bar-chart-o"></i>
		                <span>{entity.name}</span>
					</Link>
		          </li>
			)
		});*/
        return (
        	<div>
        		{this.props.entities.map((entity, index)=>{
					return (
						<li className="sub-menu" key={index}>
				              
							<Link to={entity.slug}>
								<i className="fa fa-bar-chart-o"></i>
				                <span>{entity.name}</span>
							</Link>
				          </li>
					)
    			})}
        	</div>
        );
    }
}

/*return (
	<tbody>
      {this.props.entities.map(entity => {
        return (
          <tr key={entity.id}>
	          <td id="id">{entity.id}</td>
	          <td id="name">{entity.name} </td>
	          <td id="expa-id">{entity.expa_id}</td>
	          <td id="expa-name"> {entity.expa_name} </td>
	          <td id="slug">{entity.slug} </td>
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
  );*/

export default EntitiesMenu;
