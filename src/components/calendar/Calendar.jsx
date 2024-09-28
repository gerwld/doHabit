import { View } from 'react-native'
import React, { useState } from 'react'
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { handleMonthChange, Month } from '.';
import { runOnJS } from 'react-native-reanimated';
import { useWidthDimensions } from 'hooks';

const currentDate = new Date();
let currentMonth = currentDate.getMonth();

/**
 * Shows calendar based on user preferences.
 * @param {funcion} onChange - The callback that recieves clicked timestamp with 00:00.
 * @param {string} color - Text color, usually HEX.
 * @param {string} activeColor - Active color (buttons, week text), usually HEX.
 * @param {string} itemID - Habit ID to show active (selected) habit timestamps (Days.jsx).
 * @returns {React FC} - Returns Calendar. 
 */
const Calendar = React.memo(({ onChange, color, colorContrast, borderColor, activeColor, itemID }) => {
    // console.log('calendar rerender');

    const [visibleMonth, setVisibleMonth] = useState(currentMonth); // Default to current month
    const { width } = useWidthDimensions(700, 20);

    const onNavigate = (isBack) => {
        if (isBack) {
            setVisibleMonth(visibleMonth - 1);
            handleMonthChange(visibleMonth - 1)
        }
        else {
            setVisibleMonth(visibleMonth + 1);
            handleMonthChange(visibleMonth + 1);
        }
    }

    // TODO: calendar animation
    const panLeft = Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart((_) => {
            runOnJS(onNavigate)(false)
        })
    const panRight = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart((_) => {
            runOnJS(onNavigate)(true)
        })

    // native scrolling gesture to handle vertical scroll in ScrollView
    const nativeGesture = Gesture.Native();

    // combines the pan gesture for horizontal swipe and native scroll gesture
    const composedGestures = Gesture.Simultaneous(panLeft, panRight, nativeGesture);

    return (
        <View style={{ maxWidth: width, paddingBottom: width * 0.04, flexDirection: "row", overflow: "hidden" }}>
            <GestureDetector gesture={composedGestures}>
                <View style={{ flex: 1, maxWidth: width, minHeight: 300, overflow: "hidden" }}>

                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                    }}>
                        {!isNaN(currentMonth) &&
                            <Month
                                {...{
                                    key: visibleMonth,
                                    width,
                                    itemID,
                                    onChange,
                                    color,
                                    colorContrast,
                                    borderColor,
                                    activeColor,
                                    onNavigate,
                                    currentDate,
                                    date: new Date(2024, visibleMonth, 1)
                                }}
                            />}

                    </View>
                </View>
            </GestureDetector>
        </View>
    )
}, (prevProps, nextProps) => {
    return prevProps.payload === nextProps.payload &&
        prevProps.color === nextProps.color &&
        prevProps.activeColor === nextProps.activeColor;
});






export default Calendar