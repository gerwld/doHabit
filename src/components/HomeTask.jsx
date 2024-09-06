import { Text, Pressable } from 'react-native'
import React from 'react'
import LineItemView from './styling/LineItemView'
import { LastSevenDays } from './LastSevenDays'
import CircularProgress from './CircularProgress'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'


export const HomeTask = ({ item }) => {
  const navigation = useNavigation();
  return (

    <LineItemView>
      <Pressable style={{flex: 1}} onPress={() => navigation.navigate("habitdetails", item)} >
        <PressArea>
          <CircularProgress progress={20} size={25} strokeWidth={4} color={item?.color ? item.color : "#7fcbfd"} />
          <Text style={{ flex: 1, marginLeft: 10, marginRight: 5, color: "#50677a" }}>{item.name}</Text>
        </PressArea>
      </Pressable>
      <LastSevenDays {...{ isHabit: true, habitID: item.id, color: item.color }} />
    </LineItemView>
  )
}

const PressArea = styled.View`
  flex: 1;
  min-height:55px;
  align-items: center;
  flex-direction: row;
  padding: 10px 3px 10px 15px;
`