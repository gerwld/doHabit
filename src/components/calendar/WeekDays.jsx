import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { getWeekdays } from "../../constants";
import { useTranslation } from "react-i18next";

const WeekDays = ({ activeColor, month }) => {
    console.log('weekdays rerender')
    const {t} = useTranslation();
    const { width } = useWindowDimensions();
    const weekdays = getWeekdays();

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
        {weekdays.map(w => <Text key={w + month + "_key"} style={s.t}>{t(w)}</Text>)}
    </View>
}

export default WeekDays;