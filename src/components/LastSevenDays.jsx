import React from 'react'
import moment from 'moment';
import styled from 'styled-components/native';
import { Icon } from '@rneui/base';
import { Pressable, StyleSheet } from 'react-native';

import { habitsActions } from "actions";
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '@constants';
import { appSelectors, habitSelectors } from '@redux';

const DAYS_COUNT = 5;

export const LastSevenDays = ({ isHabit, habitID, color }) => {
    const day = 86400000,
    timestamp = new Date().setHours(0, 0, 0, 0),
    RANGE_ARR = Array.from({ length: DAYS_COUNT }, (_, i) => DAYS_COUNT - 1 - i);
const isCurrent = (i) => i === (DAYS_COUNT - 1);


    const d = useDispatch();
    const item = useSelector(state => habitSelectors.selectItemById(state, habitID));
    const theme = useSelector(appSelectors.selectAppTheme);
    const tmsArr = item?.datesArray;
 

    const onDayPress = (date) => {
        // alert(date, habitID);
        d(habitsActions.setHabitTimestamp({
            id: habitID,
            timestamp: date,
            isSet: true
        }))
    }

    if (isHabit) return (
        <ParentView style={styles.parentViewInt}>
            {RANGE_ARR
                .map((e, i) =>
                    <Pressable key={e + "__dayid"} onPress={() => onDayPress(timestamp - (day * e))}>
                        <TimeView style={styles.timeWiewInt}>
                        {(tmsArr?.filter && tmsArr?.filter(l => l === timestamp - (day * e)).length > 0) 
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
                    const dayWithoutTime = timestamp - (day * e);
                    return <TimeView key={`key_dayitem_${dayWithoutTime}`}>
                        {moment(dayWithoutTime)
                            .format("MMM Do")
                            .split(" ")
                            .map((v, i) => <T key={`key_dayitem${dayWithoutTime}__part${i}`} style={isCurrent(i) ? { color: "#5fb1e7" } : null}>{v}</T>)}
                    </TimeView>}
                    )}
        </ParentView>
    )
}

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