import React from 'react';
import bootstrap from 'bootstrap';
class Users extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Users';
    }
    render() {
        return (
        <section id="main-content">
          <section className="wrapper">
        	<div className="row mt">
				<div className="col-lg-12">
					<div className="form-panel">
	  	  				<h4 className="mb"><i className="fa fa-angle-right"></i> Add Local Committee</h4>
	      				<p>add entity field</p>
					</div>
				</div>
			</div>
			<div className="row mt">
				<div className="col-lg-12">
      				<div className="content-panel">
      				<h4><i className="fa fa-angle-right"></i> Local Committees</h4>
				  	  	  <hr />
				      <table className="table table-striped table-advance table-hover">
				  	  	  
				          <thead>
				          <tr>
			                <th><i className="fa fa-bookmark"></i> id</th>
				              <th><i className="fa fa-bookmark"></i> EXPA id</th>
			                <th><i className="fa fa-question-circle"></i> EXPA Name</th>
			                <th><i className="fa fa-question-circle"></i> URL Name</th>
				              <th><i className="fa fa-question-circle"></i> Full Name</th>
				              <th></th>
				          </tr>
				          </thead>

				          <tbody id="lc-{{ $lc['id'] }}">
				              <tr>
			                    <td id="{{ $lc['id'] }}">id</td>
			                    <td id="expa-id-{{ $lc['id'] }}">expa_id</td>
			                    <td id="expa-name-{{ $lc['id'] }}">expa_name</td>
			                    <td id="url-name-{{ $lc['id'] }}">url_name</td>
				                  <td id="full-name-{{ $lc['id'] }}">full_name</td>
				                  <td>
				                      <button data-toggle="modal" data-target="#edit-Modal" className="btn btn-primary btn-xs edit-lc" id="edit-lc-{{ $lc['id'] }}"><i className="fa fa-pencil"></i></button>
				                      <button className="btn btn-danger btn-xs delete-lc" id="delete-lc-{{ $lc['id'] }}"><i className="fa fa-trash-o "></i></button>
				                  </td>
				              </tr>
				          </tbody>
				      </table>
					</div>
    			</div>  
			</div>

			<div className="modal fade" id="edit-Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			        <h4 className="modal-title" id="myModalLabel">Edit Local Committee</h4>
			      </div>
			      <div className="modal-body">
			        <p>edit form</p>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
			      </div>
			    </div>
			  </div>
			</div>     
		
          </section>
          </section>
        );
    }
}

export default Users;
