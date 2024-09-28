import { createSelector } from 'reselect';

// Selectors for state slices
export const selectItems = state => state.habits.items;
export const selectItemsIDs = state => state.habits.itemsIdsArray;
export const isInit = state => state.habits.isInit;

// Memoized selector to get item
export const selectItemById = createSelector(
  [selectItems, (_, habitID) => habitID],
  (items, habitID) => items[habitID]
);

// Items as array
export const selectItemsArray = createSelector(
  [selectItems, selectItemsIDs],
  (items, itemsIDs) => (itemsIDs || []).map(id => items[id])
);



export const selectDatesItemById = createSelector(
  [selectItems, (_, habitID) => habitID],
  (items, habitID) => items[habitID]?.datesArray
);



/**
 * createSelector callback that recieves `habitID, timestampMin, timestampMax`
 * and returns memoized portion of timestamps range, which helps to avoid unnecessary re-renders.
 * @param {object} state - returned redux state object.
 * @param {string} habitID -  uuid to select the specified habit.
 * @param {string} timestampMin - from which included) timestamp select.
 * @param {string} timestampMax - to which (included) timestamp select.
 * @returns {array} - returns memoized portion of specified timestamps. 
 */
export const selectItemDatesPortionById = createSelector(
  [selectItems, (_, habitID) => habitID, (_, __, timestampMin) => timestampMin, (_, __, ___, timestampMax) => timestampMax],
  (items, habitID, timestampMin, timestampMax) => {
    const datesArray = items[habitID]?.datesArray || [];
    
    // Filter the datesArray based on the timestampMin and timestampMax
    return datesArray.filter(
      (dateItem) => dateItem >= timestampMin && dateItem <= timestampMax
    );
  }
);

export const selectItemDateById = createSelector(
  [selectItems, (_, habitID) => habitID, (_, __, value) => (value)],
  (items, habitID, value) => !!items[habitID].datesArray.includes(value)
);