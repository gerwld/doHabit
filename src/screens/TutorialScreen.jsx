import { View, Text, Button } from 'react-native'
import React from 'react'

const TutorialScreen = ({navigation}) => {
    return (
        <View>
            <View style={{width: "max-width", alignItems: "flex-end"}}>
                <View style={{ width: 100 }}>
                    <Button onPress={() => navigation.navigate("home")} title="close" />
                </View>
            </View>

            <Text>TutorialScreen</Text>
        </View>
    )
}

export default TutorialScreen