import React, { useCallback } from 'react'
import { Text, Button, StyleSheet, ScrollView, Alert } from 'react-native'
import { Icon } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import alert from '../polyfils/alert';
import { habitsActions } from "actions";
import { REPEAT_MASKS, getTheme, uses24HourClock, convertTo12HourFormat } from '@constants';
import { Label, InfoBar, InfoBarItem } from "styles/crudtask"
import { appSelectors } from '@redux';
import { CircularProgress, LineItemView, STHeader, BaseView } from '@components';
import CalendarPicker from 'react-native-calendar-picker';


const DetailsHabitScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const d = useDispatch();
  const theme = useSelector(appSelectors.selectAppTheme);

  const [item, setItem] = React.useState(null);
  const time = item?.remindTime;

  const  twelveOr24Time = (time) => {
    if(uses24HourClock(new Date())) return time;
    return convertTo12HourFormat(time);
  }

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
        onDismiss: () => { }
      })
  }

  const styles = StyleSheet.create({
    t: {
      color: getTheme(theme).textColorHighlight
    },
    i: {
      color: getTheme(theme).textColor
    },
    l: {
      marginLeft: 15
    },
    item: {
      justifyContent: "space-around",
      height: 180,
      marginTop: 5,
      marginBottom: 10
    },
    itemFlexible: {
      marginTop: 5,
      marginBottom: 10
    }
  })


  return (
    <BaseView>
      <STHeader
        title={item?.name}

        leftText={t("act_back")}
        rightPress={() => navigation.navigate("edithabit", item)}
        rightText={t("act_edit")}
        bgColor={item?.color ? item.color : "#5fb1e7"}

        navigation={navigation}
      />


      <ScrollView style={{ paddingTop: 14, flex: 1 }}>

        <LineItemView st={{ justifyContent: "space-around", paddingVertical: 10 }}>
          <InfoBarItem>
            <Icon type="feather" size={24} name="repeat" color={styles.i.color} />
            <Text style={[styles.t, styles.l]}>{item?.repeat ? REPEAT_MASKS[item.repeat] : "-"}</Text>
          </InfoBarItem>
          <InfoBarItem>
            <Icon type="feather" size={24} name="clock" color={styles.i.color} />
            <Text style={[styles.t, styles.l]}>{time ? twelveOr24Time(time) : "--:--"}</Text>
          </InfoBarItem>
        </LineItemView>



        <Label>{t("label_ov")}</Label>
        <LineItemView st={{ ...styles.item, paddingTop: 25 }}>
          <CircularProgress progress={20} size={55} strokeWidth={8} strColor={getTheme(theme).crossSymbL} color={item?.color ? item.color : "#7fcbfd"} />
          <Text style={styles.t}>23423</Text>
          <Text style={styles.t}>23423</Text>
          <Text style={styles.t}>23423</Text>
        </LineItemView>


        <Label>{t("label_hits")}</Label>
        <LineItemView st={{ ...styles.itemFlexible }}>
        <CalendarPicker 
        // customDatesStyles={}
        textStyle={{
          color: getTheme(theme).textColor,
          fontSize: 17
          }} 

        // onDateChange={()=> console.log("date")}
        startFromMonday={uses24HourClock(new Date())}
        selectedDayStyle={{}}
        selectedDayTextStyle={{color: getTheme(theme).textColor}}
        todayBackgroundColor={"#ffffff3f"}
        todayStyle={{color: "red"}}
        
     
        
        scrollable={true} />
      
    
        </LineItemView>


        <Label>{t("label_stre")}</Label>
        <LineItemView st={{ ...styles.item, marginBottom: 20 }}>
          <Text style={styles.t}>23423</Text>
          <Text style={styles.t}>23423</Text>
          <Text style={styles.t}>23423</Text>
        </LineItemView>


        <InfoBar style={{ marginBottom: 50 }}>
          <Button
            onPress={onPressDeleteHabit}
            title={t('act_delete')}
          />
        </InfoBar>

      </ScrollView>
    </BaseView>
  )
}

export default DetailsHabitScreen