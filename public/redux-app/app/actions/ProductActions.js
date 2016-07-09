import * as types from '../actions/ActionTypes';

export function getProductsSuccess(products) {
  return {
    type: types.GET_PRODUCTS_SUCCESS,
    products
  };
}

export function deleteProductSuccess(productId) {
  return {
    type: types.DELETE_PRODUCT_SUCCESS,
    productId
  };
}

export function updateProductSuccess(product) {
  return {
    type: types.UPDATE_PRODUCT_SUCCESS,
    product
  };
}

export function addProductSuccess(product) {
  return {
    type: types.ADD_PRODUCT_SUCCESS,
    product
  };
}

