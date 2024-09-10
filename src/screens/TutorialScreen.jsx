import { View, Text, Button, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Animated, { useSharedValue } from 'react-native-reanimated';
const AnimatedView = Animated.createAnimatedComponent(View);
import styled from 'styled-components/native';

const TutorialScreen = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const total_pages = 2;

    const x = useSharedValue(0);
    const page = useSharedValue(0)
    const startX  = useSharedValue()

    const pan = Gesture.Pan()
        .onBegin((event) => {
            startX.value  = event.translationX;
        })
        .onChange((event) => {
            x.value = -(page.value * windowWidth) + event.translationX
        })
        .onFinalize((event) => {
            // prevent on tiny scroll
            if (Math.max(startX.value , event.translationX) - Math.min(startX.value , event.translationX) > 10) {
                // back
                if (startX.value  < event.translationX && page.value >= 1) {
                    x.value = withTiming(-windowWidth * (page.value - 1))
                    page.value = page.value - 1;
                }
                // forward   
                else if (startX.value  > event.translationX && page.value < total_pages) {
                    x.value = withTiming(-windowWidth * (page.value + 1))
                    page.value = page.value + 1;
                }
                else x.value = withTiming(-windowWidth * (page.value))

            }
            else x.value = withTiming(-windowWidth * (page.value))

            startX.value  = 0
        });

    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }]
    }))

    const styles = {}


    return (

        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView>
            <View style={{ flex: 1, width: windowWidth, overflow: "hidden" }}>
                <Animated.View style={[{
                    flex: 1,
                    flexDirection: "row",
                }, animatedContainerStyle]}>
                    <Slide
                        style={{

                            backgroundColor: 'violet',
                        }}
                    >
                        <Text>page.value 1 {windowWidth}</Text>
                    </Slide>
                    <Slide
                        style={{

                            backgroundColor: 'green',
                        }}
                    >
                        <Text>page.value 2</Text>
                    </Slide>
                    <Slide
                        style={{

                            backgroundColor: 'blue',
                        }}
                    >
                        <Text>page.value 3</Text>
                    </Slide>

                </Animated.View>

                <GestureDetector gesture={pan}>
                    <AnimatedView style={{
                        backgroundColor: "rgba(255, 255, 255, 0.169)",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                    }}></AnimatedView>
                </GestureDetector>

            </View>
            <View style={{ width: "max-width", alignItems: "center" }}>
                <View style={{ width: 100 }}>
                    <Button onPress={() => navigation.navigate("home")} title="Skip" />
                </View>
            </View>
            <View style={{ paddingVertical: 10, flexDirection: "row", gap: 15, justifyContent: "center" }}>
                <PageButton onPress={() => { page.value = 0; x.value = withTiming(-windowWidth * 0) }}><Text style={{ color: "white" }}>1</Text></PageButton>
                <PageButton onPress={() => { page.value = 1; x.value = withTiming(-windowWidth * 1) }}><Text style={{ color: "white" }}>2</Text></PageButton>
                <PageButton onPress={() => { page.value = 2; x.value = withTiming(-windowWidth * 2) }}><Text style={{ color: "white" }}>3</Text></PageButton>
            </View>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

const PageButton = styled.Pressable`
    width: 30px;
    height: 30px;
    align-items:center;
    justify-content:center;
    background-color: #8080804f;
    color: black;
    border-radius: 50%;
`

const Slide = styled.Pressable`
 width: 100%;
 height: 100%;
   padding: 10px;
`

export default TutorialScreen