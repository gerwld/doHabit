import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";
const SvgClock = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.size || 32}
    height={props?.size || 32}
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
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 6v6l4 2" />
    </G>
  </Svg>
);
export default SvgClock;
