import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Text, Button, StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import alert from '../polyfils/alert';
import { habitsActions } from "actions";
import { uses24HourClock, convertTo12HourFormat } from '@constants';
import { Label, InfoBar, InfoBarItem } from "styles/crudtask"
import { CircularProgress, LineItemView, STHeader, BaseView } from '@components';
import { useCurrentTheme, useHabitScore } from 'hooks';
import { SvgClock, SvgRepeat } from '../../assets/svg/hicons_svgr';
import Calendar from '../components/calendar/Calendar';
import * as Haptics from 'expo-haptics';

import { PLATFORM } from '@constants';
import { habitSelectors } from '../redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { handleMonthChange } from '../components/calendar';
const IS_APP = PLATFORM === "ios" || PLATFORM === "android";

const DetailsHabitScreen = React.memo(({ route, navigation }) => {
  const { t } = useTranslation();
  const d = useDispatch();
  const [themeColors] = useCurrentTheme();
  const [habitID, sethabitID] = React.useState(null);
  const [item, sethabit] = React.useState(null);

  const time = item?.remindTime;

  const twelveOr24Time = useCallback((time) => {
    if (uses24HourClock(new Date())) return time;
    return convertTo12HourFormat(time);
  }, [time])

  React.useEffect(() => {
    if(route.params.id)
    sethabitID(route.params.id);
    sethabit(route.params);
  }, [route.params.id])

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
      color: item?.color || "#3c95d0"
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

  const onDayPress = React.useCallback((timestamp) => {
    if (IS_APP) {
      Haptics.selectionAsync()
    }
    if (item && item?.id) {
      d(habitsActions.setHabitTimestamp({
        id: item.id,
        timestamp,
        isSet: true
      }))
    }
  }, [item])

  const datesArray = useMemo(() => item?.datesArray, [item]);
  const MemoizedCalendar = React.memo(Calendar);

  useEffect(() => {
    handleMonthChange(new Date().getMonth())
  }, [])

  if (!item) return <SafeAreaProvider><SafeAreaView style={{flex: 1, width: "100%", alignItems: "center", justifyContent: "center"}}><ActivityIndicator size="small" color={"#5fb1e7"} /></SafeAreaView></SafeAreaProvider>

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
          <HabitStrengthContent {...{habitID, themeColors, styles}}/>
        </View>
     


        <Label>{t("label_ov")}</Label>
        <LineItemView st={{ ...styles.itemFlexible }}>
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
           
            <MemoizedCalendar
              color={themeColors.textColor}
              itemID={habitID}
              activeColor={item?.color}
              onChange={onDayPress} />

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

const HabitStrengthContent = memo(({styles, themeColors, habitID}) => {
  const { t } = useTranslation();
  const item = useSelector(state => habitSelectors.selectItemById(state, habitID), shallowEqual);
  const [score, monthScore, yearScore] = useHabitScore(item);
  
 

  function getDecimal(value) {
    let hasDec = value % 1 !== 0
    if (hasDec) return value?.toFixed(1)
    return value;
  }
  function addPlus(v) {
    return v > 0 ? '+' + v : 0
  }
 

 
  return (
    <>
  
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
        <Text style={styles.ovBlockDD}>{t("dt_score")}</Text>
      </View>

      <View style={styles.ovParent}>
        <Text style={styles.ovBlockDT}>{addPlus(getDecimal(monthScore))}%</Text>
        <Text style={styles.ovBlockDD}>{t("dt_month")}</Text>
      </View>

      <View style={styles.ovParent}>
        <Text style={styles.ovBlockDT}>{addPlus(getDecimal(yearScore))}%</Text>
        <Text style={styles.ovBlockDD}>{t("dt_year")}</Text>
      </View>

    </>
  )
})

export default DetailsHabitScreen