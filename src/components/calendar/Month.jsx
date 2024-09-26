import { useTranslation } from "react-i18next";
import { Days, WeekDays } from ".";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { SvgBack, SvgFront } from '@icons';

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Month = ({ color, date, onNavigate, activeColor, itemID, onChange, currentDate }) => {
    console.log('month rerender')
    const { t } = useTranslation();
    const year = date.getFullYear();
    const month = date.getMonth();
    const { width } = useWindowDimensions();

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
            <WeekDays month={month} activeColor={activeColor} weekday={weekday} />
            <Days {...{
                currentMonth: month,
                currentDate,
                color, activeColor, year,
                itemID, onChange,
                weekday
            }} />
        </View>
    )
}

export default Month;