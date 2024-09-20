import {
    ADD_HABIT,
    UPD_HABIT,
    DEL_HABIT,
    SET_HABIT_TIMESTAMP,
    HABITS_INITIALIZE
} from "actions/habitsActions";
import { produce } from "immer";

const initialState = {
    isInit: true,
    items: Object.create(null),
    itemsIdsArray: []

    // items: [ // old data sample
    //     { id: '9a7a37e2-807c-4835-bdee-8ecfb6f4237e', name: 'Test task 1', notification: '1', remind: true, repeat: 'every-day', datesArray: [] },
    // ]
      // items: [ // new data sample
    //    '9a7a37e2-807c-4835-bdee-8ecfb6f4237e': 
    //       { id: '9a7a37e2-807c-4835-bdee-8ecfb6f4237e', 
    //         name: 'Test task 1', 
    //         notification: '1', 
    //         remind: true, 
    //         repeat: 'every-day', 
    //         datesArray: [] },
    // ]
}

export default function habits(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case "SET_HABITS_INIT":
                draft.isInit = action.payload
                break;
            case HABITS_INITIALIZE:
                draft.items = action.payload
                draft.itemsIdsArray = action.payloadIDs
                break;

            case SET_HABIT_TIMESTAMP:
                const item = draft.items[action.id];
                if (item) {
                    const timestampIndex = item.datesArray.indexOf(action.timestamp);
                    if (timestampIndex !== -1) {
                    // Remove timestamp
                    item.datesArray.splice(timestampIndex, 1);
                    } else {
                    // Add timestamp
                    item.datesArray.push(action.timestamp);
                    }
                    
                    // Ensure all dates are unique and update array
                    item.datesArray = Array.from(new Set(item.datesArray));
                }
                break;
     
            case ADD_HABIT:
                draft.items[action.id] = action.payload;
                draft.itemsIdsArray.unshift(action.id); // sort by index, easy pick without Object.keys etc
                // OLD: draft.items.unshift(action.payload);
                break;
                
            case UPD_HABIT:
                draft.items[action.id] = action.payload;
                // OLD: draft.items[action.id] = action.payload;
                // const index = draft.items.findIndex(e => e.id === action.payload.id);
                // if (index !== -1) {
                //     draft.items[index] = action.payload;
                // }
                break;
   
            case DEL_HABIT:
                if(draft.items[action.id]){
                    delete draft.items[action.id];
                    draft.itemsIdsArray = draft.itemsIdsArray.filter((id) => id !== action.id);
                }
                // OLD: draft.items = draft.items.filter(e => e.id !== action.id)
                // return {
                //     ...state,
                //     items: [...state.items || []].filter(e => e.id !== action.id)
                // }
                break;
                
            default:
                return state;
        }
    })
}