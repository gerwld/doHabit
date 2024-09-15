import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getTheme } from '@constants';
import {ScrollPages} from '@components'
import { useSelector } from 'react-redux'
import { appSelectors } from '@redux';

const TutorialScreen = () => {
    const theme = useSelector(appSelectors.selectAppTheme);
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: getTheme(theme).textColor,
            marginBottom: 10
        },
        description: {
            fontSize: 15,
            color: "gray",
            textAlign: "center"
        }
    })

  return (
    <ScrollPages>
        <View style={styles.screen}>
            <Text style={styles.title}>Title</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae magni similique laudantium commodi animi dignissimos aspernatur aliquid, ipsum beatae cupiditate.</Text>
        </View>

        <View style={styles.screen}>
            <Text style={styles.title}>Title 2</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae magni similique laudantium commodi animi dignissimos aspernatur aliquid, ipsum beatae cupiditate.</Text>
        </View>

        <View style={styles.screen}>
            <Text style={styles.title}>Title 3</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae magni similique laudantium commodi animi dignissimos aspernatur aliquid, ipsum beatae cupiditate.</Text>
        </View>
    </ScrollPages>
  )
}

export default TutorialScreen