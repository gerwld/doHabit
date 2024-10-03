import React, { memo, useCallback, useEffect } from 'react'
import { Text, Button, StyleSheet, ScrollView, View, ActivityIndicator, Vibration, Platform } from 'react-native'
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import alert from '../polyfils/alert';
import { habitsActions } from "actions";
import { Label, InfoBar, InfoBarItem } from "styles/crudtask"
import { uses24HourClock, convertTo12HourFormat } from '@constants';
import { CircularProgress, LineItemView, STHeader, BaseView, Calendar } from '@components';
import { handleMonthChange } from '@components/calendar';
import { getHabitScore } from '@tools'
import { useCurrentTheme } from 'hooks';

import { SvgClock, SvgRepeat } from '../../assets/svg/icons_svgr';

import * as Haptics from 'expo-haptics';

import { habitSelectors } from '@redux';

import HeatmapYear from "./details_lazy/LazyHeatmapYear";
import ChartYear from "./details_lazy/LazyChartYear";
import Animated, { FadeIn } from 'react-native-reanimated';

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
    if (route.params)
      sethabit(route.params);


    if (route.params?.id) {
      sethabitID(route.params.id);
    }
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

  const [showHeatmap, setShowHeatmap] = React.useState(false)

  useEffect(() => {
    if (item && item?.id && !showHeatmap) {
      setTimeout(() => setShowHeatmap(true), 10)
    }
  }, [item, showHeatmap])

  const styles = StyleSheet.create({
    t: {
      color: themeColors.textColor
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
      marginTop: 4,
      marginBottom: 12,
      paddingVertical: 10,
      backgroundColor: themeColors.bgHighlight
    },
    itemInt: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    itemFlexible: {
      marginTop: 5,
      marginBottom: 10
    },
    ovBlockDT: {
      textAlign: "center",
      fontSize: 20,
      minWidth: 60,
      fontWeight: "bold",
      color: item?.color || "#3c95d0"
    },
    ovBlockDD: {
      fontSize: 15,
      color: themeColors.textColor
    },
    ovParent: {
      alignItems: "center",
      justifyContent: "center"
    },
    circle: {
      paddingLeft: 10,
      alignSelf: "center"
    }
  })

  const onDayPress = React.useCallback((timestamp) => {
    if (Platform.OS === "ios")
      Haptics.selectionAsync()
    if (Platform.OS === "android")
      Vibration.vibrate([0, 8]);

    if (item && item?.id) {
      d(habitsActions.setHabitTimestamp({
        id: item.id,
        timestamp,
        isSet: true
      }))
    }
  }, [item])

  useEffect(() => {
    handleMonthChange(new Date().getMonth())
  }, [])

  if (!item?.color) return <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}><ActivityIndicator size="large" color={"#5fb1e7"} /></View>

  return (
    <BaseView>
      <STHeader
        title={item?.name}
        onGoBack={() => navigation.navigate("home")}
        leftText={t("act_back")}
        rightPress={() => navigation.navigate("edithabit", item)}
        rightText={t("act_edit")}
        bgColor={item?.color ? item.color : "#5fb1e7"}

        navigation={navigation}
      />

      <ScrollView style={{ paddingTop: 14, flex: 1 }}>


        <LineItemView st={{ justifyContent: "space-around", paddingVertical: 10, minHeight: 0, backgroundColor: "transparent" }}>
          <InfoBarItem>
            <SvgRepeat size={22} color={themeColors.textColor} />
            <Text style={[styles.t, styles.l]}>{item?.repeat ? t(item.repeat) : "-"}</Text>
          </InfoBarItem>
          <InfoBarItem>
            <SvgClock size={22} color={themeColors.textColor} />
            <Text style={[styles.t, styles.l]}>{time ? twelveOr24Time(time) : "--:--"}</Text>
          </InfoBarItem>
        </LineItemView>

        <View style={[styles.item, { flexDirection: "column", width: "100%" }]}>
          <OverviewContent {...{ habitID, themeColors, styles }} />
        </View>



        <Label>{t("label_month")}</Label>
        <LineItemView st={{ ...styles.itemFlexible }}>
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>

            <Calendar
              borderColor={themeColors.calendarBorderColor}
              color={themeColors.textColor}
              colorContrast={themeColors.textColorHighlight}
              itemID={habitID}
              activeColor={item?.color}
              onChange={onDayPress} />



          </View>
        </LineItemView>


        <Label>{t("label_ov")}</Label>
        <LineItemView st={{ ...styles.itemFlexible }}>
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%", minHeight: 340 }}>
            {showHeatmap &&
              <Animated.View entering={FadeIn.duration(300)}>
                <HeatmapYear
                  itemColor={item?.color}
                  habitID={habitID} />
              </Animated.View>
            }
          </View>
        </LineItemView>

        <Label>{t("label_stre")}</Label>
        <LineItemView st={{ ...styles.itemFlexible }}>
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: 250, minHeight: 250, maxHeight: 250, overflow: "hidden" }}>
            <ChartYear itemColor={item?.color} itemID={habitID} />
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






// OverviewContent part 

const OverviewContent = memo(({ styles, themeColors, habitID }) => {
  const { t } = useTranslation();
  const item = useSelector(state => habitSelectors.selectItemById(state, habitID), shallowEqual);
  const { weekScore, monthScore, yearScore } = getHabitScore(item);



  function getDecimal(value) {
    // let hasDec = value % 1 !== 0
    // if (hasDec) return value?.toFixed(1)
    return Math.round(value);
  }
  function addPlus(v) {
    return v > 0 ? '+' + v : 0
  }

  return (
    <View style={styles.itemInt}>

      <View style={styles.circle} >
        <CircularProgress
          progress={monthScore}
          size={40}
          strokeWidth="5"
          strColor={themeColors.crossSymbL}
          strokeDashoffset="0"
          color={item?.color ? item.color : "#7fcbfd"} />
      </View>

      <View style={styles.ovParent}>
        <Text style={styles.ovBlockDT}>{addPlus(getDecimal(weekScore))}%</Text>
        <Text style={styles.ovBlockDD}>{t("dt_week")}</Text>
      </View>

      <View style={styles.ovParent}>
        <Text style={styles.ovBlockDT}>{addPlus(getDecimal(monthScore))}%</Text>
        <Text style={styles.ovBlockDD}>{t("dt_month")}</Text>
      </View>

      <View style={styles.ovParent}>
        <Text style={styles.ovBlockDT}>{addPlus(getDecimal(yearScore))}%</Text>
        <Text style={styles.ovBlockDD}>{t("dt_year")}</Text>
      </View>

    </View>
  )
})

export default DetailsHabitScreen