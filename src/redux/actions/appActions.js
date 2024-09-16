import AsyncStorage from "@react-native-async-storage/async-storage";

const APP_INITIALIZE = 'settings/APP_INITIALIZE';
const SET_LANG = 'settings/SET_LANG';
const SET_THEME = 'settings/SET_THEME';
const SET_THEME_SYSTEM = 'settings/SET_THEME_SYSTEM'

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

const setSystemTheme = (payload) => ({type: SET_THEME_SYSTEM, payload})


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
    SET_LANG, SET_THEME, APP_INITIALIZE, SET_THEME_SYSTEM, setLang, setTheme, setSystemTheme, initializeApp,
}