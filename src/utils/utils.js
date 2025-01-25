const convertImageUrl = (wixMediaString) => {
	
	// Regex pattern to match the Bitmap Wix media string and Match the input string against the bitmap imgage pattern
	const bitmapPattern = /^wix:image:\/\/v1\/([^]+)\/(.+)#originWidth=(\d+)&originHeight=(\d+)/;
	const matchBitmap = wixMediaString.match(bitmapPattern);
	
	// Regex pattern to match the Vector Wix media string and Match the input string against the bitmap imgage pattern
	const vectorPattern = /^wix:vector:\/\/v1\/([^]+)\/(.+)$/;
	const matchVector = wixMediaString.match(vectorPattern);
	
	if (matchBitmap) {
		const [, hash, imageName, width, height] = matchBitmap; // Extract captured groups
		return `https://static.wixstatic.com/media/${hash}/v1/fill/w_${width},h_${height},al_c,q_85,enc_auto/${imageName}`; // Construct the new url string
		
	} else if (matchVector) { 
		// Match the input string against the vector image pattern
		const [, hash, imageName] = matchVector; // Extract captured groups
		return `https://static.wixstatic.com/shapes/${hash}`; // Construct the new url string
	}
	
	// Return a placeholder image url string if it doesn't match the expected format
	return '/logo.jpg';
};

export { convertImageUrl };
