import { createSelector } from 'reselect';

// Selectors for state slices
export const selectItems = state => state.habits.items;
export const isInit = state => state.habits.isInit;

// Memoized selector to get filtered item
export const selectItemById = createSelector(
  [selectItems, (_, habitID) => habitID],
  (items, habitID) => items.find(e => e.id === habitID)
);