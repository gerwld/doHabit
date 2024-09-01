import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({ progress, size, strokeWidth, color, isText }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <View style={{ width: size, height: size }}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          stroke="#ebf0f4"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
       {isText && <Text style={{ fontSize: size / 5, color: color }}>{`${progress}%`}</Text>}
      </View>
    </View>
  );
};

export default CircularProgress;
