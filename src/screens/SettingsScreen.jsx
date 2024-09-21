import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, Pressable, StatusBar, Linking } from 'react-native'
import { useTranslation } from 'react-i18next';

import { LineItemView, GapView, LineItemOptions, Segment, STHeader } from '@components'
import { LANG_MASKS, getThemeStatusBar } from '@constants';
import { appSelectors } from '@redux';
import { Feature, Lang, Rateapp, Support, Theme, Tutorial } from '@icons';
import { useCurrentTheme } from 'hooks';
import * as WebBrowser from 'expo-web-browser';



const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme, lang } = useSelector(appSelectors.selectAppThemeAndLang)
  const [themeColors] = useCurrentTheme();

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      height: "max-height"
    },
    scrollViewContent: {
      backgroundColor: themeColors.background,
    },
    t: {
      fontSize: 17,
      color: themeColors.textColorHighlight,
    },
    copyright: {
      width: "100%",
      position: "absolute",
      left: 0,
      bottom: 0,
      alignItems: "center",
      flexDirection: "column",
      marginBottom: 30,
      paddingVertical: 10,
      zIndex: -1
    },
    copyrightText: {
      color: themeColors.copyright,
      fontSize: 18,
    }
  })

  const navigateToPage = useCallback((path) => {
    navigation.navigate(path, {});
  });

  const openURL = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };



  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background }}>
      <STHeader
        navigation={navigation}
        title={t("st_screen")}
      />

      <ScrollView overScrollMode='always' contentContainerStyle={styles.scrollViewContent}>
        <View style={{ flex: 1, justifyContent: "flex-start", height: "100%", minHeight: 390 }}>
          <GapView />
          <Segment>
            <Pressable onPress={() => navigation.replace("tutorial")}>
              <LineItemView leftIcon={<Tutorial />} pl1 isFirstItem rightArrow>
                <Text style={styles.t}>{t("st_tutorial")}</Text>
              </LineItemView>
            </Pressable>

            <Pressable onPress={() => openURL('https://docs.google.com/forms/d/e/1FAIpQLSexoHccj3mXLLFMC4SV4SbV5NgIViojjLu7YE35ycBu2pkVSQ/viewform?usp=sf_link')}>
              <LineItemView leftIcon={<Support />} pl1 rightArrow>
                <Text style={styles.t}>{t("st_support")}</Text>
              </LineItemView>
            </Pressable>

            <LineItemOptions
              leftIcon={<Theme />}
              onPress={() => navigateToPage("settings/theme")}
              title={t("st_theme")}
              value={t(theme.theme + "")} />

            <LineItemOptions
              leftIcon={<Lang />}
              onPress={() => navigateToPage("settings/language")}
              title={t("st_lang")}
              value={LANG_MASKS[lang]?.mask} />
          </Segment>

          <GapView />

          <Segment>
            <Pressable onPress={() => openURL('https://docs.google.com/forms/d/e/1FAIpQLSd2chzzyUdExwXJXpBCHVP3JnU8nUETBQbe54DWoMWbHBHT_g/viewform?usp=sf_link')}>
              <LineItemView leftIcon={<Feature />} pl1 isFirstItem rightArrow>
                <Text style={styles.t}>{t("st_feat")}</Text>
              </LineItemView>
            </Pressable>

            <LineItemView leftIcon={<Rateapp />} pl1 rightArrow>
              <Text style={styles.t}>{t("st_rate")}</Text>
            </LineItemView>
          </Segment>
        </View>

      </ScrollView >

      <View style={styles.copyright} >
        <Text style={styles.copyrightText}>© weblxapplications.com</Text>
        <Text style={styles.copyrightText}>{new Date().getFullYear()}</Text>
      </View>
      <StatusBar translucent barStyle={getThemeStatusBar(theme, true)} />
    </View >
  )
}


export default SettingsScreen