import { Constants } from "../model/Contants";
import { scanStore, TypeData } from "../stores/useScanStore";

export async function fetchData(param: string): Promise<void> {
  try {
    const response = await fetch(`${Constants.SERVER_ENDPOINT}/${param}`, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      scanStore.useStore.setState({
        error: `Failed to get image with status ${response.status}. Please, try to rescan.`,
      });
    }
    scanStore.useStore.setState({ data: await response.json() });
  } catch (e) {
    console.log("Network Error ", e);
    scanStore.useStore.setState({ error: "Network Error" });
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
    scanStore.useStore.setState({ imgId: responseJSON.img_id });
    if (!response.ok) {
      scanStore.useStore.setState({
        error: `Failed to get image with status ${response.status}. Please, try to rescan.`,
      });
    }
  } catch (e) {
    console.log("Network Error ", e);
    scanStore.useStore.setState({ error: "Network Error" });
  }
}

export async function saveData(typed: string, param: string) {
  try {
    const response = await fetch(`${Constants.SERVER_ENDPOINT}/${param}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: typed,
      }),
    });
    const responseJSON = await response.json();
    scanStore.useStore.setState({ savedData: responseJSON });
    if (!response.ok) {
      scanStore.useStore.setState({
        error: `Failed to get image with status ${response.status}. Please, try to rescan.`,
      });
    }
  } catch (e) {
    console.log("Network Error ", e);
    scanStore.useStore.setState({ error: "Network Error" });
  }
}
