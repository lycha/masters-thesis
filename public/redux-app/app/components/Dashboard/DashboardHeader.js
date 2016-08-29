import React from 'react';

class DashboardHeader extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DashboardHeader';
		this.title = "";
    }
    componentWillUpdate(nextProps, nextState) {
    	if (typeof nextProps.product != 'undefined' && typeof nextProps.entity != 'undefined') {
    		console.log(nextProps);
    		this.title = nextProps.product.name + ' in ' + nextProps.entity.name;
    	}
    }
    render() {
        return (
            <h1>{this.title}</h1>);
    }
}

export default DashboardHeader;
