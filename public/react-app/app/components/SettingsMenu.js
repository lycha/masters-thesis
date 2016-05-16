import React from 'react';

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
		                    <li ><a  href="/expa-leads">EXPA Leads</a></li>
		                    <li ><a  href="/lcs">Local Committees</a></li>
		                </ul>
			          ) 
			          } else {
			          	return (
				          	<ul className="sub">
			                    <li ><a  href="/expa-leads">User</a></li>
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
