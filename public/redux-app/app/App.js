import React from 'react';

import { browserHistory } from 'react-router'
import { Router, Route, Link, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import Main from './components/Main';
import LoginContainer from './components/Login/LoginContainer';
import Dashboard from './components/Dashboard';
import Users from './components/AdminPanel/Users';
import Products from './components/AdminPanel/Products';
import EntitiesContainer from './components/AdminPanel/Entities/EntitiesContainer';

ReactDOM.render (( 
	<Provider store={store}>
	  	<Router history={browserHistory} >
	  		<Route path='auth/login' component={LoginContainer} history={history} />
		  	<Route path='/' component={Main} history={history} >
		    	<Route path='users' component={Users} />
		    	<Route path='entities' component={EntitiesContainer} />
		    	<Route path='products' component={Products} />
		    	<Route path='analysis/:entity/:product' component={Dashboard} />
		    	<IndexRoute component={Dashboard} />
		  	</Route>
	 	</Router> 
 	</Provider>
), document.getElementById('app')); 
