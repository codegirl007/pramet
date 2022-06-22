import { Constants } from "../model/Contants";
import { scanStore } from "../stores/useScanStore";

export async function getRecordsRequest(): Promise<void> {
	try {
		const response = await fetch(`${Constants.SERVER_ENDPOINT}/records?defect_confirmation=null`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
		});
		if (!response.ok) {
			scanStore.useStore.setState({
				error: `Failed to get records with status ${response.status}. Please, try it again.`,
			});
		}

		scanStore.useStore.setState({
			records: await response.json(),
		});
	} catch (e) {
		console.log("Network Error ", e);
		scanStore.useStore.setState({ error: "Network Error" });
	}
}
