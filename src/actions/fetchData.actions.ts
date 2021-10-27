import { useScanStore } from "../stores/useScanStore";

export async function fetchData(url: string): Promise<void> {
   try {
       const response = await fetch (url, {
           method: 'GET',
           mode: 'cors'
       })
       if (!response.ok) {
           useScanStore.setState({error: `Failed to get image with status ${response.status}. Please, try to rescan.`});
       }       
       useScanStore.setState({data: await response.json()});

   } catch (e) {
        console.log('Network Error');
        useScanStore.setState({error: "Network Error"});
   }
}

