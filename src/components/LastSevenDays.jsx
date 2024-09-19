import React, { useCallback } from 'react'
import styled from 'styled-components/native';
import { Icon } from '@rneui/base';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';

import { useDispatch, useSelector } from 'react-redux';
import { habitSelectors } from '@redux';
import { habitsActions } from "actions";
import { useCurrentTheme } from "hooks";



const DAYS_COUNT = 5;
const RANGE_ARR = Array.from({ length: DAYS_COUNT }, (_, i) => DAYS_COUNT - 1 - i);

const ONE_DAY_IN_MS = 86400000;
const IS_APP = Platform.OS === "ios" || Platform.OS === "android";
const DATE = new Date();
const TIMESTAMP = DATE.setHours(0,0,0,0)
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
                .map((e, i) =>
                    <Pressable key={e + "__dayid"} onPress={() => onDayPress(TIMESTAMP - (ONE_DAY_IN_MS * e))}>
                        <TimeView style={styles.timeWiewInt}>
                            {(tmsArr?.filter && tmsArr?.filter(l => l === TIMESTAMP - (ONE_DAY_IN_MS * e)).length > 0)
                                ? <Icon style={{ pointerEvents: "none" }} type="antdesign" size={24} name="check" color={color ? color : "#5fb1e7"} />
                                : <Icon style={{ pointerEvents: "none" }} type="antdesign" size={24} name="close" color={themeColors.crossSymb} />}
                        </TimeView>
                    </Pressable>
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

const styles = StyleSheet.create({
    timeWiewInt: {
        minHeight: 50,
        width: 33,
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
    margin-right: 3px;
`