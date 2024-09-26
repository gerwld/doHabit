import { View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { handleMonthChange, Month } from '.';
import { useSharedValue } from 'react-native-reanimated';

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
    const startX = useSharedValue();
    const pan = Gesture.Pan()
        .onBegin((event) => {
            startX.value = event.translationX;
        })
        // .onChange(() => {})
        .onFinalize((event) => {
            if (Math.max(startX.value, event.translationX) - Math.min(startX.value, event.translationX) > 100) {
                // back
                if (startX.value < event.translationX)
                    onNavigate(true)
                // forward   
                else onNavigate()
            }
        });

    return (
        <View style={{ maxWidth: width, paddingTop: 0, paddingBottom: 20, flexDirection: "row", overflow: "hidden" }}>

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