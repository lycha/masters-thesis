import React from 'react';
import {Link} from 'react-router';

class SettingsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SettingsMenu';
    }
    render() {
        return (
        	<li className="sub-menu dcjq-parent-li">
                <a href="javascript:;" className="dcjq-parent" >
                    <i className="fa fa-bar-chart-o"></i>
                    <span>Settings</span>
                </a>
                {function(){
			        if (this.props.userRole == 'admin') {
			          return (
			          	<ul className="sub">
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to="/entities">Entities</Link></li>
                            <li><Link to="/products">Products</Link></li>
		                    <li><Link to="/account-settings">Account Settings</Link></li>
		                </ul>
			          ) 
			          } else {
			          	return (
				          	<ul className="sub">
                                <li ><a href="/account-settings">User Settings</a></li>
			                </ul>
		                )
			        }
			      }.call(this)}
            </li>
        );
    }
}

SettingsMenu.PropTypes = {
  userRole: React.PropTypes.string.isRequired
}

export default SettingsMenu;
