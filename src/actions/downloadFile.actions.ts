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
    });
}

