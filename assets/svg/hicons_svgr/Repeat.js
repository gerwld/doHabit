import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const SvgRepeat = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.styles?.fontSize || props?.size || 32}
    height={props.styles?.fontSize || props?.size || 32}
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="m17 1 4 4-4 4" />
      <Path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4" />
      <Path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </G>
  </Svg>
);
export default SvgRepeat;
