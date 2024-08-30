import { Icon } from '@rneui/base';
import React from 'react'
import { Text } from 'react-native';
import styled from "styled-components/native";


 const LineItemViewItem = styled.View`
padding: 10px 10px 10px 15px;
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

export const LineItemView = ({children, rightArrow}) => (
    <LineItemViewItem>
        {children}
        {rightArrow ? <Icon type="entypo" size={21} name="chevron-thin-right" color="#ccd1db" /> : ""}
    </LineItemViewItem>
)

