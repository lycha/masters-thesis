import React from 'react';

import { hashHistory } from 'react-router'
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
import UniversitiesContainer from './components/AdminPanel/Universities/UniversitiesContainer';
import CampaignsContainer from './components/AdminPanel/Campaigns/CampaignsContainer';
import ApiKeysContainer from './components/AdminPanel/ApiKeys/ApiKeysContainer';
import Component404 from './components/Component404';
import UrlGenerator from './components/UrlGenerator/UrlGenerator';

ReactDOM.render (( 
	<Provider store={store}>
	  	<Router history={hashHistory} >
	  		<Route path='auth/login' component={LoginContainer} history={history} />
		  	<Route path='/' component={Main} history={history} >
		    	<Route path='users' component={UsersContainer} />
		    	<Route path='entities' component={EntitiesContainer} />
		    	<Route path='products' component={ProductsContainer} />
		    	<Route path='universities' component={UniversitiesContainer} />
		    	<Route path='campaigns' component={CampaignsContainer} />
		    	<Route path='api-keys' component={ApiKeysContainer} />
		    	<Route path='generate-url' component={UrlGenerator} />
		    	<Route path='analysis/:entity/:product' component={DashboardContainer} />
		    	<IndexRoute component={HomeDashboard} history={history}/>
		  	</Route>
		  	<Route path='/404' component={Component404} />
			<Redirect from='*' to='/404' />
	 	</Router> 
 	</Provider>
), document.getElementById('app')); 
