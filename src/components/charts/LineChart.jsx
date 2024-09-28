import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';
import { useWidthDimensions } from 'hooks';

const { width: screenWidth } = useWidthDimensions(680, 0) || 700;

const CLineChart = ({ 
    payload, 
    bottomLabelColor, 
    bottomLabelColorSec,
    topLabelColor, 
    dotColor,
    dotBgColor, 
    borderGraphColor,
    borderLinesColor }) => {
    const data = payload.slice(0, 12);
    
    const chartWidth = screenWidth; // total chart width 
    const maxChartHeight = 150; // fixed height for the chart area (adjustable)
    const margin = 20; // left/right margin to avoid overflow
    const spacing = (chartWidth - 2 * margin) / (data.length - 1); // adjust spacing for margins
    const maxY = 100; // max percentage value
    const topPadding = 20; // extra Padding for top space to fit the label
    
    // state to control which parts are visible
    const [visibleParts, setVisibleParts] = useState(0);

    useEffect(() => {
        let timeoutId;

        // function to progressively reveal parts
        const revealParts = (index) => {
            if (index <= data.length) {
                timeoutId = setTimeout(() => {
                    setVisibleParts(index);
                    revealParts(index + 1);
                }, 150); // delay between each part
            }
        };

        // start revealing parts
        revealParts(1);

        // clean up the timeout if component unmounts
        return () => clearTimeout(timeoutId);
    }, [data.length]);

    const getLines = (x, y, index) => {
        if (index < visibleParts - 1 && index < data.length - 1) {
            const nextX = margin + (index + 1) * spacing;
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
    };

    return (
        <View style={{ padding: 20 }}>
            <Svg height={maxChartHeight + topPadding + 40} width={chartWidth}>
                {data.map((point, index) => {
                    if (index >= visibleParts) return null; // skip Parts that shouldn't be visible yet

                    const x = margin + index * spacing; 
                    const y = maxChartHeight - (maxChartHeight * point.y) / maxY + topPadding;

                    return (
                        <React.Fragment key={`dot-label-${index}`}>
                            {getLines(x, y, index)}
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
                                fill={dotBgColor || "white"} 
                            />
                            <Text
                                x={x}
                                y={y - 10}
                                fontSize="11"
                                fill={topLabelColor || "black"}
                                fontFamily='sans-serif'
                                textAnchor="middle"
                            >
                                {`${point.y}%`}
                            </Text>
                            <Text
                                x={x}
                                y={maxChartHeight + topPadding + 21}
                                fontSize="12"
                                fontFamily='sans-serif'
                                fill={bottomLabelColor || "black"}
                                textAnchor="middle"
                            >
                                {payload.length < 7 ? point.name : point.name.slice(0, 3)}
                            </Text>
                            {point.subname && (
                                <Text
                                    x={x}
                                    y={maxChartHeight + topPadding + 34}
                                    fontSize="12.5"
                                    fontWeight={payload.length > 7 && chartWidth > 450 ? 400 : 600}
                                    fontFamily='sans-serif'
                                    fill={bottomLabelColorSec || bottomLabelColor || "black"}
                                    textAnchor="middle"
                                >
                                    {payload.length > 7 && chartWidth > 450  ? point.subname : point.subname.slice(0, 2)}
                                </Text>
                            )}
                        </React.Fragment>
                    );
                })}
            </Svg>
        </View>
    );
};

export default CLineChart;
