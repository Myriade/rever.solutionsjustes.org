import { useEffect, useState } from 'react'
import { useWixClient } from './useWixClient'

export default function useWixData(collectionId, manualSortID, placeholderObj) {
	const [content, setContent] = useState([placeholderObj]);
	const wixClient = useWixClient();
	
	useEffect(() => {
		if (wixClient) {
			async function fetchData() {
				try {
					const data = await wixClient.items
						.queryDataItems({ dataCollectionId: collectionId })
						.ascending(manualSortID)
						.find();
					setContent(data._items);
				} catch (err) {
					console.error('Error fetching Wix data:', err);
				}
			}
			fetchData();
		}
	}, [wixClient,collectionId, manualSortID]);
	
	// console.log(content);
	return content;
}
