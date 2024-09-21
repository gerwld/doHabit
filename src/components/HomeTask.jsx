import { Text, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import LineItemView from './styling/LineItemView'
import { LastSevenDays } from './LastSevenDays'
import CircularProgress from './CircularProgress'
import { useNavigation } from '@react-navigation/native'
import { useCurrentTheme, useHabitScore } from "hooks";

export const HomeTask = React.memo(({ item, color }) => {
  const navigation = useNavigation();
  const [themeColors] = useCurrentTheme();
  const [score] = useHabitScore(item);
  return (
    <LineItemView st={{ height: 56 }}>
      <Pressable style={{ flex: 1 }} onPress={() => navigation.navigate("habitdetails", item)} >
        <View style={styles.pressArea}>
          <CircularProgress progress={score} size={27} strokeWidth={3.5} strColor={themeColors.crossSymbL} color={item?.color ? item.color : "#7fcbfd"} />
          <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 16, flex: 1, marginLeft: 10, marginRight: 5, userSelect: "none", color: color ?? "#50677a" }}>{item.name}</Text>
        </View>
      </Pressable>
      <LastSevenDays isHabit habitID={item.id} color={item.color} />
    </LineItemView>
  )
})

const styles = StyleSheet.create({
  pressArea: {
    flex: 1,
    minHeight:50,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingRight: 3,
    paddingLeft: 12,
  }
})