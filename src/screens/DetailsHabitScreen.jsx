import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Text, Button, StyleSheet, ScrollView, View, ActivityIndicator, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import alert from '../polyfils/alert';
import { habitsActions } from "actions";
import { uses24HourClock, convertTo12HourFormat } from '@constants';
import { Label, InfoBar, InfoBarItem } from "styles/crudtask"
import { CircularProgress, LineItemView, STHeader, BaseView, LineChart, Heatmap } from '@components';
import { useCurrentTheme, getHabitScore } from 'hooks';
import { SvgClock, SvgRepeat } from '../../assets/svg/hicons_svgr';
import Calendar from '../components/calendar/Calendar';
import * as Haptics from 'expo-haptics';

import { PLATFORM } from '@constants';
import { habitSelectors } from '../redux';
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
    if (route.params?.id) {
      sethabitID(route.params.id);
      sethabit(route.params);
    }
  }, [route.params?.id])

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

  const MemoizedCalendar = React.memo(Calendar);

  useEffect(() => {
    handleMonthChange(new Date().getMonth())
  }, [])

  if (!item) return <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}><ActivityIndicator size="large" color={"#5fb1e7"} /></View>

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

            <MemoizedCalendar
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
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
            <HeatmapYear
              itemColor={item?.color}
              habitID={habitID} />
          </View>
        </LineItemView>

        <Label>{t("label_stre")}</Label>
        <LineItemView st={{ ...styles.itemFlexible }}>
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
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


// Heatmap part

const HeatmapYear = memo(({ habitID, itemColor }) => {
  const [themeColors] = useCurrentTheme();

  return (
    <Heatmap
      itemID={habitID}
      color={themeColors.textColorHighlight}
      backgroundDay={themeColors.dayGraphColor}
      backgroundActiveDay={itemColor}
    />
  )
})


// ChartYear part 

const ChartYear = memo(({ itemColor, itemID }) => {
  const { t } = useTranslation();
  const [themeColors] = useCurrentTheme();
  const item = useSelector((state) => habitSelectors.selectItemById(state, itemID), shallowEqual);

  if(!itemID || !item) return;

  const dataSample = [
    { subname: "03/24", name: 'January', y: 0 },
  ];

  function createChartData(totalMonths = 12) {
    const getChartStartDate = () => {
      const today = new Date();
      const startMonth = today.getMonth() - 11; // current month - 11
      return new Date(today.getFullYear(), startMonth, 1);
    };

    const startDate = getChartStartDate();

    return Array.from({ length: totalMonths }).map((_, monthOffset) => {
      const currentMonthDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthOffset, 1);
      const lastMonthDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthOffset + 1, 0);

      const firstTimestamp = currentMonthDate.setHours(0, 0, 0, 0);
      const lastTimestamp = lastMonthDate.setHours(0, 0, 0, 0);

      const monthIndex = currentMonthDate.getMonth();
      const monthLabel = t("month_" + monthIndex);

      const {monthScore} = getHabitScore(item, firstTimestamp, lastTimestamp);      

      return {
        firstTimestamp,
        lastTimestamp,
        name: monthLabel,
        subname: String(monthIndex + 1).padStart(2, "0") + "/" + String(currentMonthDate.getFullYear()).slice(2, 4),
        y: Math.round(monthScore || 0)
      }
    })
  }

  const initData2 = createChartData();

  return (
    <LineChart
      payload={initData2}
      bottomLabelColor={themeColors.textColor}
      topLabelColor={themeColors.textColorHighlight}
      borderGraphColor={themeColors.borderGraphColor}
      borderLinesColor={themeColors.borderLinesColor}
      bottomLabelColorSec={themeColors.borderGraphColor}
      dotBgColor={themeColors.bgHighlight}
      dotColor={itemColor}
    />
  )

})


// OverviewContent part 

const OverviewContent = memo(({ styles, themeColors, habitID }) => {
  const { t } = useTranslation();
  const item = useSelector(state => habitSelectors.selectItemById(state, habitID), shallowEqual);
  const {weekScore, monthScore, yearScore} = getHabitScore(item);



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
          strokeWidth={5}
          strColor={themeColors.crossSymbL}
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