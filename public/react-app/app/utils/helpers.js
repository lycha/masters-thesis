var axios = require('axios');

function getRepos(username) {
	return axios.get('https://api.github.com/users/' + username + '/repos');
	/*return axios.get('../../api/v1/authenticate/user',{
		headers: {
        	'Authorization': 'Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL21hc3Rlci10b29sLmRldlwvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDYzMTY1NjMzLCJleHAiOjE0NjMxOTA4MzMsIm5iZiI6MTQ2MzE2NTYzMywianRpIjoiZDQyMmEwMzEyMTM2ODczYjMxYTE4ZGUyYmFiZjQxNzkifQ.hvn_-gkeu2Uds92Z-4v2q8_uNd6fSgvo-9fhnz18JEI'
    	}}
	);*/
};

function getUserInfo(username) {
	return axios.get('https://api.github.com/users/' + username);
};

var helpers = {
	getGithubInfo: function(username) {
		return axios.all([getRepos(username), getUserInfo(username)])
			.then(function(arr){
				return {
					repos: arr[0].data,
					bio: arr[1].data
				}
			});
	}
};

module.exports = helpers;