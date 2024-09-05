import { ADD_HABBIT } from "actions/habbitsActions";

const initialState = {
    // items: [
    //     { id: '9a7a37e2-807c-4835-bdee-8ecfb6f4237e', name: 'Test task 1', notification: '1', remind: true, repeat: 'every-day', datesArray: [] },
    //     { id: '9a7a37e2-807c-4835-bdee-8ecfbrf4237e', name: 'Test task 2', notification: '1', remind: true, repeat: 'every-day', datesArray: [] }
    // ]
}

export default function habbits(state = initialState, action) {
    switch (action.type) {
        case ADD_HABBIT:
            return {
                ...state,
                items: state?.items ? [...state.items, action.payload] : [action.payload]
            }
        default:
            return state;
    }
}


