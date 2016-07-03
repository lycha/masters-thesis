import { combineReducers } from 'redux';

// Reducers
import EntityReducer from './EntityReducer'
// Combine Reducers
var reducers = combineReducers({
	entityState: EntityReducer
});

export default reducers;
