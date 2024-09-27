import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { getWeekdays } from '@constants';

// returns the last day in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getMonthLabel = (monthIndex) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthIndex % 12];
};

// returns the start month of the heatmap (current month - 11)
const getHeatmapStartDate = () => {
  const today = new Date();
  const startMonth = today.getMonth() - 11; // current month - 11
  return new Date(today.getFullYear(), startMonth, 1);
};

const Heatmap = ({ timestamps, backgroundDay, backgroundActiveDay, color }) => {
  const startDate = getHeatmapStartDate(); // start date (current month - 11)
  const heatmapData = {};

  // populate the heatmap data based on timestamps
  timestamps.forEach((ts) => {
    const date = new Date(ts);
    const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    heatmapData[dayKey] = 1; // mark as active (completed habit day)
  });

  const cellSize = Dimensions.get("window").width / 48; // size of each cell in month
  const gap = Dimensions.get("window").width / 140; // gap size between cells
  const columnsPerMonth = 7; // 7 columns for weekly layout
  const weekdays = getWeekdays(); // user weekday array (starts from sunday or monday)

  return (
    <View style={{ justifyContent: "center", paddingVertical: 15, marginLeft: 2, maxWidth: 800, flexDirection: "row", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
      {/* maps each month starting from (currentMonth - 11) */}
      {Array.from({ length: 12 }).map((_, monthOffset) => {
        const currentMonthDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthOffset, 1);
        const daysInMonth = getDaysInMonth(currentMonthDate.getFullYear(), currentMonthDate.getMonth());
        const monthLabel = getMonthLabel(currentMonthDate.getMonth());
        const yearLabel = currentMonthDate.getFullYear();


        // gets gap based on is week start from sunday or monday
        const dayOfWeek = currentMonthDate.toLocaleString('en-US', { weekday: 'long' });
        const firstDayOffset = weekdays.indexOf(dayOfWeek.toLowerCase());  // day of the week for the 1st of the month

        return (
          <View key={monthLabel}>
            {/* month label & year label */}
            <Text style={{ fontSize: 14, lineHeight: 14, color: color || "#000" }}>{monthLabel}</Text>
            <Text style={{ fontSize: 11, lineHeight: 11, marginTop: 1, marginBottom: 4, color: backgroundActiveDay || "gray" }}>{yearLabel}</Text>
            <Svg height={(cellSize + gap) * 6} width={(cellSize + gap) * columnsPerMonth}>

              {/* add offset for the first day of the month */}
              {firstDayOffset > 0 &&
                <Rect
                  key={`offset-gap`}
                  x={(firstDayOffset) * (cellSize + gap)}
                  y={0}
                  width={cellSize}
                  height={cellSize}
                  fill="transparent" // transparent because it's a gap rect
                />}

              {/* map the actual days of the month */}
              {Array.from({ length: daysInMonth }).map((_, dayIdx) => {
                const dayPositionIdx = dayIdx + firstDayOffset; // x offset for gap rect
                const x = (dayPositionIdx % columnsPerMonth) * (cellSize + gap); // adjust for gaps in x direction (horizontal)
                const y = Math.floor(dayPositionIdx / columnsPerMonth) * (cellSize + gap); // adjust for gaps in y direction (vertical)

                const currentDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), dayIdx + 1);
                const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;

                return (
                  <Rect
                    key={dayIdx}
                    x={x}
                    y={y}
                    rx={3}
                    width={cellSize}
                    height={cellSize}
                    fill={heatmapData[dayKey] === 1 ? (backgroundActiveDay || 'green') : (backgroundDay || 'lightgray')} // Color based on active day
                  />
                );
              })}
            </Svg>
          </View>
        );
      })}
    </View>
  );
};

export default Heatmap;
