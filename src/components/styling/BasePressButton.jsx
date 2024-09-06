import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export const BasePressButton = ({ onPress, title = 'Save', backgroundColor, color, styleObj }) => {
    function Wrapped() {

        return (
            <Pressable style={{...styles.button, ...styleObj}} onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        );
    }

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: backgroundColor ? backgroundColor : "#5fb1e7",
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: color ? color : 'white',
        },
    });

    return Wrapped();
}
