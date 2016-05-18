var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile')
var Notes = require('./Notes/Notes')

var Profile = React.createClass({
	getInitialState: function(){
		return {
		  notes: [1,2,3],
		  bio: {},
		  repos: ['a', 'b', 'c']
		}
	},
	

	componentWillUnmount: function() {
		this.unbind('notes');
	},

	handleAddNote: function(newNote){
		this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote);
	},
	render: function(){
	return (
	  <div className="row">
	    <div className="col-md-4">
	      <UserProfile username={this.props.params.username} bio={this.state.bio} />
	    </div>
	    <div className="col-md-4">
	      <Repos username={this.props.params.username} repos={this.state.repos}/>
	    </div>
	    <div className="col-md-4">
	      <Notes 
	      	username={this.props.params.username} 
	      	notes={this.state.notes} 
	      	addNote={this.handleAddNote} />
	    </div>
	  </div>
	)
	}
});

module.exports = Profile;