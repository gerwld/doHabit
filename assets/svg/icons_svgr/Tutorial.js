import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgTutorial = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 22.02 22.02"
    style={{height: 34, width: 34}}
    {...props}
  >
    <Path
      d="M16.35 22.02H5.67C2.54 22.02 0 19.48 0 16.35V5.67C0 2.54 2.54 0 5.67 0h10.68c3.13 0 5.67 2.54 5.67 5.67v10.68c0 3.13-2.54 5.67-5.67 5.67"
      style={{
        opacity: 0.8,
        fill: "#c44082",
      }}
    />
    <Path
      d="M8.24 17.82c0 .4.33.76.77.76h3.4c.44 0 .77-.36.77-.76v-.68H8.24zm2.47-13.76c-3.08 0-5.56 2.26-5.56 5.07 0 1.73.93 3.26 2.37 4.18v1.64c0 .4.36.73.8.73h4.79c.44 0 .8-.33.8-.73v-1.64c1.45-.92 2.38-2.45 2.38-4.18-.01-2.8-2.5-5.07-5.58-5.07"
      style={{
        fill: "#fff",
      }}
    />
    <Path
      d="M168.79 259.58h-11.35c-3.13 0-5.67-2.54-5.67-5.67v-11.35c0-3.13 2.54-5.67 5.67-5.67h11.35c3.13 0 5.67 2.54 5.67 5.67v11.35c-.01 3.13-2.54 5.67-5.67 5.67"
      style={{
        opacity: 0.8,
        fill: "#3f82c3",
      }}
    />
  </Svg>
);
export default SvgTutorial;
