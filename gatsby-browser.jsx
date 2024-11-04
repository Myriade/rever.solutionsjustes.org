const React = require("react");

if (!window.location.hash) {
	exports.shouldUpdateScroll = () => {
		console.log('shouldUpdateScroll');
		window.scrollTo(0, 0);
		return false;
	} 
}
