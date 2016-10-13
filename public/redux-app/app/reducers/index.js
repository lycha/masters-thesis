import { combineReducers } from 'redux';

// Reducers
import EntityReducer from './EntityReducer'
import AuthenticationReducer from './AuthenticationReducer'
import ProductReducer from './ProductReducer'
import UserReducer from './UserReducer'
import CampaignReducer from './CampaignReducer'
import AnalysisReducer from './AnalysisReducer'
import ApiKeyReducer from './ApiKeyReducer'
import UniversityReducer from './UniversityReducer'

// Combine Reducers
var reducers = combineReducers({
	entityState: EntityReducer,
	authenticationState: AuthenticationReducer,
	productState: ProductReducer,
	userState: UserReducer,
	campaignState: CampaignReducer,
	analysisState: AnalysisReducer,
	universityState: UniversityReducer,
	apiKeysState: ApiKeyReducer
});

export default reducers;
