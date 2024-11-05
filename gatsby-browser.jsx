const React = require("react");


exports.shouldUpdateScroll = () => {
	if (!window.location.hash) {
		console.log('browser no location hash');
		return false;
	} else if (window.location.hash) {
		const hashSubstring = window.location.hash.substring(1);
		console.log('browser hashSubstring = ', hashSubstring);
		return false;
	}
}
