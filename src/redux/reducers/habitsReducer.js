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
    items: []
    // items: [ // data sample
    //     { id: '9a7a37e2-807c-4835-bdee-8ecfb6f4237e', name: 'Test task 1', notification: '1', remind: true, repeat: 'every-day', datesArray: [] },
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
                break;

            case SET_HABIT_TIMESTAMP:
                return produce(state, draft => {
                    const item = draft.items.find(e => e.id === action.id);
                    if (item) {
                        const timestampIndex = item.datesArray.indexOf(action.timestamp);
                        if (timestampIndex !== -1) {
                            // Remove timestamp
                            item.datesArray.splice(timestampIndex, 1);
                        } else {
                            // Add timestamp
                            item.datesArray.push(action.timestamp);
                            item.datesArray = [...new Set(item.datesArray)];
                        }
                    }
                });
     
            case ADD_HABIT:
                draft.items.unshift(action.payload);
   
                break;
            case UPD_HABIT:
                const index = draft.items.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    draft.items[index] = action.payload;
                }
                break;
   
            case DEL_HABIT:
                draft.items = draft.items.filter(e => e.id !== action.id)
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