import AsyncStorage from "@react-native-async-storage/async-storage";
import notificationsHandler from "../../tools/notificationsHandler";
import { convertTo24Hour } from "@constants";
import cancelNotificationsGroup from "../../tools/cancelNotificationsGroup";

const ADD_HABIT = 'habits/ADD_HABIT';
const DEL_HABIT = 'habits/DEL_HABIT';
const UPD_HABIT = 'habits/UPD_HABIT';
const SET_HABIT_TIMESTAMP = 'habits/SET_HABIT_TIMESTAMP';
const HABITS_INITIALIZE = 'habits/HABITS_INITIALIZE';

const initializeHabits = (payload, payloadIDs) => ({
  type: HABITS_INITIALIZE,
  payload,
  payloadIDs
});


const addHabit = (payload) => async (dispatch, getState) => {  

  let notificationIDs;
  if(payload.remind){
    let time = convertTo24Hour(payload.remindTime).split(":").map(e => e * 1);
    notificationIDs = await notificationsHandler(payload.repeat, time[0], time[1], payload.name, payload.notification);
    console.log(notificationIDs);
  }

  payload.notificationIDs = notificationIDs;

  await dispatch({
    type: ADD_HABIT,
    payload: payload,
    id: payload.id
  });


  await setHabitsToAsyncStorage(getState);
};

const updateHabit = (payload) => async (dispatch, getState) => {

  // cancel prev notifications
  if(payload.notificationIDs)
    cancelNotificationsGroup(payload.notificationIDs)

  // setup new (if set)
  let notificationIDs;
  if(payload.remind){
    let time = convertTo24Hour(payload.remindTime).split(":").map(e => e * 1);
    notificationIDs = await notificationsHandler(payload.repeat, time[0], time[1], payload.name, payload.notification);
    console.log(notificationIDs);
  }

  // set new ids
  payload.notificationIDs = notificationIDs;

  await dispatch({
    type: UPD_HABIT,
    payload,
    id: payload.id
  });

  await setHabitsToAsyncStorage(getState);
};

const delHabit = (id) => async (dispatch, getState) => {
  const habit = getState().habits[id];
  console.log(habit);
  
  await dispatch({
    type: DEL_HABIT,
    id,
  });

  await setHabitsToAsyncStorage(getState);
};

const setHabitTimestamp = ({ id, timestamp, isSet }) => async (dispatch, getState) => {
  await dispatch({
    type: SET_HABIT_TIMESTAMP,
    id, timestamp, isSet
  });

  await setHabitsToAsyncStorage(getState);
};




const setHabitsToAsyncStorage = async (getState) => {
  const { items, itemsIdsArray } = getState().habits;
  if (itemsIdsArray.length) {
    try {
      await AsyncStorage.setItem('@habits/items', JSON.stringify(items));
      await AsyncStorage.setItem('@habits/itemsIdsArray', JSON.stringify(itemsIdsArray));
    } catch (e) {
      console.error('Failed to save habits state to storage', e);
    }
  }
}

module.exports = {
  ADD_HABIT,
  DEL_HABIT,
  UPD_HABIT,
  SET_HABIT_TIMESTAMP,
  HABITS_INITIALIZE,
  initializeHabits,
  addHabit,
  updateHabit,
  delHabit,
  setHabitTimestamp
}