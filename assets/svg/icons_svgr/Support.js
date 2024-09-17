import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
const SvgSupport = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 21.8 21.8"
    style={{height: 34, width: 34}}
    {...props}
  >
    <Path
      d="M16.13 21.8H5.67C2.54 21.8 0 19.26 0 16.13V5.67C0 2.54 2.54 0 5.67 0h10.46c3.13 0 5.67 2.54 5.67 5.67v10.46c0 3.13-2.54 5.67-5.67 5.67"
      style={{
        opacity: 0.8,
        fill: "#3f82c3",
      }}
    />
    <Path
      d="M4.72 13.88v-3.55c0-3.46 2.8-6.26 6.26-6.26s6.26 2.8 6.26 6.26v5.94h-6.26"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
      }}
    />
    <Path
      d="M4.31 14.79h.57c.19 0 .34-.15.34-.34v-3.06c0-.5-.41-.91-.91-.91s-.91.41-.91.91v2.49c0 .5.41.91.91.91zM17.72 14.79c.5 0 .91-.41.91-.91v-2.49c0-.5-.41-.91-.91-.91s-.91.41-.91.91v2.49c0 .5.41.91.91.91z"
      style={{
        fill: "#fff",
        stroke: "#fff",
        strokeMiterlimit: 10,
      }}
    />
    <Path
      d="M15.45 8.36c-.57.43-1.28.68-2.03.68-1.5 0-2.78-.97-3.29-2.35-.19 1.84-1.69 3.27-3.51 3.27-.15 0-.29-.01-.43-.03.2-2.17 1.71-3.94 3.7-4.43.06-.01.11-.03.17-.04.31-.06.63-.1.96-.1 1.98-.01 3.68 1.23 4.43 3"
      style={{
        opacity: 0.6,
        fill: "#fff",
      }}
    />
    <Circle
      cx={8.49}
      cy={11.28}
      r={0.78}
      style={{
        opacity: 0.6,
        fill: "#fff",
      }}
    />
    <Circle
      cx={13.36}
      cy={11.28}
      r={0.78}
      style={{
        opacity: 0.6,
        fill: "#fff",
      }}
    />
  </Svg>
);
export default SvgSupport;
