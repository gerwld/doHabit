import React from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next';
import { Header as HeaderRNE } from '@rneui/themed';

import { LineItemView, GapView } from '@components'

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <HeaderRNE
        leftComponent={
          <View style={styles.headerLeft}>
            <TouchableOpacity style={{ marginLeft: 3 }} onPress={() => navigation.navigate('home')}>
              <Title style={{ fontWeight: 400 }}>Back</Title>
            </TouchableOpacity>
          </View>
        }
        centerComponent={<Title>{t("st_screen")}</Title>}
        backgroundColor='white'
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <GapView />
        <View style={{ flex: 1, justifyContent: "flex-start", height: "100%", minHeight: 390 }}>
          <Pressable onPress={() => navigation.navigate("tutorial")}>
            <LineItemView rightArrow>
              <Text>{t("st_tutorial")}</Text>
            </LineItemView>
          </Pressable>

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
padding: 10px 0;
`

const GrayText = styled.Text`
color: #cbd5db;
font-weight: 500;
font-size: 16px;
`

const Title = styled.Text`
min-height: 36px;
line-height:36px;
color: black;
font-size: 17px;
font-weight: 600;
align-items: center;
justify-content: center;
`


const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: "max-height"
  },
  scrollViewContent: {
    flex: 1
  }
})


export default SettingsScreen