
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  View,
} from "react-native";

const getPlatformBgColor = () => {
    if(Platform.OS === "android") return Constants.expoConfig.android.splash.backgroundColor;
    if(Platform.OS === "ios") return Constants.expoConfig.ios.splash.backgroundColor;
    return Constants.expoConfig.splash.backgroundColor;
}

function AnimatedAppLoader({ children, image, isInit }) {
    const [isSplashReady, setSplashReady] = useState(false);
  
    useEffect(() => {
      async function prepare() {
        try {
        await Asset.fromURI(image.uri).downloadAsync();
        } 
        // it doesn't work properly on expo-goad
        catch {}

        // if prop isInit array all true, then set splash as ready
        if(isInit.every(Boolean)){
            setSplashReady(true);
        }
      }
  
      prepare();
    }, [image, isInit]);
  
    if (!isSplashReady) {
      return <View style={{backgroundColor: getPlatformBgColor(), height: "100%"}}/>;
    }
    console.log(getPlatformBgColor());
    
  
    return <AnimatedSplashScreen isInit={isInit} image={image}>{children}</AnimatedSplashScreen>;
  }
  
  function AnimatedSplashScreen({ children, image, isInit }) {
    const animation = useMemo(() => new Animated.Value(1), []);
    const [isAppReady, setAppReady] = useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  
    useEffect(() => {
      if (isAppReady) {
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => setAnimationComplete(true));
      }
    }, [isAppReady]);
  
    const onImageAndInitArrayLoaded = useCallback(async () => {
      try {
        await SplashScreen.hideAsync();
        // Load stuff here
      } catch (e) {
        // handle errors
      } finally {
        // if prop isInit array all true, then hide splash with anim
        if(isInit.every(Boolean)){
            setAppReady(true);
        }
      }
    }, [isInit]);
  
    return (
      <View style={{ flex: 1 }}>
        {isAppReady && children}
        {!isSplashAnimationComplete && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: getPlatformBgColor(),
                opacity: animation,
              },
            ]}
          >
            <Animated.Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: Constants.expoConfig.splash.resizeMode || "contain",
                transform: [
                  {
                    scale: animation,
                  },
                ],
              }}
              source={image}
              onLoadEnd={onImageAndInitArrayLoaded} 
              fadeDuration={0}
            />
          </Animated.View>
        )}
      </View>
    );
  }

  export default AnimatedAppLoader;