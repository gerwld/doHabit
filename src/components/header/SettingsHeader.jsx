import React from 'react'
import { Text, Pressable } from 'react-native'
import { Header as HeaderRNE } from '@rneui/themed';
import { useHeaderStyles } from 'hooks';
import { useTranslation } from 'react-i18next';
import { getTheme } from '@constants';


const SettingsHeader = React.memo(({
    theme,
    navigation,
    title,
    onGoBack,
    leftComponent,
    rightComponent,
    leftText,
    rightText,
    rightPress,
    bgColor,
    ...rest 
}) => {
    const { t } = useTranslation();
    const headerStyles = useHeaderStyles(theme, isWhite = true);

    // header styles based on it's background color. if duotone then 
    // from headerStyles hook preset, otherways - white text and color bg
    const s = {
        textColor: { color: bgColor ? "#ffffff" : getTheme(theme).textColorHighlight },
        backgroundColor: bgColor ? bgColor : getTheme(theme).bgHighlight
    }

    return (
        <HeaderRNE
            {...rest}
            containerStyle={headerStyles.header}
            leftComponent={
                leftComponent ? leftComponent :
                    <Pressable onPress={() => {
                        if(onGoBack) {
                            onGoBack()
                        }
                        else navigation.goBack()
                        }}>
                        <Text style={[headerStyles.headerButton, s.textColor]}>{leftText ? leftText : t("act_back")}</Text>
                    </Pressable>
            }
            rightComponent={
                rightComponent ? rightComponent : 
                    <Pressable onPress={rightPress} style={{opacity: rightPress === null ? 0.6 : 1}}>
                        <Text style={[headerStyles.headerButton, headerStyles.headerButtonRight, s.textColor]}>{rightText}</Text>
                    </Pressable>
            }
            centerComponent={<Text style={[headerStyles.headerTitle, s.textColor]}>{title}</Text>}
            backgroundColor={s.backgroundColor}
        />
    )
});

export default SettingsHeader