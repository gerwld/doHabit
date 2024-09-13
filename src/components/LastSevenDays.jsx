import React, { useMemo } from 'react'
import moment from 'moment';
import styled from 'styled-components/native';
import { Icon } from '@rneui/base';
import { Platform, Pressable, StyleSheet, Vibration } from 'react-native';

import { habitsActions } from "actions";
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '@constants';
import { appSelectors, habitSelectors } from '@redux';
import * as Haptics from 'expo-haptics';

const DAYS_COUNT = 5;
const ONE_DAY_IN_MS = 86400000;
const IS_APP = Platform.OS === "ios" || Platform.OS === "android";
const timestamp = new Date().setHours(0, 0, 0, 0);
const RANGE_ARR = Array.from({ length: DAYS_COUNT }, (_, i) => DAYS_COUNT - 1 - i);
const isCurrent = (i) => i === (DAYS_COUNT - 1);

export const LastSevenDays = React.memo(({ isHabit, habitID, color }) => {
    const d = useDispatch();
    const item = useSelector(state => habitSelectors.selectItemById(state, habitID));
    const theme = useSelector(appSelectors.selectAppTheme);
    const tmsArr = item?.datesArray;


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
                    <Pressable key={e + "__dayid"} onPress={() => onDayPress(timestamp - (ONE_DAY_IN_MS * e))}>
                        <TimeView style={styles.timeWiewInt}>
                            {(tmsArr?.filter && tmsArr?.filter(l => l === timestamp - (ONE_DAY_IN_MS * e)).length > 0)
                                ? <Icon style={{ pointerEvents: "none" }} type="antdesign" size={24} name="check" color={color ? color : "#5fb1e7"} />
                                : <Icon style={{ pointerEvents: "none" }} type="antdesign" size={24} name="close" color={getTheme(theme).crossSymb} />}
                        </TimeView>
                    </Pressable>
                )}
        </ParentView>
    )
    return (
        <ParentView style={{ marginTop: 14, marginBottom: 7 }}>
            {RANGE_ARR
                .map((e, i) => {
                    const dayWithoutTime = timestamp - (ONE_DAY_IN_MS * e);
                    return <TimeView key={`key_dayitem_${dayWithoutTime}`}>
                        {moment(dayWithoutTime)
                            .format("MMM Do")
                            .split(" ")
                            .map((v, l) => <T key={`key_dayitem${dayWithoutTime}__part${l}`} style={isCurrent(i) ? { color: "#5fb1e7" } : null}>{v}</T>)}
                    </TimeView>
                }
                )}
        </ParentView>
    )
})

const TimeView = styled.View`
    width: min-content;
    min-width: 30px;
    display: flex;
    flex-direction:column;
    align-items: center;
    margin-right: 3px;
`

const styles = StyleSheet.create({
    timeWiewInt: {
        minHeight: 55,
        width: 33,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginRight: 0
    },
    parentViewInt: {
        marginRight: 4
    }
});


const T = styled.Text`
    font-size: 14px;
    font-size: 12px;
    color: #526880;
    user-select: none;
`


const ParentView = styled.View`
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
`