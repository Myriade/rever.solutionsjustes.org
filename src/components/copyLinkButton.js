import React, { useState } from 'react';

const CopyLinkButton = ({ url }) => {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(url)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			})
			.catch(err => console.error('Failed to copy text: ', err));
	};

	return (
		<div 
			className='copylink'
			onClick={copyToClipboard}
		>
			{copied ? 'Copié !' : 'Copier le lien'}
		</div>
	);
};

export default CopyLinkButton;
