import React from 'react'
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native'
import { Header as HeaderRNE } from '@rneui/themed';

import { LineItemView, GapView } from '@components'

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useSelector(({ app }) => ({
    theme: app?.theme
  }))

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f2f7" }}>
      <HeaderRNE
        containerStyle={styles.header}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <View style={styles.headerButton}>
              <Text style={styles.activeBtn}>Back</Text>
            </View>
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.headerTitle}>{t("st_screen")}</Text>}
        backgroundColor='white'
      />
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <GapView />
        <GapView />
        <View style={{ flex: 1, justifyContent: "flex-start", height: "100%", minHeight: 390 }}>
          <Pressable onPress={() => navigation.navigate("tutorial")}>
            <LineItemView pl1 rightArrow>
              <Text>{t("st_tutorial")}</Text>
            </LineItemView>
          </Pressable>

          <LineItemView pl1 rightArrow>
            <Text>{t("st_support")}</Text>
          </LineItemView>

          <LineItemView pl1 rightArrow>
            <Text>{t("st_theme")}</Text>

            <CurrentValue>{t(theme || "")}</CurrentValue>

          </LineItemView>

          <LineItemView pl1 rightArrow>
            <Text>{t("st_lang")}</Text>
          </LineItemView>

          <GapView />

          <LineItemView pl1 rightArrow>
            <Text>{t("st_feat")}</Text>
          </LineItemView>


          <LineItemView pl1 rightArrow>
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

const CurrentValue = styled.Text`
  color: gray;
`

const Copyright = styled.View`
align-items: center;
flex-direction: column;
color: #cbd5db;
font-weight: 500;
margin-bottom: 30px;
padding: 10px 0;
`

const GrayText = styled.Text`
color: #cbd5db;
font-weight: 500;
font-size: 16px;
`

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: "max-height"
  },
  scrollViewContent: {
    flex: 1
  },
  header: {
    padding: 0,
    minHeight: 55,
    paddingVertical: 0,
    paddingHorizontal: 0,
    // outline: "1px solid red",
    borderBottomColor: "#dbdce0"
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    minWidth: 55,
    pointerEvents: "none",
    userSelect: "none",
    paddingLeft: 18,
    paddingRight: 18,
  },
  headerTitle: {
    minHeight: 55,
    lineHeight: 55,
    color: "black",
    fontSize: 17,
    fontWeight: 'bold',
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    userSelect: "none",
  },
  activeBtn: {
    fontSize: 17,
  }
})


export default SettingsScreen