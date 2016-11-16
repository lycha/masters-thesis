import React from 'react';
import store from '../../../store';
import { connect } from 'react-redux';
import {getProducts, deleteProduct, updateProduct, addProduct} from '../../../api/ProductsApi';
import ProductList from './ProductsList'
import AddProduct from './AddProduct'

class ProductsContainer extends React.Component {
    componentDidMount() {
   	    getProducts();
    }

    addNew(product) {
    	addProduct(product);
    }

   
    render() {
        return (
        	<section id="main-content">
	          <section className="wrapper">
	        	<div className="row mt">
					<div className="col-lg-12">
						<div className="form-panel">
		  	  				<AddProduct addNew={this.addNew} ref="child"/>
						</div>
					</div>
				</div>
				<div className="row mt">
					<div className="col-lg-12">
	      				<div className="content-panel">
	      				<h4><i className="fa fa-angle-right"></i> Products</h4>
					  	<hr />
					      <table className="table table-striped table-advance table-hover">
					          <thead>
					          <tr>
				                <th><i className="fa fa-bookmark"></i> id</th>
					            <th><i className="fa fa-question-circle"></i> Name</th>
					            <th><i className="fa fa-bookmark"></i> Description</th>
				                <th><i className="fa fa-question-circle"></i> URL Name</th>
					            <th></th>
					          </tr>
					          </thead>
					          	<ProductList products={this.props.products} 
					          		deleteProduct={deleteProduct} 
					          		updateProduct={updateProduct} />
					      </table>
						</div>
	    			</div>  
				</div>
	          </section>
          	</section>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    products: store.productState.products
  };
};

export default connect(mapStateToProps)(ProductsContainer);
