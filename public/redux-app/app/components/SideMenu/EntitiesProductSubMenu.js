import React from 'react';
import {Link} from 'react-router';

class EntitiesProductSubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EntitiesProductSubMenu';
    }
    render() {
        return (
        	<li>
        		<Link to={"analysis/" + this.props.entity.slug + "/" + this.props.product.slug}>{this.props.product.name}</Link>
        	</li>
        );
    }
}

export default EntitiesProductSubMenu;
