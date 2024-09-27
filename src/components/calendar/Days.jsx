import { View, TouchableOpacity, useWindowDimensions, StyleSheet, Text } from "react-native";
import { habitSelectors } from "@redux";
import { useSelector } from "react-redux";
import { getWeekdays } from "@constants";
import { useWidthDimensions } from "hooks";


const Days = ({ currentMonth, currentDate, color, year, activeColor, itemID, onChange  }) => {
    console.log('days rerender')
    const { width } = useWidthDimensions(600, 20);

    const timestamp_now = new Date(currentDate.setHours(0, 0, 0, 0)).getTime();   
    const firstDayOfMonth = new Date(2024, currentMonth, 1);
    const lastDayOfMonth = new Date(2024, currentMonth + 1, 0);

    const dayOfWeek = firstDayOfMonth.toLocaleString('en-US', { weekday: 'long' });
    const fdayIndex = getWeekdays().indexOf(dayOfWeek.toLowerCase());
    const daysArray = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);

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
            width: 40,
            minWidth: 40,
            marginHorizontal: (Math.floor(width / 7) - 40) / 2,
            marginTop: (Math.floor(width / 7) - 40) / 2,
            height: 40,
            borderRadius: 12,
            overflow: "hidden",
            lineHeight: 39,
            fontSize: 17,
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
            height: 40,
            paddingLeft: fdayIndex * Math.floor(width / 7),
        },
        selected: {
            backgroundColor: activeColor ? activeColor : "#3c95d0",
            color: "#fff"
        }
    })

    if(!itemID) return null;

    const first_day_timestamp = new Date(year, currentMonth, 1).getTime();
    const DAY_IN_MS = 86400000;
    
    const payload = useSelector(state => habitSelectors.selectDatesItemById(state, itemID));

    return <View style={s.v}>
        <View style={s.gap} />
        {daysArray.map(day => {
            let timestamp = first_day_timestamp + (DAY_IN_MS * (day - 1))
            const dayinPayload = payload?.indexOf(timestamp) > -1;

            function onDateSelect() {
                onChange(timestamp)
            }

            if (timestamp === timestamp_now)
                return <TouchableOpacity key={timestamp} style={s.to} onPress={onDateSelect}>
                    <Text style={[s.t, s.t_today, dayinPayload ? s.selected : null]}>{day}</Text>
                </TouchableOpacity>

            if (timestamp < timestamp_now)
                return <TouchableOpacity key={timestamp} style={s.to} onPress={onDateSelect}>
                    <Text style={[s.t, dayinPayload ? s.selected : null]}>{day}</Text>
                </TouchableOpacity>

            else return <View key={timestamp} style={s.to}><Text style={[s.t, s.t_inactive]}>{day}</Text></View>
        })
        }
    </View>
}

export default Days;