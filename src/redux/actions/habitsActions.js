import AsyncStorage from "@react-native-async-storage/async-storage";

const ADD_HABIT = 'habits/ADD_HABIT';
const DEL_HABIT = 'habits/DEL_HABIT';
const UPD_HABIT = 'habits/UPD_HABIT';
const HABITS_INITIALIZE = 'habits/HABITS_INITIALIZE';

const initializeHabits = (payload) => ({
  type: HABITS_INITIALIZE,
  payload,
});


const addHabit = (payload) => async (dispatch, getState) => {
  await dispatch({
    type: ADD_HABIT,
    payload,
  });

  await setHabitsToAsyncStorage(getState);
};

const updateHabit = (payload) => async (dispatch, getState) => {
  await dispatch({
    type: UPD_HABIT,
    payload,
  });

  await setHabitsToAsyncStorage(getState);
};

const delHabit = (id) => async (dispatch, getState) => {
  await dispatch({
    type: DEL_HABIT,
    id,
  });

  await setHabitsToAsyncStorage(getState);
};



const setHabitsToAsyncStorage = async (getState) => {
  const { items } = getState().habits;
  try {
    await AsyncStorage.setItem('@habits/items', JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save habits state to storage', e);
  }
}

module.exports = {
  ADD_HABIT,
  DEL_HABIT,
  UPD_HABIT,
  HABITS_INITIALIZE,
  initializeHabits,
  addHabit,
  updateHabit,
  delHabit,
}