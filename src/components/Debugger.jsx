import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react';

const Debugger = ({isInside, w, h}) => {
    const s = StyleSheet.create({
        b: {
            position: "absolute",
            top: isInside ? "25%": "5%",
            right: "5%",
            backgroundColor: "#00000091",
            borderRadius: 10,
            padding: "3%",
            pointerEvents: "none",
        },
        t: {
            color: "#fff",
            fontSize: 22
        }

    })

    const {width, height} = useWindowDimensions()

    const isPortrait = height >= width;
    // const { width, height } = Dimensions.get('window'); 

    console.log(width, height, isPortrait ? 'Portrait' : 'Landscape');
    

    useEffect(() => {}, [width, height])
    
  return (
    <View style={s.b}>
      <Text style={s.t}>Width: {w?w:width}</Text>
      <Text style={s.t}>Height: {h?h:height}</Text>
      <Text style={s.t}>
        Orientation: {isPortrait ? 'Portrait' : 'Landscape'}
      </Text>
    </View>
  )
}

export default Debugger