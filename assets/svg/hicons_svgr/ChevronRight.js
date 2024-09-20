import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgChevronRight = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979z"
    />
  </Svg>
);
export default SvgChevronRight;
