import React from 'react'
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Header as HeaderRNE } from '@rneui/themed';

import { LineItemView, GapView, LineItemOptions } from '@components'
import { LANG_MASKS, getTheme, getThemeStatusBar } from '@constants';
import { useHeaderStyles } from 'hooks';
import { StatusBar } from 'react-native';
import { appSelectors } from '@redux';


const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  // const { theme, lang } = useSelector(({ app }) => ({
  //   theme: app?.theme,
  //   lang: app?.lang
  // }))

  const { theme, lang } = useSelector(appSelectors.selectAppThemeAndLang)



  const headerStyles = useHeaderStyles(theme, isWhite = true);

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      height: "max-height"
    },
    scrollViewContent: {
      // flex: 1,
      backgroundColor: getTheme(theme).background,
      //  height: "80%"
    },
    t: {
      fontSize: 16,
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
      fontSize: 16,
    }
  })

  const navigateToPage = (path) => {
    navigation.navigate(path, {
      // onGoBack: ({ data }) => {
      //   // Callback function to handle data from ScreenB
      //   // setState(data);
      // },
    });
  }


  return (
    <View style={{ flex: 1, backgroundColor: getTheme(theme).background }}>
      <HeaderRNE
        containerStyle={headerStyles.header}
        leftComponent={
          <Pressable onPress={() => navigation.navigate('home')}>
            <Text style={headerStyles.headerButton}>{t("act_back")}</Text>
          </Pressable>
        }
        centerComponent={<Text style={headerStyles.headerTitle}>{t("st_screen")}</Text>}
        backgroundColor={getTheme(theme).bgHighlight}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <GapView />
        <View style={{ flex: 1, justifyContent: "flex-start", height: "100%", minHeight: 390 }}>
          <Pressable onPress={() => navigation.replace("tutorial")}>
            <LineItemView pl1 rightArrow>
              <Text style={styles.t}>{t("st_tutorial")}</Text>
            </LineItemView>
          </Pressable>

          <LineItemView pl1 rightArrow>
            <Text style={styles.t}>{t("st_support")}</Text>
          </LineItemView>


          <LineItemOptions
            onPress={() => navigateToPage("settings/theme")}
            title={t("st_theme")}
            value={t(theme + "")} />


          <LineItemOptions
            onPress={() => navigateToPage("settings/language")}
            title={t("st_lang")}
            value={LANG_MASKS[lang]} />

          <GapView />

          <LineItemView pl1 rightArrow>
            <Text style={styles.t}>{t("st_feat")}</Text>
          </LineItemView>


          <LineItemView pl1 rightArrow>
            <Text style={styles.t}>{t("st_rate")}</Text>
          </LineItemView>
        </View>

      </ScrollView>

      <View style={styles.copyright} >
        <Text style={styles.copyrightText}>© weblxapplications.com</Text>
        <Text style={styles.copyrightText}>{new Date().getFullYear()}</Text>
      </View>
      <StatusBar translucent barStyle={getThemeStatusBar(theme, true)} />
    </View>
  )
}


export default SettingsScreen