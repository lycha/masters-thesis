import React from 'react';

import { browserHistory } from 'react-router'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import Main from './components/Main';
import LoginContainer from './components/Login/LoginContainer';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import HomeDashboard from './components/Dashboard/HomeDashboard';
import UsersContainer from './components/AdminPanel/Users/UsersContainer';
import ProductsContainer from './components/AdminPanel/Products/ProductsContainer';
import EntitiesContainer from './components/AdminPanel/Entities/EntitiesContainer';
import CampaignsContainer from './components/AdminPanel/Campaigns/CampaignsContainer';
import ApiKeysContainer from './components/AdminPanel/ApiKeys/ApiKeysContainer';
import Component404 from './components/Component404';

ReactDOM.render (( 
	<Provider store={store}>
	  	<Router history={browserHistory} >
	  		<Route path='auth/login' component={LoginContainer} history={history} />
		  	<Route path='/' component={Main} history={history} >
		    	<Route path='users' component={UsersContainer} />
		    	<Route path='entities' component={EntitiesContainer} />
		    	<Route path='products' component={ProductsContainer} />
		    	<Route path='campaigns' component={CampaignsContainer} />
		    	<Route path='api-keys' component={ApiKeysContainer} />
		    	<Route path='analysis/:entity/:product' component={DashboardContainer} />
		    	<IndexRoute component={HomeDashboard} history={history}/>
		  	</Route>
		  	<Route path='/404' component={Component404} />
			<Redirect from='*' to='/404' />
	 	</Router> 
 	</Provider>
), document.getElementById('app')); 
