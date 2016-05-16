import React from 'react';
import AdminMenu from './AdminMenu';
class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideMenu';
    }
    render() {
        return (

<aside>
  <div id="sidebar"  className="nav-collapse ">
      <ul className="sidebar-menu" id="nav-accordion">
      
      	  <p className="centered"><a href="#"><img src="../public/assets/img/aiesec_launcher.png" className="img-circle" width="60" /></a></p>
      	  <h5 className="centered">AIESEC in Poland</h5>
          
          {function(){
	        if (this.props.userRole == 'admin') {
	          return <AdminMenu />
	        }
	      }.call(this)}
          

          <li className="sub-menu">
              <a href="{{URL::to('/')}}/generate-url" >
                  <i className="fa fa-bar-chart-o"></i>
                  <span>URL Generator</span>
              </a>
          </li>
          <li className="sub-menu dcjq-parent-li">
              <a href="javascript:;" className="dcjq-parent active" >
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

          <li className="sub-menu">
              <a href="javascript:;" className="<?= Request::is('national*') ? 'active' : '' ?>" >
                  <i className="fa fa-bar-chart-o"></i>
                  <span>MC promo</span>
              </a>
              <ul className="sub">
                  <li className="<?= Request::is('national/gc*') ? 'active' : '' ?>"><a  href="{{URL::to('/')}}/national/gc">Global Citizen</a></li>
                  <li className="<?= Request::is('national/gt*') ? 'active' : '' ?>"><a  href="{{URL::to('/')}}/national/gt">Global Talents</a></li>
                  <li className="<?= Request::is('national/gh*') ? 'active' : '' ?>"><a  href="{{URL::to('/')}}/national/gh">Global Host</a></li>
                  <li className="<?= Request::is('national/fl*') ? 'active' : '' ?>"><a  href="{{URL::to('/')}}/national/fl">Future Leaders</a></li>
                  <li className="<?= Request::is('national/au*') ? 'active' : '' ?>"><a  href="{{URL::to('/')}}/national/au">Aiesec University</a></li>
              </ul>
          </li>
          
            <li className="sub-menu">
                <a href="javascript:;" className="<?= Request::is($lc['url_name'].'*') ? 'active' : '' ?>">
                    <i className="fa fa-bar-chart-o"></i>
                    <span>LC</span>
                </a>
                <ul className="sub">
                    <li className="<?= Request::is($lc['url_name'].'/gc*') ? 'active' : '' ?>"><a  href="{{URL::to('/')}}/{{$lc['url_name']}}/gc">Global Citizen</a></li>
                    <li className="<?= Request::is($lc['url_name'].'/gt*') ? 'active' : '' ?>"><a  href="{{URL::to('/')}}/{{$lc['url_name']}}/gt">Global Talents</a></li>
                    <li className="<?= Request::is($lc['url_name'].'/gh*') ? 'active' : '' ?>"><a  href="{{URL::to('/')}}/{{$lc['url_name']}}/gh">Global Host</a></li>
                    <li className="<?= Request::is($lc['url_name'].'/fl*') ? 'active' : '' ?>"><a  href="{{URL::to('/')}}/{{$lc['url_name']}}/fl">Future Leaders</a></li>
                    <li className="<?= Request::is($lc['url_name'].'/au*') ? 'active' : '' ?>"><a  href="{{URL::to('/')}}/{{$lc['url_name']}}/au">Aiesec University</a></li>
                </ul>
            </li>
      </ul>
  </div>
</aside>

        );
    }
}

SideMenu.PropTypes = {
  userRole: React.PropTypes.string.isRequired
}
export default SideMenu;
