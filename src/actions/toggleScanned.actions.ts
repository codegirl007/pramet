import { useScanStore } from "../stores/useScanStore";


export const toggleScanned = () => {
  const scanned = useScanStore.getState().scanned;
  useScanStore.setState({ scanned: !scanned });
};