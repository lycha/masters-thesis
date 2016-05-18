import React from 'react';

import { browserHistory } from 'react-router'
import { Router, Route, Link, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';

import Main from './components/Main';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/AdminPanel/Users';
import Products from './components/AdminPanel/Products';
import Entities from './components/AdminPanel/Entities';

ReactDOM.render (( 
  	<Router history={browserHistory} >
  		<Route path='auth/login' component={Login} history={history} />
	  	<Route path='/' component={Main} history={history} >
	    	<Route path='users' component={Users} />
	    	<Route path='entities' component={Entities} />
	    	<Route path='products' component={Products} />
	    	<Route path='analysis/:entity/:product' component={Dashboard} />
	    	<IndexRoute component={Dashboard} />
	  	</Route>
 	</Router> 
), document.getElementById('app')); 



