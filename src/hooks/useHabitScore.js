import React from 'react'
import { REPEAT_GAP_VALUES, REPEAT_MASKS } from '@constants';

const now = new Date();
const startOfMonthTS = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
const endOfMonthTS = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).getTime();








export default function useHabitScore(item) {
    let score,
        monthScore,
        yearScore = 0;

    if (item) {
        const { datesArray, repeat } = item;
        
        // score part
        const GAP_VALUES = REPEAT_GAP_VALUES[repeat]
        score = datesArray.length * GAP_VALUES.day_percent;


        // beta
        const tsSorted = Array.from(datesArray).sort((a, b) => b - a);
        const tsCurrentMonth = Array.from(datesArray)
            .filter(ts => ts >= startOfMonthTS && ts <= endOfMonthTS);
        monthScore = tsSorted.length * GAP_VALUES.day_percent;

    }


    if (score > 100) score = 100;
    if (monthScore > 100) monthScore = 100;
    if (yearScore > 100) yearScore = 100;
    return [score, monthScore, yearScore];
}
