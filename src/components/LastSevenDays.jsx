import React from 'react'
import moment from 'moment';
import styled from 'styled-components/native';
import { Icon } from '@rneui/base';
import { v4 as uuid } from 'uuid';

export const LastSevenDays = ({ isTask }) => {
    const day = 24 * 60 * 60 * 1000;
    let timestamp = new Date().getTime();

    if (isTask) return (
        <ParentView>
            {[5, 4, 3, 2, 1]
                .map((i) =>
                    <TimeView key={uuid()}>
                        <Icon type="antdesign" size={19} name="close" color="#a5bbd3" />
                    </TimeView>)}
        </ParentView>
    )
    return (
        <ParentView style={{ marginTop:  7 }}>
            {[5, 4, 3, 2, 1]
                .map((i) =>
                    <TimeView key={uuid()}>
                        {moment(timestamp - (day * i)).format("MMM Do").split(" ").map(e => <T key={uuid()}>{e}</T>)}
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