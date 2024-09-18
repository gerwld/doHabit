import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, Pressable, StatusBar } from 'react-native'
import { useTranslation } from 'react-i18next';

import { LineItemView, GapView, LineItemOptions, Segment, STHeader } from '@components'
import { LANG_MASKS, getTheme, getThemeStatusBar } from '@constants';
import { appSelectors } from '@redux';
import { Feature, Lang, Rateapp, Support, Theme, Tutorial } from '@icons';



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
      <STHeader
        navigation={navigation}
        theme={theme}
        title={t("st_screen")}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ flex: 1, justifyContent: "flex-start", height: "100%", minHeight: 390 }}>
          <GapView />
          <Segment>
            <Pressable onPress={() => navigation.replace("tutorial")}>
              <LineItemView leftIcon={<Tutorial/>} pl1 isFirstItem rightArrow>
                <Text style={styles.t}>{t("st_tutorial")}</Text>
              </LineItemView>
            </Pressable>

            <LineItemView leftIcon={<Support/>} pl1 rightArrow>
              <Text style={styles.t}>{t("st_support")}</Text>
            </LineItemView>

            <LineItemOptions
              leftIcon={<Theme/>}
              onPress={() => navigateToPage("settings/theme")}
              title={t("st_theme")}
              value={t(theme.theme + "")} />

            <LineItemOptions
              leftIcon={<Lang/>}
              onPress={() => navigateToPage("settings/language")}
              title={t("st_lang")}
              value={LANG_MASKS[lang].mask} />
          </Segment>

          <GapView />

          <Segment>
            <LineItemView leftIcon={<Feature/>} pl1 isFirstItem rightArrow>
              <Text style={styles.t}>{t("st_feat")}</Text>
            </LineItemView>

            <LineItemView leftIcon={<Rateapp/>} pl1 rightArrow>
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