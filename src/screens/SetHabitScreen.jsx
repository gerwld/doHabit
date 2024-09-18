import React, { useCallback, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


import { Label, ColorPicker } from "styles/crudtask"
import { BaseView, LineItemView, Modal, BasePressButton, LineItemOptions, STHeader } from '@components';
import { HABIT_COLORS, getRandomItem, getTheme, getTimeFromTimestamp, uses24HourClock } from '@constants';
import { habitsActions } from "actions";
import { appSelectors, habitSelectors } from '@redux';
import alert from '../polyfils/alert';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useInputFocusOnInit } from '../hooks';

const DEFAULT_TIME = "11:00"

const SetHabitScreen = ({ route, navigation, isEdit }) => {
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
  const theme = useSelector(appSelectors.selectAppTheme);
  const items = useSelector(habitSelectors.selectItems);

  const onChangeInput = (name, value) => {
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
          ])
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={ref => { this.scrollView = ref }}
          onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps={'handled'}
          style={{ paddingTop: 14, flex: 1 }}>
          <Label>{t("addt_name")}</Label>
          <View style={styles.combinedInput}>
            <TextInput
              keyboardAppearance={getTheme(theme).label}
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
            keyboardAppearance={getTheme(theme).label}
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
            ?
            <>
              <LineItemView pl1 toggle toggleColor={state.color} isEnabled={state.remind} onToggle={(v) => { onChangeInput("remind", v); }}>
                <Text style={{ fontSize: 16, color: getTheme(theme).textColorHighlight }}>{t("addt_remind")}</Text>
              </LineItemView>

              <SelectDate
                remind={state.remind}
                theme={theme}
                value={state?.remindTime}
                onChangeInput={onChangeInput}
                isVisible={state.remind} />
            </>
            : null}

          <View style={{ paddingBottom: 20 }} />
        </ScrollView>

      </KeyboardAvoidingView>
    </BaseView>
  )
}

const SelectDate = ({ isVisible, theme, value, onChangeInput, remind }) => {  
  const date = new Date();

  const onTimeSelect = (_, payload) => {
    const time = getTimeFromTimestamp(payload);
    if (time) {
      onChangeInput("remindTime", time);
    }
  }

  const height = useSharedValue(220);

  const animatedProps = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden'
  }));

  React.useEffect(() => {
    const value = remind ? 220 : 0
    height.value = withTiming(value, {duration: 300})
  }, [remind])

  return (
    <Animated.View style={animatedProps}>
      {isVisible
        ? <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(300)}>
          <RNDateTimePicker
            style={{ backgroundColor: getTheme(theme).bgHighlight, }}
            is24Hour={uses24HourClock(date)}
            themeVariant={getTheme(theme).label}
            onChange={onTimeSelect}
            timeZoneName={'GMT0'}
            value={new Date("2024-09-16T" + (value ? value + ":00.000Z" : `${DEFAULT_TIME}:00.000Z`))}
            mode="time"
            display="spinner"
          />
        </Animated.View>
        : null}
    </Animated.View>
  )
}


export default SetHabitScreen