import { useTranslation } from "react-i18next";
import { Days, WeekDays } from ".";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { SvgBack, SvgFront } from '@icons';

const NAV_HEIGHT = 48;

const Month = ({ color, date, onNavigate, activeColor, itemID, onChange, currentDate }) => {
    console.log('month rerender')
    const { width } = useWindowDimensions();
    const { t } = useTranslation();
    const year = date.getFullYear();
    const month = date.getMonth();


    const s = StyleSheet.create({
        v: {
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
        },
        vb: {
            flexDirection: "row",
            alignContent: "center",
        },
        m: {
            fontSize: 18,
            lineHeight: NAV_HEIGHT,
            color: color ? color : "#fff"
        },
        mf: {
            paddingRight: 6
        },
        p: {
            width: 55,
            height: NAV_HEIGHT,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: "5%"
        },
        p_left: {
            paddingLeft: 10
        },
        p_right: {
            paddingLeft: 5
        }
    });

    const onNavigateBack = () => onNavigate(true)
    const onNavigateFront = () => onNavigate(false)

    return (
        <View style={{ maxWidth: width, overflow: "hidden" }}>
            <View style={s.v}>
                <TouchableOpacity style={[s.p, s.p_left]} onPress={onNavigateBack}><SvgBack color={activeColor ? activeColor : "#3c95d0"} size={24} /></TouchableOpacity>
                <View style={s.vb}>
                    <Text style={[s.m, s.mf]}>{t("month_" + month)}</Text>
                    <Text style={s.m}>{year}</Text>
                </View>
                <TouchableOpacity style={[s.p, s.p_right]} onPress={onNavigateFront}><SvgFront color={activeColor ? activeColor : "#3c95d0"} size={24} /></TouchableOpacity>
            </View>
            <WeekDays month={month} activeColor={activeColor} />
            <Days {...{
                currentMonth: month,
                currentDate,
                color, activeColor, year,
                itemID, onChange,
            }} />
        </View>
    )
}

export default Month;