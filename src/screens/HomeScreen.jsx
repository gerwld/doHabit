import React, { useCallback, useMemo } from 'react'
import { Text, FlatList, StatusBar, StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import { HomeHeader, BaseView, LastSevenDays, HomeTask } from '@components';
import { useSelector } from 'react-redux';
import { getThemeStatusBar } from '@constants';
import { habitSelectors, appSelectors } from '@redux';
import { useCurrentTheme } from 'hooks';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

  if (!isInit) return <SafeAreaProvider><SafeAreaView><Text>Loader...</Text></SafeAreaView></SafeAreaProvider>

  const statusBarStyle = getThemeStatusBar(theme);

  return (
    <BaseView>
      <HomeHeader navigation={navigation} />
      <LatestTasks />
      <StatusBar translucent barStyle={statusBarStyle} />
    </BaseView>
  );
}

export default React.memo(HomeScreen);







const LatestTasks = (() => {
  const [themeColors] = useCurrentTheme();
  const items = useSelector(habitSelectors.selectItems);

  const renderItem = useCallback(
    ({ item }) => (
      <HomeTask item={item} color={themeColors.textColor} />
    ),
    [themeColors]
  );

  const keyExtractor = useCallback(
    (item) => item.id.toString(),
    []
  );

  if (!items || !items.length) {
    return (
      <View style={styles.begin}>
        <Text style={[styles.beginText, { color: themeColors.textColor }]}>
          To begin, add a new habit.
        </Text>
      </View>
    );
  }

  const flatListProps = {
    contentContainerStyle: { paddingBottom: 60 },
    data: items,
    renderItem,
    keyExtractor,
    ...(Platform.OS === 'android' ? { overScrollMode: 'always', scrollEnabled: true } : { bounces: true }),
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


