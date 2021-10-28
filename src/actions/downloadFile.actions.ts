export const downloadFile = (url: string, filename: string): void => {
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(link.href);
};

