import { useScanStore } from "../stores/useScanStore";

export const toggleScanned = (): void => {
  const scanned = useScanStore.getState().scanned;
  useScanStore.setState({ scanned: !scanned });
};
