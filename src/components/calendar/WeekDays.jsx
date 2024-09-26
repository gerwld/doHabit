import { StyleSheet, Text, View } from "react-native";

const WeekDays = ({ activeColor, month, weekday }) => {
    console.log('weekdays rerender')

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

export default WeekDays;