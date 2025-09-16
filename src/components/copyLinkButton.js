import React, { useState } from 'react';

const CopyLinkButton = ({ lang, url }) => {
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
			{ !copied && lang === 'fr' ? 'Copier le lien' : ''} 
			{ !copied && lang === 'en' ? 'Copy link' : ''} 
			{ copied && lang === 'fr' ? 'Copié !' : ''} 
			{ copied && lang === 'en' ? 'Copied !' : ''} 
		</button>
	);
};

export default CopyLinkButton;
