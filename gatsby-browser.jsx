const React = require("react");


// Logs when the client route changes
exports.onRouteUpdate = ({ location, prevLocation }) => {
	console.log("new pathname", location.pathname)
	console.log("old pathname", prevLocation ? prevLocation.pathname : null)
}

exports.shouldUpdateScroll = () => {
	if (!window.location.hash) {
		// if no hash is present, force the page to load at the very top
		//console.log('browser no location hash');
		window.scrollTo(0, 0);
	} else if (window.location.hash) {
		// if url has a hash, do nothing
		const hashSubstring = window.location.hash.substring(1);
		//console.log('browser hashSubstring = ', hashSubstring);
	}
	return false;
}
