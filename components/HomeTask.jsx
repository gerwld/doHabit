import { Text } from 'react-native'
import React from 'react'
import { LineItemView } from '.'
import LastSevenDays from './LastSevenDays'
import CircularProgress from './CircularProgress'

export const HomeTask = ({ text }) => {
  return (
    <LineItemView>
      <CircularProgress progress={20} size={22} strokeWidth={5} color="#7fcbfd" />
      <Text style={{flex: 1, marginLeft: 10, marginRight: 5, color: "#50677a"}}>{text}</Text>
      <LastSevenDays isTask />
    </LineItemView>
  )
}