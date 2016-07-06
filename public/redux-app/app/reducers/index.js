import { combineReducers } from 'redux';

// Reducers
import EntityReducer from './EntityReducer'
import AuthenticationReducer from './AuthenticationReducer'
// Combine Reducers
var reducers = combineReducers({
	entityState: EntityReducer,
	authenticationState: AuthenticationReducer

});

export default reducers;
