import { Dimensions } from "react-native";

// not reactive approach to reduce GPU usage
export default function useWidthDimensions(maxWidth, gap = 0) {
  const dimWidth = Dimensions.get("window").width;
  return {
    width:
      dimWidth <= maxWidth
        ? (dimWidth - gap)
        : (maxWidth - gap)
  };
}
