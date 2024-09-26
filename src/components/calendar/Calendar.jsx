import { View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { CALENDAR_MAX_WIDTH, handleMonthChange, Month } from '.';

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
const Calendar = React.memo(({ onChange, color, activeColor, itemID }) => {
    console.log('calendar rerender');


    const [visibleMonth, setVisibleMonth] = useState(currentMonth); // Default to current month
    const { width } = useWindowDimensions();

    // fallback for rerenders
    // useEffect( () => {
    //     async function fetchStoredMonth() {
    //         const storedMonth = await getStoredMonth()
    //         if (storedMonth && storedMonth !== visibleMonth) 
    //          setVisibleMonth(storedMonth);
    //     }
    //     fetchStoredMonth();
    // }, []);

    // TODO: calendar animation
    const pan = Gesture.Pan()
        .onBegin((event) => {

        })
        .onChange((event) => {

        })
        .onFinalize((event) => {

        });


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

    return (
        <View style={{ maxWidth: width,paddingTop: 0, paddingBottom: 20, flexDirection: "row", overflow: "hidden" }}>

            <GestureHandlerRootView style={{ flex: 1 }}>

                <GestureDetector gesture={pan}>
                    <View style={{ flex: 1, maxWidth: width, minHeight: 300, overflow: "hidden" }}>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                        }}>
                            {!isNaN(currentMonth) &&
                                <Month
                                    {...{
                                        key: visibleMonth,
                                        itemID,
                                        onChange,
                                        color,
                                        activeColor,
                                        onNavigate,
                                        currentDate,
                                        date: new Date(2024, visibleMonth, 1)
                                    }}
                                />}

                        </View>
                    </View>
                </GestureDetector>

            </GestureHandlerRootView>
        </View>
    )
}, (prevProps, nextProps) => {
    return prevProps.payload === nextProps.payload &&
        prevProps.color === nextProps.color &&
        prevProps.activeColor === nextProps.activeColor;
});






export default Calendar