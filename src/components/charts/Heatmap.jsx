import React, { memo } from 'react';
import { Dimensions, View, Text } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { getWeekdays } from '@constants';
import { useTranslation } from 'react-i18next';
import { useWidthDimensions } from '../../hooks';
import { habitSelectors } from '../../redux';
import { shallowEqual, useSelector } from 'react-redux';

// returns the last day in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// returns the start month of the heatmap (current month - 11)
const getHeatmapStartDate = () => {
  const today = new Date();
  const startMonth = today.getMonth() - 11; // current month - 11
  return new Date(today.getFullYear(), startMonth, 1);
};

const Heatmap = memo(({ itemID, backgroundDay, backgroundActiveDay, color }) => {
  const { t } = useTranslation();
  const startDate = getHeatmapStartDate(); // start date (current month - 11)
  const { width } = useWidthDimensions(480, 20)


  const cellSize = width / 48; // size of each cell in month
  const gap = width / 140; // gap size between cells
  const columnsPerMonth = 7; // 7 columns for weekly layout
  const weekdays = getWeekdays(); // user weekday array (starts from sunday or monday)

  return (
    <View style={{ justifyContent: "center", maxWidth: 720, paddingVertical: 15, marginLeft: 2, flexDirection: "row", gap: "19px", marginHorizontal: "1%", flexWrap: "wrap", justifyContent: "center" }}>
      {/* maps each month starting from (currentMonth - 11) */}
      {Array.from({ length: 12 }).map((_, monthOffset) => {
        const currentMonthDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthOffset, 1);
        const lastMonthDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthOffset + 1, 0);
        const daysInMonth = getDaysInMonth(currentMonthDate.getFullYear(), currentMonthDate.getMonth());
        const monthLabel = t("month_" + (currentMonthDate.getMonth()));
        const yearLabel = currentMonthDate.getFullYear();

        const firstTimestamp = currentMonthDate.setHours(0, 0, 0, 0);
        const lastTimestamp = lastMonthDate.setHours(0, 0, 0, 0);

        // gets gap based on is week start from sunday or monday
        const dayOfWeek = currentMonthDate.toLocaleString('en-US', { weekday: 'long' });
        const firstDayOffset = weekdays.indexOf(dayOfWeek.toLowerCase());  // day of the week for the 1st of the month


        return (
          <View key={monthLabel}>
            {/* month label & year label */}
            <Text style={{ fontSize: 13.2, lineHeight: 13.2, color: color || "#000" }}>{monthLabel}</Text>
            <Text style={{ fontSize: 11, lineHeight: 11, fontWeight: "bold", marginTop: 1, marginBottom: 4, color: backgroundActiveDay || "gray" }}>{yearLabel}</Text>
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

              <MonthSVGContent
                  {...{
                    gap,
                    cellSize,
                    firstDayOffset,
                    currentMonthDate,
                    backgroundDay,
                    backgroundActiveDay,
                    daysInMonth,
                    columnsPerMonth,
                    itemID,
                    firstTimestamp,
                    lastTimestamp
                  }}
                />

            
            


            </Svg>
          </View>
        );
      })}
    </View>
  );
});


// part that rerenders on portion change
const MonthSVGContent = memo((props) => {
  const {
    gap,
    cellSize,
    firstDayOffset,
    currentMonthDate,
    backgroundDay,
    backgroundActiveDay,
    daysInMonth,
    columnsPerMonth,
    itemID,
    firstTimestamp,
    lastTimestamp } = props;



  return (<>
      {/* map the actual days of the month */}
      {Array.from({ length: daysInMonth }).map((_, dayIdx) => {
        const dayPositionIdx = dayIdx + firstDayOffset; // x offset for gap rect
        const x = (dayPositionIdx % columnsPerMonth) * (cellSize + gap); // adjust for gaps in x direction (horizontal)
        const y = Math.floor(dayPositionIdx / columnsPerMonth) * (cellSize + gap); // adjust for gaps in y direction (vertical)
        const currentDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), dayIdx + 1);
        const dayTimestamp = currentDate.setHours(0, 0, 0, 0);
        
    return <DaySVGContent {...{key:dayIdx,x,y,dayTimestamp, cellSize, backgroundActiveDay, backgroundDay, itemID}}/>

    
    
    })}
  </>
  );
})

const DaySVGContent = (props) => {
  console.log("DaySVGContent rerender");
  
  const {x,y,dayTimestamp, cellSize, backgroundActiveDay, backgroundDay, itemID} = props;
  const timestampSelected = useSelector((state) => habitSelectors.selectItemDateById(state, itemID, dayTimestamp), shallowEqual)
    

  return  <Rect
            
            x={x}
            y={y}
            rx={3}
            width={cellSize}
            height={cellSize}
            fill={timestampSelected ? (backgroundActiveDay || 'green') : (backgroundDay || 'lightgray')} // Color based on active day
/>
}

export default Heatmap;
