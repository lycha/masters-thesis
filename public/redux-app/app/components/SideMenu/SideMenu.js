import React from 'react';
import SettingsMenu from './SettingsMenu';
import TotalAnalisysMenu from './TotalAnalisysMenu';
import {getEntities} from '../../utils/ServerRequests';
import {Link} from 'react-router';
import EntitiesMenu from './EntitiesMenu';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideMenu';
    }
    componentWillMount() {
    	/*getEntities()
			.then(function(response){
				window.hideLoadingSpinner();
				if (response) {
					this.setState({
				      entities: response.data
				    })
				}
			}.bind(this))*/
    }
    componentDidMount() {
    	window.startAccordion();
    	window.commonScript();
    }
    render() {
    	/**/

        return (
			<aside>
			  <div id="sidebar"  className="nav-collapse ">
			      <ul className="sidebar-menu" id="nav-accordion">
			      
			      	  <p className="centered"><a href="#"><img src="../public/assets/img/aiesec_launcher.png" className="img-circle" width="60" /></a></p>
			      	  <h5 className="centered">AIESEC in Poland</h5>
			          
				      <SettingsMenu user={this.props.user}/>
			          
			          <li className="sub-menu">
			              <a href="/generate-url" >
			                  <i className="fa fa-bar-chart-o"></i>
			                  <span>URL Generator</span>
			              </a>
			          </li>
			          <TotalAnalisysMenu />
			          <EntitiesMenu entities={this.props.entities}/>
			          <li className="sub-menu">
			              <a href="javascript:;"  >
			                  <i className="fa fa-bar-chart-o"></i>
			                  <span>MC promo</span>
			              </a>
			              <ul className="sub">
			                  <li><a  href="/national/gc">Global Citizen</a></li>
			                  <li><a  href="/national/gt">Global Talents</a></li>
			                  <li><a  href="/national/gh">Global Host</a></li>
			                  <li><a  href="/national/fl">Future Leaders</a></li>
			                  <li><a  href="/national/au">Aiesec University</a></li>
			              </ul>
			          </li>
			          
			            <li className="sub-menu">
			                <a href="javascript:;">
			                    <i className="fa fa-bar-chart-o"></i>
			                    <span>LC</span>
			                </a>
			                <ul className="sub">
			                    <li><a  href="/gc">Global Citizen</a></li>
			                    <li><a  href="/gt">Global Talents</a></li>
			                    <li><a  href="/gh">Global Host</a></li>
			                    <li><a  href="/fl">Future Leaders</a></li>
			                    <li><a  href="/au">Aiesec University</a></li>
			                </ul>
			            </li>
			      </ul>
			  </div>
			</aside>
        );
    }
}

export default SideMenu;
