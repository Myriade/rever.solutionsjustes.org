import { useEffect, useState } from 'react'
import { useWixClient } from './useWixClient'

export default function useWixData(collectionId, manualSortID) {
	const [content, setContent] = useState([]);
	const wixClient = useWixClient();
	
	useEffect(() => {
		if (wixClient) {
			async function fetchData() {
				const data = await wixClient.items
					.queryDataItems({ dataCollectionId: collectionId })
					.ascending(manualSortID)
					.find();
				setContent(data._items);
			}
			fetchData();
		}
	}, [wixClient,collectionId, manualSortID]);
	
	return content;
}
