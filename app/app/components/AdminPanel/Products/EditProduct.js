import React from 'react';
import bootstrap from 'bootstrap';

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EditProduct';
    }
    getQuery(e) {
	    e.preventDefault();
	    let product = {
	      id: this.refs.id.value,
	      name: this.refs.name.value,
	      description: this.refs.description.value,
	      slug: this.refs.slug.value
	    };
	    $("#editProductModal-"+product.id).modal('toggle');
	    this.props.updateproduct(product);
	  }
    render() {
        return (
			<div className="modal fade" 
				id={"editProductModal-"+this.props.product.id} 
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
			        <h4 className="modal-title" id="myModalLabel">Edit Product</h4>
			      </div>
			      <div className="modal-body">
			        <form onSubmit={(e) => this.getQuery(e)} 
			        		acceptCharset="UTF-8" 
			        		className="form-horizontal style-form" id="edit-product">
				        <div>
					        <label htmlFor="id"> ID </label>
					        <input className="form-inline" name="id" type="number" id="id" 
						            		ref="id" disabled defaultValue={this.props.product.id}/>
					    </div>
				        <div>
				            <label htmlFor="name"> Name </label>
				            <input className="form-inline" name="name" type="text" id="name"
							            		ref="name" defaultValue={this.props.product.name}/>
						</div>
				        <div>
				            <label htmlFor="description"> Description </label>
				            <input className="form-inline" name="description" type="text" id="description"
							            		ref="description" defaultValue={this.props.product.description}/>
						</div>
				        <div> 
				            <label htmlFor="slug"> URL Name </label>
				            <input className="form-inline" name="slug" type="text" id="slug"
							            		ref="slug" defaultValue={this.props.product.slug}/>
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

export default EditProduct;
