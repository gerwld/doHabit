import React from 'react'
import { View, Text, Pressable, SafeAreaView } from 'react-native'
import { useHeaderStyles } from 'hooks';
import { useTranslation } from 'react-i18next';
import { getTheme } from '@constants';


const STHeader = React.memo(({
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

    return (<>
        <View style={[headerStyles.header, { backgroundColor: s.backgroundColor }]}>
            <SafeAreaView style={headerStyles.headerContent}>

                {leftComponent ? leftComponent :
                    <Pressable
                        style={headerStyles.leftComponent}
                        onPress={() => {
                            if (onGoBack) onGoBack()
                            else navigation.goBack()
                        }}>
                        <Text style={[headerStyles.headerButton, s.textColor]}>{leftText ? leftText : t("act_back")}</Text>
                    </Pressable>}


                <View style={headerStyles.centerComponent}>
                    <Text style={[headerStyles.headerTitle, s.textColor]}>{title}</Text>
                </View>

                {rightComponent ? rightComponent :
                    <Pressable
                        onPress={rightPress}
                        style={[headerStyles.rightComponent, { opacity: rightPress === null ? 0.6 : 1 }]}>
                        <Text style={[headerStyles.headerButton, headerStyles.headerButtonRight, s.textColor]}>{rightText}</Text>
                    </Pressable>}

            </SafeAreaView>
        </View>
    </>
    )
});

export default STHeader