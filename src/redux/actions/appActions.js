import AsyncStorage from "@react-native-async-storage/async-storage";

const SET_LANG = 'settings/SET_LANG';
const APP_INITIALIZE = 'settings/APP_INITIALIZE';

const setLang = (payload) => async (dispatch, getState) => {
    await dispatch({
        type: SET_LANG,
        payload,
    });

    await setSettingsToAsyncStorage(getState);
};


const initializeApp = (payload) => ({
    type: APP_INITIALIZE,
    payload,
  });



const setSettingsToAsyncStorage = async (getState) => {
    const app = getState().app;
    try {
        await AsyncStorage.setItem('@settings', JSON.stringify(app));
    } catch (e) {
        console.error('Failed to save settings state to storage', e);
    }
}


module.exports = {
    SET_LANG, APP_INITIALIZE, setLang, initializeApp
}