import React from 'react'
import { REPEAT_GAP_VALUES } from '@constants';

const now = new Date();
const startOfMonthTS = new Date(now.getFullYear(), now.getMonth(), 1).setHours(0,0,0,0);
const endOfMonthTS = new Date(now.getFullYear(), now.getMonth() + 1, 0).setHours(0,0,0,0);
const ONE_DAY_IN_MS = 86400000;


export default function getHabitScore(item, timestampMin = startOfMonthTS, timestampMax = endOfMonthTS) {
    
    let weekScore,
        monthScore,
        yearScore = 0;

    if (item) {
        const { datesArray, repeat } = item;
        const tsSorted = Array.from(datesArray).sort((a, b) => b - a);



        // gets obj of current habit preset (repeat count) 
        const GAP_VALUES = REPEAT_GAP_VALUES[repeat]
        const reset_gap = (GAP_VALUES.reset_gap) * ONE_DAY_IN_MS;

        function getLastActivePortion(current) {
            let range = 30;
            
            if(current === "WEEK") range = 7;
            if(current === "YEAR") range = 366;
                    

            timestampMin = timestampMax - (range * ONE_DAY_IN_MS);
            let tsFiltered = Array.from(tsSorted).filter(ts => ts >=timestampMin && ts <= timestampMax);
            return Array.from(tsFiltered).reduce((acc, cur, i) => {
                // if first iteration or next timestamp has lower gap detween prev than reset_gap
                 if (i === 0 || acc?.length && acc[0] - reset_gap <= cur) 
                    acc.unshift(cur);
                return acc
            }, [])
        }


        // sets month
        monthScore = getLastActivePortion("MONTH").length * GAP_VALUES.day_percent;

        // sets week
        weekScore = getLastActivePortion("WEEK").length * GAP_VALUES.day_percent;

        // you get the point
        yearScore = getLastActivePortion("YEAR").length * GAP_VALUES.day_percent;

        
    }

    // fallback
    if (weekScore > 100) weekScore = 100;
    if (monthScore > 100) monthScore = 100;
    if (yearScore > 100) yearScore = 100;
    return {weekScore, monthScore, yearScore};
}
