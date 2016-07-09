import React from 'react';
import EditProduct from './EditProduct'

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProductsList';
    }

    render() {
        return (
			<tbody>
		      {this.props.products.map(product => {
		        return (
		          <tr key={product.id}>
			          <td id="id">{product.id}</td>
			          <td id="name">{product.name} </td>
			          <td id="description"> {product.description} </td>
			          <td id="slug">{product.slug} </td>
			          <td>
			          	<button 
			          		data-toggle="modal" data-target={"#editProductModal-"+product.id}
			          		className="btn btn-primary btn-xs edit-product" 
			          		id={"edit-product-"+product.id}>
			          		<i className="fa fa-pencil"></i>
			          	</button>
			            <button onClick={this.props.deleteProduct.bind(null, product.id)}
			            	className="btn btn-danger btn-xs delete-product" 
			            	id={"delete-product-"+product.id}>
			            	<i className="fa fa-trash-o "></i>
			            </button>

			          <EditProduct updateProduct={this.props.updateProduct}
	          			product={product} />
			          </td>
				    </tr>

	          		
		        );
		      })}

			</tbody>
		  );
    }
}

export default ProductsList;