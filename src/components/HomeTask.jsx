import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LineItemView from './styling/LineItemView'
import { LastSevenDays } from './LastSevenDays'
import CircularProgress from './CircularProgress'
import { useNavigation } from '@react-navigation/native'


export const HomeTask = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("habitdetails", item)} >
      <LineItemView>
        <CircularProgress progress={20} size={25} strokeWidth={4} color={item?.color ? item.color : "#7fcbfd"} />
        <Text style={{ flex: 1, marginLeft: 10, marginRight: 5, color: "#50677a" }}>{item.name}</Text>
        <LastSevenDays {...{isTask: true, id: item.id}} />
      </LineItemView>
    </TouchableOpacity>
  )
}