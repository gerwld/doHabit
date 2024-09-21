import React, { useCallback } from 'react'
import styled from 'styled-components/native';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';

import { useDispatch, useSelector } from 'react-redux';
import { habitSelectors } from '@redux';
import { habitsActions } from "actions";
import { useCurrentTheme } from "hooks";
import { Check1, Check2, Check3, Close1, Close2, Close3 } from '../../assets/svg/hicons_svgr';
import glow from "assets/img/glow.png"


const DAYS_COUNT = 5;
const RANGE_ARR = Array.from({ length: DAYS_COUNT }, (_, i) => DAYS_COUNT - 1 - i);

const ONE_DAY_IN_MS = 86400000;
const IS_APP = Platform.OS === "ios" || Platform.OS === "android";
const DATE = new Date();
const TIMESTAMP = DATE.setHours(0, 0, 0, 0)
const isCurrent = (i) => i === (DAYS_COUNT - 1);

export const LastSevenDays = React.memo(({ isHabit, habitID, color }) => {
    const { t } = useTranslation();
    const d = useDispatch();
    const item = useSelector(state => habitSelectors.selectItemById(state, habitID));

    const currentDay = useCallback(DATE.getDate(), [TIMESTAMP]);
    const currentMonth = useCallback((DATE.getMonth())); // Months are 0-indexed    
    const currentMonthMask = t("month_" + currentMonth).substring(0, 3)
    const tmsArr = item?.datesArray;
    const [themeColors] = useCurrentTheme();



    const onDayPress = React.useCallback((date) => {
        if (IS_APP) {
            Haptics.selectionAsync()
        }
        d(habitsActions.setHabitTimestamp({
            id: habitID,
            timestamp: date,
            isSet: true
        }))
    })

    if (isHabit) return (
        <ParentView style={styles.parentViewInt}>
            {RANGE_ARR
                .map((e, _) =>
                    <RenderItem
                        key={e + "__timestamp_key"}
                        onPress={() => onDayPress(TIMESTAMP - (ONE_DAY_IN_MS * e))}
                        e={e} color={color}
                        tmsArr={tmsArr}
                        themeColors={themeColors} />
                )}
        </ParentView>
    )
    return (
        <ParentView style={[{ marginTop: 14, marginBottom: 7 }, styles.parentView]}>
            {RANGE_ARR
                .map((e, i) => {
                    const activeStyle = isCurrent(i) ? { color: "#5fb1e7" } : null;
                    const iterationDay = currentDay - e;

                    return <TimeView key={`key_dayitem_${iterationDay}`}>
                        <T key={`key_dayitem${iterationDay}__part1`} style={activeStyle}>{currentMonthMask}</T>
                        <T key={`key_dayitem${iterationDay}__part2`} style={[activeStyle, { fontSize: 17, lineHeight: 19 }]}>{iterationDay}</T>
                    </TimeView>
                })
            }
        </ParentView>
    )
})


const RenderItem = ({ e, tmsArr, color, themeColors, onPress }) => {

    const [isPressed, setIsPressed] = React.useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const current = TIMESTAMP - (ONE_DAY_IN_MS * e);

    const s = StyleSheet.create({
        iconParent: {
            width: 30,
            height: 57,
            justifyContent: "center",
            alignItems: "center",
            overflow:"hidden",
        },
        parentGlowEffect: {
            backgroundColor: themeColors.bgHighlightSec,
            shadowColor: '#ffffff',

        },
        icon: {
            width: 26,
            height: 26,
            color: color ? color : "#5fb1e7",
            
        },
        iconX: {
            width: 24,
            height: 24,
            color: themeColors.crossSymb, 
        },
    })

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}

            key={e + "__dayid"}
            onPress={onPress}>
            <TimeView

                style={styles.timeWiewInt}>
                <View style={[s.iconParent, isPressed && s.parentGlowEffect]}>
                    <ItemIcon tmsArr={tmsArr} s={s} current={current} />
                </View>
            </TimeView>
        </Pressable>
    )
}

const ItemIcon = React.memo(({tmsArr, s, current}) => {
    return (
        (tmsArr?.filter && tmsArr?.filter(l => l === current).length > 0)
            ?
            <Check1 style={s.icon} />

            :
            <Close1 style={s.iconX} />
        
    )
})

const styles = StyleSheet.create({
    timeWiewInt: {
        height: 55,
        width: 31,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginRight: 0
    },
    parentViewInt: {
        marginRight: 4
    },
    parentView: {
        marginRight: 1
    }
});


const T = styled.Text`
    font-size: 12px;
    color: #526880;
    user-select: none;
`

const ParentView = styled.View`
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
`

const TimeView = styled.View`
    width: min-content;
    min-width: 30px;
    display: flex;
    flex-direction:column;
    align-items: center;
    margin-right: 2.5px;
`