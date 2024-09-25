import React, { useCallback } from 'react'
import { Text, Button, StyleSheet, ScrollView, View, useWindowDimensions } from 'react-native'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import alert from '../polyfils/alert';
import { habitsActions } from "actions";
import { uses24HourClock, convertTo12HourFormat } from '@constants';
import { Label, InfoBar, InfoBarItem } from "styles/crudtask"
import { CircularProgress, LineItemView, STHeader, BaseView } from '@components';
import CalendarPicker from 'react-native-calendar-picker';
import { useCurrentTheme, useHabitScore } from 'hooks';
import { SvgClock, SvgRepeat } from '../../assets/svg/hicons_svgr';
import Calendar from '../components/calendar/Calendar';


const DetailsHabitScreen = React.memo(({ route, navigation }) => {
  const { t } = useTranslation();
  const d = useDispatch();
  const [themeColors] = useCurrentTheme();
  const [item, setItem] = React.useState(null);
  const {width, height} = useWindowDimensions()
  const [score, monthScore, yearScore] = useHabitScore(item);
  const time = item?.remindTime;

  const twelveOr24Time = useCallback((time) => {
    if (uses24HourClock(new Date())) return time;
    return convertTo12HourFormat(time);
  }, [time])

  React.useEffect(() => {
    setItem(route.params);
  }, [route.params])

  const onPressDeleteHabit = () => {
    const onConfirm = () => {
      d(habitsActions.delHabit(item.id));
      navigation.navigate("home");
    }

    alert(
      `${t("act_delete_item")} "${item.name}"?`,
      t("del_undone"),
      [
        {
          text: t("act_cancel"),
          style: 'cancel',
        },
        {
          text: t("act_delete"),
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
      color: themeColors.textColorHighlight
    },
    i: {
      color: themeColors.textColor
    },
    l: {
      marginLeft: 15
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 5,
      marginBottom: 12,
      paddingVertical: 50,
      backgroundColor: themeColors.bgHighlight


    },
    itemFlexible: {
      marginTop: 5,
      marginBottom: 10
    },
    ovBlockDT: {
      textAlign: "center",
      fontSize: 26,
      minWidth: 72,
      fontWeight: "bold",
      color: item?.color
    },
    ovBlockDD: {
      fontSize: 17,
      color: themeColors.textColor
    },
    ovParent: {
      alignItems: "center",
      justifyContent: "center"
    },
    circle: {
      paddingLeft: 10
    }
  })

  function getDecimal(value) {
    let hasDec = value % 1 !== 0
    if (hasDec) return value?.toFixed(1)
    return value;
  }
  function addPlus(v) {
    return v > 0 ? '+' + v : 0
  }


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
            <SvgRepeat size={24} color={themeColors.textColor} />
            <Text style={[styles.t, styles.l]}>{item?.repeat ? t(item.repeat) : "-"}</Text>
          </InfoBarItem>
          <InfoBarItem>
            <SvgClock size={24} color={themeColors.textColor} />
            <Text style={[styles.t, styles.l]}>{time ? twelveOr24Time(time) : "--:--"}</Text>
          </InfoBarItem>
        </LineItemView>



        <Label>{t("label_stre")}</Label>
        <View style={styles.item}>
          <View style={styles.circle} >
            <CircularProgress
              progress={score > 0 ? score : 1}
              size={55}
              strokeWidth={8}
              strColor={themeColors.crossSymbL}
              color={item?.color ? item.color : "#7fcbfd"} />
          </View>

          <View style={styles.ovParent}>
            <Text style={styles.ovBlockDT}>{addPlus(getDecimal(score))}%</Text>
            <Text style={styles.ovBlockDD}>Score</Text>
          </View>

          <View style={styles.ovParent}>
            <Text style={styles.ovBlockDT}>{addPlus(getDecimal(monthScore))}%</Text>
            <Text style={styles.ovBlockDD}>Month</Text>
          </View>

          <View style={styles.ovParent}>
            <Text style={styles.ovBlockDT}>{addPlus(getDecimal(yearScore))}%</Text>
            <Text style={styles.ovBlockDD}>Year</Text>
          </View>

        </View>


        <Label>{t("label_ov")}</Label>
        <LineItemView st={{ ...styles.itemFlexible }}>
          <View style={{alignItems: "center", justifyContent:"center", width: "100%"}}>
            
            {/* <CalendarPicker
              width={Math.min(width, height, 800)}
              textStyle={{
                color: themeColors.textColor,
                fontSize: 17
              }}
              startFromMonday={uses24HourClock(new Date())}
              selectedDayStyle={{}}
              selectedDayTextStyle={{ color: themeColors.textColor }}
              todayBackgroundColor={"#ffffff3f"}
              todayStyle={{ color: "red" }}
              scrollable={true} /> */}

              <Calendar color={themeColors.textColor}/>

          </View>


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
});

export default DetailsHabitScreen