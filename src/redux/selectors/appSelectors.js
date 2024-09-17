import { createSelector } from 'reselect';

// Selectors for app state
export const selectAppLang = state => state.app.lang;
export const isHabitsInit = s => s.habits.isInit
const getAppState = state => state.app;


export const selectAppTheme = createSelector(
  [getAppState],
  appState => ({
    theme: appState.theme,
    system_theme: appState.system_theme
  })
);

export const selectAppThemeAndLang = createSelector(
    [selectAppLang, selectAppTheme],
     (lang, theme) => ({
      lang, theme
  }))


