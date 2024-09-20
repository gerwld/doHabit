import { View, Button, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Animated, { useSharedValue } from 'react-native-reanimated';
const AnimatedView = Animated.createAnimatedComponent(View);
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const ScrollPages = ({ children, navigateToHome = true }) => {
    const {t} = useTranslation();
    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;
    const TOTAL_PAGES = React.Children.count(children);

    const RANGE_ARR = Array.from({ length: TOTAL_PAGES }, (_, index) => index);

    const x = useSharedValue(0);
    const page = useSharedValue(0);
    const startX = useSharedValue();
    const [pagevis, setPagevis] = useState(0);

    const setPage = (v) => {
        page.value = v;
        setPagevis(v);
    }

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

                    runOnJS(setPagevis)(page.value - 1);
                    page.value -= 1;
                }
                // forward   
                else if (startX.value > event.translationX && page.value < TOTAL_PAGES - 1) {
                    x.value = withTiming(-windowWidth * (page.value + 1));

                    runOnJS(setPagevis)(page.value + 1);
                    page.value = page.value + 1;
                }
                else if (startX.value > event.translationX && page.value === TOTAL_PAGES - 1 && navigateToHome) {
                    runOnJS(navigation.goBack)();
                }
                // debounce back
                else x.value = withTiming(-windowWidth * (page.value))

            }
            // debounce back
            else x.value = withTiming(-windowWidth * (page.value))
            // reset startX
            startX.value = 0
        });

    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }]
    }))

    const navBlock = RANGE_ARR.map((e, i) => <PageButton
        key={`key_scrollpages_nav_${i}`}
        children={<PageButtonIc
            style={{ backgroundColor: e == pagevis ? "#2296f3" : "#8080804f" }}
        />}
        onPress={() => { setPage(e); x.value = withTiming(-windowWidth * e) }}
    />)


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView>
                <View style={{ flex: 1, width: windowWidth, overflow: "hidden" }}>

                    {/* items */}
                    <Animated.View
                        style={[{
                            flex: 1,
                            flexDirection: "row",
                        }, animatedContainerStyle]}>

                {React.Children.map(children, (child) =>
                        React.isValidElement(child)
                        ? <Slide>{child}</Slide>
                        : child
                    )}
                    </Animated.View>

                    {/* overflow box to capture gestures */}
                    <GestureDetector gesture={pan}>
                        <AnimatedView style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                        }}></AnimatedView>
                    </GestureDetector>

                    {/* navigation */}
                    <View style={{ width: "max-width", alignItems: "center" }}>
                        <View style={{ maxWidth: 200 }}>
                            <Button onPress={() => {setPage(0); navigation.navigate("home")}} title={pagevis === TOTAL_PAGES - 1 ? t("act_begin") : t("act_skip") || "Skip"} />
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10, flexDirection: "row", gap: 5, justifyContent: "center" }}>
                        {navBlock}
                    </View>
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
    color: black;
    border-radius: 5px;
`

const PageButtonIc = styled.Pressable`
    width: 10px;
    height: 10px;
    align-items:center;
    justify-content:center;
    background-color: #8080804f;
    border-radius: 50px;
    pointer-events: none;
    user-select: none;
`

const Slide = styled.Pressable`
   width: 100%;
   height: 100%;
   padding: 10px;
`


export default ScrollPages