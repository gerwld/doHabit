import { Text, Pressable } from 'react-native'
import React from 'react'
import LineItemView from './styling/LineItemView'
import { LastSevenDays } from './LastSevenDays'
import CircularProgress from './CircularProgress'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import { getTheme } from '@constants';

export const HomeTask = React.memo(({ item, color, theme }) => {
  const navigation = useNavigation();
  const themeColors = React.useMemo(() => getTheme(theme), [theme]);
  return (
    <LineItemView st={{ height: 56 }}>
      <Pressable style={{ flex: 1 }} onPress={() => navigation.navigate("habitdetails", item)} >
        <PressArea>
          <CircularProgress progress={20} size={27} strokeWidth={4} strColor={themeColors.crossSymbL} color={item?.color ? item.color : "#7fcbfd"} />
          <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 16, flex: 1, marginLeft: 10, marginRight: 5, userSelect: "none", color: color ?? "#50677a" }}>{item.name}</Text>
        </PressArea>
      </Pressable>
      <LastSevenDays {...{ isHabit: true, habitID: item.id, color: item.color }} />
    </LineItemView>
  )
})

const PressArea = styled.View`
  flex: 1;
  min-height:50px;
  align-items: center;
  flex-direction: row;
  padding: 8px 3px 8px 12px;
`