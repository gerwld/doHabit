import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Add2, Gear3, SvgLogoInline } from '@icons';
import { useHeaderStyles } from 'hooks';

export const HomeHeader = React.memo(({ navigation, leftChild, rightChild }) => {

   const {headerStyles,
    HEADER_HEIGHT_SAFE,
    HEADER_HEIGHT_EXTRAS,
    INSET_SAFE} = useHeaderStyles();

    const styles = StyleSheet.create({
        headerButton: {
            flexShrink: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: HEADER_HEIGHT_SAFE,
            width: 55,
        },
        headerTitle: {
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
        },
    });
    
    return (
    <View style={headerStyles.header}>
        <LinearGradient
            colors={['#9ad7ff', '#3c95d0']}
            start={{ x: 0.2, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={headerStyles.header}
        >
            <View style={headerStyles.headerContent}>
                <View style={headerStyles.leftComponent}>
                    {leftChild ? leftChild : (
                        <Pressable style={styles.headerButton} onPress={() => navigation.navigate('settings')}>
                                <Gear3 width={33} height={33} color={"white"}/>
                        </Pressable>
                    )}
                </View>
                <View style={headerStyles.centerComponent}>
                    {/* <Text style={styles.headerTitle}>DoHabit</Text> */}
                    <SvgLogoInline size={22} style={headerStyles.logo}/>
                </View>
                <View style={headerStyles.rightComponent}>
                    {rightChild ? rightChild : (
                        <Pressable style={headerStyles.headerButton} onPress={() => navigation.navigate('addhabit')}>
                                <Add2 width={47} height={46} color={"white"}/>
                        </Pressable>
                    )}
                </View>
            </View>
        </LinearGradient>
        </View>

    );
});

