import React from 'react';
import EditUniversity from './EditUniversity'

class UniversityList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UniversityList';
    }

    render() {
        return (
			<tbody>
		     {this.props.universities.map(university => {
		        return (
		          <tr key={university.id}>
			          <td id="id">{university.id}</td>
			          <td id="name">{university.name} </td>
			          <td id="entity"> {university.entity.name} </td>
			          <td>
			          	<button 
			          		data-toggle="modal" data-target={"#editUniversityModal-"+university.id}
			          		className="btn btn-primary btn-xs edit-entity" 
			          		id={"edit-university-"+university.id}>
			          		<i className="fa fa-pencil"></i>
			          	</button>
			            <button onClick={this.props.deleteUniversity.bind(null, university.id)}
			            	className="btn btn-danger btn-xs delete-university" 
			            	id={"delete-university-"+university.id}>
			            	<i className="fa fa-trash-o "></i>
			            </button>

			          <EditUniversity updateUniversity={this.props.updateUniversity}
	          			university={university}
	          			entities={this.props.entities} />
			          </td>
				    </tr>
		        );
		      })}

			</tbody>
		  );
    }
}

export default UniversityList;