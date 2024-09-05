import AsyncStorage from "@react-native-async-storage/async-storage";

export const ADD_HABIT = 'habits/ADD_HABIT';
export const HABITS_INITIALIZE = 'habits/HABITS_INITIALIZE';

export const initializeHabits = (payload) => ({
    type: HABITS_INITIALIZE,
    payload,
  });


export const addHabit = (payload) => async (dispatch, getState) => {
    // Sets local state
    dispatch({
      type: ADD_HABIT,
      payload,
    });
    

    // Sets to AsyncStorage
    const { items } = getState().habits; 
    try {
      await AsyncStorage.setItem('@habits/items', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save habits state to storage', e);
    }
  };