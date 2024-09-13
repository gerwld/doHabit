import React from 'react'
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native'
import { Header as HeaderRNE } from '@rneui/themed';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Label, ColorPicker } from "styles/crudtask"
import { BaseView, LineItemView, Modal, BasePressButton, LineItemOptions } from '@components';
import { HABIT_COLORS, getTheme } from '@constants';
import { habitsActions } from "actions";
import { useHeaderStyles } from 'hooks';
import { appSelectors } from '@redux';




const EditHabitScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const d = useDispatch();


  const theme = useSelector(appSelectors.selectAppTheme);
  const headerStyles = useHeaderStyles(theme);

  const initialState = {
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
    d(habitsActions.updateHabit({ ...state }));
    navigation.navigate('home')
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
      color:  getTheme(theme).textColorHighlight,
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

      <HeaderRNE
        containerStyle={headerStyles.header}
        style={{ height: 60 }}
        leftComponent={
          <Pressable onPress={() => navigation.navigate('home')}>
              <Text style={headerStyles.headerButton}>{t("act_cancel")}</Text>
          </Pressable>
        }
        rightComponent={
          <Pressable onPress={onSubmit}>
              <Text style={headerStyles.headerButton}>{t("act_save")}</Text>
          </Pressable>
        }
        centerComponent={<Text style={headerStyles.headerTitle}>{t("eddt_screen")}</Text>}
        backgroundColor={state.color}
      />


      <ScrollView style={{ paddingTop: 14, flex: 1 }}>
        <Label>{t("addt_name")}</Label>
        <View style={styles.combinedInput}>
        <TextInput
            style={[styles.settingsInput, styles.settingsInputEmbeded, {borderWidth: 0}]}
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
          placeholderTextColor="#"
        />

        <Label style={{ marginBottom: 7 }}>{t("label_reg")}</Label>

        <LineItemOptions
          onPress={navigateToSetRepeat}
          title={t('addt_repeat')}
          value={t(state.repeat)} />

        <LineItemView pl1 toggle toggleColor={state.color} isEnabled={state.remind} onToggle={(v) => onChangeInput("remind", v)}>
          <Text style={{ fontSize: 16, color: getTheme(theme).textColorHighlight }}>{t("addt_int_title")}</Text>
        </LineItemView>

      </ScrollView>
    </BaseView>
  )
}