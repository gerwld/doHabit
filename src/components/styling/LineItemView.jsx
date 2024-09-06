import React from 'react'
import { Icon } from '@rneui/base';
import { Platform, Switch } from 'react-native';
import styled from 'styled-components/native';

const LineItemView = ({ children, rightArrow, toggle, toggleColor, onToggle, isEnabled, pl1 }) => (
    <LineItemViewItem style={{paddingLeft: pl1 ? 18 : 0, paddingRight: pl1 ? 6 : 0}}>
        {children}
        {rightArrow ? <Icon style={{ marginRight: 10 }} type="entypo" size={21} name="chevron-thin-right" color="#ccd1db" /> : ""}
        {toggle ?
            <Switch
                style={{ marginRight: 10 }}
                trackColor={{ false: '#d7dcde', true: (toggleColor ? toggleColor : '#81b0ff') }}
                thumbColor={"#ffffff"}
                ios_backgroundColor="#eff2f3"
                onValueChange={onToggle ? onToggle : null}
                value={isEnabled}
                {...Platform.select({
                    web: {
                        activeThumbColor: "white"
                    }
                })}
            />
            : ""}
    </LineItemViewItem>
)

const LineItemViewItem = styled.View`
padding: 0;
align-items:center;
justify-content:space-between;
background-color: #ffffff;
min-height: 55px;
min-width: 100%;
border-radius: 0;
margin:  0 0 7px;
flex-direction: row;
border: 1px solid #e5e5eaff;
`



export default LineItemView;