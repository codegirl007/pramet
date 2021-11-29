import { Constants } from "../model/Contants";
import { ScanData, useScanStore } from "../stores/useScanStore";

export async function fetchData(param: string): Promise<void> {
  try {
    const response = await fetch(`${Constants.SERVER_ENDPOINT}/${param}`, {
      method: "GET",
      mode: "cors",
    });
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

export async function postData(data: ScanData, param: string) {
  try {
    const response = await fetch(`${Constants.SERVER_ENDPOINT}/${param}`, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        bb: data.bb,
        focus: data.focus,
      }),
    });
    console.log("response: " + response.json());
    if (response.ok) {
      console.log("response: " + response);
    }
  } catch (e) {
    console.log("Network Error ", e);
    useScanStore.setState({ error: "Network Error" });
  }
}

export async function getScannedData( param: string) {
  try {
    const response = await fetch(`${Constants.SERVER_ENDPOINT}/${param}`, {
      method: "GET",
      mode: "cors",
    });
    if (response.ok) {
      console.log("response: " + response);
    }
  } catch (e) {
    console.log("Network Error ", e);
    useScanStore.setState({ error: "Network Error" });
  }
}


