const React = require('react');

exports.shouldUpdateScroll = () => {
	// force the page to load at the very top
	window.scrollTo(0, 0);
	return false;
}
