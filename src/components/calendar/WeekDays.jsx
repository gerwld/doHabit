import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const WeekDays = ({ activeColor, month, weekday }) => {
    console.log('weekdays rerender')
    const { width } = useWindowDimensions();

    const s = StyleSheet.create({
        v: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: 5
        },
        t: {
            paddingTop: 4,
            width: (Math.floor(width / 7)),
            maxWidth: (Math.floor(width / 7)),
            minWidth: (Math.floor(width / 7)),
            textAlign: "center",
            color: activeColor ? activeColor : "#3c95d0"
        }
    })
    return <View style={s.v} >
        {weekday.map(w => <Text key={w + month + "_key"} style={s.t}>{w.slice(0, 3)}</Text>)}
    </View>
}

export default WeekDays;