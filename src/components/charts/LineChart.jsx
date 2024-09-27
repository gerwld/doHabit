import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

const initData = [
    { name: 'January', y: 0 },
    { name: 'February', y: 20 },
    { name: 'March', y: 50 },
    { name: 'April', y: 100 },
    { name: 'April', y: 50 },
    { name: 'ейпріл', y: 20 },
];

const CLineChart = ({ payload, bottomLabelColor, topLabelColor, borderColor, dotColor }) => {
    const data = payload || initData;

    const chartWidth = screenWidth - 40; // total chart width with padding
    const maxChartHeight = 150; // fixed height for the chart area (adjustable)
    const margin = 20; // left/right margin to avoid overflow
    const spacing = (chartWidth - 2 * margin) / (data.length - 1); // adjust spacing for margins
    const maxY = 100; // max percentage value
    const topPadding = 20; // extra Padding for top space to fit the label

    return (
        <View style={{ padding: 20 }}>
            <Svg height={maxChartHeight + topPadding + 40} width={chartWidth}>
                {data.map((point, index) => {
                    const x = margin + index * spacing; // x for left margin
                    const y = maxChartHeight - (maxChartHeight * point.y) / maxY + topPadding; // adds topPadding

                    if (index < data.length - 1) {
                        const nextX = margin + (index + 1) * spacing; // next point for margin
                        const nextY = maxChartHeight - (maxChartHeight * data[index + 1].y) / maxY + topPadding;

                        return (
                            <Line
                                key={`line-${index}`}
                                x1={x}
                                y1={y}
                                x2={nextX}
                                y2={nextY}
                                stroke={borderColor || "black"}
                                strokeWidth="2"
                            />
                        );
                    }
                    return null;
                })}

                {data.map((point, index) => {
                    const x = margin + index * spacing; // x for left margin
                    const y = maxChartHeight - (maxChartHeight * point.y) / maxY + topPadding;

                    return (
                        <React.Fragment key={`dot-label-${index}`}>
                            <Circle cx={x} cy={y} r="4" fill={dotColor || "blue"} />

                            {/* display the percentage above the dots */}
                            <Text
                                x={x}
                                y={y - 10} // adjust if you want to give more space above the dot
                                fontSize="10"
                                fill={topLabelColor || "black"}
                                textAnchor="middle"
                            >
                                {`${point.y}%`}
                            </Text>

                            {/* display the month name at the bottom */}
                            <Text
                                x={x}
                                y={maxChartHeight + topPadding + 30} // month name that is below the chart
                                fontSize="12"
                                fill={bottomLabelColor || "black"}
                                textAnchor="middle"
                            >
                                {point.name}
                            </Text>
                        </React.Fragment>
                    );
                })}
            </Svg>
        </View>
    );
};

export default CLineChart;
