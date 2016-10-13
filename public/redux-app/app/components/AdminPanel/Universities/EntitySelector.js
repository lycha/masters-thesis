import React from 'react';

class EntitySelector extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EntitySelector';
    }
    handleChange(e) {
    	let slug = e.target.value;
    	let entity = this.props.entities.filter(function( entity ) {
		  return entity.slug == slug;
		});
		this.props.setEntity(entity[0]);
    }

    render() {
        return (
        	<select 
		        onChange={(e) => this.handleChange(e)} >
				<option value="0">-Select entity-</option>
		        {this.props.entities.map(entity => {
		        	return (
				    	<option value={entity.slug} key={entity.slug}>{entity.name}</option>
		        	);
		      	})}
		    </select>
        );
    }
}

export default EntitySelector;
