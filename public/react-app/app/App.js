import React from 'react';

import { browserHistory } from 'react-router'
import { Router, Route, Link, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';

import Main from './components/Main';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

ReactDOM.render (( 
  	<Router history={browserHistory} >
  		<Route path="auth/login" component={Login} history={history} />
	  	<Route path="/" component={Main} history={history} >
	    	<Route path="app" component={Dashboard}>
	    		<Route path="profile/:username" component={Profile} />
	  		</Route>
	    	<IndexRoute component={Home} />
	  	</Route>
 	</Router> 
), document.getElementById('app')); 