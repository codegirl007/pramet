import { Constants } from "../model/Contants";
import { TypeData, useScanStore } from "../stores/useScanStore";

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

export async function postData(data: TypeData, param: string) {
  try {
    const response = await fetch(`${Constants.SERVER_ENDPOINT}/${param}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bb: data.bb,
        focus: data.focus,
      }),
    });
    const responseJSON = await response.json();
    useScanStore.setState({ imgId: responseJSON.img_id });
    if (!response.ok) {
      useScanStore.setState({
        error: `Failed to get image with status ${response.status}. Please, try to rescan.`,
      });
    }
  } catch (e) {
    console.log("Network Error ", e);
    useScanStore.setState({ error: "Network Error" });
  }
}
