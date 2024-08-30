import { Text } from 'react-native'
import React from 'react'
import { LineItemView } from '.'

export const HomeTask = ({text}) => {
  return (
    <LineItemView>
      <Text>{text}</Text>
    </LineItemView>
  )
}