import { createSelector } from 'reselect';

// Selectors for app state
export const selectAppLang = state => state.app.lang;
export const selectAppTheme = state => ({theme: state.app.theme, system_theme: state.app.system_theme});
export const isHabitsInit = s => s.habits.isInit

export const selectAppThemeAndLang = createSelector(
    [selectAppLang, selectAppTheme],
     (lang, theme) => ({
      lang, theme
  }))


