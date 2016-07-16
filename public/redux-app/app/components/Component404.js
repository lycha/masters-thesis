import React from 'react';

class Component404 extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Component404';
    }
    render() {
        return (
        	<section id="container" >
		    	<div className="row mt">
		  			<div className="col-lg-12">
	  					<div className="full-page-message">
	  							<img src="../public/assets/img/aiesec_launcher.png" className="img-circle" width="120" />
	  						<p>404</p>
					  		<h2>Ooops... Looks like site wasn't found.</h2>
					  		<h2>Try again later or do some exchange in the meanwhile.</h2>
	  					</div>
	  				</div>
	  		</div>
	  		</section>
        );
    }
}

export default Component404;