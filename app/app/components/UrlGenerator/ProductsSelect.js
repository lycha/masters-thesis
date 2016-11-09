import React from 'react';

class ProductsSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange(e) {
        this.props.setProduct(e.target.value);
    }
    render() {
        return (
        	<select required ref="product" className="form-control" id="program" name="program" onChange={(e) => this.handleChange(e)}>
        		<option value="">- choose program -</option>
        		{this.props.products.map((product, index)=>{
	              return (
						<option value={product.slug} key={index}>{product.name}</option>
	              )
	            })} 
        	</select>
        	);
    }
}

export default ProductsSelect;
