import React from 'react';
import SettingsMenu from './SettingsMenu';
import TotalAnalisysMenu from './TotalAnalisysMenu';
import {getEntities} from '../../utils/ServerRequests';
import {Link} from 'react-router';
import EntitiesMenu from './EntitiesMenu';
import store from '../../store';
import { setAnalysisEntity, setAnalysisProduct } from '../../actions/AnalysisActions';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideMenu';
    }
    componentDidMount() {
    }
    onAnalysisSelected(entity, product) {
    	store.dispatch(setAnalysisEntity(entity));
    	store.dispatch(setAnalysisProduct(product));
    }
    render() {
        return (
			<aside>
			  <div id="sidebar"  className="nav-collapse ">
			      <ul className="sidebar-menu" id="nav-accordion">
			      
			      	  <p className="centered"><a href="#"><img src="assets/img/aiesec_launcher.png" className="img-circle" width="60" /></a></p>
			      	  <h5 className="centered">AIESEC in Poland</h5>
			          
				      <SettingsMenu user={this.props.user}/>
			          
			          <li className="sub-menu">
			              <a href="/generate-url" >
			                  <i className="fa fa-bar-chart-o"></i>
			                  <span>URL Generator</span>
			              </a>
			          </li>

			          <li className="sub-menu">
			              <a href="#" >
			                  <i className="fa fa-bar-chart-o"></i>
			                  <span>Total analysis</span>
			              </a>
			          </li>
			          {this.props.entities.map((entity, index)=>{
							return (
								<EntitiesMenu entity={entity} products={this.props.products} key={index} onAnalysisSelected={this.onAnalysisSelected}/>
							)
		    			})}
			      </ul>
			  </div>
			</aside>
        );
    }
}
export default SideMenu;
