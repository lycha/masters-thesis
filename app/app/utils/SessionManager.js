export function createSession(token) {
	localStorage.setItem('trackingToolAuthToken', token);
}

export function deleteSession() {
	localStorage.removeItem('trackingToolAuthToken');
}