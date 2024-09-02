import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { LineItemView, GapView } from '../components'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

const SettingsScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={{flex: 1}}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <GapView />
      <View style={{ flex: 1, justifyContent: "flex-start", height: "100%" }}>
        <LineItemView rightArrow>
          <Text>{t("st_tutorial")}</Text>
        </LineItemView>

        <LineItemView rightArrow>
          <Text>{t("st_support")}</Text>
        </LineItemView>

        <LineItemView toggle>
          <Text>{t("st_dark")}</Text>
        </LineItemView>

        <LineItemView rightArrow>
          <Text>{t("st_lang")}</Text>
        </LineItemView>

        <GapView />

        <LineItemView rightArrow>
          <Text>{t("st_feat")}</Text>
        </LineItemView>


        <LineItemView rightArrow>
          <Text>{t("st_rate")}</Text>
        </LineItemView>
      </View>
      <Copyright>
        <GrayText>© weblxapplications.com</GrayText>
        <GrayText>{new Date().getFullYear()}</GrayText>
      </Copyright>

    </ScrollView>
    </View>
  )
}

const Copyright = styled.View`
  align-items: center;
  flex-direction: column;
  color: #cbd5db;
  font-weight: 500;
  margin-bottom: 30px;
  padding-top: 10px;
`

const GrayText = styled.Text`
  color: #cbd5db;
  font-weight: 500;
  font-size: 16px;
`

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, // Ensures the ScrollView takes up the full available space
    height: "max-height"
  },
  scrollViewContent: {
    flex: 1
  }
})


export default SettingsScreen