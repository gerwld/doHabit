import {
    ADD_HABIT,
    UPD_HABIT,
    DEL_HABIT,
    HABITS_INITIALIZE
} from "actions/habitsActions";

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
        case UPD_HABIT:
            let arr = [...state?.items || []];
            let index = arr.indexOf(arr.find(e => e.id === action.payload.id));
            if (index !== -1) 
                arr[index] = action.payload;

            return {
                ...state,
                items: arr
            }
            break;
        case DEL_HABIT:
            return {
                ...state,
                items: [...state.items || []].filter(e => e.id !== action.id)
            }
            break;
        default:
            return state;
    }
}


