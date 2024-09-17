import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next';

import { LineItemView, GapView, LineItemOptions, Segment } from '@components'
import { LANG_MASKS, getTheme, getThemeStatusBar } from '@constants';
import { StatusBar } from 'react-native';
import { appSelectors } from '@redux';
import SettingsHeader from '../components/header/SettingsHeader';


const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme, lang } = useSelector(appSelectors.selectAppThemeAndLang)

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      height: "max-height"
    },
    scrollViewContent: {
      backgroundColor: getTheme(theme).background,
    },
    t: {
      fontSize: 17,
      color: getTheme(theme).textColorHighlight,
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
      color: getTheme(theme).crossSymb,
      fontSize: 18,
    }
  })

  const navigateToPage = useCallback((path) => {
    navigation.navigate(path, {});
  });


  return (
    <View style={{ flex: 1, backgroundColor: getTheme(theme).background }}>
      <SettingsHeader
        navigation={navigation}
        theme={theme}
        title={t("st_screen")}
      />

      <Text>{JSON.stringify(theme)}</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ flex: 1, justifyContent: "flex-start", height: "100%", minHeight: 390 }}>
          <GapView />

          <Segment>
            <Pressable onPress={() => navigation.replace("tutorial")}>
              <LineItemView pl1 isFirstItem rightArrow>
                <Text style={styles.t}>{t("st_tutorial")}</Text>
              </LineItemView>
            </Pressable>

            <LineItemView pl1 rightArrow>
              <Text style={styles.t}>{t("st_support")}</Text>
            </LineItemView>

            <LineItemOptions
              onPress={() => navigateToPage("settings/theme")}
              title={t("st_theme")}
              value={t(theme.theme + "")} />

            <LineItemOptions
              onPress={() => navigateToPage("settings/language")}
              title={t("st_lang")}
              value={LANG_MASKS[lang]} />
          </Segment>

          <GapView />

          <Segment>
            <LineItemView pl1 isFirstItem rightArrow>
              <Text style={styles.t}>{t("st_feat")}</Text>
            </LineItemView>

            <LineItemView pl1 rightArrow>
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