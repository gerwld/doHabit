import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Header, HomeTask } from '../components';
import { FlatList, TouchableOpacity } from 'react-native';



function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header {...{navigation}} />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={[1, 2, 3, 3]}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navigation.navigate('showdetailstask', { id: item.id, title: item.title })}>
            <HomeTask />
          </TouchableOpacity>
        }
      />

      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf2f7',
  },
  listContent: {
    minHeight: Dimensions.get('window').height - 100
  }
});


export default HomeScreen