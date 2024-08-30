import StatisticService from "api/StatisticService";
import showMessage from "react-hot-toast";
import { FeelService, TrainService } from "../../api";
import { epochDateConvert, epochDayConvert } from "../../utils";

export const fetchStatistics = (fromEpochDay, toEpochDay) => {
 return (dispatch) => {
  StatisticService.getRunDistance(fromEpochDay, toEpochDay)
   .then(({ data }) => {
    dispatch({ type: "SET_STATS", payload: data });
   })
   .catch((error) => {
    showMessage.error(error?.response?.data?.message || error.message || "Unknown error");
   });
 };
};

export const fetchStatisticsGlobal = (fromEpochDate, toEpochDate) => {
 return (dispatch) => {
  dispatch({ type: "SET_STATS_INIT", payload: false });

  const trainsStats = TrainService.getTrains(fromEpochDate, toEpochDate)
    .then(({ data }) => {
      return data.map(e => ({
        city: "Distance",
        month: epochDateConvert(e.epochDate, null, true),
        metric: e.distance
      }));
    })

  const feelsStats = FeelService.getAllFeels(epochDateConvert(fromEpochDate, null, true), 
                                             epochDateConvert(toEpochDate, null, true))
      .then(({ data }) => {
        return data.map(e => ({
          city: "Day Weight",
          month: e.epochDay,
          metric: e.weight
        }));
    })


  // Bit complicated here. What it does: Fetch 2 data resources, 
  // then each one is sorted and filtered by day (each group of the stats chart resource has to contain max 1 res per day. 
  // If it founds more that one resource for day - it sum them and returns only one unique).
  // Then there is result of each resource group returned in parent array, that after is flattered by flat(1) method.

  // Main principle here is - each resource (felsStats, trainStats) has to have max 1 value per day for bizcharts. Also bizcharts 
  // does not have english api, so i leave metric, month & city keys (it's the only way i found it works, unfortunately).

   Promise.all( [trainsStats, feelsStats] )
   .then((payload) => {
    const data = [...payload?.map(e => {
      let newArr = [...e].sort((a,b) => a.month - b.month);
      let res = [];

      newArr.forEach((e, i) => {
        let exactDayElementInResult = res.find(el => el.month === e.month);
        if(!exactDayElementInResult) res.push(e);
        else{
          let current = {...exactDayElementInResult};
          current.metric = current.metric + e.metric;
          res[res.indexOf(exactDayElementInResult)] = current;
        }
      })
      return res;
   })].flat(1)

   const { totalDistance, avgWeight } = {
    totalDistance: [...payload[0]].reduce((a, c) => a + Number(c.metric), 0),
    avgWeight: [...payload[1]].reduce((a, c) => a + Number(c.metric), 0) / payload[1].length
   }

    dispatch({ type: "SET_STATS_INIT", payload: true });
    dispatch({ type: "SET_STATS_GLOB", payload: data, totalDistance, avgWeight});
   })
   .catch((error) => {
    console.log(error);
    showMessage.error(error?.response?.data?.message || error?.message || "Unknown error");
   });

 };

};
