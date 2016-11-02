import React from 'react';
import {Link} from 'react-router';
import EntitiesProductSubMenu from './EntitiesProductSubMenu'

class EntitiesMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EntitiesMenu';
    }
    componentDidMount() {
    }
    render() {
        return (
          <li className="sub-menu dcjq-parent-li" >
            <a href="javascript:;" className="dcjq-parent" >
              <i className="fa fa-bar-chart-o"></i>
              <span>{this.props.entity.name}</span>
              <span className="dcjq-icon"></span>
            </a> 
            {this.props.products.map((product, index)=>{
              return (
                <ul className="sub" style={{display: 'none'}} key={index}>
                  <EntitiesProductSubMenu entity={this.props.entity} product={product} key={index} onAnalysisSelected={this.props.onAnalysisSelected}/>
                </ul>
              )
            })}  
          </li>
        );
    }
}
export default EntitiesMenu;

