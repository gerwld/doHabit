import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgBack = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size|| 32}
    height={props.size|| 32}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="currentColor"
      d="m3.55 12 7.35 7.35q.375.375.363.875t-.388.875-.875.375-.875-.375l-7.7-7.675q-.3-.3-.45-.675T.825 12t.15-.75.45-.675l7.7-7.7q.375-.375.888-.363t.887.388.375.875-.375.875z"
    />
  </Svg>
);
export default SvgBack;
