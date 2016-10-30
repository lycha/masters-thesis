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
			        if (typeof this.props.user.roles !== 'undefined') {
                        if (this.props.user.roles[0].slug == 'admin') {
    			          return (
    			          	<ul className="sub">
                                <li><Link to="/users">Users</Link></li>
                                <li><Link to="/entities">Entities</Link></li>
                                <li><Link to="/universities">Universities</Link></li>
                                <li><Link to="/products">Products</Link></li>
                                <li><Link to="/campaigns">Campaigns</Link></li>
    		                    <li><Link to="/api-keys">API Keys</Link></li>
    		                </ul>
    			          ) 
                        }
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

export default SettingsMenu;
