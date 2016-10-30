import React from 'react';

class TotalAnalisysMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'TotalAnalisysMenu';
    }
    render() {
        return (
        	<li className="sub-menu dcjq-parent-li">
              <a href="javascript:;" className="dcjq-parent" >
                  <i className="fa fa-bar-chart-o"></i>
                  <span>Total Analysis</span>
              </a>
              <ul className="sub">
                  <li><a  href="{{URL::to('/')}}/total/gc">Global Citizen</a></li>
                  <li><a  href="{{URL::to('/')}}/total/gt">Global Talents</a></li>
                  <li><a  href="{{URL::to('/')}}/total/gh">Global Host</a></li>
                  <li><a  href="{{URL::to('/')}}/total/fl">Future Leaders</a></li>
                  <li><a  href="{{URL::to('/')}}/total/au">Aiesec University</a></li>
              </ul>
          </li>
        );
    }
}

export default TotalAnalisysMenu;
