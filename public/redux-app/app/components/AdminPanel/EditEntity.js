import React from 'react';

class EditEntity extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EditEntity';
    }
    getQuery(e) {
	    e.preventDefault();
	    let entity = {
	      id: this.refs.id.value,
	      expa_id: this.refs.expa_id.value,
	      expa_name: this.refs.expa_name.value,
	      name: this.refs.name.value,
	      slug: this.refs.slug.value
	    };
	    $("#editEntityModal-"+entity.id).modal('toggle');
	    this.props.updateEntity(entity);
	  }
    render() {
        return (
			<div className="modal fade" 
				id={"editEntityModal-"+this.props.entity.id} 
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
			        <h4 className="modal-title" id="myModalLabel">Edit Local Committee</h4>
			      </div>
			      <div className="modal-body">
			        <form onSubmit={(e) => this.getQuery(e)} 
			        		accept-charset="UTF-8" 
			        		className="form-horizontal style-form" id="edit-entity">
				        <div>
					        <label for="id"> ID </label>
					        <input className="form-inline" name="id" type="number" id="id" 
						            		ref="id" disabled defaultValue={this.props.entity.id}/>
					    </div>
				        <div>
					        <label for="expa_id"> EXPA ID </label>
					        <input className="form-inline" name="expa_id" type="number" id="expa_id" 
						            		ref="expa_id" defaultValue={this.props.entity.expa_id}/>
					    </div>
					    <div>
				            <label for="expa_name"> EXPA Name </label>
				            <input className="form-inline" name="expa_name" type="text" id="expa_name"
							            		ref="expa_name" defaultValue={this.props.entity.expa_name}/>
				        </div>
				        <div> 
				            <label for="slug"> URL Name </label>
				            <input className="form-inline" name="slug" type="text" id="slug"
							            		ref="slug" defaultValue={this.props.entity.slug}/>
				        </div>
				        <div>
				            <label for="name"> Full Name </label>
				            <input className="form-inline" name="name" type="text" id="name"
							            		ref="name" defaultValue={this.props.entity.name}/>
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

export default EditEntity;
