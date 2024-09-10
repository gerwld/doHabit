import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

export const Header = ({ navigation, title, leftChild, rightChild }) => {
    return (
        <HeaderRNE
            containerStyle={styles.header}
            leftComponent={
                leftChild ? leftChild :
                <TouchableOpacity onPress={() => navigation.navigate('settings')}>
                    <View style={styles.headerButton}>
                        <Icon type="antdesign" size={31} name="setting" color="white" />
                    </View>
                </TouchableOpacity>
            }
            rightComponent={
                rightChild ? rightChild :
                <TouchableOpacity onPress={() => navigation.navigate('addhabit')}>
                    <View style={styles.headerButton}>
                        <Icon type="antdesign" size={29} name="plus" color="white" />
                    </View>
                </TouchableOpacity>
            }
            centerComponent={<Text style={styles.headerTitle}>{title ? title : "Habitty"}</Text>}
            ViewComponent={LinearGradient} // Required for gradient
            linearGradientProps={{
                colors: ['#7fcbfd', '#3c95d0'],
                start: { x: 0.2, y: 0.5 },
                end: { x: 1, y: 0.5 },
            }}
        />
    )
}

const styles = StyleSheet.create({
    heading: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: 'center',
        
    },
    header: {
        padding: 0,
        minHeight: 55,
        paddingVertical: 0,
        paddingHorizontal: 0,
        border: "none",
    },
    headerButton: {
    flexShrink: 0,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        height: 55,
        width: 55,
        pointerEvents: "none",
        userSelect: "none",
    },
    headerTitle: {
        minHeight: 55,
        lineHeight: 55,
        color: "white",
        fontSize: 21,
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        userSelect: "none",
    }
});



