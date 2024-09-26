import { View, TouchableOpacity, useWindowDimensions, StyleSheet, Text } from "react-native";



const Days = ({ currentMonth, currentDate, color, year, activeColor, payload, weekday, onChange  }) => {
    console.log('days rerender')
    const timestamp_now = new Date(currentDate.setHours(0, 0, 0, 0)).getTime();
    const { width } = useWindowDimensions();
    const firstDayOfMonth = new Date(2024, currentMonth, 1);
    const dayOfWeek = firstDayOfMonth.toLocaleString('en-US', { weekday: 'long' });
    const fdayIndex = weekday.indexOf(dayOfWeek);
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
            flexShrink: 0,
            flexGrow: 0,
            width: 42,
            minWidth: 42,
            marginHorizontal: (Math.floor(width / 7) - 42) / 2,
            marginTop: 5,
            height: 42,
            borderRadius: 21,
            overflow: "hidden",
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

    const first_day_timestamp = new Date(year, currentMonth, 1).getTime();
    const DAY_IN_MS = 86400000;
    return <View style={s.v}>
        <View style={s.gap} />
        {daysArray.map(day => {
            let timestamp = first_day_timestamp + (DAY_IN_MS * (day - 1))
            const dayinPayload = payload.indexOf(timestamp) > -1;

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

            else return <Text key={timestamp} style={[s.t, s.t_inactive]}>{day}</Text>
        })
        }
    </View>
}

export default Days;