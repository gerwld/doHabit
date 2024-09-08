import AsyncStorage from "@react-native-async-storage/async-storage";

const APP_INITIALIZE = 'settings/APP_INITIALIZE';
const SET_LANG = 'settings/SET_LANG';
const SET_THEME = 'settings/SET_THEME';

const setLang = (payload) => async (dispatch, getState) => {
    await dispatch({
        type: SET_LANG,
        payload,
    });

    await setSettingsToAsyncStorage(getState);
};

const setTheme = (payload) => async (dispatch, getState) => {
    await dispatch({
        type: SET_THEME,
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
    SET_LANG, SET_THEME, APP_INITIALIZE, setLang, setTheme, initializeApp,
}