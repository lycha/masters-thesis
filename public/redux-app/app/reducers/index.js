import { combineReducers } from 'redux';

// Reducers
import EntityReducer from './EntityReducer'
import AuthenticationReducer from './AuthenticationReducer'
import ProductReducer from './ProductReducer'
// Combine Reducers
var reducers = combineReducers({
	entityState: EntityReducer,
	authenticationState: AuthenticationReducer,
	productState: ProductReducer

});

export default reducers;
