import { createSelector } from 'reselect';

// Selectors for app state
const selectTheme = state => state.app.theme;
const selectLang = state => state.app.lang;

export const selectAppTheme = createSelector(
  [selectTheme],
  theme => theme
);

export const selectAppThemeAndLang = createSelector(
    [selectLang, selectTheme],
     (lang, theme) => ({
      lang, theme
  }))

export const selectAppLang = createSelector([selectLang], lang => lang)