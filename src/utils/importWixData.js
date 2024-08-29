import React from 'react'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const wixClient = createClient({
	modules: { items },
	auth: OAuthStrategy({
		clientId: `a488964d-d895-421a-97fd-0ed47d914738`,
		tokens: JSON.parse(Cookies.get("session") || null),
	}),
});

export default function useWixData(collectionId) {
	
	const [content, setContent] = useState([]);
	
	async function fetchData() {
		const data = await wixClient.items
			.queryDataItems({ dataCollectionId: collectionId })
			.ascending("orderId")
			.find();
		setContent(data._items);
	}
	
	useEffect(() => {
		fetchData();
	}, []);
	
	return content;
	
}