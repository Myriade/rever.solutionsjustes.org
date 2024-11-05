const React = require("react");


exports.shouldUpdateScroll = () => {
	if (!window.location.hash) {
		return false;
	} else if (window.location.hash) {
		const hashSubstring = window.location.hash.substring(1);
		return false;
	}
}
