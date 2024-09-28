import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';
import { useWidthDimensions } from 'hooks';


const {width: screenWidth} = useWidthDimensions(680, 0) || 700;

const dataSample = [
    { name: '', y: 0 },
    { name: '', y: 0 },
];

/**
 * Shows Line Chart based on user payload.
 * @param {funcion} payload - chart data (dataSample example above).
 * @param {string} dotColor - dot color, usually HEX.
 * @param {string} dotBgColor - dot background color, usually HEX.
 * @returns {React FC} - Returns Line Chart. 
 */
const CLineChart = ({ 
    payload, 
    bottomLabelColor, 
    bottomLabelColorSec,
    topLabelColor, 
    dotColor,
    dotBgColor, 
    borderGraphColor,
    borderLinesColor }) => {
    const data = payload;

    if (!data || !data?.length) return nodata

    const chartWidth = screenWidth; // total chart width 
    const maxChartHeight = 150; // fixed height for the chart area (adjustable)
    const margin = 20; // left/right margin to avoid overflow
    const spacing = (chartWidth - 2 * margin) / (data.length - 1); // adjust spacing for margins
    const maxY = 100; // max percentage value
    const topPadding = 20; // extra Padding for top space to fit the label

    return (
        <View style={{ padding: 20}}>
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
                                stroke={borderGraphColor || "black"}
                                strokeWidth="4"
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

                            {/* vertical line show part */}
                            <Line
                                x1={x}
                                y1={topPadding}
                                x2={x}
                                y2={maxChartHeight + topPadding}
                                stroke={borderLinesColor || "black"}
                                strokeWidth="2"
                                strokeDasharray="4, 4"
                            />

                            <Circle 
                            cx={x} 
                            cy={y} 
                            r="4.5" 
                             stroke={dotColor || "#3c95d0"}
                            strokeWidth="2.5"
                            fill={dotBgColor || "white"} />

                            {/* display the percentage above the dots */}
                            <Text
                                x={x}
                                y={y - 10} // adjust if you want to give more space above the dot
                                fontSize="11"
                                fill={topLabelColor || "black"}
                                fontFamily='sans-serif'
                                textAnchor="middle"
                            >
                                {`${point.y}%`}
                            </Text>
                            

                            {/* display the month name at the bottom */}
                            <Text
                                x={x}
                                y={maxChartHeight + topPadding + 21} // month name that is below the chart
                                fontSize="12"
                                fontFamily='sans-serif'
                                fill={bottomLabelColor || "black"}
                                textAnchor="middle"
                            >
                                {payload.length < 7 ? point.name : point.name.slice(0, 3)}
                                
                                    
                            </Text>
                            {point.subname &&   <Text
                                x={x}
                                y={maxChartHeight + topPadding + 34} // month subname that is below the chart
                                fontSize="12.5"
                                fontWeight={payload.length > 7 && chartWidth > 450 ? 400 : 600}
                                fontFamily='sans-serif'
                                fill={bottomLabelColorSec || bottomLabelColor || "black"}
                                textAnchor="middle"
                            >
                                {payload.length > 7 && chartWidth > 450  ? point.subname : point.subname.slice(0, 2)}
                            </Text>}
                        </React.Fragment>
                    );
                })}
            </Svg>
        </View>
    );
};

const nodata = (
    <View style={{ height: 50 }}>
        <Text
            style={{
                userSelect: "none",
                color: "gray",
                lineHeight: 50,
                fontSize: 15,
                fontFamily: "sans-serif"
            }}>
            No data to display.
        </Text>
    </View>)

export default CLineChart;
