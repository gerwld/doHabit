import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Header as HeaderRNE } from '@rneui/themed';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { BaseView } from '@components';
import alert from '../polyfils/alert';
import { habitsActions } from "actions";
import { REPEAT_MASKS } from '../constants';


const DetailsHabitScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const d = useDispatch();

  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    setItem(route.params);
  }, [route.params])



  const onPressDeleteHabit = () => {
    const onConfirm = () => {
        d(habitsActions.delHabit(item.id));
        navigation.navigate("home");
    }

    alert(
      `Delete "${item.name}"?`,
      "This action can't be undone.",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: onConfirm
        }
      ],
      {
        cancelable: true,
        onDismiss: () => console.log("ok")
      })
  }




  return (

    <BaseView>
      <HeaderRNE
        style={{ height: 60 }}
        leftComponent={
          <View style={styles.headerLeft}>
            <TouchableOpacity style={{ marginLeft: 3 }} onPress={() => navigation.navigate('home')}>
              <Title style={{ fontWeight: 400 }}>Cancel</Title>
            </TouchableOpacity>
          </View>
        }
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate("edithabit", item)}>
              <Title style={{ fontWeight: 400 }}>Edit</Title>
            </TouchableOpacity>
          </View>
        }
        centerComponent={<Title>{item?.name}</Title>}
        backgroundColor={item?.color ? item.color : "#5fb1e7"}

      />
      <View style={{ paddingTop: 14 }}>

        <InfoBar>
          <InfoBarItem>
            <Text>{item?.repeat ? REPEAT_MASKS[item.repeat] : "-"}</Text>
          </InfoBarItem>
          <InfoBarItem>
            <Text>--:--</Text>
          </InfoBarItem>
        </InfoBar>



        <Label>Overview</Label>


        <Label>History</Label>
        <Label>Habit Strength</Label>

        <InfoBar>
          <Button
            onPress={onPressDeleteHabit}
            title="Delete"
          />
        </InfoBar>

      </View>
    </BaseView>
  )
}

const InfoBar = styled.View`
width: 100%;
flex-direction:row;
  align-content: center;
  justify-content: space-around;
`
const InfoBarItem = styled.View`
    align-content: center;
    justify-content: center;
`


const Label = styled.Text`
  font-size: 12px;
  color: #6a767d;
  text-transform: uppercase;
  margin-left: 15px;
`

const SettingsInput = styled.TextInput`
  height: 55px;
  margin-bottom: 14px;
  margin: 7px 0 14px 0;
  background: #fff;
  padding: 12px 10px 12px 15px;
  border-radius: 0;
  border: 1px solid #e5e5eaff;
`

// header 
const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: "center",
    justifyContent: 'center'
  },
});


const Title = styled.Text`
        min-height: 36px;
        line-height:36px;
        color: white;
        font-size: 17px;
        font-weight: 600;
        align-items: center;
        justify-content: center;
`


export default DetailsHabitScreen