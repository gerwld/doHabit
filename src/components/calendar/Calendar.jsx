import { View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { getStoredMonth, handleMonthChange, Month } from '.';



const currentDate = new Date();
let currentMonth = currentDate.getMonth();


const Calendar = React.memo(({onChange, color, activeColor, itemID }) => {
    console.log('calendar rerender');


    const [visibleMonth, setVisibleMonth] = useState(null); // Default to current month
    const { width } = useWindowDimensions();


    useEffect( () => {
        async function fetchStoredMonth() {
            const storedMonth = await getStoredMonth()
            if (storedMonth && storedMonth !== visibleMonth) 
             setVisibleMonth(storedMonth);
        }
        fetchStoredMonth();
    }, []);

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
        <View style={{ paddingTop: 5, paddingBottom: 20, flexDirection: "row", overflow: "hidden" }}>

            <GestureHandlerRootView style={{ flex: 1 }}>

                <GestureDetector gesture={pan}>
                    <View style={{ flex: 1, width: width, minHeight: 345, overflow: "hidden" }}>

                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                        }}>
                            {visibleMonth &&
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