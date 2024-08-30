import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import styled from 'styled-components/native';
import { BaseView } from '../components';

const AddTaskScreen = () => {
  const [number, onChangeNumber] = React.useState('');


  return (

    <BaseView>
      <View style={{paddingTop: 14}}>
        <Label>Name</Label>
        <SettingsInput
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Name of the habbit"
          placeholderTextColor="#949ca1" 
        />

        <Label>Notification</Label>
        <SettingsInput
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Did you ... today?"
          placeholderTextColor="#949ca1" 
        />

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