import { createSelector } from 'reselect';

// Selectors for state slices
const selectItems = state => state.habits.items;

// Memoized selector to get filtered item
export const selectItemById = createSelector(
  [selectItems, (_, habitID) => habitID],
  (items, habitID) => items.find(e => e.id === habitID)
);
