

export const downloadFile = (url: string, filename: string): void => {
    fetch(url)
        .then(response => {
            response.blob()
        .then(blob => {
                let a = document.createElement('a');
                let url = window.URL.createObjectURL(blob);                
                a.href = url;
                a.download = filename;
                a.click();
            });
            //window.location.href = response.url;
    });
}



    // const downloadFile = (blob: Blob, filename: string): void => {
    //     const link = document.createElement("a");
    //     link.href = URL.createObjectURL(blob);
    //     link.download = filename;
    //     link.innerHTML = "Click here to download the file";
    //     link.click();
    //     URL.revokeObjectURL(link.href);
    // };