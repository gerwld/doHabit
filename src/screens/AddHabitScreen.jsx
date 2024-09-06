import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Header as HeaderRNE } from '@rneui/themed';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';

import { BaseView, LineItemView, Modal, BasePressButton } from '@components';

import { useDispatch } from 'react-redux';
import { habitsActions } from "actions";
import { HABIT_COLORS, REPEAT_MASKS, getRandomItem } from '@constants';


const AddHabitScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const d = useDispatch();

  const initialState = {
    color: getRandomItem(HABIT_COLORS),
    name: "",
    notification: "",
    remind: true,
    repeat: "every-day"
  };
  const [state, setState] = React.useState(initialState);
  const [isColorPicker, setColorPicker] = React.useState(false);


  const onChangeInput = (name, value) => {
    if (name && value !== undefined) {
      setState({ ...state, [name]: value })
    }
  }

  const onSubmit = () => {
    d(habitsActions.addHabit({ id: uuid.v4(), ...state, datesArray: [] }));
    setState(initialState);
    navigation.navigate('home')
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
            <TouchableOpacity onPress={onSubmit}>
              <Title style={{ fontWeight: 400 }}>Save</Title>
            </TouchableOpacity>
          </View>
        }
        centerComponent={<Title>{t("addt_screen")}</Title>}
        backgroundColor={state.color}

      />

      {/* color picker & input */}

      <View style={{ paddingTop: 14 }}>
        <Label>{t("addt_name")}</Label>
        <View style={styles.combinedInput}>
          <SettingsInput
            style={{ flex: 1 }}
            onChangeText={(v) => onChangeInput("name", v)}
            value={state.name}
            placeholder={t("addt_name_placeholder")}
            placeholderTextColor="#949ca1"
          />
          <BasePressButton
            onPress={() => setColorPicker(true)}
            styleObj={{
              maxWidth: 40,
              width: 40,
              height: 40,
              borderRadius: 50,
              paddingVertical: 0,
              paddingHorizontal: 0,
              marginHorizontal: 10,
              marginBottom: 10
            }}
            title=" "
            backgroundColor={state.color}
          />
        </View>

        <Modal isOpen={isColorPicker}>
          <ModalContent>
            {/* <BasePressButton
              onPress={() => setColorPicker(false)}
              title='close'
            /> */}

            <ColorPicker>
              {HABIT_COLORS.map(color =>
                <BasePressButton
                  onPress={() => { onChangeInput("color", color); setColorPicker(false); }}
                  styleObj={{
                    width: 74,
                    height: 74,
                    borderRadius: 50,
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                  }}
                  title=" "
                  backgroundColor={color}
                />)}
            </ColorPicker>
          </ModalContent>
        </Modal>

        {/* color picker end */}

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
            {Object.keys(REPEAT_MASKS).map(i => <Picker.Item label={REPEAT_MASKS[i]} value={i} />)}
          </Picker>
        </LineItemView>

        <LineItemView toggle toggleColor={state.color} isEnabled={state.remind} onToggle={(v) => onChangeInput("remind", v)}>
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
  combinedInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  }
});

//modal
const ModalContent = styled.View`
width: 300px;
background: white;
color: black;
padding: 20px;
border-radius: 10px;
`

const ColorPicker = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px
`




const Title = styled.Text`
        min-height: 36px;
        line-height:36px;
        color: white;
        font-size: 17px;
        font-weight: 600;
        align-items: center;
        justify-content: center;
`


export default AddHabitScreen