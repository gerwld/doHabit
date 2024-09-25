import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Gesture, GestureDetector, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import SvgBack from '../../../assets/svg/hicons_svgr/Back';
import SvgFront from '../../../assets/svg/hicons_svgr/Front';

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const currentDate = new Date();
const timestamp_now = new Date(currentDate.setHours(0, 0, 0, 0)).getTime();



const getVisibleItems = (currentMonth) => {
    return [currentMonth - 1, currentMonth, currentMonth + 1]
}


const Calendar = ({ color, activeColor, payload, onChange }) => {
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
            if (Math.max(startX.value, event.translationX) - Math.min(startX.value, event.translationX) > 100) {
                // back
                if (startX.value < event.translationX) {
                    page.value -= 1;
                }
                // forward   
                else if (startX.value > event.translationX) {
                    page.value = page.value + 1;
                }
            }

            // infinite scroll part
            if (page.value === 0) {
                let v = (currentMiddleMonth.value - 1);
                currentMiddleMonth.value = v;
                const items = [v - 1, v, v + 1];
                // uses runOnJS to safely update state
                runOnJS(setVisibleMonths)(items);

                // reset position
                page.value = 1;
                x.value = withTiming(-width); // Re-center
            }

            else if (page.value === 2) {
                let v = (currentMiddleMonth.value + 1);
                currentMiddleMonth.value = v;
                const items = [v - 1, v, v + 1];
                // uses runOnJS to safely update state
                runOnJS(setVisibleMonths)(items);

                // reset position
                page.value = 1;
                x.value = withTiming(-width); // Re-center
            }

            // debounce back
            // x.value = withTiming(-width * (page.value))
            // reset startX
            startX.value = 0
        });

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }]
    }))


    const onNavigate = (isBack) => {
        let v = isBack ? currentMiddleMonth.value - 1 : currentMiddleMonth.value + 1;
        currentMiddleMonth.value = v;
        const items = [v - 1, v, v + 1];
        setVisibleMonths(items);

        // Reset position
        page.value = 1;
        x.value = withTiming(-width); // Re-center
    }




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
                                return <Month
                                    {...{
                                        key: month,
                                        payload,
                                        onChange,
                                        color,
                                        activeColor,
                                        onNavigate,
                                        date: new Date(2024, month, 1)
                                    }}
                                />
                            })}
                        </Animated.View>
                    </View>
                </GestureDetector>

            </GestureHandlerRootView>
        </View>
    )
}

const Month = ({ color, date, onNavigate, activeColor, payload, onChange }) => {
    const { t } = useTranslation();
    const year = date.getFullYear();
    const month = date.getMonth();
    const { width, height } = useWindowDimensions();

    const s = StyleSheet.create({
        v: {
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",

            paddingTop: 8,
            paddingBottom: 8,
        },
        vb: {
            flexDirection: "row",
            alignContent: "center",
        },
        m: {
            fontSize: 18,
            color: color ? color : "#fff"
        },
        mf: {
            paddingRight: 6
        },
        p: {
            width: 45,
            paddingHorizontal: 15
        }
    });

    const onNavigateBack = () => onNavigate(true)
    const onNavigateFront = () => onNavigate(false)

    return (
        <View style={{ maxWidth: width, overflow: "hidden" }}>
            <View style={s.v}>
                <TouchableOpacity style={s.p} onPress={onNavigateBack}><SvgBack color={activeColor ? activeColor : "#3c95d0"} size={24} /></TouchableOpacity>
                <View style={s.vb}>
                    <Text style={[s.m, s.mf]}>{t("month_" + month)}</Text>
                    <Text style={s.m}>{year}</Text>
                </View>
                <TouchableOpacity style={s.p} onPress={onNavigateFront}><SvgFront color={activeColor ? activeColor : "#3c95d0"} size={24} /></TouchableOpacity>
            </View>
            <MonthWeekDays month={month} activeColor={activeColor} />
            <Days {...{
                currentMonth: month,
                color, activeColor, year,
                payload, onChange
            }} />
        </View>
    )
}

const Days = ({ currentMonth, color, year, activeColor, payload, onChange }) => {
    const { width } = useWindowDimensions();
    const firstDayOfMonth = new Date(2024, currentMonth, 1);
    const dayOfWeek = firstDayOfMonth.toLocaleString('en-US', { weekday: 'long' });
    const fdayIndex = weekday.indexOf(dayOfWeek);
    const lastDayOfMonth = new Date(2024, currentMonth + 1, 0);
    const daysArray = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);

    // console.log(payload);
    
    const s = StyleSheet.create({
        v: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexWrap: "wrap"
        },
        t: {
            flexShrink: 0,
            flexGrow: 0,
            width: 42,
            minWidth: 42,
            marginHorizontal: (Math.floor(width / 7) - 42) / 2,
            marginBottom: 5,
            height: 42,
            borderRadius: 21,
            lineHeight: 41,
            fontSize: 18,
            textAlign: "center",
            color: color ? color : "#fff"
        },
        t_inactive: {
            opacity: 0.5
        },
        t_today: {
            borderColor: activeColor ? activeColor : "#3c95d0",
            borderWidth: 1,
            
            overflow: "hidden",
            fontWeight: 500,
            color: activeColor ? activeColor : "#3c95d0",
        },
        to: {
            zIndex: 100,
        },
        gap: {
            height: 42,
            paddingLeft: fdayIndex * Math.floor(width / 7),
        },
        selected: {
            backgroundColor: activeColor ? activeColor : "#3c95d0",
            color: "#fff"
        }
    })


    return <View style={s.v}>
        <View style={s.gap} />
        {daysArray.map(day => {
            const timestamp = new Date(year, currentMonth, day).getTime();
            const dayinPayload = payload?.indexOf(timestamp) > 0;

            console.log(payload);
            
            function onDateSelect() {
                onChange(timestamp)
            }

            if (timestamp === timestamp_now)
                return <TouchableOpacity key={timestamp} style={s.to} onPress={onDateSelect}>
                    <Text style={[s.t, s.t_today, dayinPayload ? s.selected :null ]}>{day}</Text>
                </TouchableOpacity>

            if (timestamp < timestamp_now)
                return <TouchableOpacity key={timestamp} style={s.to} onPress={onDateSelect}>
                    <Text style={[s.t, dayinPayload ? s.selected :null ]}>{day}</Text>
                </TouchableOpacity>

            else return <Text key={timestamp} style={[s.t, s.t_inactive]}>{day}</Text>
        })
        }
    </View>
}

const MonthWeekDays = ({ activeColor, month }) => {
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
            color: activeColor ? activeColor : "#3c95d0"
        }
    })
    return <View style={s.v} >
        {weekday.map(w => <Text key={w + month + "_key"} style={s.t}>{w.slice(0, 3)}</Text>)}
    </View>
}

export default Calendar