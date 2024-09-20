import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Add1, Add2, Add3, Gear1,} from '../../../assets/svg/hicons_svgr';
import { useHeaderStyles } from '../../hooks';

const HEADER_HEIGHT_SAFE = 55;

export const HomeHeader = React.memo(({ navigation, leftChild, rightChild }) => {
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        header: {
            width: "100%",
            height: insets.top + HEADER_HEIGHT_SAFE,
            maxHeight: insets.top + HEADER_HEIGHT_SAFE,
            minHeight: insets.top + HEADER_HEIGHT_SAFE,
            padding: 0,
            alignItems: "center",
            borderBottomWidth: 0,
        },
        headerContent: {
            width: "100%",
            height: HEADER_HEIGHT_SAFE,
            maxHeight: HEADER_HEIGHT_SAFE,
            minHeight: HEADER_HEIGHT_SAFE,
            flex: 1,
            flexDirection: 'row',
            alignItems: "flex-start",
            justifyContent: 'space-between',
            paddingHorizontal: 2,
        },
        headerButton: {
            flexShrink: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 55,
            width: 55,
        },
        headerTitle: {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
        },
        leftComponent: {
            flex: 1,
        },
        centerComponent: {
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
        },
        rightComponent: {
            flex: 1,
            alignItems: 'flex-end',
        },
    });
    
    return (
    <View style={styles.header}>
        <LinearGradient
            colors={['#7fcbfd', '#3c95d0']}
            start={{ x: 0.2, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.header}
        >
            <SafeAreaView style={styles.headerContent}>
                <View style={styles.leftComponent}>
                    {leftChild ? leftChild : (
                        <Pressable style={styles.headerButton} onPress={() => navigation.navigate('settings')}>
                                <Gear1 width={33} height={33} color={"white"}/>
                        </Pressable>
                    )}
                </View>
                <View style={styles.centerComponent}>
                    <Text style={styles.headerTitle}>Habitty</Text>
                </View>
                <View style={styles.rightComponent}>
                    {rightChild ? rightChild : (
                        <Pressable style={styles.headerButton} onPress={() => navigation.navigate('addhabit')}>
                                <Add2 width={50} height={50} color={"white"}/>
                        </Pressable>
                    )}
                </View>
            </SafeAreaView>
        </LinearGradient>
        </View>

    );
});

