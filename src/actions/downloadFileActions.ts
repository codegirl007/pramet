import { Constants } from "../model/Contants";

export const downloadFile = (imgEndpoint: string, filename: string): void => {
  fetch(`${Constants.SERVER_ENDPOINT}/img/${imgEndpoint}`, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.img`;
      link.click();
      URL.revokeObjectURL(link.href);
    });
};
