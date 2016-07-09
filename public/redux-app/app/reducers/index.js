import { combineReducers } from 'redux';

// Reducers
import EntityReducer from './EntityReducer'
import AuthenticationReducer from './AuthenticationReducer'
import ProductReducer from './ProductReducer'
import UserReducer from './UserReducer'
// Combine Reducers
var reducers = combineReducers({
	entityState: EntityReducer,
	authenticationState: AuthenticationReducer,
	productState: ProductReducer,
	userState: UserReducer

});

export default reducers;
