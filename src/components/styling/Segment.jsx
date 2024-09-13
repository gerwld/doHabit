import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Segment = ({children}) => {
    const styles = StyleSheet.create({
        block: {
            // marginVertical: -1,
            // marginLeft: 10,
            // marginRight: 10,
            // borderRadius: 12,
            // overflow: "hidden",
        }
    })
  return (
    <View style={styles.block}>
      {children}
    </View>
  )
}

export default Segment