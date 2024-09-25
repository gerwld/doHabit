import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgFront = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size|| 32}
    height={props.size|| 32}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="currentColor"
      d="m14.475 12-7.35-7.35q-.375-.375-.363-.888t.388-.887.888-.375.887.375l7.675 7.7q.3.3.45.675t.15.75-.15.75-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888.375-.887z"
    />
  </Svg>
);
export default SvgFront;
