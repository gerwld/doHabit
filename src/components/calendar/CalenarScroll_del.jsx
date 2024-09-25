import { View, Dimensions, Text } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Animated, { useSharedValue } from 'react-native-reanimated';

const CalenarScroll = ({ children, weekDays }) => {
    const windowWidth = Dimensions.get('window').width;
    const TOTAL_PAGES = React.Children.count(children);

    const x = useSharedValue(0);
    const page = useSharedValue(0);
    const startX = useSharedValue();

    const pan = Gesture.Pan()
        .onBegin((event) => {
            // save val on start
            startX.value = event.translationX;

        })
        .onChange((event) => {
            // keep tracking with press (scroll)
            x.value = (page.value * -windowWidth) + event.translationX
        })
        .onFinalize((event) => {
            // prevent on tiny scroll
            if (Math.max(startX.value, event.translationX) - Math.min(startX.value, event.translationX) > 10) {
                // back
                if (startX.value < event.translationX && page.value >= 1) {
                    x.value = withTiming(-windowWidth * (page.value - 1))
                    page.value -= 1;
                }
                // forward   
                else if (startX.value > event.translationX && page.value < TOTAL_PAGES - 1) {
                    x.value = withTiming(-windowWidth * (page.value + 1));
                    page.value = page.value + 1;
                }

                // debounce back
                else x.value = withTiming(-windowWidth * (page.value))

            }
            // debounce back
            else x.value = withTiming(-windowWidth * (page.value))
            // reset startX
            startX.value = 0
        });

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }]
    }))
    
    // const wrapMonthWeekDays = (child, index) => {
    //     if (index === 0) { // Adjust the index as needed
    //       return <View style={{background: "red", width: 50}}>{child}</View>;
    //     }
    //     return child;
    //   }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, width: windowWidth, overflow: "hidden" }}>
                <GestureDetector gesture={pan}>
                    <Animated.View>
                       {weekDays}

                       <Animated.View style={[{
                            flex: 1,
                            flexDirection: "row",
                        }, animStyle]}>
                            {React.Children.map(children, c => c)}
                        </Animated.View>
                        
                    </Animated.View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    )
}

const ScrollItem = ({ children, animStyle }) => {
    return <Animated.View style={[{
        flex: 1,
        flexDirection: "row",
    }, animStyle]}>
        {React.Children.map(children, c => c)}
    </Animated.View>

}


export { CalenarScroll, ScrollItem }