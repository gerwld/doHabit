import { View, Text } from 'react-native'
import React from 'react'
import moment from 'moment';
import styled from 'styled-components/native';
import { Icon } from '@rneui/base';

const LastSevenDays = ({ isTask }) => {
    const day = 24 * 60 * 60 * 1000;
    let timestamp = new Date().getTime();

    if (isTask) return (
        <ParentView>
            {[7, 6, 5, 4, 3, 2, 1]
                .map((i) =>
                    <TimeView>
                        <Icon type="antdesign" size={19} name="close" color="#839ab2" />
                    </TimeView>)}
        </ParentView>
    )
    return (
        <ParentView style={{ marginTop:  7 }}>
            {[7, 6, 5, 4, 3, 2, 1]
                .map((i) =>
                    <TimeView>
                        {moment(timestamp - (day * i)).format("MMM Do").split(" ").map(e => <T>{e}</T>)}
                    </TimeView>)}
        </ParentView>
    )
}

const TimeView = styled.View`
    width: min-content;
    min-width: 30px;
    display: flex;
    flex-direction:column;
    align-items: center;
    margin-right: 10px;
`

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

export default LastSevenDays