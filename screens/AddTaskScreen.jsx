import React from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import styled from 'styled-components/native';
import { BaseView, LineItemView } from '../components';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '../components/styling/BaseButton';

const AddTaskScreen = () => {
  const [number, onChangeNumber] = React.useState('');
  const { t } = useTranslation();

  return (

    <BaseView>
      <View style={{ paddingTop: 14 }}>
        <Label>{t("addt_name")}</Label>
        <SettingsInput
          onChangeText={onChangeNumber}
          value={number}
          placeholder={t("addt_name_placeholder")}
          placeholderTextColor="#949ca1"
        />

        <Label>{t("addt_notif")}</Label>
        <SettingsInput
          onChangeText={onChangeNumber}
          value={number}
          placeholder={t("addt_notif_placeholder")}
          placeholderTextColor="#949ca1"
        />

        <Label>Regularity</Label>
        <LineItemView toggle isEnabled>
          <Text>Remind me</Text>
        </LineItemView>

        <LineItemView rightArrow>
          <Text>Repeat</Text>
        </LineItemView>
      </View>
      <ButtonsView>
        <BaseButton style={{ marginRight: 5 }} color="#aebddd" title="Cancel" />
        <BaseButton title="Add new" />
      </ButtonsView>
    </BaseView>
  )

}


const ButtonsView = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  gap: 10px;
  margin-right: 10px;
  margin-top: 20px;

`


const Label = styled.Text`
  font-size: 12px;
  color: #6a767d;
  text-transform: uppercase;
  margin-left: 15px;
`

const SettingsInput = styled.TextInput`
  height: 48px;
  margin-bottom: 14px;
  margin: 4px 0 14px 0;
  background: #fff;
  padding: 10px 10px 10px 15px;
  border-radius: 0;
`

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 0,
    marginTop: 4,
    marginBottom: 14,
    borderWidth: 1,
    padding: 10,
  },
});


export default AddTaskScreen