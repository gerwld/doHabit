import React, { useCallback } from 'react'
import { Text, FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { HomeHeader, BaseView, LastSevenDays, HomeTask } from '@components';
import { useSelector } from 'react-redux';
import { getThemeStatusBar, PLATFORM } from '@constants';
import { habitSelectors, appSelectors } from '@redux';
import { useCurrentTheme } from 'hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import Constants from "expo-constants";

import AnimatedAppLoader from './AnimatedAppLoaderScreen';

const styles = StyleSheet.create({
  begin: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
    opacity: 0.5
  },
  beginText: {
    fontSize: 21,
  }
});

function HomeScreen({ navigation }) {
  const theme = useSelector(appSelectors.selectAppTheme)
  const isInit = useSelector(appSelectors.isHabitsInit)
  const insets = useSafeAreaInsets();


// const onLayoutInitializeApp = useCallback(async () => {
//   if (isInit, insets.top) {
//     // This tells the splash screen to hide immediately! If we call this after
//     // `setAppIsReady`, then we may see a blank screen while the app is
//     // loading its initial state and rendering its first pixels. So instead,
//     // we hide the splash screen once we know the root view has already
//     // performed layout.
//     await SplashScreen.hideAsync();
//   }
// }, [isInit, insets.top]);

  if (!isInit) return null;

  const statusBarStyle = getThemeStatusBar(theme);
  
  return (
    <AnimatedAppLoader 
    isInit={[isInit, !isNaN(insets.top)]} 
    image={{ uri: Constants.expoConfig.splash.image }}>
    <BaseView>
      <HomeHeader navigation={navigation} />
      <LatestTasks />
      <StatusBar translucent barStyle={statusBarStyle} />
    </BaseView>
    </AnimatedAppLoader>
  );
}

export default React.memo(HomeScreen);





const LatestTasks = (() => {
  const {t} = useTranslation();
  const [themeColors] = useCurrentTheme();
  const itemsIDs = useSelector(habitSelectors.selectItemsIDs);

  const renderItem = useCallback(
    ({ item }) => (
      <HomeTask itemID={item} color={themeColors.textColor} />
    ),
    [themeColors]
  );

  const keyExtractor = (item) => item;
  

  if (!itemsIDs || !itemsIDs.length) {
    return (
      <View style={styles.begin}>
        <Text style={[styles.beginText, { color: themeColors.textColor }]}>
          {t("mp_addnew")}
        </Text>
      </View>
    );
  }

  const flatListProps = {
    contentContainerStyle: { paddingBottom: 60 },
    data: itemsIDs,
    renderItem,
    keyExtractor,
    ...(PLATFORM === 'android' ? { overScrollMode: 'always', scrollEnabled: true } : { bounces: true }),
  };

  return (
    <>
      <LastSevenDays />
      <FlatList
        {...flatListProps}
      />
    </>
  );
});


