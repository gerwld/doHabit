import showMessage from "react-hot-toast";

export const fetchStatistics = (fromEpochDay, toEpochDay) => {
 return (dispatch) => {
 }
};



  // Bit complicated here. What it does: Fetch 2 data resources, 
  // then each one is sorted and filtered by day (each group of the stats chart resource has to contain max 1 res per day. 
  // If it founds more that one resource for day - it sum them and returns only one unique).
  // Then there is result of each resource group returned in parent array, that after is flattered by flat(1) method.

  // Main principle here is - each resource (felsStats, trainStats) has to have max 1 value per day for bizcharts. Also bizcharts 
  // does not have english api, so i leave metric, month & city keys (it's the only way i found it works, unfortunately).

   