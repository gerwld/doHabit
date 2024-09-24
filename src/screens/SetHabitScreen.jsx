import React, { useCallback, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';

import { Label, ColorPicker } from "styles/crudtask"
import { BaseView, LineItemView, Modal, BasePressButton, LineItemOptions, STHeader, SelectDate } from '@components';
import { HABIT_COLORS, PLATFORM, convertTo12HourFormat, getRandomItem, uses24HourClock } from '@constants';
import { habitsActions } from "actions";
import { habitSelectors } from '@redux';
import alert from '../polyfils/alert';
import { useCurrentTheme, useInputFocusOnInit } from 'hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEFAULT_TIME = "11:00"

const SetHabitScreen = React.memo(({ route, navigation, isEdit }) => {
  const focusInputRef = useRef(null);
  const { t } = useTranslation();
  const d = useDispatch();

  const initialState = {
    color: getRandomItem(HABIT_COLORS),
    name: "",
    notification: "",
    remind: false,
    repeat: "every-day"
  }

  const [state, setState] = React.useState({ ...initialState });
  const [isColorPicker, setColorPicker] = React.useState(false);
  const [isSelectTime, setSelectTime] = React.useState(false);
  const itemsArray = useSelector(habitSelectors.selectItemsArray);
  const [themeColors] = useCurrentTheme();


  const androidTimeSelected = state.remindTime && PLATFORM === "android";

  const onChangeInput = useCallback((name, value) => {
    if (name && value !== undefined) {

      // case "remind, remindTime" part. if enabled and no prev value = set 12, else null
      if (name === "remind") {
        let remindTime = state?.remindTime ? state.remindTime : DEFAULT_TIME
        if (!value) remindTime = null;
        setState({ ...state, [name]: value, remindTime })
      }

      // else default case
      else setState({ ...state, [name]: value })
    }
  }, [state]);


  const onSubmitCheckName = useCallback((name) => {
    return !!itemsArray.find(e => e.name === name)
  }, [itemsArray])

  const onSubmit = useCallback(() => {
    if (isEdit) {
      d(habitsActions.updateHabit({...state}));
      navigation.navigate('home')
    }
    else {
      if (onSubmitCheckName(state.name)) {
        alert(
          t("act_exist"),
          "",
          [
            {
              text: 'Ok',
              style: 'Ok',
            },
          ])
      }
      else {
        // ~35ms vs 65ms in assign benchmark
        const cleanObj = Object.create(null);
        Object.assign(cleanObj, state);
        Object.assign(cleanObj, { id: uuid.v4(), datesArray: [] });
        d(habitsActions.addHabit(cleanObj));
        // d(habitsActions.addHabit({ id: uuid.v4(), ...state, datesArray: [] }));
        setState(initialState);
        navigation.navigate('home')
      }
    }
  })

  const navigateToSetRepeat = () => {
    navigation.navigate('sethabit/repeat', {
      state,
      onGoBack: ({ data }) => {
        // Callback function to handle data from ScreenB
        setState(data);
      },
    });
  }

  const twelveOr24Time = useCallback((time) => {
    if(uses24HourClock(new Date())) return time;
    return convertTo12HourFormat(time);
  }, [])

  !isEdit && useInputFocusOnInit(focusInputRef);

  React.useEffect(() => {
    // sets params from route
    if (route?.params && isEdit)
      setState({ ...state, ...route.params });
  }, [route.params])


  const styles = StyleSheet.create({
    combinedInput: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 7,
      marginBottom: 14,
      backgroundColor: themeColors.bgHighlight,
      border: `1px solid ${themeColors.borderColor}`,
      borderWidth: 1,
      borderColor: `${themeColors.borderColor}`,
      borderLeftColor: "transparent",
      borderRightColor: "transparent"
    },
    settingsInput: {
      height: 58,
      marginTop: 7,
      marginBottom: 14,
      backgroundColor: themeColors.bgHighlight,
      paddingVertical: 12,
      paddingLeft: 15,
      paddingRight: 10,
      borderRadius: 0,
      fontSize: 17,
      color: themeColors.textColorHighlight,
      // border: `1px solid ${themeColors.borderColor}`,
      borderWidth: 1,
      borderColor: `${themeColors.borderColor}`,
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
  background:${themeColors.bgHighlight};
  color: ${themeColors.textColorHighlight};
  padding: 20px;
  border-radius: 10px;
`


  return (
    <BaseView>
      <STHeader
        title={isEdit ? t("eddt_screen") : t("addt_screen")}

        leftText={t("act_cancel")}
        rightPress={state.name?.length ? onSubmit : null}
        rightText={t("act_save")}
        bgColor={state.color}

        navigation={navigation}
      />


      {/* color picker & input */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={PLATFORM === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          overScrollMode='always'
          ref={ref => { this.scrollView = ref }}
          onContentSizeChange={() => state.remind && this.scrollView.scrollToEnd({ animated: true })}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps={'handled'}
          style={{ paddingTop: 14, flex: 1 }}>
          <Label>{t("addt_name")}</Label>
          <View style={styles.combinedInput}>
            <TextInput
              keyboardAppearance={themeColors.label}
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


          <Modal isOpen={isColorPicker} transparent>
          <TouchableWithoutFeedback onPress={() => setColorPicker(false)}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <SafeAreaView>
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
                </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

          {/* color picker end */}

          <Label>{t("addt_notif")}</Label>
          <TextInput
            keyboardAppearance={themeColors.label}
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

          {/* TODO: Web support */}
          {PLATFORM === "ios" || PLATFORM === "android"
            ? <LineItemView 
                pl1 
                toggle 
                toggleColor={state.color} 
                isEnabled={state.remind} 
                onPress={() => {onChangeInput("remind", true); setSelectTime(true)}}
                onToggle={(v) => { onChangeInput("remind", v); setSelectTime(v) }}>
                <Text style={{ fontSize: 17, color: themeColors.textColorHighlight, flex: 1 }}>{t("addt_remind")}</Text>
                {androidTimeSelected
               ? <Text style={{ fontSize: 17, color: themeColors.chevronText, marginRight: 10 }}>{twelveOr24Time(state.remindTime)}</Text>
                :  null}
              </LineItemView>
            : null}

          {state.remind 
          ? <SelectDate
                remind={state.remind}
                themeColors={themeColors}
                value={state?.remindTime}
                isSelectTime={isSelectTime}
                setSelectTime={setSelectTime}
                onChangeInput={onChangeInput} />
          : null}

          <View style={{ paddingBottom: 20 }} />
        </ScrollView>

      </KeyboardAvoidingView>
    </BaseView>
  )
});


export default SetHabitScreen