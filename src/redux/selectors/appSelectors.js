import { createSelector } from 'reselect';

// Selectors for app state
export const selectAppLang = state => state.app.lang;
export const selectAppTheme = state => state.app.theme;
export const isHabitsInit = s => s.habits.isInit

export const selectAppThemeAndLang = createSelector(
    [selectAppLang, selectAppTheme],
     (lang, theme) => ({
      lang, theme
  }))


