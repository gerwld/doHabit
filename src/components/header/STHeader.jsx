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
                <View style={[headerStyles.leftComponent]}>
                    <Pressable
                        style={headerStyles.componentPressable}
                        onPress={() => {
                            if (onGoBack) onGoBack()
                            else navigation.goBack()
                        }}>
                        <Text 
                        numberOfLines={1} ellipsizeMode='tail'
                        style={[headerStyles.headerButton, s.textColor]}>{leftText ? leftText : t("act_back")}</Text>
                    </Pressable>
                </View>}


                <View style={headerStyles.centerComponent}>
                    <Text style={[headerStyles.headerTitle, s.textColor]}>{title}</Text>
                </View>

                {rightComponent ? rightComponent :
                    rightText
                        ? <View style={[headerStyles.rightComponent]}>
                            <Pressable
                                onPress={rightPress}
                                style={[headerStyles.componentPressable, headerStyles.componentPressableRight, { opacity: rightPress === null ? 0.6 : 1 }]}>
                                <Text 
                                numberOfLines={1} ellipsizeMode="tail"
                                style={[headerStyles.headerButton, s.textColor]}>{rightText}</Text>
                            </Pressable>
                        </View>
                        : <View style={headerStyles.rightComponent} />}

            </SafeAreaView>
        </View>
    </>
    )
});

export default STHeader