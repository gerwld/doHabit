import React from 'react'
import { Icon } from '@rneui/base';
import { Platform, Switch, View } from 'react-native';
import styled from 'styled-components/native';


import { useCurrentTheme } from 'hooks';
import Toggle from '../Toggle';

const LineItemView = React.memo(({ isFirstItem, leftIcon, children, rightArrow, toggle, toggleColor, onToggle, isEnabled, pl1, st }) => {
    const [themeColors] = useCurrentTheme();
    const LineItemViewItem = styled.View`
padding: 0;
align-items:center;
justify-content:space-between;
background-color: ${themeColors.bgHighlight};
min-height: 55px;
min-width: 100%;
border-radius: 0;
margin:  0 0 7px;
flex-direction: row;
border: 3.6px solid ${pl1 ? themeColors.borderColor : "transparent"};
border-left-width: 0;
border-right-width: 0;
border-bottom-width: 0;
`;


    return (
        <LineItemViewItem style={{ borderTopWidth: isFirstItem ? 0 : 1, paddingLeft: pl1 ? 14 : 0, paddingRight: pl1 ? 6 : 0, marginBottom: pl1 ? -1 : 7, ...st }}>
            {leftIcon ? <View style={{ height: 34, width: 34, marginRight: 10 }}>{leftIcon}</View> : null}
            {leftIcon ? <View style={{ flex: 1, flexDirection: "row" }}>{children}</View> : children}


            {rightArrow ? <Icon style={{ marginHorizontal: 5 }} type="entypo" size={18} name="chevron-thin-right" color="#ccd1db" /> : null}
            {toggle ?
                Platform.OS === "ios"
                    ? <Switch
                        style={{ marginRight: 10 }}
                        trackColor={{ false: '#d7dcde', true: (toggleColor ? toggleColor : '#81b0ff') }}
                        thumbColor={"#ffffff"}
                        ios_backgroundColor={themeColors.thumbBackgroundIos}
                        onValueChange={onToggle ? onToggle : null}
                        value={isEnabled}
                        {...Platform.select({
                            web: {
                                activeThumbColor: "white"
                            }
                        })}
                    />
                    : <Toggle
                        style={{ marginRight: 10 }}
                        toggleColor={(toggleColor ? toggleColor : '#81b0ff')}
                        backgroundColor={themeColors.thumbBackground}
                        onToggle={() => onToggle(!isEnabled)}
                        value={isEnabled}
                    />
                : null}
        </LineItemViewItem>
    );

});



export default LineItemView;