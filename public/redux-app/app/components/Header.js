import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
    }
    render() {
        return (
        	<header className="header black-bg">
		    	<div className="sidebar-toggle-box">
		          <div className="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
		      	</div>
		    	<a href="#" className="logo"><b>AIESEC in Poland Mkt Tracking Tool </b></a>
		    	<div className="top-menu">
			        <ul className="nav pull-right top-menu">
			            <li><a className="logout" href="#/auth/login">Logout</a></li>
			        </ul>
		    	</div>
			</header>
        );
    }
}

export default Header;
