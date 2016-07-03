
			
export function createSession(token) {
	console.log("createSession", token);
	localStorage.setItem('trackingToolAuthToken', token);
}

export function deleteSession() {
	localStorage.removeItem('trackingToolAuthToken');
}