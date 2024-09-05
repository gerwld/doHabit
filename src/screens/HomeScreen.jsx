import React from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native';
import { Header, HomeTask, BaseView } from '../components';
import { FlatList, TouchableOpacity } from 'react-native';
import LastSevenDays from '../components/LastSevenDays';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';


function HomeScreen({ navigation }) {
  return (
    <BaseView>
      <Header {...{ navigation }} />
      <LatestTasks />
    </BaseView>
  );
}

const LatestTasks = () => {

  const { items } = useSelector(({ habbits }) => ({
    items: habbits.items
  }))

  if (!items || !items.length) return <Text>To begin, add new habbit.</Text>

  return <>
    <LastSevenDays />
    <FlatList
      contentContainerStyle={styles.listContent}
      data={items}
      renderItem={({ item }) =>
        <TouchableOpacity key={uuid()} onPress={() => navigation.navigate('showdetailstask', { id: item.id, name: item.name })}>
          <HomeTask {...item} />
        </TouchableOpacity>
      }
    /></>
}


const styles = StyleSheet.create({
  listContent: {
    minHeight: Dimensions.get('window').height - 100
  }
});


export default HomeScreen