import React, { useCallback } from 'react'
import { Text, FlatList, StatusBar } from 'react-native';
import { Header, BaseView, LastSevenDays, HomeTask } from '@components';
import { useSelector } from 'react-redux';
import { getTheme } from '@constants';
import { getThemeStatusBar } from '../constants';
import { habitSelectors } from '@redux';


function HomeScreen({ navigation }) {
  const { isInit, theme } = useSelector(({ habits, app }) => ({
    theme: app.theme,
    isInit: habits.isInit
  }))

  if (!isInit) return <Text>Loader...</Text>


  return (
    <BaseView>
      <Header {...{ navigation }} />
      <LatestTasks {...{theme}} />

      <StatusBar translucent barStyle={getThemeStatusBar(theme)}/>
    </BaseView>
  );
}

const LatestTasks = React.memo(({ theme }) => {
  const items = useSelector(habitSelectors.selectItems)

  const renderItem = useCallback(
    ({ item }) => (
      <HomeTask item={item} color={getTheme(theme).textColor} />
    ),
    [theme]
  );

  const keyExtractor = useCallback(
    (item) => item.id.toString(), 
    []
  );

  if (!items || !items.length) {
    return <Text>To begin, add a new habit.</Text>;
  } else {
    return (
      <>
        <LastSevenDays {...{ theme }} />
        <FlatList
          contentContainerStyle={{ paddingBottom: 10 }}
          data={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </>
    );
  }
});


export default React.memo(HomeScreen)