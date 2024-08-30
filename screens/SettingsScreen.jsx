import { View, Text } from 'react-native'
import React from 'react'
import { LineItemView, GapView } from '../components'
import styled from 'styled-components/native'

const SettingsScreen = () => {

  return (
    <View style={{flex: 1, justifyContent: "space-between"}}>
      <GapView />
      <View style={{flex: 1}}>
        <LineItemView rightArrow>
          <Text>Tutorial</Text>
        </LineItemView>

        <LineItemView rightArrow>
          <Text>Support</Text>
        </LineItemView>

        <LineItemView rightArrow>
          <Text>App Language</Text>
        </LineItemView>

        <GapView />

        <LineItemView rightArrow>
          <Text>Request Feature</Text>
        </LineItemView>

        <LineItemView rightArrow>
          <Text>Rate App</Text>
        </LineItemView>
      </View>
      <Copyright>
        <GrayText>© weblxapplications.com</GrayText>
        <GrayText>{new Date().getFullYear()}</GrayText>
      </Copyright>
    </View>

  )
}

const Copyright = styled.View`
  align-items: center;
  flex-direction: column;
  color: #cbd5db;
  font-weight: 500;
  margin-bottom: 30px;
`

const GrayText = styled.Text`
  color: #cbd5db;
  font-weight: 500;
  font-size: 16px;
`


export default SettingsScreen