import React from 'react'
import { Icon } from '@rneui/base';
import { Platform, Switch, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { getTheme } from '@constants';
import { useSelector } from 'react-redux';
import { appSelectors } from '@redux';

const LineItemView = ({ isFirstItem, leftIcon, children, rightArrow, toggle, toggleColor, onToggle, isEnabled, pl1, st }) => {
    const theme = useSelector(appSelectors.selectAppTheme);
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
border: 3.6px solid ${pl1 ? getTheme(theme).borderColor : "transparent"};
border-left-width: 0;
border-right-width: 0;
border-bottom-width: 0;
`;


    return (
        <LineItemViewItem style={{ borderTopWidth: isFirstItem ? 0 : 1, paddingLeft: pl1 ? 18 : 0, paddingRight: pl1 ? 6 : 0, marginBottom: pl1 ? -1 : 7, ...st }}>
            {leftIcon ? <View style={{height: 34, width: 34, marginRight: 10}}>{leftIcon}</View> : null}
            {leftIcon ? <View style={{flex: 1, flexDirection: "row"}}>{children}</View> : children}


            {rightArrow ? <Icon style={{ marginHorizontal: 5 }} type="entypo" size={18} name="chevron-thin-right" color="#ccd1db" /> : null}
            {toggle ?
                <Switch
                    style={{ marginRight: 10 }}
                    trackColor={{ false: '#d7dcde', true: (toggleColor ? toggleColor : '#81b0ff') }}
                    thumbColor={"#ffffff"}
                    ios_backgroundColor={getTheme(theme).thumbBackground}
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
    );

}



export default LineItemView;