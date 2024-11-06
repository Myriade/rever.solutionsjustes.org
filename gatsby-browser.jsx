const React = require('react');

exports.shouldUpdateScroll = () => {
	if (!window.location.hash) {
		// if no hash is present, force the page to load at the very top
		//console.log('browser no location hash');
		window.scrollTo(0, 0);
	}
	return false;
}
