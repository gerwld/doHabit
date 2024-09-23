import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image } from 'react-native'

import { useCurrentTheme } from 'hooks';
import { ScrollPages } from '@components'
import { getTheme } from '@constants';

import logo from "assets/adaptive-icon.png"
import logo_dark from "assets/adaptive-icon__dark.png"

import {
    l1_ios,
    l2_ios,
    l3_ios,
    d1_ios,
    d2_ios,
    d3_ios
} from "assets";



const TutorialScreen = () => {
    const {t} = useTranslation();

    const [themeColors, theme] = useCurrentTheme();
    const isDarkTheme = getTheme(theme)?.label === "dark"; 
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: themeColors.textColor,
            marginBottom: 10
        },
        description: {
            fontSize: 14,
            color: "gray",
            textAlign: "center",
            lineHeight: 24,
            marginBottom: 10,
            paddingHorizontal: 20,
            minHeight: 100
        },
        previewImg: {
            width: "100%",
            height: "82%",
            marginTop: "4%",
        },
        mainLogo: {
            width: "55%",
            maxWidth: 300,
            marginTop: "5%"
        },
        imgBox: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
        }
    })

    return (
        <ScrollPages>
            <View style={styles.screen}>
                <View style={styles.imgBox}>
                    <Image source={isDarkTheme ? logo : logo_dark} resizeMode="contain" style={styles.mainLogo} />
                </View>
                <Text style={styles.title}>{t("tutorial_title_screen_1")}</Text>
                <Text style={styles.description}>{t("tutorial_desc_screen_1")}</Text>
            </View>

            <View style={styles.screen}>
                <View style={styles.imgBox}>
                    <Image source={isDarkTheme ? d2_ios : l2_ios} resizeMode="contain" style={styles.previewImg} />
                </View>
                <Text style={styles.title}>{t("tutorial_title_screen_2")}</Text>
                <Text style={styles.description}>{t("tutorial_desc_screen_2")}</Text>
            </View>

            <View style={styles.screen}>
                <View style={styles.imgBox}>
                <Image source={isDarkTheme ? d1_ios : l1_ios} resizeMode="contain" style={styles.previewImg} />
                </View>
                <Text style={styles.title}>{t("tutorial_title_screen_3")}</Text>
                <Text style={styles.description}>{t("tutorial_desc_screen_3")}</Text>
            </View>
            <View style={styles.screen}>
                <View style={styles.imgBox}>
                <Image source={isDarkTheme ? d3_ios : l3_ios} resizeMode="contain" style={styles.previewImg} />
                </View>
                <Text style={styles.title}>{t("tutorial_title_screen_4")}</Text>
                <Text style={styles.description}>{t("tutorial_desc_screen_4")}</Text>
            </View>
        </ScrollPages>
    )
}

export default TutorialScreen