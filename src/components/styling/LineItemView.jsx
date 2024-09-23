import React from 'react'
import { Platform, Pressable, Switch, View } from 'react-native';
import styled from 'styled-components/native';


import { useCurrentTheme } from 'hooks';
import Toggle from '../Toggle';
import { ChevronRight } from '../../../assets/svg/hicons_svgr';
import { PLATFORM } from '@constants';

const LineItemView = React.memo(({ onPress,isFirstItem, leftIcon, children, rightArrow, toggle, toggleColor, onToggle, isEnabled, pl1, st }) => {
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


    const content = (
        <LineItemViewItem style={[{ 
                borderTopWidth: isFirstItem ? 0 : 1, 
                paddingLeft: pl1 ? 18 : 0, 
                paddingRight: pl1 ? 6 : 0, 
                marginBottom: pl1 ? 0 : 7, 
                ...st 
            }, 
            !pl1 && {borderTopWidth: 0, borderTopWidth: 0}]}>
            {leftIcon ? <View style={{ height: 33, width: 33, marginRight: 12 }}>{leftIcon}</View> : null}
            {leftIcon ? <View style={{ flex: 1, flexDirection: "row" }}>{children}</View> : children}


            {rightArrow ? <ChevronRight style={{ marginLeft: 5, marginRight: 8, marginTop: 1, width: 20, height: 22}} color={themeColors.chevron} /> : null}

            {toggle ?
                PLATFORM === "ios"
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

    if(onPress) return <Pressable onPress={onPress}>{content}</Pressable>
    return content;

});



export default LineItemView;