import { ADD_HABIT } from "actions/habitsActions";
import { HABITS_INITIALIZE } from "actions/habitsActions";

const initialState = {
    isInit: false,
    // items: [
    //     { id: '9a7a37e2-807c-4835-bdee-8ecfb6f4237e', name: 'Test task 1', notification: '1', remind: true, repeat: 'every-day', datesArray: [] },
    //     { id: '9a7a37e2-807c-4835-bdee-8ecfbrf4237e', name: 'Test task 2', notification: '1', remind: true, repeat: 'every-day', datesArray: [] }
    // ]
}

export default function habits(state = initialState, action) {
    switch (action.type) {
        case "SET_HABITS_INIT": 
        return {
            ...state,
            isInit: action.payload
        };
        break;
        case HABITS_INITIALIZE: 
            return {
                ...state,
                items: action.payload, 
            };
            break;
        case ADD_HABIT:
            return {
                ...state,
                items: [action.payload, ...state.items || []]
            }
            break;
        default:
            return state;
    }
}


