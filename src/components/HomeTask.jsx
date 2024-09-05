import { Pressable, Text } from 'react-native'
import React from 'react'
import { LastSevenDays, CircularProgress, LineItemView } from 'components'

export const HomeTask = ({ name, navigation }) => {

  return (
    <Pressable onPress={() => navigation.navigate("habitdetails")}>
      <LineItemView>
        <CircularProgress progress={20} size={22} strokeWidth={5} color="#7fcbfd" />
        <Text style={{ flex: 1, marginLeft: 10, marginRight: 5, color: "#50677a" }}>{name}</Text>
        <LastSevenDays isTask />
      </LineItemView>
    </Pressable>
  )
}