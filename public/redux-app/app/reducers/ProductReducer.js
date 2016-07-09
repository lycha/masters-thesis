import * as types from '../actions/ActionTypes';
import _ from 'lodash';

const initialState = {
  products: [] 
};

const ProductReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_PRODUCTS_SUCCESS:
      var products = _.sortBy(action.products, 'name');
      return Object.assign({}, state, { products: products });

    case types.DELETE_PRODUCT_SUCCESS:
      var newData = _.filter(state.products, product => product.id != action.productId);
      var products = _.sortBy(newData, 'name');
      return Object.assign({}, state, { products: products });

    case types.ADD_PRODUCT_SUCCESS:
      var newProduct = state.products.concat([action.product]);
      var products = _.sortBy(newProduct, 'name');
      return Object.assign({}, state, { products: products });

    case types.UPDATE_PRODUCT_SUCCESS:
      var newData = _.filter(state.products, product => product.id != action.product.id);
      var newEntities = newData.concat([action.product]);
      var products = _.sortBy(newEntities, 'name');
      return Object.assign({}, state, { products: products });
  }

  return state;
}

export default ProductReducer;
