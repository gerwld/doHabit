import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Header as HeaderRNE } from '@rneui/themed';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';

import { BaseView, LineItemView } from '@components';

import { useDispatch } from 'react-redux';
import { habitsActions } from "actions";
import { BasePressButton } from '../components/styling/BasePressButton';


const EditHabitScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const d = useDispatch();

  const initialState = {
    name: "",
    notification: "",
    remind: true,
    repeat: "every-day"
  };

  const [state, setState] = React.useState(initialState);

  const onChangeInput = (name, value) => {
    if (name && value !== undefined) {
      setState({ ...state, [name]: value })
    }
  }

  const onSubmit = () => {
    d(habitsActions.updateHabit({ ...state }));
    navigation.navigate('home')
  }

  React.useEffect(() => {
    setState({ ...state, ...route.params });
  }, [route.params])

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
            <TouchableOpacity onPress={onSubmit}>
              <Title style={{ fontWeight: 400 }}>Save</Title>
            </TouchableOpacity>
          </View>
        }
        centerComponent={<Title>Edit Habit</Title>}
        backgroundColor={state?.color ? state?.color : "#5fb1e7"}

      />
      <View style={{ paddingTop: 14 }}>
        <Label>{t("addt_name")}</Label>
        <SettingsInput
          onChangeText={(v) => onChangeInput("name", v)}
          value={state.name}
          placeholder={t("addt_name_placeholder")}
          placeholderTextColor="#949ca1"
        />

        <BasePressButton
          styleObj={{
            width: 30,
            height: 30,
            borderRadius: 50,
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
          title=" "
          backgroundColor={state.color}
        />


        <Label>{t("addt_notif")}</Label>
        <SettingsInput
          onChangeText={(v) => onChangeInput("notification", v)}
          value={state.notification}
          placeholder={t("addt_notif_placeholder")}
          placeholderTextColor="#949ca1"
        />

        <Label>Regularity</Label>

        <LineItemView rightArrow>
          <Text style={{ flex: 1 }}>Repeat</Text>
          <Picker
            style={{ textAlign: "right", color: "gray", border: "none", fontSize: 16, appearance: "none", marginRight: 10, outline: "none" }}
            mode="dialog"
            selectedValue={state.repeat}
            onValueChange={(v) => onChangeInput("repeat", v)}>
            <Picker.Item label="Every Day" value="every-day" />
            <Picker.Item label="Every Week" value="every-week" />
            <Picker.Item label="3 times per week" value="3-times-week" />
            <Picker.Item label="5 times per week" value="5-times-week" />
          </Picker>
        </LineItemView>

        <LineItemView toggle toggleColor={state?.color ? state.color : "#5fb1e7"} isEnabled={state.remind} onToggle={(v) => onChangeInput("remind", v)}>
          <Text>Remind me</Text>
        </LineItemView>

      </View>
    </BaseView>
  )
}


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


export default EditHabitScreen