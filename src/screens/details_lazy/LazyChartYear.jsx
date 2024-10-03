import { memo, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentTheme } from 'hooks';
import { shallowEqual, useSelector } from 'react-redux';
import { habitSelectors } from '@redux';
import { LineChart } from '@components';
import { getHabitScore } from '@tools'

const ChartYear = memo(({ itemColor, itemID }) => {
  const { t } = useTranslation();
  const [themeColors] = useCurrentTheme();
  
  const item = useSelector(
    (state) => habitSelectors.selectItemById(state, itemID),
    shallowEqual
  );

  

  
  const getChartStartDate = useCallback(() => {
    const today = new Date();
    const startMonth = today.getMonth() - 11; // current month - 11
    return new Date(today.getFullYear(), startMonth, 1);
  }, []);

  // creation of chart data
  const createChartData = useCallback((totalMonths = 12) => {
    const startDate = getChartStartDate();

    return Array.from({ length: totalMonths }).map((_, monthOffset) => {
      const currentMonthDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthOffset, 1);
      const lastMonthDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthOffset + 1, 0);

      const firstTimestamp = currentMonthDate.setHours(0, 0, 0, 0);
      const lastTimestamp = lastMonthDate.setHours(0, 0, 0, 0);

      const monthIndex = currentMonthDate.getMonth();
      const monthLabel = t("month_" + monthIndex);

      const { monthScore } = getHabitScore(item, firstTimestamp, lastTimestamp);

      const month = Object.create(null);
      month.name = monthLabel;
      const sub = String(monthIndex + 1);
      month.sub =  sub.length < 2 ? "0" + sub : sub;
      month.y = Math.round(monthScore)
      return month;
    });
  }, [getChartStartDate, item, t]);

  // memoized data recieve call
  const initData = useMemo(() => createChartData(), [createChartData]);

  if (!itemID || !item) return null;

  return initData ? (
    <LineChart
      payload={initData.slice(0, 12)}
      bottomLabelColor={themeColors.textColor}
      topLabelColor={themeColors.textColorHighlight}
      borderGraphColor={themeColors.borderGraphColor}
      borderLinesColor={themeColors.borderLinesColor}
      bottomLabelColorSec={themeColors.borderGraphColor}
      dotBgColor={themeColors.bgHighlight}
      dotColor={itemColor}
    />
  ) : null;
});

export default ChartYear;
