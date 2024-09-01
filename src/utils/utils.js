const convertImageUrl = (wixMediaString) => {
	// Regex pattern to match the Wix media string
	const pattern = /^wix:image:\/\/v1\/([^\/]+)\/(.+)#originWidth=(\d+)&originHeight=(\d+)/;
	
	// Match the input string against the pattern
	const match = wixMediaString.match(pattern);
	
	if (match) {
		// Extract captured groups
		const [, hash, imageName, width, height] = match;
		
		// Construct the B-type string
		return `https://static.wixstatic.com/media/${hash}/v1/fill/w_${width},h_${height},al_c,q_85,enc_auto/${imageName}`;
	}
	
	// Return original string if it doesn't match the expected format
	return wixMediaString;
};

export { convertImageUrl };
