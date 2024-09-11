import React from 'react'
import { Icon } from '@rneui/base';
import { Platform, Switch } from 'react-native';
import styled from 'styled-components/native';
import { getTheme } from '@constants';
import { useSelector } from 'react-redux';

const LineItemView = ({ children, rightArrow, toggle, toggleColor, onToggle, isEnabled, pl1, st }) => {
    const {theme} = useSelector(({app}) => ({theme: app.theme}))
    const LineItemViewItem = styled.View`
padding: 0;
align-items:center;
justify-content:space-between;
background-color: ${getTheme(theme).bgHighlight};
min-height: 55px;
min-width: 100%;
border-radius: 0;
margin:  0 0 7px;
flex-direction: row;
border: 1px solid ${getTheme(theme).borderColor};
border-left-color: transparent;
border-right-color: transparent;
`
    return (
        <LineItemViewItem style={{ paddingLeft: pl1 ? 18 : 0, paddingRight: pl1 ? 6 : 0, marginBottom: pl1 ? -1 : 7, ...st }}>
{children}
{rightArrow ? <Icon style={{ marginRight: 10 }} type="entypo" size={21} name="chevron-thin-right" color="#ccd1db" /> : null}
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
    : null}
        </LineItemViewItem>
    )
}



export default LineItemView;