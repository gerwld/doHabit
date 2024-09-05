import React from 'react'
import { StyleSheet, Dimensions, Text, FlatList } from 'react-native';
import { Header, BaseView, LastSevenDays } from 'components';
import { useSelector } from 'react-redux';
import { HomeTask } from '../components';

function HomeScreen({ navigation }) {
  const { isInit } = useSelector(({ habits }) => ({
    isInit: habits.isInit
  }))
  if (!isInit) return <Text>Loader...</Text>


  return (
    <BaseView>
      <Header {...{ navigation }} />
      <LatestTasks />
    </BaseView>
  );
}

const LatestTasks = () => {
  const { items } = useSelector(({ habits }) => ({
    items: habits.items
  }))


  if (!items || !items.length) return <Text>To begin, add a new habit.</Text>
  return <>
    <LastSevenDays />
    <FlatList
      contentContainerStyle={styles.listContent}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <HomeTask {...item} />
      }
    /></>
}


const styles = StyleSheet.create({
  listContent: {
    minHeight: Dimensions.get('window').height - 100
  }
});


export default HomeScreen