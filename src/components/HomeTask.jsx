import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LineItemView from './styling/LineItemView'
import { LastSevenDays } from './LastSevenDays'
import CircularProgress from './CircularProgress'
import { useNavigation } from '@react-navigation/native'


export const HomeTask = ({ name }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("habitdetails")} >
      <LineItemView>
        <CircularProgress progress={20} size={22} strokeWidth={5} color="#7fcbfd" />
        <Text style={{ flex: 1, marginLeft: 10, marginRight: 5, color: "#50677a" }}>{name}</Text>
        <LastSevenDays isTask />
      </LineItemView>
    </TouchableOpacity>
  )
}