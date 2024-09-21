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
		<button 
			className='copylink'
			onClick={copyToClipboard}
			style={{
				display: 'inline-block',
				background: 'transparent',
				color: 'white',
				fontSize: '1rem',
			}}
		>
			{copied ? 'Copié !' : 'Copier le lien'}
		</button>
	);
};

export default CopyLinkButton;
