import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Header as HeaderRNE, Icon } from '@rneui/themed';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';

import { BaseView, LineItemView, Modal, BasePressButton, LineItemOptions } from '@components';
import { HABIT_COLORS, REPEAT_MASKS, getRandomItem } from '@constants';

import { useDispatch } from 'react-redux';
import { habitsActions } from "actions";
import { FlatList, Pressable } from 'react-native-gesture-handler';


const AHSRepeat = ({ route, navigation }) => {
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

  const handleGoBack = () => {
    // Pass data back to ScreenA using the onGoBack callback
    route.params.onGoBack(state);
    navigation.goBack();
  };

  React.useEffect(() => {
    setState({ ...state, ...route.params });
  }, [route.params])

  return (

    <BaseView>
      <HeaderRNE
        containerStyle={styles.header}
        style={{ height: 60 }}
        leftComponent={
          <TouchableOpacity onPress={handleGoBack}>
            <View style={styles.headerButton}>
              <Title style={{ fontWeight: 400 }}>Back</Title>
            </View>
          </TouchableOpacity>
        }

        centerComponent={<Text style={styles.headerTitle}>Repeat intervals</Text>}
        backgroundColor={state.color}
      />

      <View style={{ paddingTop: 14 }}>
        <SelectList
          currentValue={state.repeat}
          color={state.color}
          setValue={(v) => onChangeInput('repeat', v)}
          data={Object.keys(REPEAT_MASKS).map(e => ({ name: REPEAT_MASKS[e], value: e }))}
          title="Regularity"
        />
      </View>


    </BaseView>
  )
}


const SelectList = ({ data, title, currentValue, setValue, color }) => {

  const ListItem = ({ value, name, onPress, color }) => {
    return (
      <Pressable onPress={onPress}>
        <View style={select.item}>
          <Text style={select.text}>{name}</Text>
          <Text style={select.checkmark}>{currentValue === value ? 
        
          <Icon style={{ pointerEvents: "none" }} type="antdesign" size={24} name="check" color={color ? color : "#5fb1e7"} />
          : ""}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <>
      <Label style={{ marginBottom: 7 }}>{title}</Label>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={data}
        renderItem={({ item }) => <ListItem {...{...item, color, onPress: () => setValue(item.value)}} />
        }
      />
    </>
  )
}

const select = StyleSheet.create({
  listContent: {

  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    border: "1px solid transparent",
    borderBottomColor: "#e6eaf0",
    minHeight: 48,
  },
  text: {
    lineHeight: 48,
    paddingLeft: 18,
    paddingRight: 10
  },
  checkmark: {
    marginRight: 10
  }
})


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
const Label = styled.Text`
  font-size: 12px;
  color: #6a767d;
  text-transform: uppercase;
  margin-left: 15px;
`



export default AHSRepeat