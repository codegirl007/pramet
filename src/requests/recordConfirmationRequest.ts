import { Constants } from "../model/Contants";
import { scanStore } from "../stores/useScanStore";
import { getRecordsRequest } from "./getRecordsRequest";

export async function recordConfirmationRequest(id: number, confirmed: boolean): Promise<void> {
	try {
		const response = await fetch(`${Constants.SERVER_ENDPOINT}/records/${id}/defect_confirmation`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				defect_confirmation: confirmed,
			}),
		});
		if (!response.ok) {
			scanStore.useStore.setState({
				error: `Failed to change confirmation with status ${response.status}. Please, try it again.`,
			});
		}
		getRecordsRequest();
	} catch (e) {
		console.log("Network Error ", e);
		scanStore.useStore.setState({ error: "Network Error" });
	}
}
