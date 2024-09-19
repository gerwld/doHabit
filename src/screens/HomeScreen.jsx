import React, { useCallback, useMemo } from 'react'
import { Text, FlatList, StatusBar, StyleSheet, View, Platform } from 'react-native';
import { HomeHeader, BaseView, LastSevenDays, HomeTask } from '@components';
import { useSelector } from 'react-redux';
import { getTheme } from '@constants';
import { getThemeStatusBar } from '../constants';
import { habitSelectors, appSelectors } from '@redux';

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

  if (!isInit) return <Text>Loader...</Text>

  const statusBarStyle = getThemeStatusBar(theme);

  return (
    <BaseView>
      <HomeHeader navigation={navigation} />
      <LatestTasks theme={theme} />
      <StatusBar translucent barStyle={statusBarStyle} />
    </BaseView>
  );
}

export default React.memo(HomeScreen);







const LatestTasks = React.memo(({ theme }) => {
  const themeColors = React.useMemo(() => getTheme(theme), [theme]);
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

  const flatListProps = useMemo(() => ({
    contentContainerStyle: { paddingBottom: 60 },
    data: items,
    renderItem,
    keyExtractor,
    ...(Platform.OS === 'android' ? { overScrollMode: 'always', scrollEnabled: true } : { bounces: true }),
  }), [items, renderItem, keyExtractor]);

  return (
    <>
      <LastSevenDays theme={theme} />
      <FlatList
        {...flatListProps}
      />
    </>
  );
});


