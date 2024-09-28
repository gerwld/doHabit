import React from 'react'
import { REPEAT_GAP_VALUES } from '@constants';

const now = new Date();
const startOfMonthTS = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
const endOfMonthTS = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).getTime();
const ONE_DAY_IN_MS = 86400000;


export default function getHabitScore(item, timestampMin, timestampMax) {
    let score,
        monthScore,
        yearScore = 0;

    if (item) {
        const { datesArray, repeat } = item;
        const tsSorted = Array.from(datesArray).sort((a, b) => b - a);
        const tsFiltered = Array.from(tsSorted).filter(ts => ts >=timestampMin && ts <= timestampMax);

        // score part
        // gets obj of current preset (repeat count) 
        const GAP_VALUES = REPEAT_GAP_VALUES[repeat]


        function getLastActivePortion() {
            const reset_gap = (GAP_VALUES.reset_gap) * ONE_DAY_IN_MS;
            return Array.from(timestampMin ? tsFiltered : tsSorted).reduce((acc, cur, i) => {
                // if first iteration or next timestamp has lower gap detween prev than reset_gap
                 if (i === 0 || acc?.length && acc[0] - reset_gap <= cur) 
                    acc.unshift(cur);
                return acc
            }, [])
        }


        // sets score
        score = getLastActivePortion().length * GAP_VALUES.day_percent;


        // beta
        const tsCurrentMonth = Array.from(datesArray)
            .filter(ts => ts >= startOfMonthTS && ts <= endOfMonthTS);
        monthScore = tsSorted.length * GAP_VALUES.day_percent;

    }

    // fallback
    if (score > 100) score = 100;
    if (monthScore > 100) monthScore = 100;
    if (yearScore > 100) yearScore = 100;
    return [score, monthScore, yearScore];
}
