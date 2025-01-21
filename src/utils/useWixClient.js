import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import { createClient, OAuthStrategy } from "@wix/sdk";
import { items, collections } from "@wix/data";

export function useWixClient() {
	const [client, setClient] = useState(null);

	useEffect(() => {
		const newClient = createClient({
			modules: { items, collections },
			auth: OAuthStrategy({
				clientId: process.env.GATSBY_WIX_API_KEY,
				tokens: JSON.parse(Cookies.get("session") || null),
			}),
		});
		setClient(newClient);
	}, []);

	return client;
}