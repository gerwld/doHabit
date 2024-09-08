import React from 'react'
import { Text, FlatList, StatusBar } from 'react-native';
import { Header, BaseView, LastSevenDays, HomeTask } from '@components';
import { useSelector } from 'react-redux';
import { getTheme } from '@constants';
import { getThemeStatusBar } from '../constants';


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

const LatestTasks = ({theme}) => {
  const { items } = useSelector(({ habits }) => ({
    items: habits.items
  }))


  if (!items || !items.length) return <Text>To begin, add a new habit.</Text>
  else return <>
    <LastSevenDays {...{theme}} />
    <FlatList
      contentContainerStyle={{paddingBottom: 10}}
      data={items}
      renderItem={({ item }) => <HomeTask item={item} color={getTheme(theme).textColor}/>
      }
    />
  </>
}


export default HomeScreen