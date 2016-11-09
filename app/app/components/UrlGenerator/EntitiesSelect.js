import React from 'react';

class EntitiesSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange(e) {
        this.props.setEntity(e.target.value);
    }
    render() {
        return (
        	<select required ref="entity" className="form-control" id="entity" name="entity" onChange={(e) => this.handleChange(e)}>
        		<option value="">- choose entity -</option>
        		{this.props.entities.map((entity, index)=>{
	              return (
						<option value={entity.slug} key={index}>{entity.name}</option>
	              )
	            })} 
        	</select>
        	);
    }
}

export default EntitiesSelect;
