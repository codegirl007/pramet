import { Constants } from "../model/Contants";
import { scanStore, PreviewCoordinatesData } from "../stores/useScanStore";

export async function fetchData(param: string): Promise<void> {
  try {
    const response = await fetch(`${Constants.SERVER_ENDPOINT}/${param}`, {
      method: "GET",
    });
    if (!response.ok) {
      scanStore.useStore.setState({
        error: `Failed to get image with status ${response.status}. Please, try to rescan.`,
      });
      scanStore.stopLoading();
    }
    scanStore.useStore.setState({ previewCoordinates: await response.json() });
    scanStore.stopLoading();
  } catch (e) {
    console.log("Network Error ", e);
    scanStore.useStore.setState({ error: "Network Error" });
    scanStore.stopLoading();
  }
}

export async function postData(
  previewCoordinates: PreviewCoordinatesData,
  param: string
) {
  try {
    const response = await fetch(`${Constants.SERVER_ENDPOINT}/${param}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bb: previewCoordinates.bb,
        focus: previewCoordinates.focus,
      }),
    });
    const responseJSON = await response.json();
    scanStore.useStore.setState({ scannedImgId: responseJSON.img_id });
    scanStore.stopLoading();
    if (!response.ok) {
      scanStore.useStore.setState({
        error: `Failed to get image with status ${response.status}. Please, try to rescan.`,
      });
      scanStore.stopLoading();
    }
  } catch (e) {
    console.log("Network Error ", e);
    scanStore.useStore.setState({ error: "Network Error" });
    scanStore.stopLoading();
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
    scanStore.useStore.setState({ savedImgData: responseJSON });
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
