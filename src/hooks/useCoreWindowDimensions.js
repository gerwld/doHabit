import { useWindowDimensions as useNativeWindowDimensions, PixelRatio, Platform } from 'react-native';

export default function useCoreWindowDimensions() {
  const window = useNativeWindowDimensions();

  // Calculate the DPI for Web
  if (Platform.OS === 'web') {
    // Use `window.devicePixelRatio` to get the screen's pixel ratio
    const pixelRatio = window.devicePixelRatio || PixelRatio.get();

    // Normalize dimensions for web scaling
    const width = window.width / pixelRatio;
    const height = window.height / pixelRatio;

    // Get the screen DPI using `window.screen`
    const screen = window.screen || {}; // Fallback in case it's undefined
    const dpi = screen.pixelDepth || screen.deviceXDPI || (96 * pixelRatio); // Use 96 as a fallback DPI for web

    return {
      ...window,
      width,
      height,
      dpi,  // DPI value based on the screen's pixel depth
    };
  }

  // For mobile devices, return PixelRatio and screen dimensions
  const dpi = PixelRatio.get() * 160; // Convert the pixel ratio to DPI for mobile
  return {
    ...window,
    dpi,  // Return calculated DPI
  };
}
