import React, { useCallback, useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, InteractionManager, Pressable, Platform } from 'react-native'
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { BounceIn, BounceOut, FadeIn, FadeOut } from 'react-native-reanimated';


import { Label, ColorPicker } from "styles/crudtask"
import { BaseView, LineItemView, Modal, BasePressButton, LineItemOptions, SettingsHeader } from '@components';
import { HABIT_COLORS, getRandomItem, getTheme, getTimeFromTimestamp } from '@constants';
import { habitsActions } from "actions";
import { appSelectors, habitSelectors } from '@redux';
import alert from '../polyfils/alert';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const DEFAULT_TIME = "12:00"

const SetHabitScreen = ({ route, navigation, isEdit }) => {
  const date = new Date();
  const focusInputRef = useRef(null);
  const { t } = useTranslation();
  const d = useDispatch();
  const theme = useSelector(appSelectors.selectAppTheme);
  const items = useSelector(habitSelectors.selectItems);

  // const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  const uses24HourClock = (date) => {
    const timeString = date.toLocaleTimeString([], { hour: 'numeric' });
    return !timeString.includes('AM') && !timeString.includes('PM');
  };

  const onTimeSelect = (_, payload) => {
    const time = getTimeFromTimestamp(payload);
    if(time) {
      onChangeInput("remindTime", time);
      console.log(time, date);
    }
  }

  const styles = StyleSheet.create({
    combinedInput: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 7,
      marginBottom: 14,
      backgroundColor: getTheme(theme).bgHighlight,
      border: `1px solid ${getTheme(theme).borderColor}`,
      borderWidth: 1,
      borderColor: `${getTheme(theme).borderColor}`,
      borderLeftColor: "transparent",
      borderRightColor: "transparent"
    },
    settingsInput: {
      height: 55,
      marginTop: 7,
      marginBottom: 14,
      backgroundColor: getTheme(theme).bgHighlight,
      paddingVertical: 12,
      paddingLeft: 15,
      paddingRight: 10,
      borderRadius: 0,
      fontSize: 16,
      color: getTheme(theme).textColorHighlight,
      // border: `1px solid ${getTheme(theme).borderColor}`,
      borderWidth: 1,
      borderColor: `${getTheme(theme).borderColor}`,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",

    },
    settingsInputEmbeded: {
      flex: 1,
      marginTop: 0,
      marginBottom: 0,
      border: "none",
    }
  });

  const ModalContent = styled.View`
  width: 300px;
  background:${getTheme(theme).bgHighlight};
  color: ${getTheme(theme).textColorHighlight};
  padding: 20px;
  border-radius: 10px;
`

  const initialState = {
    color: getRandomItem(HABIT_COLORS),
    name: "",
    notification: "",
    remind: false,
    repeat: "every-day"
  };
  const [state, setState] = React.useState({...initialState});
  const [isColorPicker, setColorPicker] = React.useState(false);


  const onChangeInput = (name, value) => {
    if (name && value !== undefined) {

      // case remind. if enabled and no prev value = set 12, else null
        if(name === "remind") {
          let remindTime = state?.remindTime ? state.remindTime : "12:00"
          if (!value) remindTime = null;
          setState({ ...state, [name]: value, remindTime })        
        }

        // else default case
        else setState({ ...state, [name]: value })
    }
  }

  const onSubmitCheckName = useCallback((name) => {
    return !!items.find(e => e.name === name)
  }, [items])

  const onSubmit = () => {
    if (isEdit) {
      d(habitsActions.updateHabit({ ...state }));
      navigation.navigate('home')
    }
    else {
      if (onSubmitCheckName(state.name)) {

        alert(
          `Habit with provided name already exist.`,
          "",
          [
            {
              text: 'Ok',
              style: 'Ok',
            },
          ],
          {})
      }
      else {
        d(habitsActions.addHabit({ id: uuid.v4(), ...state, datesArray: [] }));
        setState(initialState);
        navigation.navigate('home')
      }
    }
  }

  const navigateToSetRepeat = () => {
    navigation.navigate('sethabit/repeat', {
      state,
      theme,
      onGoBack: ({ data }) => {
        // Callback function to handle data from ScreenB
        setState(data);
      },
    });
  }

  React.useEffect(() => {
    if (route?.params && isEdit)
      setState({ ...state, ...route.params });
  }, [route.params])

  React.useEffect(() => {}, [state]);

  React.useEffect(() => {
    let timer;
    const isAddOnMobile = !isEdit && (Platform.OS === "ios" || Platform.OS === "android");
    if (isAddOnMobile) {
      timer = setTimeout(() => {
        if (focusInputRef.current) {
          focusInputRef.current.focus();  // Focus on TextInput after delay
        }
      }, 550);
    }

    return () => clearTimeout(timer);
  }, []);

  return (

    <BaseView>
      <SettingsHeader
        title={isEdit ? t("eddt_screen") : t("addt_screen")}

        leftText={t("act_cancel")}
        rightPress={state.name?.length ? onSubmit : null}
        rightText={t("act_save")}
        bgColor={state.color}

        navigation={navigation}
      />


      {/* color picker & input */}

      <ScrollView style={{ paddingTop: 14, flex: 1 }}>
        <Label>{t("addt_name")}</Label>
        <View style={styles.combinedInput}>
          <TextInput
            ref={focusInputRef}
            style={[styles.settingsInput, styles.settingsInputEmbeded, { borderWidth: 0 }]}
            onChangeText={(v) => onChangeInput("name", v)}
            value={state.name}
            placeholder={t("addt_name_placeholder")}
            placeholderTextColor="#9ba2a7"
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
              marginRight: 15,
              marginBottom: 0
            }}
            title=" "
            backgroundColor={state.color}
          />
        </View>

        <Modal isOpen={isColorPicker}>
          <ModalContent>
            <ColorPicker>
              {HABIT_COLORS.map(color =>
                <BasePressButton
                  key={`key_pressbtn_${color}`}
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
        <TextInput
          style={styles.settingsInput}
          onChangeText={(v) => onChangeInput("notification", v)}
          value={state.notification}
          placeholder={t("addt_notif_placeholder")}
          placeholderTextColor="#9ba2a7"
        />


        <Label style={{ marginBottom: 7 }}>{t("label_reg")}</Label>
        <LineItemOptions
          onPress={navigateToSetRepeat}
          title={t("addt_repeat")}
          value={t(state.repeat)} />

        {Platform.OS === "ios" || Platform.OS === "android"
          ? <>
            <LineItemView pl1 toggle toggleColor={state.color} isEnabled={state.remind} onToggle={(v) => {onChangeInput("remind", v);}}>
              <Text style={{ fontSize: 16, color: getTheme(theme).textColorHighlight }}>{t("addt_remind")}</Text>
            </LineItemView>
          </>
          : null}

        {state.remind
          ? <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} style={{ backgroundColor: "#fff" }}>
            <RNDateTimePicker 
              style={{backgroundColor: getTheme(theme).bgHighlight,}}
              is24Hour={uses24HourClock(date)} 
              themeVariant={theme.split("__")[1]}
              onChange={onTimeSelect}
              // timeZoneOffsetInMinutes={0}
              timeZoneName={'GMT0'}
              value={new Date("2024-09-16T" + (state.remindTime ? state.remindTime + ":00.000Z" : `${DEFAULT_TIME}:00.000Z`))} 
              mode="time" 
              display="spinner" 
              />
          </Animated.View>
          : null}

      </ScrollView>
    </BaseView>
  )
}


export default SetHabitScreen