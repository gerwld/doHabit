import { createSelector } from 'reselect';

// Selectors for app state
export const selectAppLang = state => state.app.lang;
export const selectAppTheme = state => state.app.theme;
const selectLang = state => state.app.lang;


export const selectAppThemeAndLang = createSelector(
    [selectLang, selectAppTheme],
     (lang, theme) => ({
      lang, theme
  }))

