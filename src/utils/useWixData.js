import { useEffect, useState } from 'react'
import { useWixClient } from './useWixClient'

export default function useWixData(collectionId, manualSortID, placeholderObj) {
	const [content, setContent] = useState([placeholderObj]);
	const wixClient = useWixClient();
	
	useEffect(() => {
		
		let sort = null;
		if (manualSortID) {
			sort = manualSortID;
		} else {
			sort = 'title';
		}
		
		if (wixClient) {
			async function fetchData() {
				try {
					const data = await wixClient.items
						.queryDataItems({ dataCollectionId: collectionId })
						.ascending(sort)
						.find();
					setContent(data._items);
				} catch (err) {
					console.error('Error fetching Wix data:', err);
				}
			}
			fetchData();
		}
	}, [wixClient, collectionId, manualSortID]);
	
	return content;
}

export function useGetManualSortId(collectionId) {
	const wixClient = useWixClient();
	
	useEffect(() => {
		if (wixClient) {
			async function getCollectionInfos() {
				try {
					const data = await wixClient.collections.getDataCollection(collectionId);
					console.log('Collection System Infos query result :', data);
				} catch (err) {
					console.error('Error fetching Wix Collection info:', err);
				}
			}
			getCollectionInfos();
		}
	}, [wixClient, collectionId])
}
