import React from 'react';

class AdminMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'AdminMenu';
    }
    render() {
        return (
        	<li className="sub-menu dcjq-parent-li">
                <a href="javascript:;" className="dcjq-parent" >
                    <i className="fa fa-bar-chart-o"></i>
                    <span>Admin Settings</span>
                </a>
                <ul className="sub">
                    <li ><a  href="{{URL::to('/')}}/expa-leads">EXPA Leads</a></li>
                    <li ><a  href="{{URL::to('/')}}/lcs">Local Committees</a></li>
                </ul>
            </li>
        );
    }
}

export default AdminMenu;
