import React from 'react';
import {Link} from 'react-router';

class EntitiesProductSubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EntitiesProductSubMenu';
    }
    onClick(e) {
        this.props.onAnalysisSelected(this.props.entity, this.props.product);
    }
    render() {
        return (
        	<li>
        		<Link to={"analysis/" + this.props.entity.slug + "/" + this.props.product.slug} onClick={(e) => this.onClick(e)}>{this.props.product.name}</Link>
        	</li>
        );
    }
}

export default EntitiesProductSubMenu;
