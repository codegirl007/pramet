import { Constants } from "../model/Contants";
import { useScanStore } from "../stores/useScanStore";

export async function fetchData(endpoint: string): Promise<void> {
  try {
    const response = await fetch(`${Constants.SERVER_ENDPOINT}/findbb`, {
      method: "GET",
      mode: "cors",
    });
    console.log(response);
    if (!response.ok) {
      useScanStore.setState({
        error: `Failed to get image with status ${response.status}. Please, try to rescan.`,
      });
    }
    useScanStore.setState({ data: await response.json() });
  } catch (e) {
    console.log("Network Error ", e);
    useScanStore.setState({ error: "Network Error" });
  }
}
