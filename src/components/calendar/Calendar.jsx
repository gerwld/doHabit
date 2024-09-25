import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalenarScroll from './CalenarScroll';

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdayFromMn = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
// yyyy / m / last first spec








const Calendar = () => {
    return (
        <View style={{ paddingTop: 5, paddingBottom: 20, flexDirection: "row", overflow: "hidden" }}>
            <CalenarScroll style={{position: "relative"}}>
                <Month date={new Date(2024, currentMonth - 1, 1)} />
                <Month date={new Date(2024, currentMonth, 1)} />
            </CalenarScroll>
        </View>
    )
}

const Month = ({ date }) => {
    const { t } = useTranslation();
    const year = date.getFullYear();
    const month = date.getMonth();

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
        <View>
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
            width: Math.floor(width /7),
            minWidth: Math.floor(width /7),
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
            paddingLeft: 6 * Math.floor(width /7),
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