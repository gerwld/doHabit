import { toast } from "react-hot-toast";
import PlanService from "@/api/PlanService";
import { hashByEpoch, planDaysWithEpoch } from "@/utils";

export const setCurrentPlan = (id, startEpochDate) => {
  return dispatch => {
  PlanService.setCurrentPlan(id, startEpochDate)
   .then(({ data }) => {
    dispatch({type: 'SET_CURRENT_PLAN', ...data, globalPlanCurrentDays: hashByEpoch(planDaysWithEpoch(data.days, startEpochDate))})
    toast.success('Settings saved.')
  })
   .catch(error => {
    toast.error(error.message || "Error");
    throw new Error(error);
   }) 
  }
 }