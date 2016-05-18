import React from 'react';
import Header from './Header'
import SideMenu from './SideMenu/SideMenu'
import Dashboard from './Dashboard'
import axios from 'axios';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Main';
        this.state = {
        	userRole: '', 
        }
    }
    componentWillMount(){
		if (!localStorage.getItem('trackingToolAuthToken')) {
			this.props.history.pushState(null, 'auth/login');
		}
		axios.get('../../api/v1/authenticate/user',{
		headers: {
        	'Authorization': 'Bearer ' + localStorage.getItem('trackingToolAuthToken')
        }})
		.then((response) => {
		    this.setState({
		      userRole: response.data.user.roles[0].slug
		    });
		})
		.catch((response) => { 
		    console.log(response);
		});
	}
    render() {
        return (
			<section id="container">
	        	<Header />
	        	<SideMenu userRole={this.state.userRole}/>
          {this.props.children}
	        </section>
	        
        );
    }
}

Main.PropTypes = {
  history: React.PropTypes.object.isRequired
}

export default Main;
