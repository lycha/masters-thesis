import React from 'react';
import bootstrap from 'bootstrap';
import EntitySelector from './EntitySelector';

class EditUniversity extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EditUniversity';
    }
    getQuery(e) {
	    e.preventDefault();
	    let university = {
	      id: this.refs.id.value,
	      name: this.refs.name.value,
	      slug: this.refs.slug.value,
	      entity_slug: this.refs.entity_slug.value,
	    };
	    $("#editUniversityModal-"+university.id).modal('toggle');
	    this.props.updateUniversity(university);
	}
	setEntity(entity) {
	    this.refs.entity_slug.value = entity.slug;
	}
    render() {
        return (
			<div className="modal fade" 
				id={"editUniversityModal-"+this.props.university.id} 
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
			        <h4 className="modal-title" id="myModalLabel">Edit University</h4>
			      </div>
			      <div className="modal-body">
			        <form onSubmit={(e) => this.getQuery(e)} 
			        		acceptCharset="UTF-8" 
			        		className="form-horizontal style-form" id="edit-university">
				        <div>
					        <label htmlFor="id"> ID </label>
					        <input className="form-inline" name="id" type="number" id="id" 
						            		ref="id" disabled defaultValue={this.props.university.id}/>
					    </div>
					    <div>
				            <label htmlFor="name"> Name </label>
				            <input className="form-inline" name="name" type="text" id="name"
							            		ref="name" defaultValue={this.props.university.name}/>
				        </div>
				        <div> 
				            <label htmlFor="slug"> URL Name </label>
				            <input className="form-inline" name="slug" type="text" id="slug"
                      pattern="[a-z0-9\\-]+"
                      title="Accepted only small letters, numbers and -"
							            		ref="slug" defaultValue={this.props.university.slug}/>
				        </div>
				        <div>
				            <label htmlFor="entity_slug"> Entity </label>
				            <EntitySelector entities={this.props.entities} setEntity={(entity) => this.setEntity(entity)} />
				            <input className="form-inline" name="entity_slug" type="hidden" id="entity_slug"
							            		ref="entity_slug" defaultValue={this.props.university.entity_slug}/>
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

export default EditUniversity;
