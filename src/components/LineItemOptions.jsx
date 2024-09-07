import { Pressable, Text } from 'react-native'
import React, { Component } from 'react'
import LineItemView from './styling/LineItemView'
import { useNavigation } from '@react-navigation/native';



const LineItemOptions = ({ navTo, title, value, onPress, ...rest }) => {
    const navigation = useNavigation();
    const content = (
        <LineItemView pl1 rightArrow {...rest}>
            <Text style={{ flex: 1 }}>{title}</Text>
            <Text style={{ marginRight: 5, marginLeft: 2, color: "#949dad" }}>{value}</Text>
        </LineItemView>
    )


    if (navTo) return (
        <Pressable onPress={() => navigation.navigate(navTo)}>
            {content}
        </Pressable>
    )
    else if (onPress) return (
        <Pressable onPress={onPress}>
            {content}
        </Pressable>
    )

    return content;
}

export default LineItemOptions