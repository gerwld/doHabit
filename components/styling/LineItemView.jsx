import { Icon } from '@rneui/base';
import React from 'react'
import { Switch, Text } from 'react-native';
import styled from "styled-components/native";


const LineItemViewItem = styled.View`
padding: 10px 0px 10px 15px;
align-items:center;
justify-content:space-between;
background-color: #ffffff;
min-height: 55px;
min-width: 100%;
border-radius: 0;
margin: 7px 0 0;
flex-direction: row;
border: 1px solid #dde7ee;
`

export const LineItemView = ({ children, rightArrow, toggle, onToggle, isEnabled }) => (
    <LineItemViewItem>
        {children}
        {rightArrow ? <Icon style={{ marginRight: 10 }} type="entypo" size={21} name="chevron-thin-right" color="#ccd1db" /> : ""}
        {toggle ?
                <Switch
                    style={{ marginRight: 10 }}
                    trackColor={{ false: '#b1b1b1', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#968d8d"
                    onValueChange={onToggle ? onToggle : null}
                    value={isEnabled ? isEnabled : null}
                />
            : ""}
    </LineItemViewItem>
)

