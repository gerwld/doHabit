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
import { REPEAT_MASKS } from '@constants';


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
        containerStyle={styles.header}
        style={{ height: 60 }}
        leftComponent={
          <TouchableOpacity  onPress={() => navigation.navigate('home')}>
            <View style={styles.headerButton}>
              <Title style={{ fontWeight: 400 }}>Cancel</Title>
            </View>
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate("edithabit", item)}>
            <View style={styles.headerButton}>
              <Title style={{ fontWeight: 400 }}>Edit</Title>
            </View>
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.headerTitle}>{item?.name}</Text>}
        backgroundColor={item?.color ? item.color : "#5fb1e7"}
      />


      <View style={{ paddingTop: 14, flex: 1 }}>

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

// header 
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
  combinedInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    marginBottom: 14,
    backgroundColor: "white",
    border: "1px solid #e5e5eaff"
  },
  header: {
    padding: 0,
    minHeight: 55,
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    minWidth: 55,
    pointerEvents: "none",
    userSelect: "none",
    paddingLeft: 18,
    paddingRight: 18,
  },
  headerTitle: {
    minHeight: 55,
    lineHeight: 55,
    color: "white",
    fontSize: 17,
    fontWeight: 'bold',
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    userSelect: "none",
  },
  activeBtn: {
    fontSize: 17,
  }
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