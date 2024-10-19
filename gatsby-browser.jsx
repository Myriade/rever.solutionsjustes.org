const React = require("react");

exports.shouldUpdateScroll = () => {
	window.scrollTo(0, 0);
	return false;
};

