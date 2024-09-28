import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { habitSelectors } from "@redux";
import { shallowEqual, useSelector } from "react-redux";
import { getWeekdays } from "@constants";


const Days = ({ width, currentMonth, itemID, currentDate, color, borderColor, year, activeColor, onChange }) => {
    console.log('days rerender')

    const timestamp_now = new Date(currentDate.setHours(0, 0, 0, 0)).getTime();
    const firstDayOfMonth = new Date(2024, currentMonth, 1);
    const lastDayOfMonth = new Date(2024, currentMonth + 1, 0);

    const dayOfWeek = firstDayOfMonth.toLocaleString('en-US', { weekday: 'long' });
    const fdayIndex = getWeekdays().indexOf(dayOfWeek.toLowerCase());
    const daysArray = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);

    // custom hook useWidthDimensions manages maxWidth as 700 in Calendar.jsx
    const IS_TABLET = width === 700;
    const ITEM_SIZE = IS_TABLET ? 54 : 40;

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
            width: ITEM_SIZE,
            minWidth: ITEM_SIZE,
            marginHorizontal: (Math.floor(width / 7) - ITEM_SIZE) / 2,
            marginTop: width * 0.02,
            height: ITEM_SIZE,
            borderRadius: 12,
            overflow: "hidden",
            lineHeight: ITEM_SIZE - 1,
            fontSize: IS_TABLET ? 18 : 17,
            textAlign: "center",
            color: color ? color : "#fff",
            borderWidth: borderColor !== undefined ? 1 : null,
            borderColor: borderColor !== undefined ? borderColor : null
        },
        t_inactive: {
            opacity: 0.5,
            borderColor: null,
            borderWidth: null,
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
            height: 40,
            paddingLeft: fdayIndex * Math.floor(width / 7),
        },
        selected: {
            backgroundColor: activeColor ? activeColor : "#3c95d0",
            color: "#fff",
            borderWidth: null,
            borderColor: null,
        }
    })

    if (!itemID) return null;

    const first_day_timestamp = new Date(year, currentMonth, 1).getTime();
    const DAY_IN_MS = 86400000;

    // const payload = useSelector(state => habitSelectors.selectDatesItemById(state, itemID));

    return <View style={s.v}>
        <View style={s.gap} />
        {daysArray.map(day => {
            let timestamp = first_day_timestamp + (DAY_IN_MS * (day - 1))
            // const dayinPayload = payload?.indexOf(timestamp) > -1;

            function onDateSelect() {
                onChange(timestamp)
            }

            return <DayCalendarRender {...{ key: timestamp, itemID, day, timestamp, timestamp_now, onDateSelect, s, }} />
        })
        }
    </View>
}

const DayCalendarRender = (props) => {
    console.log("DayRenderItem rerender");
    
    const {
        itemID,
        timestamp,
        timestamp_now,
        onDateSelect,
        s,
        day } = props;
    const timestampSelected = useSelector((state) => habitSelectors.selectItemDateById(state, itemID, timestamp), shallowEqual)

    if (timestamp === timestamp_now)
        return <TouchableOpacity style={s.to} onPress={onDateSelect}>
            <Text style={[s.t, s.t_today, timestampSelected && s.selected]}>{day}</Text>
        </TouchableOpacity>

    if (timestamp < timestamp_now)
        return <TouchableOpacity style={s.to} onPress={onDateSelect}>
            <Text style={[s.t, timestampSelected && s.selected]}>{day}</Text>
        </TouchableOpacity>

    return <View style={s.to}><Text style={[s.t, s.t_inactive]}>{day}</Text></View>
}

export default Days;