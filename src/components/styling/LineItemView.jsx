import { Icon } from '@rneui/base';
import React from 'react'
import { Platform, Switch, Text } from 'react-native';
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
border: 1px solid #e5e5eaff;
`

export const LineItemView = ({ children, rightArrow, toggle, onToggle, isEnabled }) => (
    <LineItemViewItem>
        {children}
        {rightArrow ? <Icon style={{ marginRight: 10 }} type="entypo" size={21} name="chevron-thin-right" color="#ccd1db" /> : ""}
        {toggle ?
            <Switch
            style={{ marginRight: 10 }}
            trackColor={{ false: '#d7dcde', true: '#81b0ff' }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#eff2f3"
            onValueChange={onToggle ? onToggle : null}
            value={isEnabled}
            {...Platform.select({web: {
                activeThumbColor: "white"
            }})}
        />
            : ""}
    </LineItemViewItem>
)

