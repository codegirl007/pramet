export const downloadFile = (url: string, filename: string): void => {
    fetch(url, {
        method: 'GET',
        mode: 'no-cors'
    })
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
      });
  };