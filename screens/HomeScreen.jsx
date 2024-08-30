import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Header, HomeTask, BaseView } from '../components';
import { FlatList, TouchableOpacity } from 'react-native';


function HomeScreen({navigation}) {
  return (
    <BaseView>
      <Header {...{navigation}} />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={[1, 2, 3, 3]}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navigation.navigate('showdetailstask', { id: item.id, title: item.title })}>
            <HomeTask text="Home Task" />
          </TouchableOpacity>
        }
      />

      
    </BaseView>
  );
}


const styles = StyleSheet.create({
  listContent: {
    minHeight: Dimensions.get('window').height - 100
  }
});


export default HomeScreen