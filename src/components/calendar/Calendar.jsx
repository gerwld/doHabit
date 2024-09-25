import { View, Text, Pressable, StyleSheet, useWindowDimensions, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Gesture, GestureDetector, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const currentDate = new Date();



const getVisibleItems = (currentMonth) => {
    return [currentMonth - 1, currentMonth, currentMonth + 1]
}


const Calendar = () => {
    let d = currentDate.getMonth();
    let currentMiddleMonth = useSharedValue(d);
    const [threeVisibleMonths, setVisibleMonths] = useState(getVisibleItems(currentMiddleMonth.value));
    const { width } = useWindowDimensions();
    // const TOTAL_PAGES = 3;

    const x = useSharedValue(-width);
    const page = useSharedValue(1);
    const startX = useSharedValue();
    // TODO: calendar animation
    const pan = Gesture.Pan()
        .onBegin((event) => {
            // save val on start
            startX.value = event.translationX;

        })
        .onChange((event) => {
            // keep tracking with press (scroll)
            // x.value = (page.value * -width) + event.translationX
        })
        .onFinalize((event) => {
            // prevent on tiny scroll
            if (Math.max(startX.value, event.translationX) - Math.min(startX.value, event.translationX) > 10) {
                // back
                if (startX.value < event.translationX) {
                    page.value -= 1;
                }
                // forward   
                else if (startX.value > event.translationX) {
                    page.value = page.value + 1;
                }
            }

            // Infinite scroll logic
            if (page.value === 0) {
                let v = (currentMiddleMonth.value - 1);
                currentMiddleMonth.value = v;
                const items = [v - 1, v, v + 1];
                // Use runOnJS to safely update state
                runOnJS(setVisibleMonths)(items);

                // Reset position
                page.value = 1;
                x.value = withTiming(-width); // Re-center
            }

            else if (page.value === 2) {
                let v = (currentMiddleMonth.value + 1);
                currentMiddleMonth.value = v;
                const items = [v - 1, v, v + 1];
                // Use runOnJS to safely update state
                runOnJS(setVisibleMonths)(items);

                // Reset position
                page.value = 1;
                x.value = withTiming(-width); // Re-center
            }

            // debounce back
            x.value = withTiming(-width * (page.value))
            // reset startX
            startX.value = 0
        });

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }]
    }))




    return (
        <View style={{ paddingTop: 5, paddingBottom: 20, flexDirection: "row", overflow: "hidden" }}>

            <GestureHandlerRootView style={{ flex: 1 }}>

                <GestureDetector gesture={pan}>
                    <View style={{ flex: 1, width: width, overflow: "hidden" }}>


                        <Animated.View style={[{
                            flex: 1,
                            flexDirection: "row",
                        }, animStyle]}>
                            {threeVisibleMonths.map(month => {
                                return <Month date={new Date(2024, month, 1)} />
                            })}
                        </Animated.View>
                    </View>
                </GestureDetector>

            </GestureHandlerRootView>
        </View>
    )
}

const Month = ({ date }) => {
    const { t } = useTranslation();
    const year = date.getFullYear();
    const month = date.getMonth();
    const { width, height } = useWindowDimensions();

    const s = StyleSheet.create({
        v: {
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            paddingTop: 8,
            paddingBottom: 8,
        },
        m: {
            fontSize: 16,
        },
        mf: {
            paddingRight: 6
        }
    });

    return (
        <View style={{ maxWidth: width, overflow: "hidden" }}>
            <View style={s.v}>
                <Text style={[s.m, s.mf]}>{t("month_" + month)}</Text>
                <Text style={s.m}>{year}</Text>
            </View>
            <MonthWeekDays />
            <Days currentMonth={month} />
        </View>
    )
}

const Days = ({ currentMonth }) => {
    const { width, height } = useWindowDimensions();
    const firstDayOfMonth = new Date(2024, currentMonth, 1);
    const dayOfWeek = firstDayOfMonth.toLocaleString('en-US', { weekday: 'long' });
    const lastDayOfMonth = new Date(2024, currentMonth + 1, 0);
    const daysArray = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);


    const s = StyleSheet.create({
        v: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexWrap: "wrap"
        },
        t: {
            paddingVertical: 10,
            flexShrink: 0,
            flexGrow: 0,
            width: Math.floor(width / 7),
            minWidth: Math.floor(width / 7),
            height: 42,
            lineHeight: 42,
            fontSize: 15,
            textAlign: "center",
        },
        to: {
            zIndex: 100,
        },
        gap: {
            height: 42,
            paddingLeft: 6 * Math.floor(width / 7),
        }
    })

    return <View style={s.v}>
        <View style={s.gap} />
        {daysArray.map(day =>
            <TouchableOpacity style={s.to}>
                <Text style={s.t}>{day}</Text>
            </TouchableOpacity>)
        }
    </View>
}

const MonthWeekDays = ({ color }) => {
    const s = StyleSheet.create({
        v: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        t: {
            paddingTop: 4,
            width: "14.285%",
            textAlign: "center",
            color: color ? color : "#3c95d0"
        }
    })
    return <View style={s.v} >
        {weekday.map(w => <Text key={weekday + "_key"} style={s.t}>{w.slice(0, 3)}</Text>)}
    </View>
}

export default Calendar